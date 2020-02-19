let HomeControllerAdmin = require('../controllers/HomeControllerAdmin');
let PiloteControllerAdmin = require('../controllers/PiloteControllerAdmin');

let AuthentificationController = require('../controllers/AuthentificationController');

// Routes
module.exports = function (app){
    // Accueil
    app.get('/', HomeControllerAdmin.Index)
    app.get('/accueil', AuthentificationController.VerifierEstConnecter, HomeControllerAdmin.Accueil);
    app.post('/accueil', HomeControllerAdmin.Connexion);

    // pilotes
    app.get('/adminListePilotes', AuthentificationController.VerifierEstConnecter, PiloteControllerAdmin.ListeAllPilotes);
    app.get('/ajouterPilote', AuthentificationController.VerifierEstConnecter, PiloteControllerAdmin.FormulaireAjoutPilote);
    app.post('/ajouterPilotePost', AuthentificationController.VerifierEstConnecter, PiloteControllerAdmin.AjouterPilotePost);

    // Les pages inconnues
    app.get('*', HomeControllerAdmin.NotFound);
    app.post('*', HomeControllerAdmin.NotFound);

}
