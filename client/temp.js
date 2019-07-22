const https = require('https');
const qs = require('qs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tmi = require('tmi.js');
const path = require('path');
const querystring = require('querystring');
const url = require('url');
let access_token = '';
let expires_in = 0;
let refresh_token = '';

const app = express();
const port = 4001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(`${__dirname}`, 'build')));
app.get('/redirect', (reqe, res) => {
  var temp = url.parse(reqe.url);
  const code = querystring.parse(temp.query).code
  const options2 = {
    hostname: 'accounts.spotify.com',
    path: `/api/token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic NDZmMjc4NmY4NTlhNGY3Y2JmNzQ4MmRlM2FjZmU3Y2Y6NjMxN2U3MzU2YjEzNDFhNTkwMmRlMzFmOWI4NTkxZmQ=',
    },
  };
  // const req = https.request(options2, resp => {
  //   let body = '';
  //   resp.setEncoding('utf8');
  //   resp.on('data', function(chunk) {
  //     body += chunk;
  //   });
  //   resp.on('end', function() {
  //     const JSONBody = JSON.parse(body);
  //     console.log(JSONBody);
  //     access_token = JSONBody.access_token;
  //     expires_in = JSONBody.expires_in;
  //     refresh_token = JSONBody.refresh_token;
  //     //playSong('never ending story');
  //   });
  // });
  // req.write(
  //   qs.stringify({
  //     grant_type: 'authorization_code',
  //     code: code,
  //     redirect_uri: 'http://localhost:4001/redirect',
  //   })
  // );
  // req.end();
  res.send(code);
})

app.listen(port, () => console.log(`Example app listening on port ${4001}!`));

// setInterval(() => grab(), 30 * 60 * 1000);

// const opts = {
//   identity: {
//     username: 'joeypilla',
//     password: 'oauth:mkfkj68dim2g2ngpkpkhr9ypydq3pk',
//   },
//   channels: ['ibrinksquad'],
// };

// // Create a client with our options
// const client = new tmi.client(opts);

// // Register our event handlers (defined below)
// client.on('message', onMessageHandler);
// client.on('connected', onConnectedHandler);

// // Connect to Twitch:
// client.connect();

// // Called every time a message comes in
// function onMessageHandler(target, context, msg, self) {
//   if (self) {
//     return;
//   } // Ignore messages from the bot

//   // Remove whitespace from chat message
//   const commandName = msg.trim();
//   if (commandName === '!dice') {
//     const num = rollDice();
//     client.say(target, `You rolled a ${num}`);
//     client.deletemessage(target, context.id);
//     console.log(`* Executed ${commandName} command`);
//   } else if (
//     commandName.toLowerCase().includes('alexa play') ||
//     commandName.toLowerCase().includes('!song')
//   ) {
//     if (commandName.toLowerCase().includes('!song')) {
//       client.say(
//         target,
//         `Sorry, ${
//           context['display-name']
//         }, Nightbot is not smart enough to play songs for you. Have no fear, the superior bot can.`
//       );
//       playSong(commandName.toLowerCase().replace('!song ', ''));
//     } else {
//       playSong(commandName.toLowerCase().replace('alexa play ', ''));
//     }
//   } else if (commandName.includes('!drink') && commandName.length > 6) {
//     client.say(
//       target,
//       `Sorry, ${
//         context['display-name']
//       }, Nightbot is too simple to understand your basic command. Alexa play I'm upset. Have no fear, I got you.`
//     );
//     client.say(target, `!drink`);
//   } else if (commandName.toLowerCase().includes('magic8ball')) {
//     let y = Math.random();

//     if (y < 0.5) {
//       y = Math.floor(y);
//     } else {
//       y = Math.ceil(y);
//     }
//     const resp = y === 0 ? 'No' : 'Yes';

//     client.say(target, `Magic 8 ball says...`);
//     client.say(target, `${resp}.`);
//   } else if (commandName.includes('you suck')) {
//     client.deletemessage(target, context.id);
//     client.say(target, `No ${context['display-name']} you suck`);
//   } else if (commandName.toLowerCase().includes('alexa volume ')) {
//     if (context.mod || context['display-name'] === 'ibrinksquad') {
//       setVolume(
//         parseInt(commandName.toLowerCase().replace('alexa volume ', ''))
//       );
//     } else {
//       client.say(target, `Setting volume is reserved for moderators only.`);
//     }
//   } else if (
//     commandName
//       .replace('\\P{L}', '')
//       .replace(/\s/g, '')
//       .includes('glitch')
//   ) {
//     client.deletemessage(target, context.id);
//     client.timeout(target, context.username, 60).then(data => {});
//   }
// }

// // Function called when the "dice" command is issued
// function rollDice() {
//   const sides = 6;
//   return Math.floor(Math.random() * sides) + 1;
// }

// // Called every time the bot connects to Twitch chat
// function onConnectedHandler(addr, port) {
//   console.log(`* Connected to ${addr}:${port}`);
//   client.color('blue');
// }

// function setVolume(volume) {
//   const options = {
//     hostname: 'api.spotify.com',
//     path: `/v1/me/player/volume?volume_percent=${volume * 10}`,
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   };

//   const req = https.request(options, res => {
//     console.log(`statusCode: ${res.statusCode}`);
//     console.log(`statusCode: ${res.statusMessage}`);
//     res.on('data', d => {
//       process.stdout.write(d);
//     });
//   });
//   req.on('error', error => {
//     console.error(error);
//   });
//   req.write('');
//   req.end();
// }

// function playSong(input) {
//   const split = input.split('by');
//   const song = split[0].trim();
//   const artist = split[1] ? split[1].trim() : undefined;
//   const options2 = {
//     hostname: 'api.spotify.com',
//     path: `/v1/search?q=track:${song.replace(/ /g, '%20')}${
//       artist ? `%20artist:${artist.replace(/ /g, '%20')}` : ''
//     }&type=track`,
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   };

//   https.get(options2, resp => {
//     let body = '';
//     resp.setEncoding('utf8');
//     resp.on('data', function(chunk) {
//       body += chunk;
//     });
//     resp.on('end', function() {
//       const spotifyResp = JSON.parse(body);
//       // console.log('Got a response: ', spotifyResp.tracks.items);
//       // console.log(spotifyResp.tracks.items);
//       const sort = spotifyResp.tracks.items.sort(
//         (a, b) => b.popularity - a.popularity
//       );

//       const options = {
//         hostname: 'api.spotify.com',
//         path:
//           '/v1/me/player/play?device_id=1ee3b4f313782f9edda73439b1304ccc4dbbb523',
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       };

//       const req = https.request(options, res => {
//         console.log(`statusCode: ${res.statusCode}`);
//         console.log(`statusCode: ${res.statusMessage}`);
//         res.on('data', d => {
//           process.stdout.write(d);
//         });
//       });
//       req.on('error', error => {
//         console.error(error);
//       });
//       req.write(JSON.stringify({ uris: [spotifyResp.tracks.items[0].uri] }));
//       req.end();
//     });
//   });
// }

// function grab() {
//   const options2 = {
//     hostname: 'accounts.spotify.com',
//     path: `/api/token`,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization:
//         'Basic NDZmMjc4NmY4NTlhNGY3Y2JmNzQ4MmRlM2FjZmU3Y2Y6NjMxN2U3MzU2YjEzNDFhNTkwMmRlMzFmOWI4NTkxZmQ=',
//     },
//   };
//   const req = https.request(options2, resp => {
//     let body = '';
//     resp.setEncoding('utf8');
//     resp.on('data', function(chunk) {
//       body += chunk;
//     });
//     resp.on('end', function() {
//       const JSONBody = JSON.parse(body);
//       console.log(JSONBody);
//       access_token = JSONBody.access_token;
//     });
//   });
//   req.write(
//     qs.stringify({
//       grant_type: 'refresh_token',
//       refresh_token,
//     })
//   );
//   req.end();
// }
