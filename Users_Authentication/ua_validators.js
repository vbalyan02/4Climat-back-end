const validators = {
    validate_sign_in_req  : (request) => {
      if(request._id === undefined) { return false; }
      else                          { return true;  }
    }
}

module.exports = validators;
  