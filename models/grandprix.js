let db = require("../configDb");

module.exports.getListeGrandPrix = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT GPNUM, GPNOM, PAYADRDRAP FROM `grandprix` g join circuit c on g.CIRNUM=c.CIRNUM join pays p on p.PAYNUM=c.PAYNUM";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}

module.exports.getDetailsGrandprix = function (gpnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT concat(p.PILNOM, p.PILPRENOM) as PILNOM , TEMPSCOURSE FROM course c join grandprix g on c.GPNUM=g.gpnum join pilote p on p.PILNUM=c.PILNUM WHERE g.GPNUM ="+ gpnum +" order by TEMPSCOURSE ASC ";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}

module.exports.getGrillePoints = function (gpnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PTPLACE, PTNBPOINTSPLACE FROM points";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}

module.exports.getInfoGrandPrix = function (gpnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT GPCOMMENTAIRE from grandprix WHERE GPNUM =" + gpnum ;
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}
