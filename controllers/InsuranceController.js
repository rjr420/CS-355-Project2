const chpConnection = require('../database/CHPConnection');

// Controller that interacts with insurance of Lifeguards and Visitors database to retrieve data.
class InsuranceController {
    constructor() {
        console.log('Insurance Controller Initialized!');
    }
    
    // Fetches all Insurances
    async Insurances(ctx) {
        console.log('Fetching all Insurances');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Insurance`';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying [Insurance]: ${err}`);
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

    // Fetches a single Insurance
    async Insurance(ctx) {
        console.log('Controller HIT: ServerController::SingleServer');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Insurance WHERE id = ?;';
            const dc = ctx.params.Insurance;
            
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

    // Add a new Insurance
    async addInsurance(ctx, next) {
        console.log('Adding Insurance');
       return new Promise((resolve, reject) => {
           const newServer = ctx.request.body;
           chpConnection.query({
               sql: 'ADD Insurance SET name, dateOfBirth, WHERE id = ?'
               values: [addInsurance.name, addInsurance.dateOfBirth, ctx.params.addInsurance]
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

    // Update an Insurance
    async updateInsurance(ctx, next) {
        console.log('Updating Insurance');
        return new Promise((resolve, reject) => {
            const Server = ctx.request.body;
            chpConnection.query({
                sql: `UPDATE Insurance SET name = ?, dateOfBirth, WHERE id = ?`, 
                values: [updateInsurance.name, updateInsurance.dateOfBirth, ctx.params.updateInsurance]
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

    async deleteInsurance(ctx, next) {
        console.log('Deleting Insurance');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Insurance WHERE id = ?;`,
                values: [ctx.params.deleteInsurance]
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

module.exports = InsuranceController;

