const depositBalance = async (req, res, next) => {
  try {
    const { User } = req.app.get('services');
    const { userId } = req.params;
    const { amount } = req.body;

    if (typeof amount !== 'number') {
      return res.status(400).send({ error: 'Amount should be a number' });
    }

    await User.depositBalance({ userId, amount });
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  depositBalance
};
