$(function(argument) {
  var commune = "nantes"
  var nbphoto=-1;

  $("#choix").autocomplete({
    minLength: 0,
    source: function(commune, response){
      getCommune(commune.term, response);
    },
    _resizeMenu: function() {
      this.menu.element.outerWidth( 5 );
    }
  });

});


function getCommune(commune, response){
  var outData='commune='+commune;
  // if(nbCommune != -1){
  //   outData=outData+'&maxRows='+nbCommune;
  // }
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
