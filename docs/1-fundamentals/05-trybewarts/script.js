const loginButton = document.getElementById('login-button');
const login = document.getElementById('login');
const password = document.getElementById('password');
const agreementCheck = document.getElementById('agreement');
const submitBtn = document.getElementById('submit-btn');
const textArea = document.getElementById('textarea');
const characterCounter = document.getElementById('counter');

loginButton.addEventListener('click', () => {
  if (login.value !== 'tryber@teste.com' && password.value !== 123456) {
    alert('Login ou senha inválidos.');
  } else {
    alert('Olá, Tryber!');
  }
});

agreementCheck.addEventListener('click', () => {
  if (agreementCheck.checked === true) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

textArea.addEventListener('keyup', () => {
  characterCounter.innerHTML = 500 - textArea.value.length;
});

submitBtn.addEventListener('click', () => {
  const name = document.querySelector('#input-name').value;

  document.querySelector('#input-name').innerHTML = name;
});
