const sequelize = require('sequelize');

const { Op } = sequelize;
const { makeApiError, calculatePercent } = require('../utils');

const UserFactory = ({ Models, Configs }) => {
  const { Contract, Job, Profile } = Models;
  const { CONTRACT_STATUSES, PROFILE_TYPES } = Configs;

  const depositBalance = async ({ userId, amount }) => {
    const profile = await Profile.findOne({
      where: { id: userId, type: PROFILE_TYPES.CLIENT }
    });

    if (!profile) throw makeApiError('Profile not found', 404);

    if (profile.type !== PROFILE_TYPES.CLIENT)
      throw makeApiError('Only clients can deposit balance', 403);

    const [result] = await Job.findAll({
      where: { paid: { [Op.or]: [false, null] } },
      attributes: [
        'Contract.ClientId',
        [sequelize.fn('sum', sequelize.col('price')), 'totalDept']
      ],
      include: [
        {
          model: Contract,
          where: {
            ClientId: userId,
            status: { [Op.ne]: CONTRACT_STATUSES.TERMINATED }
          }
        }
      ],
      group: ['Contract.ClientId']
    });

    const totalDept = result ? result.toJSON().totalDept : 0;

    const percent = calculatePercent(totalDept, 25);

    if (amount >= percent)
      throw makeApiError(`Amount can not be more than ${percent}`, 403);

    await Profile.increment('balance', { by: amount, where: { id: userId } });
  };

  return {
    depositBalance
  };
};

module.exports = UserFactory;
