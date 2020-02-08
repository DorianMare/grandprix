let db = require("../configDb");

module.exports.getListeCircuit = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT CIRNUM, CIRNOM, PAYADRDRAP FROM circuit c JOIN pays p ON p.PAYNUM = c.PAYNUM";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}

module.exports.getDetailsCircuit = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT CIRADRESSEIMAGE, CIRNOM, CIRLONGUEUR, PAYNOM, CIRNBSPECTATEURS, CIRTEXT from circuit c "
            + " JOIN pays p ON c.PAYNUM = p.PAYNUM WHERE CIRNUM = " + num;
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}