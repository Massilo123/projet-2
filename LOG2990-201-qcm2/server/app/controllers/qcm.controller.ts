import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class QcmController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.post('/api/enregistrer-jeu', this.enregistrerJeu.bind(this));
    }

    private enregistrerJeu(req: express.Request, res: express.Response): void {
        const qcmData = req.body;
        const filePath = path.join(__dirname, '../assets/jeux.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Erreur lors de la lecture du fichier' });
                return;
            }

            const jeux: any[] = JSON.parse(data);
            jeux.push(qcmData);

            fs.writeFile(filePath, JSON.stringify(jeux, null, 2), (writeErr) => {
                if (writeErr) {
                    res.status(500).json({ message: "Erreur lors de l'écriture dans le fichier" });
                    return;
                }
                res.status(200).json({ message: 'QCM enregistré avec succès' });
            });
        });
    }
}
