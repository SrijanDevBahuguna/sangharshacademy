const nameofcache = 'sportsarena';
const resources =[
    '/',
    '/index.html',
    '/contact.html',
    '/mini-about-us.html',
    '/mini-trainings offeredtrainings.html',
    '/mini-vision.html',
    '/mini.css',
    '/images/306.png',
    '/images/aboutus.png',
    'images/abtu.jpg',
    '/images/badminton.png',
    '/images/badminton1.png',
    '/images/basketball.png',
    '/images/boy.jpg',
    '/images/bakt.jpg',
    '/images/crick.jpg',
    '/images/cricket.jpg',
    '/images/field.jpg',
    '/images/football.jpg',
    '/images/ftb.jpg',
    '/images/grass.jpg',
    '/images/logo.jpg',
    '/images/reallogo.png',
    '/images/vis.jpg',
];

//install
self.addEventListener('install',evt=>{
    // console.log('serivce worker has been installed');
    evt.waitUntil( 
        caches.open(nameofcache).then(cache =>{
            console.log('caching shell resources');
            cache.addAll(resources);
        })
    );
   
});

//active
self.addEventListener('activate' ,evt=>{
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys =>{
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== nameofcache)
                .map(key => caches.delete(key))    
            )
        })
    );
});

//fetch event
self.addEventListener('fetch',evt=>{
    // console.log('fetch event',evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cacheRes || fetch(evt.request);
        })
    );
});