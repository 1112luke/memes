//initialize firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8bzDFb5wEXAg0V6GQC1K8cPT4CkcPfHo",
  authDomain: "byejimmy-d8d48.firebaseapp.com",
  projectId: "byejimmy-d8d48",
  storageBucket: "byejimmy-d8d48.appspot.com",
  messagingSenderId: "1017367235019",
  appId: "1:1017367235019:web:95e8c2dc517c13f86bce4e",
  measurementId: "G-K7H0JN85FT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//email start

import nodemailer from "nodemailer";

import axios from "axios"

import cron from "node-cron"

import CronJobManager from "cron-job-manager";

var manager = new CronJobManager();

const db = getDatabase();

var peopleref = ref(db, "people/");
var goingref = ref(db, "going");
var cronref = ref(db, "cron");
var intervalref = ref(db, "interval");
var scaleref = ref(db, "scale");
var resetref = ref(db, "reset");
var subsref = ref(db, "subs");

var subs = ['memes', 'dankmemes', 'me_irl', "Shrekmemes", "AmongUsMemes"]
var people = [];
var going = false;
var interval = 0;
var scale = "Minute";
var cronval = "*/5 * * * *";
var reset = false;

//start initial cron
manager.add("job", cronval, sendEmail);

//get going
onValue(goingref, (snapshot) => {
  going = snapshot.val();
})

//get interval
onValue(intervalref, (snapshot) => {
  interval = snapshot.val();
})
//get scale
onValue(scaleref, (snapshot) => {
  scale = snapshot.val();
})
//get cron
onValue(cronref, (snapshot) => {
  cronval = snapshot.val();
  manager.stop("job")
  manager.update("job", cronval, sendEmail);
  manager.start("job");
})
//get subs
onValue(subsref, (snapshot) => {
  var data = snapshot.val();
  subs = data;
  console.log(subs);
})


//get people

var gotData = false;

onValue(peopleref, (snapshot) =>{
  var data = snapshot.val()
  people = data;

  //sendEmail if first time through
  if(!gotData){
    gotData = true;
    sendEmail();
  }
})

//get reset
onValue(resetref, (snapshot =>{
  reset = snapshot.val();
  if(reset){
    for(var i = 0; i < people.length; i++){
      people[i].minutes = 0;
    }
    set(peopleref, people);
    reset = false;
    set(resetref, reset);
  }
}))

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lucas.scholler@valleyview.k12.oh.us',
      pass: 'kqoefumvqchjbqfn'
    }
  });
  
async function send(response){

  /*
  console.log(people);
  console.log("going: ", going);
  console.log("scale: ", scale);
  console.log("interval: ", interval);
  console.log("cron: ", cronval);
  */

  var htmlstring = '<p>Minute time<p/> <img src="cid: goodid"/>'

  var filename = response.replace("https://i.redd.it/", "");
  
  for(var i = 0; i < people.length; i++){

    var mailOptions = {
      from: 'lucas.scholler@valleyview.k12.oh.us',
      to: people[i].email,
      subject: scale + " " + people[i].minutes,
      html: htmlstring.replace("time", people[i].minutes).replace("Minute", scale),
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
    
    people[i].minutes += interval;

    set(peopleref, people);

  }

  

}

//memes

  function sendEmail(){
  if(going){
    console.log("attempting...")
  // Make request

  var sub = subs[Math.floor(Math.random() * subs.length)]

  var response = axios.get('https://meme-api.com/gimme/' + sub)

  response.then(res => 
      send(res.data.url)
    )
  }
  else{
    console.log("not going");
  }
}