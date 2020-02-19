let model = require('../models/pilote');
let modelEcurie = require('../models/ecurie');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs-extra'),
    path = require("path");


// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S
module.exports.ListeAllPilotes = function (request, response) {
   model.getAllPilotes(function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      response.listeAllPilotes = result;
      response.render('adminListePilotes', response);
   });
};

module.exports.FormulaireAjoutPilote = function (request, response) {
   modelEcurie.getAllEcuries(function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      response.FormulaireAjoutPilote = result;
      response.render('ajouterPilote', response);
   });
};

http.createServer(function (req, res) {
    /* Process the form uploads */
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });

        form.on('fileBegin', function(name, file) {
        file.path = path.join(__dirname, '/temp/') + file.name;
                });
        form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
                });

        form.on('end', function (fields, files) {
            /* Temporary location of our uploaded file */
            var temp_path = this.openedFiles[0].path;
            /* The file name of the uploaded file */
            var file_name = this.openedFiles[0].name;
            /* Location where we want to copy the uploaded file */
            var new_location = path.join(__dirname, '/upload/');

            fs.copy(temp_path, new_location + file_name, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("success!");
                    // Delete the "temp" file
                                        fs.unlink(temp_path, function(err) {
                                        if (err) {
                                                console.error(err);
                                                console.log("TROUBLE deletion temp !");
                                                } else {
                                                console.log("success deletion temp !");
                                                }
                                        });
                }
            });
        });
        return;
    }
    /* Display the file upload form. */
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
    );
}).listen(8080);


module.exports.AjouterPilotePost = function (request, response) {
   let data = request.body;

   model.ajouterPilote(data, function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      response.ajouterPilote = result;
      response.render('ajouterPilotePost', response);

   });
};
