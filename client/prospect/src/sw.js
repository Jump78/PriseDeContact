import ProspectService from './services/ProspectService';
//self.importScripts('./services/ProspectService.js');


const prospectService = new ProspectService();

self.addEventListener('sync', function(event) {
  if (event.tag == 'send-data') {
    // let storage = outBox.getOutBox();
    // console.log(storage)
    // while (storage.length) {
    //   console.log('prospect add');
    //   let prospect = storage.pop();
    //   event.waitUntil(prospectService.add(prospect));
    // }
  }
});

console.log(global.serviceWorkerOption );
