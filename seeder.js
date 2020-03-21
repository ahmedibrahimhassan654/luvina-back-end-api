const fs=require('fs')
const mongoose = require( 'mongoose' )
const colors = require( 'colors' )
const dotenv = require( 'dotenv' )
 
//load env vars
dotenv.config( {
    path:'./config/config.env'
})

//load models
const Company = require( './models/company' )
const Branch = require( './models/branch' )

//connect to db
mongoose.connect( process.env.MONGO_URI, {
        
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex:true

} )

//Read JSON Files
const companies=JSON.parse(fs.readFileSync(`${__dirname}/_data/companies.json`,'utf-8'))

const branches=JSON.parse(fs.readFileSync(`${__dirname}/_data/branches.json`,'utf-8'))


 //import intoDB
const importData = async () =>
{
  try {
      await Company.create( companies )
      await Branch.create( branches )
      console.log( 'Data Imported'.green.inverse );
      process.exit()
  } catch (err) {
      console.error(err)
  }   
} 
 
//Delete the data 

const deletetData = async () =>
{
  try {
      await Company.deleteMany()
      await Branch.deleteMany()

      console.log( 'Data destroyed'.red.inverse );
      process.exit()
  } catch (err) {
      console.error(err)
  }   
} 
 

if ( process.argv[2] === '-i' )
{
  importData()  
} else if ( process.argv[2] === '-d' )
{
    deletetData()
}