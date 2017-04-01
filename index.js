'use strict';
const co = require('co');
const request = require('co-request')
const querystring = require('querystring')
const token = require('./token.json').token
// import Alpr from 'alpr';
// import rollDice from 'rollDice';

console.log('Loading function');

let rektList = ["Not rekt","Rekt","Really Rekt","Tyrannosaurus Rekt","Cash4Rekt.com","Grapes of Rekt","Ship Rekt","Rekt markes the spot","Caught rekt handed","The Rekt Side Story","Singin' In The Rekt","Painting The Roses Rekt","Rekt Van Winkle","Parks and Rekt","Lord of the Rekts: The Reking of the King","Star Trekt","The Rekt Prince of Bel-Air","A Game of Rekt","Rektflix","Rekt it like it's hot","RektBox 360","The Rekt-men","School Of Rekt","I am Fire, I am Rekt","Rekt and Roll","Professor Rekt","Catcher in the Rekt","Rekt-22","Harry Potter: The Half-Rekt Prince","Great Rektspectations","Paper Scissors Rekt","RektCraft","Grand Rekt Auto V","Call of Rekt: Modern Reking 2","Legend Of Zelda: Ocarina of Rekt","Rekt It Ralph","Left 4 Rekt","www.rekkit.com","Pokemon: Fire Rekt","The Shawshank Rektemption","The Rektfather","The Rekt Knight","Fiddler on the Rekt","The Rekt Files","The Good, the Bad, and The Rekt","Forrekt Gump","The Silence of the Rekts","The Green Rekt","Gladirekt","Spirekted Away","Terminator 2: Rektment Day","The Rekt Knight Rises","The Rekt King","REKT-E","Citizen Rekt","Requiem for a Rekt","REKT TO REKT ass to ass","Star Wars: Episode VI - Return of the Rekt","Braverekt","Batrekt Begins","2001: A Rekt Odyssey","The Wolf of Rekt Street","Rekt's Labyrinth","12 Years a Rekt","Gravirekt","Finding Rekt","The Arekters","There Will Be Rekt","Christopher Rektellston","Hachi: A Rekt Tale","The Rekt Ultimatum","Shrekt","Rektal Exam","Rektium for a Dream","www.Trekt.tv","Erektile Dysfunction","2Girls1Rek"]

function* main(event,context){
    console.log('Rekt')

    let options = null

    let webhookURL = 'https://hooks.slack.com/services/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'
    let response = null
    let parsedBody = querystring.parse(event.body)
    let responseURL = parsedBody.response_url
    let userName = parsedBody.user_name
    let userID = parsedBody.user_id
    let channelID = parsedBody.channel_id
    let userInfoURL = 'https://slack.com/api/users.info?token=' + token +'&user=' + userID

    let userInfo = yield request(userInfoURL)
    let imageURL = JSON.parse(userInfo).user.profile.image_original
    
    console.log("Event Body: " + event.body)
    console.log("Raw URL: " + parsedBody.response_url)
    console.log("Response URL: " + responseURL)

    let max = rektList.length - 1

    let num = Math.floor(Math.random() * (max - 0 + 1) + 0);

    // console.log(rektList[num])

    let text = rektList[num]

    options = {
      uri: webhookURL,
      method: 'POST',
      json: {
        "username" : userName,
        "channel" : channelID, 
        "response_type" : "in_channel",
        "text" : ">" + text
        "attachments" : [
            {
                "author_icon" : imageURL
            }
        ]
      }
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        response = {
            "statusCode": 200,
            "headers": { },
            "body": ""
        };
      } else {
        response = {
            "statusCode" : 200,
            "headers" : { },
            "body" : "Error is " + error
        }
      }
      context.succeed(response);
    });
}

exports.handler = function(event, context) {
    co(main(event,context))
};
