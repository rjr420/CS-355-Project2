const VisitorsController = new (require('../controllers/Visitor'))();
const VisitorsRouter = require('koa-router')({
    prefix: '/Visitor'
});

VisitorsRouter.get('/', VisitorsController.Visitors); // All Servers
VisitorsRouter.get('/:Visitor', VisitorsController.Visitor); // Single Server
VisitorsRouter.get('/', VisitorsController.viewVisitor); // Route for View
VisitorsRouter.post('/', VisitorsController.addVisitor, VisitorsController.Visitor); // Adds Server
VisitorsRouter.put('/:Visitor', VisitorsController.updateVisitor, VisitorsController.Visitor);
VisitorsController.delete('/:serverSingle', VisitorsController.deleteVisitor, VisitorsController.Visitor);

module.exports = VisitorsRouter;
