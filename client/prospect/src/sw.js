import ProspectService from './services/ProspectService';
import idbKeyval from 'idb-keyval';

const prospectService = new ProspectService();

let staticCacheName = 'empdc-prospect-cache-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(serviceWorkerOption.assets.concat(['index.html']));
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin == location.origin && url.pathname == '/') {
    event.respondWith(caches.match('index.html'));
    return;
  }

  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  )
})

self.addEventListener('sync', function(event) {
  if (event.tag == 'send-data') { //If the event tag is "send-data"
    idbKeyval.get('prospects') //Get the prospects from the cache
      .then(prospects => {
        if (!prospects) return; //If empty, we return

        while (prospects.length) { //We looped over the prospect
          let prospect = prospects.pop(); //Get the 1st one
          prospectService.add(prospect); //Send it to the server
        }

        idbKeyval.delete('prospects'); // Clean the cache
      });
  }
});
