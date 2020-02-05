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

module.exports.getListePilotes = function (lettre, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT PILNOM, PILPRENOM , PHOADRESSE FROM pilote p join photo ph ON p.PILNUM=ph.PILNUM  WHERE PILNOM LIKE '" + lettre  + "%' ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
