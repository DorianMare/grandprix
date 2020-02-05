let db = require('../configDb');

module.exports.getLettresNom = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT substring(PILNOM,1,1) as lettre FROM pilote ORDER BY lettre";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};