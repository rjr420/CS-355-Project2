const LifeguardController = new (require('../controllers/LifeguardController'))();
const LifeguardRouter = require('koa-router')({
    prefix: '/Lifeguard'
});

LifeguardRouter.get('/', LifeguardController.Lifeguards); // All Servers
LifeguardRouter.get('/:Lifeguard', LifeguardController.Lifeguard); // Single Server
LifeguardRouter.get('/', LifeguardController.viewLifeguard); // Route for View
LifeguardRouter.post('/', LifeguardController.addLifeguard, LifeguardController.Lifeguard); // Adds Server
LifeguardRouter.put('/:Lifeguard', LifeguardController.updateLifeguard, LifeguardController.Lifeguard);
LifeguardController.delete('/:serverSingle', LifeguardController.deleteLifeguard, LifeguardController.Lifeguard);

module.exports = LifeguardRouter;
