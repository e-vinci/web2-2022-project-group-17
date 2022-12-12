const validator = require('validator');

function checkRegistrationFields(data) {
  const errors = {};
  let isValid = true;

  if (validator.isEmpty(data.username)) {
    errors.username = "Un nom d'utilisateur est requis";
    isValid = false;
  }
  if (!validator.isAlphanumeric(data.username)) {
    errors.username = "Un nom d'utilisateur ne peut contenir que des lettres et chiffres";
    isValid = false;
  }
  if (validator.isLength(data.username, { min: 3, max: 12})) {
    errors.username = "Un nom d'utilisateur doit être d'une longueur comprise entre 3 et 12 charactères";
    isValid = false;
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Un mot de passe est requis";
    isValid = false;
  }
  if (!validator.isLength(data.password, { min: 4, max: 120 })) {
    errors.password = "Un mot de passe doit être d'une longueur supérieure à 4";
    isValid = false;
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Le mot de passe de confirmation est requis";
    isValid = false;
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Les 2 champs mot de passe doivent correspondre";
    isValid = false;
  }

  return {
    errors,
    isValid
  };
}

module.exports = { checkRegistrationFields };

