//reference https://note.com/suzuneu/n/n80799a0f39d9
const http = require("http");
const querystring = require("querystring");
const {
  Client,
  Collection,
  Intents,
  MessageAttachment,
} = require("discord.js");
const cron = require("node-cron");
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

cron.schedule("* * * * *", async () => {
  const sendmessage = await client.channels.cache.get("834044144162308120")
    .send("スケジュール調整！")
    .then(message => message.react("1⃣")
      .then(() => message.react("2⃣"))
      .then(() => message.react("3⃣"))
      .then(() => message.react("4⃣"))
      .then(() => message.react("5⃣"))
      .then(() => message.react("6⃣"))
      .then(() => message.react("7⃣"))
      .then(() => message.react("8⃣"))
      .then(() => message.react("9⃣"))
      .then(() => message.react("🆎"))
      .then(() => message.react("🇰"))
      .then(() => message.react("🙌"))
      .then(() => message.react("🙌"))
      .then(() => message.react("🖖"))
    )
  
});
  
client.login(process.env.DISCORD_BOT_TOKEN);

} catch (e) {
 console.log(e);
}