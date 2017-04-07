$(function(argument) {//quand le doc est chargé

    //pour tab
    $("#tabs").tabs();
    $("table").DataTable();

    //auto comp for ville
    $(".choix").autocomplete({
        minLength: 0,
        source: function(commune, response){
            getCommune(commune.term, response);
        }
    });

    //event click bouton
    $(".bouton").click(function(event){
        event.preventDefault();
        var choix = $(".choix_text")[0].value;
        if(choix==""){//si le choix est vide
            return;
        }
        getImg(choix, $(".choix_nombre")[0].value);
    });



});

//fonction a par car apeller apprè upload des img
function loadEventModal(){
    //event modal  photos
    $("span img").click(function(){
        $(this).parent().children("div").css("display","initial");
        $(".modalbg").css("display","initial");//fon noir on
    });

    //event fermetur modal
    $(".modal_close").click(function(){
        $(".modal").each(function(){
          $(this).css("display","none");
        });
        $(".modalbg").css("display","none");//fon noir of
    });
}

//api_key
var cle = 'ab391901d536ce3673c4253bf6068435';


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
function getImg(ville, nbImg){//https://www.flickr.com/services/api/flickr.places.find.htm

    var HtmlPhoto = $("#photos");
    var HtmlTab = $("table").DataTable();
    // var HtmlTab = $("#tableau");

    var outData='method=flickr.places.find&api_key='+cle+'&format=json&query='+ville;
    $.ajax({//get id ville
        url : 'https://api.flickr.com/services/rest/',
        type : 'get',
        dataType : 'jsonp',
        jsonp : 'jsoncallback',
        data : outData,
        success : function(out, statut){
            // console.log(out);
            if(out.places.place.length==0){
                return;
            }
            var dataIdImg = 'method=flickr.photos.search&api_key='+cle+'&format=json&per_page='+nbImg+'&place_id='+out.places.place[0].place_id;
            $.ajax({ // get id photos de vill https://www.flickr.com/services/api/flickr.photos.search.html
                url : 'https://api.flickr.com/services/rest/',
                type : 'get',
                dataType : 'jsonp',
                jsonp : 'jsoncallback',
                data : dataIdImg,
                success : function(outImg, statutImg){

                    //clear afich
                    HtmlPhoto.html("");
                    $("tbody").html("<tr class=\"odd\"><td valign=\"top\" colspan=\"4\" class=\"dataTables_empty\">No data available in table</td></tr>");

                    // console.log(outImg.photos.photo);
                    var arrayObjImg = outImg.photos.photo;

                    $.each(arrayObjImg, function(i,val){//for each sur le tableau d'image récupéré
                        if(i>=nbImg){
                            return;
                        }
                        var idImg='method=flickr.photos.getInfo&api_key='+cle+'&format=json&photo_id='+val.id;
                        $.ajax({//get info img
                            url : 'https://api.flickr.com/services/rest/',
                            type : 'get',
                            dataType : 'jsonp',
                            jsonp : 'jsoncallback',
                            data : idImg,
                            success : function(outInfoImg, statutIImg){
                                outInfoImg=outInfoImg.photo;
                                // console.log(outInfoImg);

                                                    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
                                var img = "<img src=\"https://farm"+val.farm+".staticflickr.com/"+val.server+"/"+val.id+"_"+val.secret+"_q.jpg)\" alt=\""+val.title+"\"/>";
                                //add list img
                                HtmlPhoto.append("<span class=\"img\">"+img
                                    +"<div class=\"modal\">"
                                        +"<span class=\"modal_close\"> &#215;</span>"
                                        +"titre : "+outInfoImg.title._content
                                        +"</br>date : "+outInfoImg.dates.taken
                                        +"</br>photographe : "+outInfoImg.owner.realname
                                    +"</div></span>");

                                loadEventModal();

                                //add dan le tab
                                HtmlTab.row.add( [
                                    img,
                                    outInfoImg.title._content,
                                    outInfoImg.dates.taken,
                                    outInfoImg.owner.realname
                                ] ).draw( false );
                            }
                        });
                    });
                }
            });
        }
        });
}
