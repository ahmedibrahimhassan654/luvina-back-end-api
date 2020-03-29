const grtBranches = require('./getAllBrabnches.js');
const getBranch = require('./getSingleBranch');
const addBranch = require( './addBranch' )
const updateBranch=require('./updateBranch')
module.exports = {
    grtBranches,
    getBranch, 
    addBranch,
    updateBranch
};
