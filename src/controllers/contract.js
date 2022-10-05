const getContractById = async (req, res, next) => {
  try {
    const { Contract } = req.app.get('services');
    const { id } = req.params;
    const profileId = req.profile.id;

    const contract = await Contract.getUserContract({
      contractId: id,
      profileId
    });

    if (!contract) {
      return res.status(404).send({ error: 'Contract not found' });
    }

    res.json(contract);
  } catch (error) {
    return next(error);
  }
};

const getActiveContracts = async (req, res, next) => {
  try {
    const { Contract } = req.app.get('services');
    const profileId = req.profile.id;

    const contracts = await Contract.getActiveContracts({ profileId });

    res.json(contracts);
  } catch (err) {
    return next(error);
  }
};

module.exports = {
  getContractById,
  getActiveContracts
};
