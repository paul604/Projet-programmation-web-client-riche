$(function(argument) {
  var commune = "nantes"
  var nbCommune=-1;

  $("#choix").autocomplete({
    minLength: 3,
    source: function(commune, response){
      console.log(commune.term);
      response(getCommune(commune.term, nbCommune));
    },
    // select: function( event, ui ) {
    //     console.log(event);
    //     console.log(ui);
    //     console.log(ui.item.value);
    //   $("div").html(ui.item.value);
    // }
  });

});


function getCommune(commune, nbCommune){
  var outData='commune='+commune;
  if(nbCommune != -1){
    outData=outData+'&maxRows='+nbCommune;
  }
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
        console.log(tab);
        return tab;
      }
  });
};
