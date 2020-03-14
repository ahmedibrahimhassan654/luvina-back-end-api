const express = require( 'express' )
const router = express.Router()


router.get( '/api/v1/companies', ( req, res ) =>
{
    res.status(200).json({sucess:true,msg:'show all companies'})
} )

router.post( '/api/v1/companies', ( req, res ) =>
{
    res.status(200).json({sucess:true,msg:'new company created'})
} )

router.get( '/api/v1/companies/:id', ( req, res ) =>
{
    res.status(200).json({sucess:true, msg:`caompany with ${req.params.id} `})
} )

router.put( '/api/v1/companies/:id', ( req, res ) =>
{
    res.status(200).json({sucess:true,msg:`caompany with ${req.params.id} updated`})
})

router.delete( '/api/v1/companies/:id', ( req, res ) =>
{
    res.status(200).json({sucess:true,msg:`caompany with ${req.params.id} deleted`})
})


module.exports