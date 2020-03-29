const grtBranches = require('./getAllBrabnches.js');
const getBranch = require('./getSingleBranch');
const addBranch = require( './addBranch' )
const updateBranch = require( './updateBranch' )
const deleteBranch=require('./deleteBranch')
module.exports = {
    grtBranches,
    getBranch, 
    addBranch,
    updateBranch,
    deleteBranch
};
