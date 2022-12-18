import { clearPage } from '../../utils/render';
import { setAuthenticatedUser } from '../../utils/auths';
import { checkRegistrationPassword, checkRegistrationPassword2, checkRegistrationUsername } from '../../utils/validator';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderRegisterForm();
};

let usernameValid = false;
let passwordValid = false;
let password2Valid = false;

function renderRegisterForm() {
  const main = document.querySelector('main');
  const registerWrapper = document.createElement('div');
  registerWrapper.className = 'intro-section d-flex justify-content-center align-items-center'
  const formWrapper = document.createElement('div');
  formWrapper.className = 'formWrapper container border d-flex flex-column align-items-center rounded';
  const formTop = document.createElement('div');
  formTop.className = 'form-top w-100';
  const formTopDiv = document.createElement('div');
  const formTopTitle = document.createElement('h1');
  formTopDiv.className = 'formTopDiv text-center p-3';
  formTopTitle.innerHTML = 'Inscription';

  const formBottom = document.createElement('div');
  formBottom.className = 'form-bottom border-top w-100 p-3';

  const form = document.createElement('form');
  form.className = 'my-3'

  const formGroup1 = document.createElement('div');
  formGroup1.className = "register-form-group"

  const usernameLabel = document.createElement('label');
  usernameLabel.className = 'form-label ps-4';
  usernameLabel.htmlFor = 'nickname';
  usernameLabel.innerHTML = "Nom d'utilisateur";

  const inputGroup1 = document.createElement('div');
  inputGroup1.className = 'input-group mb-1 px-4';
  const inputGroup1Span = document.createElement('span');
  inputGroup1Span.className = 'input-group-text';
  const inputGroup1I = document.createElement('i');
  inputGroup1I.className = 'bi bi-person-fill';

  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = "nom d'utilisateur";
  username.required = true;
  username.className = 'form-control username-field';

  const usernameCheckIcon = document.createElement('i');
  usernameCheckIcon.className = "bi bi-check-circle-fill validation-icons success-icon";
  const usernameInvalidIcon = document.createElement('i');
  usernameInvalidIcon.className = "bi bi-exclamation-circle-fill validation-icons failure-icon";

  const usernameErrorP = document.createElement('p');
  const usernameErrorMessage = document.createElement('small');
  usernameErrorMessage.className = 'username-small';
  const usernameErrorMessageText = document.createTextNode('error');



  const formGroup2 = document.createElement('div');
  formGroup2.className = "register-form-group"
  const passwordLabel = document.createElement('label');
  passwordLabel.className = 'form-label ps-4';
  passwordLabel.htmlFor = 'password';
  passwordLabel.innerHTML = 'Mot de passe';

  const inputGroup2 = document.createElement('div');
  inputGroup2.className = 'input-group mb-1 px-4';
  const inputGroup2Span = document.createElement('span');
  inputGroup2Span.className = 'input-group-text';
  const inputGroup2I = document.createElement('i');
  inputGroup2I.className = 'bi bi-key-fill';

  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'mot de passe';
  password.className = 'form-control password-field';

  const passwordCheckIcon = document.createElement('i');
  passwordCheckIcon.className = "bi bi-check-circle-fill validation-icons success-icon";
  const passwordInvalidIcon = document.createElement('i');
  passwordInvalidIcon.className = "bi bi-exclamation-circle-fill validation-icons failure-icon";

  const passwordErrorP = document.createElement('p');
  const passwordErrorMessage = document.createElement('small');
  passwordErrorMessage.className = 'password-small';
  const passwordErrorMessageText = document.createTextNode('error');




  const formGroup3 = document.createElement('div');
  formGroup3.className = "register-form-group"
  const password2Label = document.createElement('label');
  password2Label.className = 'form-label ps-4';
  password2Label.htmlFor = 'passwordConfirmation';
  password2Label.innerHTML = 'Mot de passe de confirmation';

  const inputGroup3 = document.createElement('div');
  inputGroup3.className = 'input-group mb-1 px-4';
  const inputGroup3Span = document.createElement('span');
  inputGroup3Span.className = 'input-group-text';
  const inputGroup3I = document.createElement('i');
  inputGroup3I.className = 'bi bi-key-fill';

  const password2 = document.createElement('input');
  password2.type = 'password';
  password2.id = 'password2';
  password2.required = true;
  password2.placeholder = 'mot de passe de confirmation';
  password2.className = 'form-control password2-field';

  const password2CheckIcon = document.createElement('i');
  password2CheckIcon.className = "bi bi-check-circle-fill validation-icons success-icon";
  const password2InvalidIcon = document.createElement('i');
  password2InvalidIcon.className = "bi bi-exclamation-circle-fill validation-icons failure-icon";

  const password2ErrorP = document.createElement('p');
  const password2ErrorMessage = document.createElement('small');
  password2ErrorMessage.className = 'password2-small';
  const password2ErrorMessageText = document.createTextNode('error');


  const submitDiv = document.createElement('div');
  submitDiv.className = 'submitDiv text-center mt-3';
  const submit = document.createElement('input');
  submit.value = "S'inscrire";
  submit.type = 'submit';
  submit.className = 'btn btn-success';

  const alreadyHasDiv = document.createElement('div');
  const alreadyHasP = document.createElement('p');
  alreadyHasP.className = 'text-center';
  alreadyHasP.innerHTML = `Déjà inscrit? <a href="#">Connectez-vous maintenant.</a>`
  

  const validationErrorDiv = document.createElement('div');
  const validationErrorP = document.createElement('div');
  validationErrorDiv.className = "validation-error-div";
  validationErrorP.className = "validation-error-p";


  inputGroup1Span.appendChild(inputGroup1I);
  inputGroup1.appendChild(inputGroup1Span);
  inputGroup1.appendChild(username);
  formGroup1.appendChild(usernameLabel);
  formGroup1.appendChild(inputGroup1);
  formGroup1.appendChild(usernameCheckIcon);
  formGroup1.appendChild(usernameInvalidIcon);
  usernameErrorMessage.appendChild(usernameErrorMessageText);
  formGroup1.appendChild(usernameErrorP);
  usernameErrorP.appendChild(usernameErrorMessage);

  inputGroup2Span.appendChild(inputGroup2I);
  inputGroup2.appendChild(inputGroup2Span);
  inputGroup2.appendChild(password);
  formGroup2.appendChild(passwordLabel);
  formGroup2.appendChild(inputGroup2);
  formGroup2.appendChild(passwordCheckIcon);
  formGroup2.appendChild(passwordInvalidIcon);
  passwordErrorMessage.appendChild(passwordErrorMessageText);
  formGroup2.appendChild(passwordErrorP);
  passwordErrorP.appendChild(passwordErrorMessage);
  

  inputGroup3Span.appendChild(inputGroup3I);
  inputGroup3.appendChild(inputGroup3Span);
  inputGroup3.appendChild(password2);
  formGroup3.appendChild(password2Label);
  formGroup3.appendChild(inputGroup3);
  formGroup3.appendChild(password2CheckIcon);
  formGroup3.appendChild(password2InvalidIcon);
  password2ErrorMessage.appendChild(password2ErrorMessageText);
  formGroup3.appendChild(password2ErrorP);
  password2ErrorP.appendChild(password2ErrorMessage);

  submitDiv.appendChild(submit);
  alreadyHasDiv.appendChild(alreadyHasP);
  validationErrorDiv.appendChild(validationErrorP);

  form.appendChild(formGroup1);
  form.appendChild(formGroup2);
  form.appendChild(formGroup3);
  form.appendChild(submitDiv);

  formBottom.appendChild(form);
  formBottom.appendChild(alreadyHasDiv);
  formBottom.appendChild(validationErrorDiv);
  

  formTopDiv.appendChild(formTopTitle);
  formTop.appendChild(formTopDiv);

  formWrapper.appendChild(formTop);
  formWrapper.appendChild(formBottom);
  registerWrapper.appendChild(formWrapper);
  main.appendChild(registerWrapper);
  
  alreadyHasDiv.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate('/login');
  })


  
  username.addEventListener('input', debounce(async () =>  {
    const registerFormGroup1 = username.parentElement.parentElement;
    const usernameSmall = document.querySelector('.username-small')

    if (username.value.trim() === '') {
      registerFormGroup1.className = "register-form-group failure";
      usernameSmall.innerHTML = "Veuillez introduire un nom d'utilisateur";
    } else {
      const response = await fetch(`${process.env.API_BASE_URL}/users/${username.value}`);
      if (response.ok) {
        registerFormGroup1.className = "register-form-group failure";
        usernameSmall.innerHTML = "Nom d'utilisateur déjà existant";
        usernameValid = false;
      } else {
        const { errors, isValid } = checkRegistrationUsername(username.value);
        if (!isValid) {
          registerFormGroup1.className = "register-form-group failure";
          usernameSmall.innerHTML = `${errors}`;
          usernameValid = false;
        } else {
          registerFormGroup1.className = "register-form-group success";
          usernameSmall.innerHTML = "Nom d'utilisateur disponible";
          usernameValid = true;
        }
        
      }
    }
  }, 1000));


  password.addEventListener('input', debounce(() =>  {
    const registerFormGroup2 = password.parentElement.parentElement;
    const registerFormGroup3 = password2.parentElement.parentElement;
    const passwordSmall = document.querySelector('.password-small')

    const { errors, isValid } = checkRegistrationPassword(password.value);
    if (!isValid) {
      registerFormGroup2.className = "register-form-group failure";
      if (password2.value !== '') {
        registerFormGroup3.className = "register-form-group failure";
      }
      passwordSmall.innerHTML = `${errors}`;
      passwordValid = false;
    } else {
      registerFormGroup2.className = "register-form-group success";
      if (password2.value !== '') {
        registerFormGroup3.className = "register-form-group success";
      }
      passwordSmall.innerHTML = '';
      passwordValid = true;
    }
  }, 1000));

  password2.addEventListener('input', debounce(() =>  {
    const registerFormGroup2 = password.parentElement.parentElement;
    const registerFormGroup3 = password2.parentElement.parentElement;
    const password2Small = document.querySelector('.password2-small')

    const { errors, isValid } = checkRegistrationPassword2(password.value, password2.value);
    if (!isValid) {
      registerFormGroup2.className = "register-form-group failure";
      registerFormGroup3.className = "register-form-group failure";
      password2Small.innerHTML = `${errors}`;
      password2Valid = false;
    } else {
      registerFormGroup2.className = "register-form-group success";
      registerFormGroup3.className = "register-form-group success";
      password2Small.innerHTML = '';
      password2Valid = true;
    }
  }, 1000));


  form.addEventListener('submit', onRegister);



}


/** *************************************************************************************
*    Title: How do you debounce in JavaScript?
*    Author: Fredrik Söderström
*    Date: 2022-02-07
*    Code version: <code version>
*    Availability: https://writingjavascript.com/how-do-you-debounce-in-javascript
*
************************************************************************************** */

function debounce(callback, delay) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), delay);
  };
}

async function onRegister(e) {
  e.preventDefault();

  if (!usernameValid || !passwordValid || !password2Valid) {
    const errorDiv = document.querySelector('.validation-error-div').firstChild;
    errorDiv.className = "text-center"
    errorDiv.innerHTML = `Veuillez valider tous les champs`;
    return;
  }

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
    },
    credentials : 'include'
  }

  const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, options);
  

  if (!response.ok) {
    throw new Error(`fetch error::auths/register : ${response.status} : ${response.statusText}`);
  }
  const authenticatedUser = await response.json();

  /* eslint-disable no-console */
  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);
  Navbar();
  Navigate('/');
}



export default RegisterPage;
