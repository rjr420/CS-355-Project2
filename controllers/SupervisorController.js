const chpConnection = require('../database/CHPConnection');

// Controller that interacts with Supervisor database to retrieve data.
class SupervisorController {
    constructor() {
        console.log('Supervisor Controller Initialized!');
    }
    
    // Fetches all Supervisors
    async Supervisors(ctx) {
        console.log('Fetching all Supervisors');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Supervisor`';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying [Supervisor]: ${err}`);
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

    // Fetches a single Supervisor
    async Supervisor(ctx) {
        console.log('Fetching Supervisor');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Supervisor` WHERE name = ?;';
            const dc = ctx.params.Server;
            
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
    async addSupervisor(ctx, next) {
        console.log('adding Supervisor');
       return new Promise((resolve, reject) => {
           const newServer = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO L6_Server(id,hostName,DataCenter,installedOn,powerOnAt) VALUES (?, ?, ?, ?, ?);',
               values: [newServer.id, newServer.hostName, newServer.L6_DataCenter, newServer.installedOn, newServer.powerOnAt]
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

    // Update a Supervisor
    async updateSupervisor(ctx, next) {
        console.log('Controller HIT: ServerController::updateServer');
        return new Promise((resolve, reject) => {
            const Server = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE L6_Server 
                    SET 
                        hostname = ?,
                        L6_Datacenter = ?
                        installedOn = ?
                        powerOnAt = ?
                    WHERE id = ?
                    `,
                values: [Server.hostName, Server.L6_DataCenter, Server.installedOn, Server.powerOnAt, ctx.params.Server]
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

    async deleteSupervisor(ctx, next) {
        console.log('Controller HIT: DataCenterServer::deleteServer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Supervisor WHERE name = ?;`,
                values: [ctx.params.Server]
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

module.exports = SupervisorController;

