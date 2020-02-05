let model  = require('../models/pilote');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = function(request, response){
   response.title = 'Répertoire des pilotes';
      model.getLettresNom( function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.lettres = result;
         response.render('repertoirePilotes', response);
      });
};

module.exports.Liste = function(request, response){
      let data = request.params.lettre;
      model.getListePilotes(data, function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.pilotes = result;
         response.render('listerPilotes', response);
      });
}
