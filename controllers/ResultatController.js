let model = require('../models/grandprix');
var async = require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerGrandPrix = function(request, response){
    model.getListeGrandPrix(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeGrandPrix = result;
        response.render('listerResultat', response);
    })
}


module.exports.DetailGrandPrix = function (request, response) {
    let data = request.params.gpnum;

    async.parallel([
        function (callback) {
            model.getListeGrandPrix(function (err, result) {
                callback(null, result);
            })
        },
        function (callback) {
            model.getDetailsGrandprix(data, function (err, result) {
                callback(null, result);
            });
        },
        function (callback) {
            model.getGrillePoints(data, function (err, result) {
                callback(null, result);
            });
        },
        function (callback) {
            model.getInfoGrandPrix(data, function (err, result) {
                callback(null, result);
            });
        }
    ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeGrandPrix = result[0];
            response.detailGrandPrix = result[1];
            response.grillePoints = result[2];
            response.infoGrandPrix = result[3][0];
            console.log(result[3][0])
            response.render('detailGrandPrix', response);
        }
    );

}
