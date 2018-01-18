import ProspectService from './services/ProspectService';
import idbKeyval from 'idb-keyval';

const prospectService = new ProspectService();

self.addEventListener('sync', function(event) {
  if (event.tag == 'send-data') {
    idbKeyval.get('prospects')
      .then(prospects => {
        console.log(prospects)
        if (!prospects) return;

        while (prospects.length) {
          console.log('prospect add');
          let prospect = prospects.pop();
          prospectService.add(prospect);
        }

        idbKeyval.clear();
      });
  }
});

console.log(global.serviceWorkerOption );
