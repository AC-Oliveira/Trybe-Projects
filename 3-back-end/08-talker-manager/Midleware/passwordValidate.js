function passwordValidate(request, response, next) {
  const { password } = request.body;
  if (!password || !password.length) {
    return response.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return response.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  return next();
}

module.exports = passwordValidate;
