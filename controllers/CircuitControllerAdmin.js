let model = require('../models/circuit');
let modelPays = require('../models/pays');

module.exports.ListeCircuitAdmin = function (request, response) {
    response.title = "Gestion des circuits";
    model.getListeCircuit(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeCircuits = result;
        response.render('adminListeCircuits', response);
    })
}

module.exports.FormulaireAjoutCircuit = function (request, response) {
    modelPays.getListePays(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.circuit = result;
        response.render('ajouterCircuit', response);
    })
}

module.exports.AjouterCircuitPost = function (request, response) {
    //faire l'ajout du circuit dans la db quand l'ajout des image  sera terminé
    response.render('ajouterCircuitPost', response);
}
