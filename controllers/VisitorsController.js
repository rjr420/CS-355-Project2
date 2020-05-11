const chpConnection = require('../database/CHPConnection');

// Controller that interacts with Visitors database to retrieve data.
class VisitorsController {
    constructor() {
        console.log('Visitors Controller Initialized!');
    }
    
    // Fetches all Visitors
    async Visitors(ctx) {
        console.log('Fetching all Visitors');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Visitors`';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying [Visitors]: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;
                
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    // Fetches a single Visitor
    async Visitor(ctx) {
        console.log('Visitors');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Visitors WHERE id = ?;';
            const dc = ctx.params.Visitor;
            
            chpConnection.query({
                sql: query,
                values: [dc]
            }, (err, res) => {
                if(err) {
                    reject(err);
                } 

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Add a new Server
    async addVisitor(ctx, next) {
        console.log('Adding Visitor');
       return new Promise((resolve, reject) => {
           const newServer = ctx.request.body;
           chpConnection.query({
               sql: 'ADD Visitors SET FName = ?, LName = ?, address = ?, residential = ?, nonResidential = ?, WHERE id = ?',
               values: [addVisitor.FName, addVisitor.LName, addVisitor.address, addVisitor.residential, addVisitor.nonResidential, ctx.params.addVisitor]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve();
           });
           
       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update a Visitor
    async updateVisitor(ctx, next) {
        console.log('Updating Visitor');
        return new Promise((resolve, reject) => {
            const Server = ctx.request.body;
            chpConnection.query({
               sql: 'UPDATE Visitors SET FName = ?, LName = ?, address = ?, residential = ?, nonResidential = ?, WHERE id = ?',
               values: [updateVisitor.FName, updateVisitor.LName, updateVisitor.address, updateVisitor.residential, updateVisitor.nonResidential, ctx.params.updateVisitor]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    async deleteVisitor(ctx, next) {
        console.log('Deleting Visitor');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Visitors WHERE id = ?;`,
                values: [ctx.params.Visitors]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = VisitorsController;

