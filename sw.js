var V="clair-pwa-v5",F=["./","index.html","manifest.json","icon-1.svg","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(F.map(function(f){return c.add(f).catch(function(){})}))}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;
var nav=e.request.mode==="navigate";
if(nav){e.respondWith(fetch(e.request).then(function(n){var c=n.clone();caches.open(V).then(function(h){h.put(e.request,c)});return n}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("index.html")})}));return}
e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(n){var c=n.clone();caches.open(V).then(function(h){h.put(e.request,c)});return n}).catch(function(){return caches.match("index.html")})}))});
