const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Middleware
const passwordValidate = require('./Midleware/passwordValidate');
const emailValidate = require('./Midleware/emailValidate');
const tokenValidate = require('./Midleware/tokenValidate');
const nameValidate = require('./Midleware/nameValidate');
const ageValidate = require('./Midleware/ageValidate');
const talkValidate = require('./Midleware/talkValidate');

const talkersPath = './talker.json';
const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', (request, response) => {
  const talkers = JSON.parse(fs.readFileSync(talkersPath, 'utf8'));
  if (!talkers.length) return response.status(HTTP_OK_STATUS).json(talkers);
  return response.json(talkers);
});

app.get('/talker/search', tokenValidate, (request, response) => {
  const { query: { q } } = request;
  const talkers = JSON.parse(fs.readFileSync(talkersPath, 'utf8'));
  const matchTalkers = talkers.filter((talker) => talker.name.match(q));
  if (!talkers.length) return response.status(HTTP_OK_STATUS).json(talkers);
  return response.json(matchTalkers);
});

app.get('/talker/:id', (request, response) => {
  const { params } = request;
  const talkers = JSON.parse(fs.readFileSync(talkersPath, 'utf8'));
  const talker = talkers.find((registredTalker) => registredTalker.id === Number(params.id));
  if (!talker) {
    return response.status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
}
  return response.json(talker);
});

app.post('/login', emailValidate, passwordValidate,
  (request, response) => {
    const token = crypto.randomBytes(256).toString('hex').slice(0, 16);
    return response.json({ token });
});

app.post('/talker', tokenValidate, talkValidate, ageValidate, nameValidate, (request, response) => {
  const { body } = request;
  const talkers = JSON.parse(fs.readFileSync(talkersPath, 'utf8'));
  body.id = talkers.length + 1;
  talkers.push(body);

  fs.writeFileSync(talkersPath, JSON.stringify(talkers));
  return response.status(201).json(body);
});

app.put('/talker/:id', tokenValidate,
  talkValidate, ageValidate, nameValidate, (request, response) => {
  const { params: { id } } = request;
  const { body } = request;
  body.id = Number(id);
  const talkers = JSON.parse(fs.readFileSync(talkersPath, 'utf8'));
  talkers.splice(Number(id) - 1, 1);
  talkers.splice(Number(id) - 1, 0, body);

  fs.writeFileSync(talkersPath, JSON.stringify(talkers));
  return response.status(200).json(body);
});

app.delete('/talker/:id', tokenValidate, (request, response) => {
  const params = Number(request.params.id);
  const talkers = JSON.parse(fs.readFileSync(talkersPath, 'utf8'));
  talkers.splice(params - 1, 1);

  fs.writeFileSync(talkersPath, JSON.stringify(talkers));

  return response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
