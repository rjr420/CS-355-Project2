const Swim_CenterController = new (require('../controllers/Swim_CenterController'))();
const Swim_CenterRouter = require('koa-router')({
    prefix: '/Swim_Center'
});

Swim_CenterRouter.get('/', Swim_CenterController.Swim_Centers); // All Servers
Swim_CenterRouter.get('/:Swim_Center', Swim_CenterController.Swim_Center); // Single Server
Swim_CenterRouter.get('/', Swim_CenterController.viewSwim_Center); // Route for View
Swim_CenterRouter.post('/', Swim_CenterController.addSwim_Center, Swim_CenterController.Swim_Center); // Adds Server
Swim_CenterRouter.put('/:Swim_Center', Swim_CenterController.updateSwim_Center, Swim_CenterController.Swim_Center);
Swim_CenterController.delete('/:serverSingle', Swim_CenterController.deleteSwim_Center, Swim_CenterController.Swim_Center);

module.exports = Swim_CenterRouter;
