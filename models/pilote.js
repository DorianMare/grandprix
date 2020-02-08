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
            let sql = "SELECT DISTINCT p.PILNUM, PILNOM, PILPRENOM, PHOADRESSE FROM pilote p join photo ph ON p.PILNUM=ph.PILNUM WHERE PILNOM LIKE '" + lettre  + "%' AND PHONUM = 1 ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getDetailsPilote = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT ECUNOM, PHOADRESSE, PILTEXTE, PILPOIDS, PILTAILLE, PILNOM, PILPRENOM, PILDATENAIS,"
            + " pa.PAYNAT FROM pilote p LEFT JOIN ecurie e ON p.ECUNUM = e.ECUNUM"
            + " JOIN pays pa ON p.PAYNUM = pa.PAYNUM JOIN photo ph ON p.PILNUM = ph.PILNUM WHERE p.PILNUM = " + num
            + " AND PHONUM = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getSponsoPilote = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT sp.SPONOM, sp.SPOSECTACTIVITE FROM pilote p JOIN sponsorise s"
            + " ON p.PILNUM = s.PILNUM JOIN sponsor sp ON s.SPONUM = sp.SPONUM WHERE p.PILNUM = " + num;
            connexion.query(sql, callback);
            connexion.release;
        }
    });
};

module.exports.getPhotosPilote = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT ph.PHONUM, ph.PHOADRESSE, p.PILNUM FROM pilote p JOIN photo ph"
            + " ON p.PILNUM = ph.PILNUM WHERE p.PILNUM = " + num
            + " AND ph.PHONUM != 1";
            connexion.query(sql, callback);
            connexion.release;
        }
    });
}

module.exports.getDetailsImage = function (params, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PHOADRESSE, PHOSUJET, PHOCOMMENTAIRE FROM photo"
            + " WHERE PHONUM = " + params[0] + " AND PILNUM = " + params[1];
            connexion.query(sql, callback);
            connexion.release;
        }
    })
}