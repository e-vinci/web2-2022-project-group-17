import { clearPage } from '../../utils/render';
import { setAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
  const registerWrapper = document.createElement('div');
  registerWrapper.className = 'intro-section d-flex justify-content-center align-items-center'
  const formWrapper = document.createElement('div');
  formWrapper.className = 'formWrapper border w-25 d-flex flex-column align-items-center rounded';
  const formTop = document.createElement('div');
  formTop.className = 'form-top w-100';
  const formTopDiv = document.createElement('div');
  const formTopTitle = document.createElement('h1');
  formTopDiv.className = 'formTopDiv text-center';
  formTopTitle.innerHTML = 'Inscription';

  const formBottom = document.createElement('div');
  formBottom.className = 'form-bottom border-top w-100';

  const form = document.createElement('form');
  form.className = 'my-3'

  const formGroup1 = document.createElement('div');
  const usernameLabel = document.createElement('label');
  usernameLabel.className = 'form-label ps-4';
  usernameLabel.htmlFor = 'nickname';
  usernameLabel.innerHTML = "Nom d'utilisateur";

  const inputGroup1 = document.createElement('div');
  inputGroup1.className = 'input-group mb-3 px-4';
  const inputGroup1Span = document.createElement('span');
  inputGroup1Span.className = 'input-group-text';
  const inputGroup1I = document.createElement('i');
  inputGroup1I.className = 'bi bi-person-fill';

  
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = "nom d'utilisateur";
  username.required = true;
  username.className = 'form-control';


  const formGroup2 = document.createElement('div');
  const passwordLabel = document.createElement('label');
  passwordLabel.className = 'form-label ps-4';
  passwordLabel.htmlFor = 'password';
  passwordLabel.innerHTML = 'Mot de passe';

  const inputGroup2 = document.createElement('div');
  inputGroup2.className = 'input-group mb-3 px-4';
  const inputGroup2Span = document.createElement('span');
  inputGroup2Span.className = 'input-group-text';
  const inputGroup2I = document.createElement('i');
  inputGroup2I.className = 'bi bi-key-fill';

  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'mot de passe';
  password.className = 'form-control';

  const formGroup3 = document.createElement('div');
  const password2Label = document.createElement('label');
  password2Label.className = 'form-label ps-4';
  password2Label.htmlFor = 'passwordConfirmation';
  password2Label.innerHTML = 'Mot de passe de confirmation';

  const inputGroup3 = document.createElement('div');
  inputGroup3.className = 'input-group mb-3 px-4';
  const inputGroup3Span = document.createElement('span');
  inputGroup3Span.className = 'input-group-text';
  const inputGroup3I = document.createElement('i');
  inputGroup3I.className = 'bi bi-key-fill';

  const password2 = document.createElement('input');
  password2.type = 'password';
  password2.id = 'password2';
  password2.required = true;
  password2.placeholder = 'mot de passe de confirmation';
  password2.className = 'form-control';


  const submitDiv = document.createElement('div');
  submitDiv.className = 'submitDiv text-center';
  const submit = document.createElement('input');
  submit.value = "S'inscrire";
  submit.type = 'submit';
  submit.className = 'btn btn-success';

  const alreadyHasDiv = document.createElement('div');
  alreadyHasDiv.className = 'text-center';
  alreadyHasDiv.innerHTML = `<p>Déjà inscrit? <a href="#">Connectez-vous maintenant.</a></p>`

  inputGroup1Span.appendChild(inputGroup1I);
  inputGroup1.appendChild(inputGroup1Span);
  inputGroup1.appendChild(username);
  formGroup1.appendChild(usernameLabel);
  formGroup1.appendChild(inputGroup1);

  inputGroup2Span.appendChild(inputGroup2I);
  inputGroup2.appendChild(inputGroup2Span);
  inputGroup2.appendChild(password);
  formGroup2.appendChild(passwordLabel);
  formGroup2.appendChild(inputGroup2);

  inputGroup3Span.appendChild(inputGroup3I);
  inputGroup3.appendChild(inputGroup3Span);
  inputGroup3.appendChild(password2);
  formGroup3.appendChild(password2Label);
  formGroup3.appendChild(inputGroup3);

  submitDiv.appendChild(submit);

  form.appendChild(formGroup1);
  form.appendChild(formGroup2);
  form.appendChild(formGroup3);
  form.appendChild(submitDiv);

  formBottom.appendChild(form);
  formBottom.appendChild(alreadyHasDiv);

  formTopDiv.appendChild(formTopTitle);
  formTop.appendChild(formTopDiv);

  formWrapper.appendChild(formTop);
  formWrapper.appendChild(formBottom);
  registerWrapper.appendChild(formWrapper);
  main.appendChild(registerWrapper);
  form.addEventListener('submit', onRegister);
  alreadyHasDiv.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate('/login');
  })
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const password2 = document.querySelector('#password2').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      password2
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const response = await fetch('/api/auths/register', options);
  

  if (!response.ok) {
    const formBottom = document.querySelector('.form-bottom');
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `${response.errors}`;
    formBottom.appendChild(errorDiv);
    throw new Error(`fetch error::auths/login : ${response.status} : ${response.statusText}`);
  }
  const authenticatedUser = await response.json();

  /* eslint-disable no-console */
  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);
  Navbar();
  Navigate('/');
}

export default RegisterPage;
