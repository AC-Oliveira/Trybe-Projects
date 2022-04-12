module.exports = (error, _req, res, _next) => {
  const { err } = error;
  if (err.status) {
    return res.status(err.status).json(error);
  }
  return res.status(500).json({ message: 'internal error' });
};
