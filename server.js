//reference https://note.com/suzuneu/n/n80799a0f39d9
const Holidays=[
  ["2022/09/03"],
  ["2022/09/04"],
  ["2022/09/10"],
  ["2022/09/11"],
  ["2022/09/17"],
  ["2022/09/18"],
  ["2022/09/19"],
  ["2022/09/23"],
  ["2022/09/24"],
  ["2022/09/25"],
]

const Reactions =[
  ["1⃣"],
  ["2⃣"],
  ["3⃣"],
  ["4⃣"],
  ["5⃣"],
  ["6⃣"],
  ["7⃣"],
  ["8⃣"],
  ["9⃣"],
  ["🇦"],
]

const http = require("http");
const querystring = require("querystring");
const {
  Client,
  Collection,
  Intents,
  MessageAttachment,
} = require("discord.js");
const cron = require("node-cron");
const { request } = require("undici");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

async function getJSONResponse(body) {
  let fullBody = "";

  for await (const data of body) {
    fullBody += data.toString();
  }
  return JSON.parse(fullBody);
}

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
    if(message.content==="holiday"){
      // message.reply(")")
    const holidayResult = await request(
"https://sheets.googleapis.com/v4/spreadsheets/1saWrdjSqAp9P09cFQ0VgTMbYAjLwVnreft44vvM1mVg/values/allholiday?key="+process.env.GOOGLE_API_KEY
    );
    const { values } = await getJSONResponse(holidayResult.body);
    console.log(values[0]);
    }  
});

function MakePostBody(){
  const holidaysLength = Holidays.length
  let body = ""
  for(let i = 0; i < holidaysLength ; i++){
    body += Reactions[i]+ ":"+ Holidays[i] +"\n"
    console.log("Post body"+body+Reactions[i] + Holidays[i])
  }
  return body
}

const postBody = MakePostBody()

cron.schedule("* 0 * * *", async () => {
  const holidaysLength = Holidays.length
  console.log(postBody)
  const sendmessage = await client.channels.cache.get("834044144162308120")
    .send("スケジュール調整！\n" + postBody)
    .then(message => message.react("1⃣")
      .then(() => message.react("2⃣"))
      .then(() => message.react("3⃣"))
      .then(() => message.react("4⃣"))
      .then(() => message.react("5⃣"))
      .then(() => message.react("6⃣"))
      .then(() => message.react("7⃣"))
      .then(() => message.react("8⃣"))
      .then(() => message.react("9⃣"))
      .then(() => message.react("🇦"))
      .then(() => message.react("🇧"))
      .then(() => message.react("🇨"))
      .then(() => message.react("🇩"))
      .then(() => message.react("🇪"))
      .then(() => message.react("🇫"))
      // .then(() => message.react("🇬"))
      // .then(() => message.react("🇭"))
      // .then(() => message.react("🇮"))
      // .then(() => message.react("🇯"))
      // .then(() => message.react("🇱"))
      // .then(() => message.react("🇲"))
      // .then(() => message.react("🇳"))
      // .then(() => message.react("🇴"))
      // .then(() => message.react("🇵"))
      // .then(() => message.react("🇶"))
      // .then(() => message.react("🇷"))
      // .then(() => message.react("🇸"))
      // .then(() => message.react("🇹"))
      // .then(() => message.react("🇺"))
      // .then(() => message.react("🇻"))
      // .then(() => message.react("🇼"))
      // .then(() => message.react("🇽"))
      // .then(() => message.react("🇾"))
      // .then(() => message.react("🇿"))
    )
  
});
  
client.login(process.env.DISCORD_BOT_TOKEN);

} catch (e) {
 console.log(e);
}