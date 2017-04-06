$(function(argument) {

    //pour tab
    $( "#tabs" ).tabs();

    var commune = "nantes"
    var nbphoto=-1;

    //auto comp for ville
    $("#choix").autocomplete({
        minLength: 0,
        source: function(commune, response){
            getCommune(commune.term, response);
        }
    });

});


//permet de get les villes matchant avec commune
function getCommune(commune, response){
    var outData='commune='+commune;
    $.ajax({
        url : 'http://infoweb-ens/~jacquin-c/codePostal/commune.php',
        type : 'get',
        dataType : 'json',
        data : outData,
        success : function(out, statut){
            var tab = [];
            $.each(out, function (i, val) {
                tab[tab.length]=val.Ville;
            });
            response( tab);
        }
        });
};


//get l'id de la ville voulue
function getPlaces(ville){//https://www.flickr.com/services/api/flickr.places.find.htm    https://www.flickr.com/services/api/flickr.photos.search.html
    var outData='method=flickr.places.find&api_key=f3edd30f7b0c323e51d713ed10145b26&query='+ville;
    $.ajax({
        url : 'https://api.flickr.com/services/rest/',
        type : 'get',
        dataType : 'xml',
        data : outData,
        success : function(out, statut){
            console.log(out.documentElement.firstElementChild.firstElementChild.attributes.place_id.nodeValue);
            // var tab = [];
            // $.each(out, function (i, val) {
            //     tab[tab.length]=val.Ville;
            // });
            // response( tab);
        },
        error: function (a,z,e) {
            console.log(a);
            console.log(z);
            console.log(e);
        }
        });
}
