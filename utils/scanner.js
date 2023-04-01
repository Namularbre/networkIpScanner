const net = require('net');

module.exports = class Scanner {
    static #network = process.env.NETWORK;

    static async setNetwork(netWork) {
        Scanner.#network = netWork;
    }

    static async checkNetWorkStatus() {
        const startAddress = 1;
        const endAddress = 255;

        let networkStatus = [];
        
        for (let i = startAddress; i <= endAddress; i++) {
            const ipAddress = Scanner.#network + i;
            Scanner.checkIpStatus(ipAddress)
                .then(status => {
                    networkStatus.push(status);
                })
                .catch(error => {
                    networkStatus.push(error);
            });
        }

        return networkStatus;
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
}
