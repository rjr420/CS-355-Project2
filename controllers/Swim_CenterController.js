const chpConnection = require('../database/CHPConnection');

// Controller that interacts with Swim Center's database to retrieve data.
class Swim_CenterController {
    constructor() {
        console.log('Swim Center Controller Initialized!');
    }
    
    // Fetches all Servers
    async Swim_Centers(ctx) {
        console.log('Controller HIT: Swim_CenterController::ManyServers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Swim_Center`';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying [Swim_Center]: ${err}`);
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

    // Fetches a single Server
    async Swim_Center(ctx) {
        console.log('Fetching Swim Center');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Swim_Center` WHERE location = ?;';
            const dc = ctx.params.Swim_Center;
            
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

    // Add a new Swim_Center
    async addSwim_Center(ctx, next) {
        console.log('Adding Swim Center');
       return new Promise((resolve, reject) => {
           const newSwim_Center = ctx.request.body;
           chpConnection.query({
               sql: `ADD Swim_Center SET name = ?, manager = ?, number = ?, location = ?, date = ?, time = ?, WHERE id = ?`,
               values: [addSwim_Center.name, addSwim_Center.manager, addSwim_Center.number, addSwim_Center.location, addSwim_Center.date, addSwim_Center.date, addSwim_Center.time, ctx.params.addSwim_Center]

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

    // Update a Server
    async updateSwim_Center(ctx, next) {
        console.log('Updating Swim Center');
        return new Promise((resolve, reject) => {
            const Server = ctx.request.body;
            chpConnection.query({
                sql: `UPDATE Swim_Center SET name = ?, manager = ?, number = ?, location = ?, date = ?, time = ?, WHERE id = ?`,
                values: [updateSwim_Center.name, updateSwim_Center.manager, updateSwim_Center.number, updateSwim_Center.location, updateSwim_Center.date, updateSwim_Center.date, updateSwimCenter.time, ctx.params.updateSwim_Center]
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

    async deleteSwim_Center(ctx, next) {
        console.log('Controller HIT: DataCenterServer::deleteServer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM 'Swim_Center' WHERE id = ?;`,
                values: [ctx.params.deleteSwim_Center]
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

module.exports = Swim_CenterController;

