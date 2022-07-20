function validatorhandler(schema, property){
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data);
        if(error){
            next(error) 
        }
        next()
    }
}

module.exports = validatorhandler;