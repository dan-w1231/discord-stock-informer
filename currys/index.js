const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Discord = require('discord.js');

// Discord webhook ID, webhook token
const hook = new Discord.WebhookClient('799039951579644005', 'g_eoKOMXgICT00Bg_0HsbnZLq2utUV9cYAtm3vDsiY77tB0ZhfN5Q1AOc2YtXwaVLwb_');

// Target site
const url= 'https://www.currys.co.uk/gbuk/search-keywords/xx_xx_xx_xx_xx/rtx%2B3080/xx-criteria.html';
// Product IDs to check
const cardList = /#product10214421|product10214446|product10214425|product10214882|product10214434|product10214426|product10214430|product10216248|product10215051|product10216731|product10216247|product10219296|product10218689|product10219298|product10214421/g
// How many times the script has ran
let n = 0;
// retry every x Seconds
const retryTime = 24 

function watch(){ 
  (async function checkSite() {
    const response = await got(url);
    const dom = new JSDOM(response.body);
    // Look for element that matches IDs in cardList
    let cards = [...dom.window.document.querySelectorAll("article")].filter(p=>p.id.match(cardList));

    cards.forEach(card => {
      // If Add to Basket button is interactive, send notification
      if (card.querySelector('[data-availability="homeDeliveryAvailable"]')) { 
        let href = card.querySelector('a').href;
        return sendIt(href),console.log(href) 
      }
    }) 
    
    n++
    console.log("Try nr:", n)
    
  })();
  setTimeout(watch, 1000*retryTime);
}

const sendIt = (href) => {
  hook.send("<@UserID> Message" + ' ' + href)
};

watch()
