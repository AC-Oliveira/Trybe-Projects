module.exports = (error, _req, res, _next) => {
  console.log('-/-/-/- ERROR -/-/-/- \n', error);

  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: 'internal error' });
};
