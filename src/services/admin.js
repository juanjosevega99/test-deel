const sequelize = require('sequelize');

const { Op } = sequelize;

const AdminFactory = ({ Models }) => {
  const { Contract, Job, Profile } = Models;

  const getBestProfession = async ({ start, end }) => {
    const dateQuery = { paymentDate: {} };
    let query = { paid: true };

    if (start) dateQuery.paymentDate[Op.gte] = start;

    if (end) dateQuery.paymentDate[Op.lte] = end;

    if (start || end) query = { ...query, ...dateQuery };

    const [result] = await Job.findAll({
      where: query,
      attributes: [
        'Contract.Contractor.profession',
        [sequelize.fn('sum', sequelize.col('Job.price')), 'totalPaid']
      ],
      include: [
        {
          attributes: ['ContractorId'],
          model: Contract,
          include: [
            {
              attributes: ['profession'],
              model: Profile,
              as: 'Contractor'
            }
          ]
        }
      ],
      group: ['Contract.Contractor.profession'],
      order: sequelize.literal('totalPaid DESC'),
      limit: 1
    });

    if (!result) return null;

    const resultJson = result.toJSON();
    return {
      totalPaid: resultJson.totalPaid,
      profession: resultJson.Contract.Contractor.profession
    };
  };

  const getBestClients = async ({ start, end, limit }) => {
    const dateQuery = { paymentDate: {} };
    let query = { paid: true };

    if (start) dateQuery.paymentDate[Op.gte] = start;

    if (end) dateQuery.paymentDate[Op.lte] = end;

    if (start || end) query = { ...query, ...dateQuery };

    const result = await Job.findAll({
      where: query,
      attributes: [
        'Contract.Client.id',
        'Contract.Client.firstName',
        'Contract.Client.lastName',
        [sequelize.fn('sum', sequelize.col('Job.price')), 'totalPaid']
      ],
      include: [
        {
          attributes: ['ClientId'],
          model: Contract,
          include: [
            {
              attributes: ['id', 'firstName', 'lastName'],
              model: Profile,
              as: 'Client'
            }
          ]
        }
      ],
      group: ['Contract.Client.id'],
      order: sequelize.literal('totalPaid DESC'),
      limit
    });

    if (!result) return [];

    return result.map(row => {
      const rowData = row.toJSON();
      const { Client } = rowData.Contract;
      return {
        id: Client.id,
        fullName: `${Client.firstName} ${Client.lastName}`,
        paid: rowData.totalPaid
      };
    });
  };

  return {
    getBestProfession,
    getBestClients
  };
};

module.exports = AdminFactory;
