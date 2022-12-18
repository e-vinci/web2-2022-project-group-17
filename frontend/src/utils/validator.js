const validator = require('validator');


function checkRegistrationUsername(username) {
  let errors = '';
  let isValid = true;

  if (!validator.isAlphanumeric(username)) {
    errors = "Un nom d'utilisateur ne peut contenir que des lettres et chiffres";
    isValid = false;

  } else if (username.length < 3 ) {
    errors = "Votre nom d'utilisateur est trop court";
    isValid = false;
  } else if (username.length > 12) {
    errors = "Votre nom d'utilisateur est trop long";
    isValid = false;
  }
  return {
    errors,
    isValid
  }
}

function checkRegistrationPassword(password) {
  let errors = '';
  let isValid = true;

  if (validator.isEmpty(password)) {
    errors = "Un mot de passe est requis";
    isValid = false;

  } else if (!validator.isLength(password, { min: 4, max: 120 })) {
    errors = "Votre mot de passe trop court";
    isValid = false;
  }

  return {
    errors,
    isValid
  }
}

function checkRegistrationPassword2(password, password2) {
  let errors = '';
  let isValid = true;

  if (validator.isEmpty(password) || validator.isEmpty(password2)) {
    errors = "Veuillez complétez les 2 champs mot de passe";
    isValid = false;

  } else if (!validator.equals(password, password2)) {
    errors = "Vos mots de passe sont différents";
    isValid = false;
  }

  return {
    errors,
    isValid
  }
}

module.exports = 
{ checkRegistrationUsername, 
  checkRegistrationPassword,
  checkRegistrationPassword2
};
