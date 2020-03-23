let db = require("../configDb");
let modelgrandPrix = require('../models/grandprix');

module.exports.getListeCircuit = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT CIRNUM, CIRNOM, CIRLONGUEUR, CIRNBSPECTATEURS, PAYADRDRAP FROM circuit c JOIN pays p ON p.PAYNUM = c.PAYNUM";
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

module.exports.ajouterCircuit = function (data, fileName, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            connexion.query('INSERT INTO circuit SET CIRADRESSEIMAGE = \'' + fileName + '\' ,?', data, callback);
            connexion.release();
        }
    })
}

module.exports.supprimerCircuit = function (cirnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            gpnumQuery = 'SELECT * FROM grandprix WHERE CIRNUM = ' + cirnum;
            connexion.query('DELETE FROM course WHERE EXISTS (' + gpnumQuery + ')');
            connexion.query('DELETE FROM essais WHERE EXISTS (' + gpnumQuery + ')');
            connexion.query('DELETE FROM grandprix WHERE CIRNUM = ' + cirnum);
            connexion.query('DELETE FROM circuit WHERE CIRNUM = ' + cirnum, callback);
            connexion.release();
        }
    })
}

module.exports.modifierCircuit = function (cirnum, data, fileName, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            sql = 'UPDATE circuit SET CIRNOM = \'' + data.CIRNOM + '\', CIRLONGUEUR = ' + data.CIRLONGUEUR
            + ', PAYNUM = ' + data.PAYNUM + ', CIRNBSPECTATEURS = ' + data.CIRNBSPECTATEURS +
            ', CIRTEXT = \'' + data.CIRTEXT + '\', CIRADRESSEIMAGE = \'' + fileName + '\' WHERE CIRNUM = ' + cirnum;
            connexion.query(sql, callback);
            connexion.release();
        }
    }) 
}