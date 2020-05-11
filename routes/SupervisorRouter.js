const SupervisorController = new (require('../controllers/SupervisorController'))();
const SupervistorRouter = require('koa-router')({
    prefix: '/Supervisor'
});

SupervisorRouter.get('/', SupervisorController.Supervisors); // All Servers
SupervisorRouter.get('/:Supervisor', SupervisorController.Supervisor); // Single Server
SupervisorRouter.get('/', SupervisorController.viewSupervisor); // Route for View
SupervisorRouter.post('/', SupervisorController.addSupervisor, SupervisorController.Supervisor); // Adds Server
SupervisorRouter.put('/:Supervisor', SupervisorController.updateSupervisor, SupervisorController.Supervisor);
SupervisorController.delete('/:serverSingle', SupervisorController.deleteSupervisor, SupervisorController.Supervisor);

module.exports = SupervisorRouter;
