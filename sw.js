
//Asignar un nombre y version de cache

const CACHE_NAME = 'v1_cache_duvan_lemus_pwa';


//Ficheros a cachear en la aplicacion
let urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
    './img/instagram.png',
    './img/twitter.png'
];

//Evento Install  --Instala la app
//Instalacion del serviceWorker y almacenar en cache los recursos estaticos de la app

self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache =>{
                return cache.addAll(urlsToCache)
                            .then(()=>{
                                self.skipWaiting();
                            })              
              })
              .catch(err => console.log('No se ha registrado el cache nunca', err))
    )
});

//Evento Activate --Activa la app para que funcione sin conexion
self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
              .then(cacheNames=>{
                return Promise.all(
                    cacheNames.map(cacheName =>{
                        if(cacheWhiteList.indexOf(cacheName) === -1){
                            //Borrar cache que no se necesita
                            return caches.delete(cacheName);   
                        }
                    })
                );
              })
              .then(() => {
                //Activar cache del dispositivo
                self.clients.claim();
              })
    );
});

//Evento Fetch --Hace la peticion para descargar los datos necesarios desde la web
self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
              .then(res =>{
                if(res){
                    //Devuelve los datos desde cache
                    return res;
                }

                return fetch(e.request);

              })

    );
});