let model = require('../models/ecurie.js');
var async = require('async');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        //console.log(result);
response.render('listerEcurie', response);
});
}

module.exports.DetailEcurie = function(request, response){
  let data = request.params.ecunum;

  async.parallel([
     function (callback) {
        model.getListeEcurie(function (err, result) {
           callback(null, result);
        })
     },
     function (callback) {
        model.getDetailEcurie(data, function (err, result) {
           callback(null, result)
        })
     }
  ],
     function (err, result) {
        if (err) {
           console.log(err);
           return;
        }
        response.listeEcurie = result[0];
        response.detailEcurie = result[1];
        response.render('detailEcurie', response);
});
}
