const nodemailer = require("nodemailer");

const axios = require('axios')

const cron = require("node-cron")

var hour = 0;

var subs = ['memes', 'dankmemes', 'me_irl', "Shrekmemes", "AmongUsMemes"]



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lukescholler@gmail.com',
      pass: 'uypnhehftmorketa'
    }
  });
  
async function send(response){

  hour++;

  var htmlstring = '<p>Hour time<p/> <img src="cid: goodid"/>'

  var filename = response.replace("https://i.redd.it/", "");
  
  //luke
  var mailOptions = {
    from: 'lukescholler@gmail.com',
    to: "lukescholler@gmail.com",
    subject: "Hour " + hour,
    html: htmlstring.replace("time", hour),
    attachments: [{
        filename: filename,
        path: response,
        cid: 'goodid' //same cid value as in the html img src
    }]
  };
    
  for(var i = 0; i < 1; i++){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        sendEmail();
       } else {
        console.log('Email sent: ' + info.response);
        console.log("SUB: " + sub);
      }
    });
  }
  //austin
  var mailOptions = {
    from: 'lukescholler@gmail.com',
    to: "avale1421@gmail.com",
    subject: "Hour " + hour,
    html: htmlstring.replace("time", hour),
    attachments: [{
        filename: filename,
        path: response,
        cid: 'goodid' //same cid value as in the html img src
    }]
  };
    
  for(var i = 0; i < 1; i++){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        sendEmail();
       } else {
        console.log('Email sent: ' + info.response);
        console.log("SUB: " + sub);
      }
    });
  }
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
cron.schedule("0 * * * *", sendEmail);