function emailValidate(request, response, next) {
  const { email } = request.body;
  if (!email || !email.length) {
    return response.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  const regEx = /\S+@\S+\.\S+/;
  if (!regEx.test(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
}

module.exports = emailValidate;
