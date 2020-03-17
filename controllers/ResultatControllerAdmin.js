let model = require('../models/grandprix');
var async = require('async');


module.exports.SelectionGrandPrix = function(request, response){
  response.title = "Resultats";

    model.getListeGrandPrix(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.selectionGrandPrix = result;
        response.render('selectionnerResultat', response);
    })
}


module.exports.SaisieResultats = function(request, response){
  let data = request.params.gpnum;

    model.getDetailsGrandprix(data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.detailGrandPrix = result;
        response.render('saisieResultats', response);
    })
}

module.exports.SupprimerLigneResultat = function(request, response){
  let data = request.params.gpnum;
  let data1 = request.params.pilnum;

    model.supprimerLigneResultat(data, data1, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.supprimerLigneResultat = result;
        response.render('supprimerLigneResultat', response);
    })
}
