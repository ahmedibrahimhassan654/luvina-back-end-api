const {
    CREATED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR
  } = require('http-status-codes');
  
  const ErrorResponse = require('../../../common/utils/errorResponse');
  const asyncHandler = require('../../../common/middleware/async');
 
const Business = require( '../../business/business.schema' );
const Branch = require('../../branch/branch.schema');
 const Product=require('../product.schema')
 
  const { ROLE_BRANCH_MANAGER } = require('../../user/enum/roles');
  
  // @desc  Add product
  // @route POST /api/v0/branches/:branchId/product
  // @route Public
  
  module.exports = asyncHandler(async (req, res, next) => {
    const { categoryId,image, gallery, name, price, description, currency, sale, stock } = req.body;
   

    const { branchId } = req.params;
  
    let productId = null;
    
    try {
      const newProduct = new Product({ branchId,name, categoryId,image,gallery,price,description,currency,sale,stock});
      productId = newProduct._id;
      newProduct.branchId=branchId
    
    
  
      await newProduct.save();
  
      const branch = await Branch.findOneAndUpdate(
        {
          _id: branchId,
          businessAdmin: req.user._id
        },
        {
          $addToSet: { products: productId }
        }
      );
      if (!branch) {
        throw new ErrorResponse('branch Not found', BAD_REQUEST);
      }
  
      return res.status(CREATED).json({
        status: true,
        message: 'product Created successfully',
        data: null
      });
    } catch (err) {
      await Product.findByIdAndDelete(productId);
 
      return next(
        new ErrorResponse(
          err.message,
          err.status || INTERNAL_SERVER_ERROR,
          err.stack
        )
      );
    }
  });
  