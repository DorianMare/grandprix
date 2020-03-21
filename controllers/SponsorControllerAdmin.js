let model = require('../models/sponsor');
let modelEcurie = require('../models/ecurie');

var async = require('async');


module.exports.ListeSponsor = function(request, response){
  response.title = "Gestion des Sponsors";

    model.getListeSponsor(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeSponsor = result;
        response.render('adminListeSponsors', response);
    })
}

module.exports.FormulaireAjoutSponsor = function(request, response){
  response.title = "Ajouter des Sponsors";

    modelEcurie.getAllEcuries(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        response.render('ajouterSponsor', response);
    })
}

module.exports.AjouterSponsor = function(request, response){
  let data = request.body.SPONOM;
  let data1 = request.body.SPOSECTACTIVITE;
  let data2 = request.body.ECUNUM;

    model.ajouterSponsor(data, data1,data2, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.ajouterSponsorPost = result;
        response.render('ajouterSponsorPost', response);
    })
}

module.exports.SupprimerSponsor = function(request, response){
  let data = request.params.sponum;

    model.supprimerSponsor(data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.supprimerSponsor = result;
        response.render('supprimerSponsor', response);
    })
}
