const InsuranceController = new (require('../controllers/InsuranceController'))();
const InsuranceRouter = require('koa-router')({
    prefix: '/Insurance'
});

InsuranceRouter.get('/', InsuranceController.Insurances); // All Servers
InsuranceRouter.get('/:Insurance', InsuranceController.Insurance); // Single Server
InsuranceRouter.get('/', InsuranceController.viewInsurance); // Route for View
InsuranceRouter.post('/', InsuranceController.addInsurance, InsuranceController.Insurance); // Adds Server
InsuranceRouter.put('/:Insurance', InsuranceController.updateInsurance, InsuranceController.Insurance);
InsuranceController.delete('/:serverSingle', InsuranceController.deleteInsurance, InsuranceController.Insurance);

module.exports = InsuranceRouter;
