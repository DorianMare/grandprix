let HomeControllerAdmin = require('../controllers/HomeControllerAdmin');
let AuthentificationController = require('../controllers/AuthentificationController');

// Routes
module.exports = function (app){
    // Accueil
    app.get('/', HomeControllerAdmin.Index)
    app.get('/accueil', AuthentificationController.VerifierEstConnecter, HomeControllerAdmin.Accueil);
    app.post('/accueil', HomeControllerAdmin.Connexion);

    // Les pages inconnues
    app.get('*', HomeControllerAdmin.NotFound);
    app.post('*', HomeControllerAdmin.NotFound);
}