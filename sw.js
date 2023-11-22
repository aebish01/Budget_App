const staticCache = "Static-cache-v1";
const dynamicCache = "Dynamic-cache-v1";


const assets = [
    "/",
    "/index.html",
    "/pages/about.html",
    "/pages/addExpenses.html",
    "/pages/addIncome.html",
    "/pages/addSavings.html",
    "/pages/bills.html",
    "/pages/blog.html",
    "/pages/createAccount.html",
    "/pages/income.html",
    "/pages/login.html",
    "/pages/savings.html",
    "/js/app.js",
    "/js/materialize.js",
    "/js/ui.js",
    "/css/app.css",
    "/css/materialize.css"
];

//Cache size limit
const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
      cache.keys().then((keys) => {
        if (keys.length > size) {
          cache.delete(keys[0]).then(limitCacheSize(name, size));
        }
      });
    });
  };
  
  self.addEventListener("install", function (event) {
    //fires when the browser install the app
    //here we're just logging the event and the contents of the object passed to the event.
    //the purpose of this event is to give the service worker a place to setup the local
    //environment after the installation completes.
    console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
      caches.open(staticCache).then(function (cache) {
        console.log("SW: Precaching App shell");
        cache.addAll(assets.map(url => new Request(url, { mode: 'no-cors' })))
            .then(() => console.log('Assets cached successfully'))
            .catch(error => console.error('Cache failed', error));

      })
    );
  });
  
  self.addEventListener("activate", function (event) {
    //fires after the service worker completes its installation.
    // It's a place for the service worker to clean up from
    // previous service worker versions.
    // console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== staticCache && key !== dynamicCache)
            .map((key) => caches.delete(key))
        );
      })
    );
  });
  //comment
  self.addEventListener("fetch", function (event) {
    //fires whenever the app requests a resource (file or data)
    // console.log(`SW: Fetching ${event.request.url}`);
    //next, go get the requested resource from the network
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCache).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache, 3);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => caches.match("/pages/fallback.html"))
    );
  });