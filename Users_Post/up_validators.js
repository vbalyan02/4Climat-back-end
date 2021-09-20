const validators = {

    validate_create_req     : (request) => {
        if (request._uid     === undefined ||
            request._post    === undefined ||
            request._status  === undefined)                            { return false; }
        else { return true; }
    },

    validate_list_req       : (request) => {
        if (request._uid === undefined)                                 { return false; }
        else { return true; }
    },

    validate_update_req     : (request) => {
        if (request._uid    === undefined || 
            request._pid    === undefined ||
            request._post   === undefined ||
            request._status === undefined)                              { return false; }
        else { return true; }
    },

    validate_getpost_req    : (request) => {
        if (request._pid    === undefined)                              { return false; }
        else { return true; }
    },

    validate_remove_req     : (request) => {
        if (request._uid    === undefined ||
            request._pid    === undefined)                              { return false; }
        else { return true; }
    }   
}

module.exports = validators;