function nameValidate(request, response, next) {
  const { name } = request.body;

  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3 && name.length !== 0) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
}

  return next();
}

module.exports = nameValidate;
