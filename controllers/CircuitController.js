model = require('../models/circuit');
async = require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
    model.getListeCircuit(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeCircuit = result;
        response.render('listerCircuit', response);
    })
}

module.exports.Details = function (request, response) {
    let data = request.params.num;

    async.parallel([
        function (callback) {
            model.getListeCircuit(function (err, result) {
                callback(null, result);
            })
        },
        function (callback) {
            model.getDetailsCircuit(data, function (err, result) {
                callback(null, result);
            });
        }
    ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeCircuit = result[0];
            console.log(response);
            response.detailsCircuit = result[1][0];
            response.render('detailsCircuit', response);
        }
    );

}