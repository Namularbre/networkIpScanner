const net = require('net');

const NetworkStatusModel = require("../models/networkStatusModel");

module.exports = class NetworkStatusController {
    static #network = process.env.NETWORK;

    static async setNetwork(netWork) {
        NetworkStatusController.#network = netWork;
    }

    static async checkNetWorkStatus() {
        const startAddress = 1;
        const endAddress = 255;
        
        for (let i = startAddress; i <= endAddress; i++) {
            const ipAddress = NetworkStatusController.#network + i;
            NetworkStatusController.checkIpStatus(ipAddress)
                .then(status => {
                    NetworkStatusModel.saveStatus({ip: ipAddress, response: status});
                })
                .catch(error => {
                    NetworkStatusModel.saveStatus({ip: ipAddress, response: error});
            });
        }
    }

    static async checkIpStatus(ipAddress) {
        return await new Promise((resolve, reject) => {
            const timeout = 5000; // Timeout 5 secs
            const client = new net.Socket();
            client.setTimeout(timeout);
            client.connect(80, ipAddress);
            client.on('connect', () => {
            client.destroy();
            resolve('Adresse IP accessible');
            });
            client.on('timeout', () => {
            client.destroy();
            reject('Timeout de connexion atteint');
            });
            client.on('error', (error) => {
            client.destroy();
            reject('Erreur de connexion : ' + error.message);
            });
        });
    }

    static async getAllStatusFromLastWeek() {
        return NetworkStatusModel.fetchAllFromLastWeek();
    }
}
