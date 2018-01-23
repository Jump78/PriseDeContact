import ProspectService from './services/ProspectService';
import idbKeyval from 'idb-keyval';

const prospectService = new ProspectService();


self.addEventListener('sync', function(event) {
  if (event.tag == 'send-data') { //If the event tag is "send-data"
    idbKeyval.get('prospects') //Get the prospects from the cache
      .then(prospects => {
        if (!prospects) return; //If empty, we return

        while (prospects.length) { //We looped over the prospect
          let prospect = prospects.pop(); //Get the 1st one
          prospectService.add(prospect); //Send it to the server
        }

        idbKeyval.clear(); // Clean the cache
      });
  }
});
