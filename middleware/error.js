const ErrorResponse = require( '../utils/errorRespnse' )

const errorHandler = ( err, req, res, next ) =>
{
    let error={...err}
    error.message = error.message
    
   //og to console for dev
    console.log( err );

    //Mongose bad object id 

    if ( err.name === 'CastError' )
    {
        const message = `company not found with that ${ err.value }`
        error=new ErrorResponse(message,404)
    }

    //mongose duplicate key
    if ( err.code === 11000 )
    {
        const message = 'dupicate field value entered';
        error=new ErrorResponse(message,400)
    }
    if ( err.name === 'validationError' )
    {
        const message = Object.values(err.errors).map(val=>val.message);
        error=new ErrorResponse(message,400)
    }


    res.status( error.statusCode||500 ).json( {
        success: false,
        error:error.message||'server Error'
    })
    
}

module.exports=errorHandler