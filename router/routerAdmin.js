let HomeControllerAdmin = require('../controllers/HomeControllerAdmin');
let PiloteControllerAdmin = require('../controllers/PiloteControllerAdmin');
let CircuitControllerAdmin = require('../controllers/CircuitControllerAdmin');
let EcurieControllerAdmin = require('../controllers/EcurieControllerAdmin');
let ResultatControllerAdmin = require('../controllers/ResultatControllerAdmin');


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
    app.get('/supprimerPilote/:pilnum', AuthentificationController.VerifierEstConnecter, PiloteControllerAdmin.SupprimerPilote);
    app.post('/ajouterPilotePost', AuthentificationController.VerifierEstConnecter, PiloteControllerAdmin.AjouterPilotePost);


    //circuits
    app.get('/circuits', AuthentificationController.VerifierEstConnecter, CircuitControllerAdmin.ListeCircuitAdmin);
    app.get('/ajouterCircuit', AuthentificationController.VerifierEstConnecter, CircuitControllerAdmin.FormulaireAjoutCircuit);
    app.post('/ajouterCircuitPost', AuthentificationController.VerifierEstConnecter, CircuitControllerAdmin.AjouterCircuitPost);

    //ecuries
    app.get('/ecuries', AuthentificationController.VerifierEstConnecter, EcurieControllerAdmin.ListeEcuriesAdmin);
    app.get('/ajouterEcurie', AuthentificationController.VerifierEstConnecter, EcurieControllerAdmin.FormulaireAjoutEcurie);
    app.get('/supprimerEcurie/:ecunum', AuthentificationController.VerifierEstConnecter, EcurieControllerAdmin.SupprimerEcurie);
    app.post('/ajouterEcuriePost', AuthentificationController.VerifierEstConnecter, EcurieControllerAdmin.AjouterEcuriePost);

    //resultats
    app.get('/resultats', AuthentificationController.VerifierEstConnecter, ResultatControllerAdmin.SelectionGrandPrix);
    app.get('/saisieResultats/:gpnum', ResultatControllerAdmin.SaisieResultats);
    app.get('/supprimerLigneResultat/:gpnum/:pilnum', AuthentificationController.VerifierEstConnecter, ResultatControllerAdmin.SupprimerLigneResultat);
    app.post('/ajouterLigneResultat', AuthentificationController.VerifierEstConnecter, ResultatControllerAdmin.AjouterLigneResultat);



    // Les pages inconnues
    app.get('*', AuthentificationController.VerifierEstConnecter, HomeControllerAdmin.NotFound);
    app.post('*', AuthentificationController.VerifierEstConnecter, HomeControllerAdmin.NotFound);

}
