const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Discord = require('discord.js');

// Discord webhook ID, webhook token
const hook = new Discord.WebhookClient('831146777591021598', 'Vp8WR9G1e0WvobQaMkaQmKFDzPun5QAuHN-g1DzxasWHno6DqF4UYSDaNByUucQ_mcPk');

// Target site
const url= 'https://www.aldi.co.uk/adventuridge-air-windbreak/p/710058441283200';
// The parent div of the Add to Cart button
const buyArea = /.js-product-form/g
// How many times the script has ran
let n = 0;
// retry every x Seconds
const retryTime = 24 

function watch(){ 
  (async function checkSite() {
    const response = await got(url);
    const dom = new JSDOM(response.body);
    // Look for element that matches IDs inside the buyArea
    let cards = [...dom.window.document.querySelectorAll("form")].filter(p=>p.className.match(buyArea));

    cards.forEach(card => {
      // If Add to Basket button is interactive, send notification
      if (card.querySelector('[data-is-buy-online="false"]')) { 
        let href = url;
        return sendIt(href),console.log(href) 
      }
    }) 
    
    n++
    console.log("Try nr:", n)
    
  })();
  setTimeout(watch, 1000*retryTime);
}

const sendIt = (href) => {
  hook.send("<@UserID> Bargains at aldi" + ' ' + href)
};

watch()
