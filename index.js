const express = require('express');
const app = express();
const {
  exec
} = require('child_process');
const fs = require('fs');

// settings parsing
const settings = JSON.parse(fs.readFileSync(__dirname + '/public/settings/preferences.json')).settings;
const logs_path = settings.folder.instaPy;
const PORT = parseInt(settings.host.port);
const DEBUG = settings.dev.debug;

// create Json files
let followers_txt = fs.readFileSync(logs_path + 'followerNum.txt', 'utf8');
let following_txt = fs.readFileSync(logs_path + 'followingNum.txt', 'utf8');
let activity_txt = fs.readFileSync(logs_path + 'recordActivity.json', 'utf8');
let followers_json = createJsonFromTxt(followers_txt);
let following_json = createJsonFromTxt(following_txt);
let activity_json = JSON.parse(activity_txt);

// classic public routing
app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => {
  console.log(`Listening port : ${PORT}`);
});

// API GET route
app.get('/followers', (req, res) => {
  res.send(followers_json);
});
app.get('/following', (req, res) => {
  res.send(following_json);
});
app.get('/activity', (req, res) => {
  res.send(activity_json);
});


// start default web browser
exec(`start http://localhost:${PORT}`, (err, stdout, stderr) => {
  if (err) {
    return;
  }
  if (DEBUG) {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }
});

// creating json objects from instapy default txt files
function createJsonFromTxt(content) {
  let lines = content.split('\r\n');
  let data_json = {
    data: []
  };
  for (let line of lines) {
    let d = line.split(' ');
    if (d.length === 3) {
      data_json.data.push({
        date: d[0],
        time: d[1],
        val: d[2]
      });
    }
  }
  return data_json;
}