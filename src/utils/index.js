exports.makeApiError = (msg, status) => {
  const err = new Error(msg);
  err.apiError = true;
  err.status = status;

  return err;
};

exports.calculatePercent = (n, p) => (n * p) / 100;
