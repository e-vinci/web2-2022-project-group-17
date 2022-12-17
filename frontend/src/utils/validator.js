const validator = require('validator');

function checkRegistrationFields(data) {
  const errors = {};
  let isValid = true;

  if (validator.isEmpty(data.username)) {
    errors.username = "Un nom d'utilisateur est requis";
    
    isValid = false;
  } else if (!validator.isAlphanumeric(data.username)) {
    errors.username = "Un nom d'utilisateur ne peut contenir que des lettres et chiffres";
    isValid = false;

  } else if (!validator.isLength(data.username, { min: 3, max: 12})) {
    errors.username = "Un nom d'utilisateur doit être d'une longueur comprise entre 3 et 12 charactères";
    isValid = false;
  }


  if (validator.isEmpty(data.password)) {
    errors.password = "Un mot de passe est requis";
    isValid = false;

  } else if (!validator.isLength(data.password, { min: 4, max: 120 })) {
    errors.password = "Un mot de passe doit être d'une longueur supérieure à 4";
    isValid = false;
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Le mot de passe de confirmation est requis";
    isValid = false;
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Les 2 champs mot de passe doivent correspondre";
    isValid = false;
  }

  return {
    errors,
    isValid
  };
}

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
{ checkRegistrationFields, 
  checkRegistrationUsername, 
  checkRegistrationPassword,
  checkRegistrationPassword2
};
