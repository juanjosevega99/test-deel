const { Op } = require('sequelize');

const { makeApiError } = require('../utils');

const JobFactory = ({ Models, Configs }) => {
  const { Contract, Job, Profile } = Models;
  const { CONTRACT_STATUSES } = Configs;

  const notPaidQuery = { paid: { [Op.or]: [false, null] } };

  const getUnpaidJobs = async ({ profileId }) => {
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
        status: { [Op.ne]: CONTRACT_STATUSES.TERMINATED }
      },
      include: {
        model: Job,
        where: notPaidQuery
      }
    });

    return contracts.flatMap(contract => contract.Jobs);
  };

  const payJob = async ({ profileId, jobId }) => {
    const t = await Job.sequelize.transaction();

    try {
      const innerContractQuery = {
        include: [
          {
            model: Contract,
            where: {
              ClientId: profileId
            }
          }
        ]
      };

      const job = await Job.findOne({
        where: { id: jobId },
        ...innerContractQuery
      });

      if (!job) throw makeApiError('Job not found', 404);

      const [updated] = await Job.update(
        { paid: true },
        {
          where: { id: jobId, ...notPaidQuery },
          transaction: t
        }
      );

      if (!updated) throw makeApiError('Job already paid', 403);

      const profile = await Profile.findOne({ where: { id: profileId } });

      if (profile.balance < job.price)
        throw makeApiError('Not enough balance', 403);

      await Promise.all([
        Profile.increment('balance', {
          by: -job.price,
          where: { id: profileId },
          transaction: t
        }),
        Profile.increment('balance', {
          by: job.price,
          where: { id: job.Contract.ContractorId },
          transaction: t
        })
      ]);

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  };

  return {
    getUnpaidJobs,
    payJob
  };
};

module.exports = JobFactory;
