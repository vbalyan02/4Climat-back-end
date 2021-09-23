const validators = {
    validate_upload_req : (request) => {
        if (request._pid    === undefined ||
            request._images === undefined)              { return false; }
        else { return true; }
    },

    validate_delete_req : (request) => {
        if (request._pid    === undefined ||
            request._images === undefined)               { return false; }
        else { return true; }
    },

    validate_get_req    : (request) => {
        if (request._pid    === undefined   ||
            request._images === undefined   ||
            (request._type  !== 'standard' &&
            request._type   !== 'small'))                 { return false; }
        else { return true; }
    }
}

module.exports = validators;