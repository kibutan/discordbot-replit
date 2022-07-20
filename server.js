//reference https://note.com/suzuneu/n/n80799a0f39d9
const http = require("http");
const querystring = require("querystring");
const {
  Client,
  Collection,
  Intents,
  MessageAttachment,
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

try {
 // GAS(Google Apps Script)からの受信(botの常時起動)
 http.createServer(function(req, res){
  res.write("OK");
  res.end();
 }).listen(8080);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    if(message.content==="pong"){
      message.reply("教えはどうなってんだ教えは")
    }
});

 
client.login(process.env.DISCORD_BOT_TOKEN);

} catch (e) {
 console.log(e);
}