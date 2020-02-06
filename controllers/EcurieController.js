let model = require('../models/ecurie.js');

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
    model.getDetailEcurie(data, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.detailEcurie = result;
response.render('detailEcurie', response);
});
}
