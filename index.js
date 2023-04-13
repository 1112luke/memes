const nodemailer = require("nodemailer");

const axios = require('axios')

const cron = require("node-cron")

var hour = 30;

var subs = ['memes', 'dankmemes', 'me_irl', "Shrekmemes", "AmongUsMemes"]

var people = ["lucas.scholler@valleyview.k12.oh.us", "austin.valenti@valleyview.k12.oh.us", "braeden.chambers@valleyview.k12.oh.us", "evan.wilcox@valleyview.k12.oh.us"]



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lucas.scholler@valleyview.k12.oh.us',
      pass: 'kqoefumvqchjbqfn'
    }
  });
  
async function send(response){

  var htmlstring = '<p>Minute time<p/> <img src="cid: goodid"/>'

  var filename = response.replace("https://i.redd.it/", "");
  
  for(var i = 0; i < people.length; i++){

    var mailOptions = {
      from: 'lucas.scholler@valleyview.k12.oh.us',
      to: people[i],
      subject: "Minute " + hour,
      html: htmlstring.replace("time", hour),
      attachments: [{
          filename: filename,
          path: response,
          cid: 'goodid' //same cid value as in the html img src
      }]
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        sendEmail();
       } else {
        console.log('Email sent: ' + info.response);
        console.log("SUB: " + sub);
      }
    })

  }

  hour+=5;

}

  

//memes

  function sendEmail(){
  console.log("attempting...")
  // Make request

  var sub = subs[Math.floor(Math.random() * subs.length)]

  var response = axios.get('https://meme-api.com/gimme/' + sub)

  response.then(res => 
      send(res.data.url)
    )
}

sendEmail();
cron.schedule("*/5 * * * *", sendEmail);