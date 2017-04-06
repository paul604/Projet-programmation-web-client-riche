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


//get l'id de la ville voulue puis des img
function getImg(ville, nbImg){//https://www.flickr.com/services/api/flickr.places.find.htm    https://www.flickr.com/services/api/flickr.photos.search.html

    var HtmlPhoto = $("#photos")
    HtmlPhoto.html("");

    var outData='method=flickr.places.find&api_key=f3edd30f7b0c323e51d713ed10145b26&format=json&query='+ville;
    $.ajax({
        url : 'https://api.flickr.com/services/rest/',
        type : 'get',
        dataType : 'jsonp',
        jsonp : 'jsoncallback',
        data : outData,
        success : function(out, statut){
            // console.log(out.places.place[0].place_id);
            var dataIdImg = 'method=flickr.photos.search&api_key=f3edd30f7b0c323e51d713ed10145b26&format=json&place_id='+out.places.place[0].place_id;
            $.ajax({
                url : 'https://api.flickr.com/services/rest/',
                type : 'get',
                dataType : 'jsonp',
                jsonp : 'jsoncallback',
                data : dataIdImg,
                success : function(outImg, statutImg){
                    // console.log(outImg.photos.photo);//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
                    var arrayObjImg = outImg.photos.photo;

                    if(arrayObjImg.length==0){
                        //TODO modal

                        return;
                    }

                    $.each(arrayObjImg, function(i,val){
                        if(i>=nbImg){
                            return;
                        }
                        console.log(i);
                        HtmlPhoto.append("<img src=\"https://farm"+val.farm+".staticflickr.com/"+val.server+"/"+val.id+"_"+val.secret+"_q.jpg)\" alt=\"test\" />");
                    });
                }
            });

            // var tab = [];
            // $.each(out, function (i, val) {
            //     tab[tab.length]=val.Ville;
            // });
            // response( tab);
        },
        error : function(){
            $("#photos")
        }
        });
}
