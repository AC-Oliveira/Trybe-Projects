const aux = (watchedAt, rate, response, next) => {
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!watchedAt.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    return response.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }

  return next();
};

function talkValidate(request, response, next) {
  const { talk } = request.body;
  if (!talk) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  },
);
} 
const { watchedAt, rate } = talk;
if (rate !== 0 && (!watchedAt || !rate)) {
  return response.status(400).json(
    { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  },
); 
}

 return aux(watchedAt, rate, response, next);
}

module.exports = talkValidate;
