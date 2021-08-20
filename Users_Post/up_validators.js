const validators = {

    validate_create_req     : (request) => {
        if (request._uid     === undefined ||
            request._post    === undefined ||
            request._status  === undefined)                              { return false; }
        else { return true; }
    },

    validate_list_req       : (request) => {
        if (request.uid === undefined)                                   { return false; }
        else { return true; }
    }
}
module.exports = validators;