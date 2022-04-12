module.exports = (error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json(error);
  }
  return res.status(500).json({ message: 'internal error' });
};
