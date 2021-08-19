const validators = {

    validate_create_req     : (request) => {
        if (request._uid     === undefined ||
            request._post    === undefined ||
            request._status  === undefined)                              { return false; }
        else { return true; }
    },

    validate_get_one_set : (request) => {
        if (request._uid === undefined)                                 { return false; }
        else { return true; }
    },

    validate_update_req  : (request) => {
        if (request._uid      === undefined ||
            request._name     === undefined ||
            request._elements === undefined)                            { return false; }
        else { return true; }
    },

    validate_assign_req      : (request) => {
        if (request._uid === undefined || request._elem === undefined)  { return false; }
        else { return true; }
    }
}
module.exports = validators;