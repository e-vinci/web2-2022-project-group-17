import { clearPage} from '../../utils/render';
import { setAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';


const LoginPage = () => {
  clearPage();
  renderLoginForm();
};

function renderLoginForm() {
  const main = document.querySelector('main');
  const loginWrapper = document.createElement('div');
  loginWrapper.className = 'intro-section d-flex justify-content-center align-items-center'
  const formWrapper = document.createElement('div');
  formWrapper.className = 'formWrapper container border d-flex flex-column align-items-center rounded';
  const formTop = document.createElement('div');
  formTop.className = 'form-top w-100';
  const formTopDiv = document.createElement('div');
  const formTopTitle = document.createElement('h1');
  formTopDiv.className = 'text-center p-3';
  formTopTitle.innerHTML = 'Connexion';

  const formBottom = document.createElement('div');
  formBottom.className = 'form-bottom border-top w-100 p-3';

  const form = document.createElement('form');
  form.className = 'mb-3'

  const formGroup1 = document.createElement('div');
  const usernameLabel = document.createElement('label');
  usernameLabel.className = 'form-label ps-4';
  usernameLabel.htmlFor = 'nickname';
  usernameLabel.innerHTML = "Nom d'utilisateur";

  const inputGroup1 = document.createElement('div');
  inputGroup1.className = 'input-group mb-4 px-4';
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
  inputGroup2.className = 'input-group mb-4 px-4';
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

  const submitDiv = document.createElement('div');
  submitDiv.className = 'submitDiv text-center mb-4';
  const submit = document.createElement('input');
  submit.value = 'Se connecter';
  submit.type = 'submit';
  submit.className = 'btn btn-success';

  const alreadyHasDiv = document.createElement('div');
  const alreadyHasP = document.createElement('p');
  alreadyHasDiv.className = 'text-center mb-2';
  alreadyHasDiv.innerHTML = `Pas encore de compte? <a href="#">Inscrivez-vous maintenant.</a>`

  const loginErrorDiv = document.createElement('div');
  loginErrorDiv.className = "login-error-div";
  const loginErrorP = document.createElement('p');
  loginErrorP.className = "login-error-p";
  
  
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

  submitDiv.appendChild(submit);
  alreadyHasDiv.appendChild(alreadyHasP);
  loginErrorDiv.appendChild(loginErrorP);

  form.appendChild(formGroup1);
  form.appendChild(formGroup2);
  form.appendChild(submitDiv);

  formBottom.appendChild(form);
  formBottom.appendChild(alreadyHasDiv);
  formBottom.appendChild(loginErrorDiv);

  formTopDiv.appendChild(formTopTitle);
  formTop.appendChild(formTopDiv);

  formWrapper.appendChild(formTop);
  formWrapper.appendChild(formBottom);
  loginWrapper.appendChild(formWrapper);
  main.appendChild(loginWrapper);
  form.addEventListener('submit', onLogin)

  alreadyHasDiv.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate('/register');
  })

  
}

async function onLogin(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method:'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials : 'include'
  }

  const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);
  if (!response.ok) {
    const errorP = document.querySelector('.login-error-p');
    errorP.classList.add('text-center');
    errorP.innerHTML = "Nom d'utilisateur ou mot de passe incorrect"
  }
  const authenticatedUser = await response.json();

  /* eslint-disable no-console */
  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);
  Navbar();
  Navigate('/game');
}

export default LoginPage;
