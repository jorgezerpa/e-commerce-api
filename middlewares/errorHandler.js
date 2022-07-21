function logErrors(err, req, res, next){
    if(err.isBoom){
        console.log(err);
    }
    if(!err.isBoom){
        console.log({
            stack: err.stack,
            error: err
        });
    }
    next(err);
}

function boomError(err, req, res, next){
    if(err.isBoom){
        res.status(err.output.statusCode).json(err.output.payload);
        return;
    }
    next(err)
}

function errorHandler(err, req, res, next){
    res.status(500).json({
        message: 'error 500'
        }
    )
}



module.exports = { logErrors, errorHandler, boomError }