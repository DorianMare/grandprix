
//////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.render('home', response);
};
module.exports.Accueil = function (request, response) {
    response.title = "Bienvenue sur la partie administration du site WROOM";
    response.render('accueil', response);
}
module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};