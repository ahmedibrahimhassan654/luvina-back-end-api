const express = require( 'express' )
const router = express.Router()


router.get( '/', ( req, res ) =>
{
    res.status(200).json({sucess:true,msg:'show all companies'})
} )

router.post( '/', ( req, res ) =>
{
    res.status(200).json({sucess:true,msg:'new company created'})
} )

router.get( '/:id', ( req, res ) =>
{
    res.status(200).json({sucess:true, msg:`caompany with ${req.params.id} `})
} )

router.put( '/:id', ( req, res ) =>
{
    res.status(200).json({sucess:true,msg:`caompany with ${req.params.id} updated`})
})

router.delete( '/:id', ( req, res ) =>
{
    res.status(200).json({sucess:true,msg:`caompany with ${req.params.id} deleted`})
})


module.exports=router