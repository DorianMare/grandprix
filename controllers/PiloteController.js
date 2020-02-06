let model = require('../models/pilote');
var async = require('async');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S
module.exports.Repertoire = function (request, response) {
   response.title = 'Répertoire des pilotes';
   model.getLettresNom(function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      response.lettres = result;
      response.render('repertoirePilotes', response);
   });
};

module.exports.Liste = function (request, response) {
   let data = request.params.lettre;
   response.title = "Pilote dont le nom commence par " + data;

   async.parallel([
      function (callback) {
         model.getLettresNom(function (err, result) {
            callback(null, result);
         })
      },
      function (callback) {
         model.getListePilotes(data, function (err, result) {
            callback(null, result)
         })
      }
   ],
      function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.lettres = result[0];
         response.pilotes = result[1];
         response.render('listerPilotes', response);
      }
   );
}
