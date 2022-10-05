const getBestProfession = async (res, req, next) => {
  try {
    const { Admin } = req.app.get('services');

    const response = await Admin.getBestProfession({
      start: req.query.start,
      end: req.query.end
    });
    res.json(response);
  } catch (error) {
    return next(error);
  }
};

const getBestClients = async () => {
  try {
    const { Admin } = req.app.get('services');

    const response = await Admin.getBestProfession({
      start: req.query.start,
      end: req.query.end
    });
    res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getBestProfession,
  getBestClients
};
