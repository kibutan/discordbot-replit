//reference https://note.com/suzuneu/n/n80799a0f39d9

// 投稿メッセージ本文
const Reactions = [
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
  ["🇧"],
  ["🇨"],
  ["🇩"],
  ["🇪"],
];


const http = require("http");
const querystring = require("querystring");

// Discord.js のインポート
const {
  Client,
  Collection,
  Intents,
  MessageAttachment,
} = require("discord.js");

// 定期実行に必要なパッケージnode-cron(package.jsonでv3.0.0に固定
const cron = require("node-cron");

// APIをDetchするためのパッケージ
const { request } = require("undici");

// Discord.js の呼び出しに必要
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


// メイン処理
try {
  // GAS(Google Apps Script)からの受信(botの常時起動)
  http
    .createServer(function (req, res) {
      res.write("OK");
      res.end();
    })
    .listen(8080);

  // 起動時1度だけ実行
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  // メッセージが投稿されたときに動く関数
  client.on("messageCreate", async (message) => {
    if (message.content === "pong") {
      message.reply("Pong");
    }if (message.content === "schedule"){
      const sendmessage = await client.channels.cache
      .get(process.env.CHANNEL_ID)
      .send("スケジュール調整！\n" + postBody + "\n ❌:全部無理")
      .then(
        (message) =>
          message
            .react("1⃣")
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
            .then(() => message.react("❌"))
      );
    }
  });
  
  // メッセージ本文をつく作成する関数
  // あるSpreadsheet から{[2022/10/1, 2022/10/2, ...]}のような形で日付を取得
  async function MakePostBody() {
    const holidayResult = await request(      "https://sheets.googleapis.com/v4/spreadsheets/"+process.env.SPREADSHEET_ID+"/values/NextMonthHolidays?key=" +
        process.env.GOOGLE_API_KEY
    );
    const { values } = await getJSONResponse(holidayResult.body);
    const holidaysLength = values.length;
    let body = "";
    // スケジュール調整！
    // 1⃣:2022/10/1 
    // のようなメッセージ本文を作る
    for (let i = 0; i < holidaysLength; i++) {
      body += Reactions[i] + ":" + values[i] + "\n";
      console.log("Post body" + body + Reactions[i] + values[i]);
    }
    console.log(body);
    return body;
  }

  let postBody;
  MakePostBody().then((body) => {
    console.log("postBody in ", body);
    postBody = body;
  });

  // 毎月20日12時0分に実行する
  cron.schedule("0 12 20 * *", async () => {
    // const holidaysLength = Holidays.length;
    // console.log(postBody);
    const sendmessage = await client.channels.cache
      .get(process.env.CHANNEL_ID)
      .send("スケジュール調整！\n" + postBody + "\n ❌:全部無理")
      .then(
        (message) =>
          message
            .react("1⃣")
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
            .then(() => message.react("❌"))
      );
  });

  // Discord Botとしてログイン
  client.login(process.env.DISCORD_BOT_TOKEN);
} catch (e) {
  console.log(e);
}
