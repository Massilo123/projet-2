import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = express.Router();

router.post('/api/enregistrer-jeu', (req: express.Request, res: express.Response) => {
    const qcmData = req.body;
    const filePath = path.join(__dirname, '../assets/jeux.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la lecture du fichier' });
        }

        const jeux: any[] = JSON.parse(data);
        jeux.push(qcmData);

        fs.writeFile(filePath, JSON.stringify(jeux, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: 'Erreur lors de l'écriture dans le fichier' });
            }
            res.status(200).json({ message: 'QCM enregistré avec succès' });
        });
    });
});

export default router;
