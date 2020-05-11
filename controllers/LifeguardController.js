const chpConnection = require('../database/CHPConnection');

// Controller that interacts with Lifeguard's database to retrieve data.
class LifeguardController {
    constructor() {
        console.log('Lifeguard Controller Initialized!');
    }
    
    // Fetches all Lifeguard
    async Lifeguards(ctx) {
        console.log('Controller HIT: LifeguardController::ManyServers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Lifeguard`';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying (Lifeguard): ${err}`);
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

    // Fetches a single Lifeguard
    async Lifeguard(ctx) {
        console.log('Fetching Lifeguard');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Lifeguard WHERE name = ?;';
            const dc = ctx.params.Lifeguard;
            
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

    // Add a new Lifeguard
    async addLifeguard(ctx, next) {
        console.log('Adding Lifeguard');
       return new Promise((resolve, reject) => {
           const newServer = ctx.request.body;
           chpConnection.query({
               sql: 'ADD Lifeguard SET FName = ?, MName = ?, LName = ?, address = ?, phoneNum = ?, socialSec = ?, WHERE id = ?',
               values: [addLifeguard.FName, addLifeguard.MName, addLifeguard.LName, addLifeguard.address, addLifeguard.phoneNum, addLifeguard.socialSec, ctx.params.addLifeguard]
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

    // Update a Lifeguard's ID
    async updateLifeguard(ctx, next) {
        console.log('Controller HIT: ServerController::updateServer');
        return new Promise((resolve, reject) => {
            const Server = ctx.request.body;
            chpConnection.query({
                sql: 'UPDATE Lifeguard SET FName = ?, MName = ?, LName = ?, address = ?, phoneNum = ?, socialSec = ?, WHERE id = ?',
		values: [updateLifeguard.FName, updateLifeguard.MName, updateLifeguard.LName, updateLifeguard.address, updateLifeguard.phoneNum, updateLifeguard.socialSec, ctx.params.updateLifeguard]
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

    async deleteLifeguard(ctx, next) {
        console.log('Deleting Lifeguard');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Lifeguard WHERE id = ?;`,
                values: [ctx.params.deleteLifeguard]
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

module.exports = LifeguardController;

