const {
    CREATED,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR
  } = require('http-status-codes');
  
  const ErrorResponse = require('../../../common/utils/errorResponse');
  const asyncHandler = require('../../../common/middleware/async');
 
  const Business = require('../../business/business.schema');
 const Product=require('../product.schema')
  
  const { ROLE_BRANCH_MANAGER } = require('../../user/enum/roles');
  
  // @desc  Add product
  // @route POST /api/v0/businesses/:businessId/product
  // @route Public
  
  module.exports = asyncHandler(async (req, res, next) => {
    const { categoryId, reviews, image, gallery, name, price, description, currency, sale, stock } = req.body;
   

    const { businessId } = req.params;
  
    let productId = null;
    
    try {
      const newProduct = new Product({ name, categoryId, reviews,image,gallery,price,description,currency,sale,stock,businessId });
      productId = newProduct._id;
      newProduct.businessId=businessId
    
    
  
      await newProduct.save();
  
      const business = await Business.findOneAndUpdate(
        {
          _id: businessId,
          businessAdmin: req.user._id
        },
        {
          $addToSet: { products: productId }
        }
      );
      if (!business) {
        throw new ErrorResponse('Business Not found', BAD_REQUEST);
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
  