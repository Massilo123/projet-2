import { Application } from '@app/app';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import { AddressInfo } from 'net';
import * as path from 'path';
import { Service } from 'typedi';

@Service()
export class Server {
    private static readonly appPort: string | number | boolean = Server.normalizePort(process.env.PORT || '3000');
    private static readonly baseDix: number = 10;
    private server: http.Server;

    constructor(private readonly application: Application) {
        this.application.app.use(bodyParser.json());
    }

    private static normalizePort(val: number | string): number | string | boolean {
        const port: number = typeof val === 'string' ? parseInt(val, this.baseDix) : val;
        return isNaN(port) ? val : port >= 0 ? port : false;
    }

    private initRoutes(): void {
        this.application.app.post('/api/enregistrer-jeu', (req, res) => {
            const jeu = req.body;
            const filePath = path.join(__dirname, '..', 'assets', 'jeux.json');
            let jeuxExistant = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            jeuxExistant.push(jeu);
            fs.writeFileSync(filePath, JSON.stringify(jeuxExistant));
            res.json({ message: 'Jeu enregistré avec succès' });
        });
    }

    init(): void {
    
        this.initRoutes();
    
        this.application.app.set('port', Server.appPort);
    
        this.server = http.createServer(this.application.app);
    
        // Configuration pour servir des fichiers statiques depuis le dossier "assets"
        this.application.app.use('/assets', express.static('assets'));
    
        this.server.listen(Server.appPort);
    
        this.server.on('error', (error: NodeJS.ErrnoException) => this.onError(error));
    
        this.server.on('listening', () => this.onListening());
    }
    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind: string = typeof Server.appPort === 'string' ? 'Pipe ' + Server.appPort : 'Port ' + Server.appPort;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Se produit lorsque le serveur se met à écouter sur le port.
     */
    private onListening(): void {
        const addr = this.server.address() as AddressInfo;
        const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        // eslint-disable-next-line no-console
        console.log(`Listening on ${bind}`);
    }
}
