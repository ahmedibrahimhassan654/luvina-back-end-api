const {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');

const Business = require('../../business/business.schema');
const Branch = require('../../branch/branch.schema');
const Product = require('../product.schema');

// @desc  Add product
// @route POST /api/v0/branches/:branchId/product
// @route Private

module.exports = asyncHandler(async (req, res, next) => {
  let {
    categoryId,
    image,
    gallery,
    name,
    price,
    description,
    currency,
    sale,
    stock,
    businessId
  } = req.body;

  const { branchId } = req.params;
   businessId  = req.body.businessId;
  let productId = null;

  try {
    const newProduct = new Product({
     
      name,
      categoryId,
      image,
      gallery,
      price,
      description,
      currency,
      sale,
      stock,
      businessId
    });
    productId = newProduct._id;
    newProduct.branchId = branchId;

    await newProduct.save();

    // const branch = await Branch.findOneAndUpdate(
    //   {
    //     // _id: branchId,
    //     _id:req.params.branchId,
    //     businessAdmin: req.user._id
    //   },
    //   {
    //     $addToSet: { products: productId }
    //   }
    // );
    const branch = await Branch.findByIdAndUpdate(
      req.params.branchId,
      req.user._id,
      { Product: productId }
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
