const { Op } = require('sequelize');

const ContractFactory = ({ Models, Configs }) => {
  const { Contract } = Models;
  const { CONTRACT_STATUSES } = Configs;

  const getUserContract = async ({ contractId, profileId }) => {
    return Contract.findOne({
      where: {
        id: contractId,
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }]
      }
    });
  };

  const getActiveContracts = async ({ profileId }) => {
    return Contract.findAll({
      where: {
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
        status: {
          [Op.ne]: CONTRACT_STATUSES.TERMINATED
        }
      }
    });
  };

  return {
    getUserContract,
    getActiveContracts
  };
};

module.exports = ContractFactory;
