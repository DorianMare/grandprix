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
         });
      },
      function (callback) {
         model.getListePilotes(data, function (err, result) {
            callback(null, result)
         });
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

module.exports.Details = function (request, response) {
   let data = request.params.num;

   async.parallel([
      function (callback) {
         model.getLettresNom(function (err, result) {
            callback(null, result);
         });
      },
      function (callback) {
         model.getDetailsPilote(data, function (err, result) {
            callback(null, result);
         });
      },
      function (callback) {
         model.getSponsoPilote(data, function (err, result) {
            callback(null, result);
         });
      },
      function (callback) {
         model.getPhotosPilote(data, function (err, result) {
            callback(null, result);
         })
      }
   ],
      function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.lettres = result[0];
         response.detailsPilote = result[1][0];
         response.sponsoPilote = result[2];
         response.photosPilote = result[3];
         response.render('detailsPilote', response);
      }
   );
}

module.exports.DetailsImage = function (request, response) {
   let data = [request.params.numImage, request.params.num];

   model.getDetailsImage(data, function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      response.phoadresse = result[0].PHOADRESSE;
      response.phosujet = result[0].PHOSUJET;
      response.phocommentaire = result[0].PHOCOMMENTAIRE;
      response.render('detailsImagePilote', response);
   });
}