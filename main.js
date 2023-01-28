//Service Worker
if('serviceWorker' in navigator){
    console.log("Puedes usar los service worker");

    navigator.serviceWorker.register('./sw.js')
                           .then(res => console.log('serviceWorker cargado ', res))
                           .catch(err => console.log('serviceWorker no se ha podido registrar ', err));

}else{
    console.log("NEL PERRO");
}




//Scroll suave
$(document).ready(function(){

    $("#menu a").click(function(e){
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
});



