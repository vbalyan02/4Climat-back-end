const validators = {
    validate_sign_up_req  : (request) => {
      if(request.student_id === undefined)                                {return false;}
      else {return true;}
    },

    validate_sign_in_req  : (request) => {
      if(request.student_id === undefined || request.token === undefined) {return false;}
      else {return true;}
    }
}

module.exports = validators;
  