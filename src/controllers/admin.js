const getBestProfession = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    const { Admin } = req.app.get('services');

    const response = await Admin.getBestProfession({ start, end });
    res.json(response);
  } catch (error) {
    return next(error);
  }
};

const getBestClients = async (req, res, next) => {
  try {
    const { start, end, limit = 2 } = req.query;
    const { Admin } = req.app.get('services');

    const response = await Admin.getBestClients({ start, end, limit });
    res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getBestProfession,
  getBestClients
};
