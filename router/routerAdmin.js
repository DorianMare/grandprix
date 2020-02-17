let HomeControllerAdmin = require('./../controllers/HomeControllerAdmin');

    // Routes
    module.exports = function (app){
        //Accueil
        app.get('/', HomeControllerAdmin.Index)
        app.get('/accueil', HomeControllerAdmin.Accueil);

        // tout le reste
        app.get('*', HomeControllerAdmin.NotFound);
        app.post('*', HomeControllerAdmin.NotFound);
    }