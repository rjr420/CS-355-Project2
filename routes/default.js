const Swim_CenterRouter = require('./Swim_Center');
const LifeguardRouter = require('./Lifeguard');
const SupervisorRouter = require('./Supervisor');
const InsuranceRouter = require('./Insurance');
const VisitorsRouter = require('./Visitor');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    Swim_CenterRouter.routes(),
    LifeguardRouter.routes(),
    SupervisorRouter.routes(),
    InsuranceRouter.routes(),
    VisitorsRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};
