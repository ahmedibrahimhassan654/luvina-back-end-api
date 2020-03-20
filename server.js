const express = require( 'express' )
const dotenv = require( "dotenv" )
const morgan = require( 'morgan' )
const errorHandler=require('./middleware/error')
const colors = require( 'colors' )


const connectDB=require('./config/db')




//load env vars
dotenv.config( { path: './config/config.env' } ) 



//connect to database
connectDB()




//route files
const companies=require('./routes/companies')




const app = express()



app.use( express.json() );



//dev logging middleware
if ( process.env.NODE_ENV === 'development' )
{
    app.use(morgan('dev'))
}



//mount routers
app.use( '/api/v1/companies', companies )

app.use(errorHandler);




const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT,
    console.log( `server running in ${ process.env.NODE_ENV } mode on port ${ PORT }`.yellow.bold ) );

//Handel unhandeled promise rejections

process.on( 'unhandeledRejection', ( err, promise ) =>
{
    console.log( `Error:${ err.message }`.red );
    //close server & exite process
    server.close(()=>process.exit(1)) 
    })