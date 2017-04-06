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