There's 2 folders with slightly different implementations. One uses aldi and the other uses currys as the example.

### To set up the bot
1) Create discord server or join one that you already own.
2) Right click the channel > Server Settings > Integrations.
3) View webhooks and Create New Webhook. This is the bot that will notify you. Give it a name and assign it to a channel.
4) Save then click 'Copy Webhook URL'. Paste it into your browser and hit enter.
5) Note down the "id" and the "token".
6) Open index.js and add the id and token on line 7, like:

    const hook = new Discord.WebhookClient('PASTE_ID_HERE', 'PASTE_TOKEN_HERE');


### To run the bot:
1) `npm i`
2) Run in console - `node index.js`
