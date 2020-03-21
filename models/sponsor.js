let db = require("../configDb");

module.exports.getListeSponsor = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT SPONUM, SPONOM, SPOSECTACTIVITE from sponsor";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.ajouterSponsor = function (data, data1, data2, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
          if (data2 !=0) {
            connexion.query('INSERT INTO sponsor SET SPONOM =\'' + data + '\', SPOSECTACTIVITE=\'' + data1 + '\'');
            connexion.query('INSERT INTO finance SET ECUNUM =\'' + data2 + '\', SPONUM= (select max(sponum) from sponsor)', callback);
          }
          else {
            connexion.query('INSERT INTO sponsor SET SPONOM =\'' + data + '\', SPOSECTACTIVITE=\'' + data1 + '\'', callback);
          }
          connexion.release();
        }
    });
};

module.exports.supprimerSponsor = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
          connexion.query('DELETE from finance where sponum =' + data);
          connexion.query('DELETE from sponsorise where sponum =' + data);
          connexion.query('DELETE from sponsor where sponum =' + data, callback);
          connexion.release();
        }
    });
};
