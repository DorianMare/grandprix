let HomeControllerAdmin = require('../controllers/HomeControllerAdmin');
let PiloteControllerAdmin = require('../controllers/PiloteControllerAdmin');
let CircuitControllerAdmin = require('../controllers/CircuitControllerAdmin');

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

    //circuits
    app.get('/circuits', AuthentificationController.VerifierEstConnecter, CircuitControllerAdmin.ListeCircuitAdmin);
    app.get('/ajouterCircuit', AuthentificationController.VerifierEstConnecter, CircuitControllerAdmin.FormulaireAjoutCircuit);
    app.post('/ajouterCircuitPost', AuthentificationController.VerifierEstConnecter, CircuitControllerAdmin.AjouterCircuitPost);

    //ecuries
    //app.get('/ecuries', AuthentificationController.VerifierEstConnecter, )

    // Les pages inconnues
    app.get('*', AuthentificationController.VerifierEstConnecter, HomeControllerAdmin.NotFound);
    app.post('*', AuthentificationController.VerifierEstConnecter, HomeControllerAdmin.NotFound);

}
