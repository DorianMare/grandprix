let model = require('../models/pilote');
var async = require('async');
let modelEcurie = require('../models/ecurie');
let modelPays = require('../models/pays');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S
module.exports.ListeAllPilotes = function (request, response) {
   model.getAllPilotes(function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      response.listeAllPilotes = result;
      response.render('adminListePilotes', response);
   });
};

module.exports.FormulaireAjoutPilote = function (request, response) {
   async.parallel([
      function (callback) {
         modelEcurie.getAllEcuries(function (err, result)  {
            callback(null, result);
         })
      },
      function (callback) {
         modelPays.getListePays(function (err, result) {
            callback(null, result);
         })
      }
   ],
      function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.listeEcurie = result[0];
         response.pays = result[1];
         response.render('ajouterPilote', response);
      })
};

module.exports.AjouterPilotePost = function (request, response) {
   let data = request.body;

   if (data["ECUNUM"] == 'NULL') {
      delete data["ECUNUM"];
   }

   let file = request.files.PHOADRESSE;

   function pause(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
   }

   async.parallel([
      function (callback) {
         model.ajouterPilote(data, function (err, result) { callback(null, result) });
      },
      function (callback) {
         pause(100).then(() => {
            model.ajouterPhotoPilote(file.name, function (err, result) { callback(null, result) });
         });
      },
   ],
      function (err, result) {
         if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
         }
         file.mv("./public/image/pilote/" + file.name, function (err, result) {
            if (err) {
               console.log(err);
            } else {
               console.log('Upload');
            }
         });

         response.ajouterPilote = result[0];
         response.ajouterPhotoPilote = result[1];
         response.render('ajouterPilotePost', response);
      }
   );
};
