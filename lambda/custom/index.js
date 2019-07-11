/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");
const https = require('https');
const Airtable = require('airtable');
const dashbot = require('dashbot')(process.env.dashbot_key).alexa;

const AchievementSound = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>"
var AchievementSpeech = "";
var AchievementCount = 0;
var UserRecord = "";

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Welcome to Achievement Unlocked!  There are over 500 different achievements you can collect in this game.  You have already completed " + UserRecord.Score + " of them.  What will you try next?";

    return handlerInput.responseBuilder
      .speak(setVoice(speechText))
      .reprompt(setVoice(speechText))
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent";
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Hello World!";

    return handlerInput.responseBuilder
      .speak(setVoice(speechText))
      .reprompt(setVoice(speechText))
      //.withSimpleCard("Hello World", speechText)
      .getResponse();
  },
};
const AmazonActorIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonActorIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " What is your favorite thing that " + handlerInput.requestEnvelope.request.intent.slots.actor.value + " has been in?";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};
const AmazonAdministrativeAreaIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAdministrativeAreaIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Have you ever been to " + handlerInput.requestEnvelope.request.intent.slots.administrativearea.value + "?  It's one of my favorite places.";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};
const AmazonAirlineIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAirlineIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " I tend to avoid flying on airlines like " + handlerInput.requestEnvelope.request.intent.slots.airline.value + ".  I prefer to drive on the information superhighway.";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};
const AmazonAirportIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAirportIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " I've never been to the " + handlerInput.requestEnvelope.request.intent.slots.airport.value + " airport. What's your favorite restaurant there?";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};
const AmazonAnimalIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAnimalIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Have you ever seen a " + handlerInput.requestEnvelope.request.intent.slots.animal.value + "?  Do you know where they are from?";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};
const AmazonArtistIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonArtistIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " What is your favorite thing that " + handlerInput.requestEnvelope.request.intent.slots.artist.value + " created? I'm still learning to appreciate their work.";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};
const AmazonAthleteIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAthleteIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " I can't remember what team " + handlerInput.requestEnvelope.request.intent.slots.athlete.value + " played for. Do you know?";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};
const AmazonAuthorIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAuthorIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " What is your favorite thing that " + handlerInput.requestEnvelope.request.intent.slots.author.value + " has written?";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};
const AmazonBookIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonBookIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " " + handlerInput.requestEnvelope.request.intent.slots.book.value + " is one of my favorite books, but I can't remember the name of the author.  Do you happen to know who wrote it?";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + "In this skill, you can try saying anything you want. Try to unlock new achievements!";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent"
        || handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent");
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " If you are actually trying to leave this skill, say quit.";

    return handlerInput.responseBuilder
      .speak(setVoice(speechText))
      .reprompt(setVoice(speechText))
      .getResponse();
  },
};

const ChangeVoiceIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "ChangeVoiceIntent"; },
  async handle(handlerInput) {
    var name = handlerInput.requestEnvelope.request.intent.slots.voice.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    var language = handlerInput.requestEnvelope.request.intent.slots.voice.resolutions.resolutionsPerAuthority[0].values[0].value.id.slice(0,5);

    if (name === "Alexa") {
      name = "";
      language = "";
    }

    UserRecord.Voice = name;
    UserRecord.Language = language;

    var airtable = await new Airtable({apiKey: process.env.airtable_key}).base("appx5AkeU3qgwlYDn");
    airtable('User').update(UserRecord.RecordId, {
      Voice: name,
      Language: language
      }, function(err, record) {
          if (err) { console.error(err); return; }
      });

    if ((name === undefined) || (name === "")) name = "Alexa";

    const speechText = AchievementSpeech + "There are twenty-seven different Polly voices, and you chose " + name + "?  That's an interesting choice. What else are you going to try?";
    return handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText)).getResponse();
  }
};

const UnusedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PreviousIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.NextIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateHomeIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.LoopOffIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.LoopOnIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.MoreIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateSettingsIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.NextIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.NoIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.PageDownIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.PageUpIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.PauseIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.PreviousIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.RepeatIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.ResumeIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollDownIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollLeftIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollRightIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollUpIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.SelectIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.ShuffleOffIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.ShuffleOnIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.StartOverIntent"
      ||  handlerInput.requestEnvelope.request.intent.name === "AMAZON.YesIntent");
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Which achievement will you go for next?";

    return handlerInput.responseBuilder
      .speak(setVoice(speechText))
      .reprompt(setVoice(speechText))
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);

    var speechText = "Sorry.  Something went wrong.  Try something else.";

    return handlerInput.responseBuilder
      .speak(setVoice(speechText))
      .reprompt(setVoice(speechText))
      .getResponse();
  },
};

function setVoice(speechText) {
  if ((UserRecord.Voice != undefined) && (UserRecord.Voice != "")){
    return "<voice name='" + UserRecord.Voice + "'><lang xml:lang='" + UserRecord.Language + "'>" + speechText + "</lang></voice>";
  }
  else return speechText;
}

function CheckForAchievements(handlerInput) {
  console.log("CHECKING FOR ACHIEVEMENTS");
  AchievementSpeech = "";
  AchievementCount = 0;
  CheckSessionAchievements(handlerInput);
  CheckRequestAchievements(handlerInput);
  CheckDeviceAchievements(handlerInput);
  CheckIntentAchievements(handlerInput);
  if (AchievementCount > 5) RemoveSounds(handlerInput)
}

async function IncrementSessionCount(handlerInput) {
  if (handlerInput.requestEnvelope.session.new === true) {
    console.log("INCREMENTING SESSION COUNT FROM " + UserRecord.SessionCount + " TO " + (parseInt(UserRecord.SessionCount) + 1));
    UserRecord.SessionCount++;

    var airtable = await new Airtable({apiKey: process.env.airtable_key}).base("appx5AkeU3qgwlYDn");
    airtable('User').update(UserRecord.RecordId, {
      SessionCount: UserRecord.SessionCount
      }, function(err, record) {
          if (err) { console.error(err); return; }
      });
  }
}

async function IncrementInteractionCount() {
  console.log("INCREMENTING INTERACTION COUNT FROM " + UserRecord.InteractionCount + " TO " + (parseInt(UserRecord.InteractionCount) + 1));
  UserRecord.InteractionCount++;

  var airtable = await new Airtable({apiKey: process.env.airtable_key}).base("appx5AkeU3qgwlYDn");
  airtable('User').update(UserRecord.RecordId, {
    InteractionCount: UserRecord.InteractionCount
    }, function(err, record) {
        if (err) { console.error(err); return; }
    });
}

function CheckSessionAchievements(handlerInput)
{
  console.log("CHECKING SESSION ACHIEVEMENTS");
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

  if (handlerInput.requestEnvelope.session.new === true) {
    sessionAttributes.requestCount = 1;
  }
  else {
    sessionAttributes.requestCount++;
  }

  //FIVE REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 5) createAchievement(001, "You talked with this skill five times in one session.");

  //TEN REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 10) createAchievement(002, "You talked with this skill ten times in one session.");

  //TWENTY-FIVE REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 25) createAchievement(003, "You talked with this skill 25 times in one session.");

  //FIFTY REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 50) createAchievement(004, "You talked with this skill fifty times in one session.");

  //ONE HUNDRED REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 100) createAchievement(005, "You talked with this skill one hundred times in one session.");

  //STARTED FIRST SESSION.
  if (UserRecord.SessionCount >= 1) createAchievement(049, "You opened this skill for the first time!");

  //FIFTH SESSION.
  if (UserRecord.SessionCount >= 5) createAchievement(050, "You opened this skill for the fifth time!");

  //TENTH SESSION.
  if (UserRecord.SessionCount >= 10) createAchievement(051, "You opened this skill for the tenth time!");

  //TWENTY-FIFTH SESSION.
  if (UserRecord.SessionCount >= 25) createAchievement(052, "You opened this skill for the twenty-fifth time!");

  //FIFTIETH SESSION.
  if (UserRecord.SessionCount >= 50) createAchievement(053, "You opened this skill for the fiftieth time!");

  //ONE HUNDRETH SESSION.
  if (UserRecord.SessionCount >= 100) createAchievement(054, "You opened this skill for the one hundreth time! Congratulations!");

  //USER LET THE SKILL TIME OUT.
}

function CheckRequestAchievements(handlerInput)
{
  console.log("CHECKING REQUEST ACHIEVEMENTS");
  //FIRST REQUEST
  if (UserRecord.InteractionCount >= 2) createAchievement(041, "You just had your first interaction with this skill. <say-as interpret-as='interjection'>booya</say-as>!");

  //FIVE TOTAL REQUESTS
  if (UserRecord.InteractionCount >= 5) createAchievement(042, "You just said something to this skill for the fifth time!");

  //TEN TOTAL REQUESTS
  if (UserRecord.InteractionCount >= 10) createAchievement(043, "You just said something to this skill for the tenth time!");

  //TWENTY-FIVE REQUESTS.
  if (UserRecord.InteractionCount >= 25) createAchievement(044, "You just said something to this skill for the twenty-fifth time!");

  //FIFTY REQUESTS.
  if (UserRecord.InteractionCount >= 50) createAchievement(045, "You just said something to this skill for the fiftieth time!");

  //ONE HUNDRED REQUESTS.
  if (UserRecord.InteractionCount >= 100) createAchievement(046, "You just said something to this skill for the one hundreth time!");

  //FIVE HUNDRED REQUESTS.
  if (UserRecord.InteractionCount >= 500) createAchievement(047, "You just said something to this skill for the five hundreth time!");

  //ONE THOUSAND REQUESTS.
  if (UserRecord.InteractionCount >= 1000) createAchievement(048, "You just said something to this skill for the one thousandth time!  Congratulations!");

  //MORNING

  //AFTERNOON

  //EVENING

  //SPECIFIC LOCALES
}

function CheckDeviceAchievements(handlerInput)
{
  console.log("CHECKING DEVICE ACHIEVEMENTS");
  //SECOND DEVICE

  //THIRD DEVICE

  //FOUTH DEVICE

  //FIFTH DEVICE

  //TENTH DEVICE

  //RECTANGULAR SCREEN

  //ROUND SCREEN
  
  //NO SCREEN
}

function CheckIntentAchievements(handlerInput)
{
  if (handlerInput.requestEnvelope.request.type === "IntentRequest") {
    if (1 === 2) {}
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent") createAchievement(006, "You said cancel.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.FallbackIntent") createAchievement(007, "You said something we didn't anticipate.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent") createAchievement(008, "You asked for help.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.LoopOffIntent") createAchievement(009, "You asked for the loop to be off.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.LoopOnIntent") createAchievement(010, "You asked for the loop to be on.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.MoreIntent") createAchievement(011, "You asked for more.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateHomeIntent") createAchievement(012, "You asked to navigate home.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateSettingsIntent") createAchievement(013, "You asked to navigate to settings.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NextIntent") createAchievement(014, "You said next.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NoIntent") createAchievement(015, "You said no.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PageDownIntent") createAchievement(016, "You said page down.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PageUpIntent") createAchievement(017, "You said page up.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PauseIntent") createAchievement(018, "You said pause.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PreviousIntent") createAchievement(019, "You said previous.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.RepeatIntent") createAchievement(020, "You said repeat.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ResumeIntent") createAchievement(021, "You said resume.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollDownIntent") createAchievement(022, "You said scroll down.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollLeftIntent") createAchievement(023, "You said scroll left.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollRightIntent") createAchievement(024, "You said scroll right.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollUpIntent") createAchievement(025, "You said scroll up.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.SelectIntent") createAchievement(026, "You said select.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ShuffleOffIntent") createAchievement(027, "You said shuffle off.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ShuffleOnIntent") createAchievement(028, "You said shuffle on.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StartOverIntent") createAchievement(029, "You said start over.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent") createAchievement(030, "You said stop.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.YesIntent") createAchievement(031, "You said yes.");

    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonActorIntent") createAchievement(032, "You said the name of an actor.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAdministrativeAreaIntent") createAchievement(033, "You said the name of an administrative area.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAirlineIntent") createAchievement(034, "You said the name of an airline.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAirportIntent") createAchievement(035, "You said the name of an airport.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAnimalIntent") createAchievement(036, "You said the name of an animal.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonArtistIntent") createAchievement(037, "You said the name of an artist.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAthleteIntent") createAchievement(038, "You said the name of an athlete.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAuthorIntent") createAchievement(039, "You said the name of an author.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonBookIntent") createAchievement(040, "You said the name of a book.");
  }
}

async function createAchievement(achievementId, speechText)
{
  if (IsAchievementIncomplete(achievementId)) {
    console.log("CREATING ACHIEVEMENT");
    AchievementSpeech += AchievementSound + "Achievement Unlocked: " + speechText + " ";
    AchievementCount++;
    //TODO: RECORD THIS ACHIEVEMENT SOMEWHERE.
    var fieldName = getFieldName(achievementId);
    UserRecord[fieldName] = Date.now();
    UserRecord.Score++;
    var airtable = await new Airtable({apiKey: process.env.airtable_key}).base("appx5AkeU3qgwlYDn");
    airtable('User').update(UserRecord.RecordId, {
      [fieldName]: Date.now(),
      Score: UserRecord.Score
      }, function(err, record) {
          if (err) { console.error(err); return; }
      });
  }
  else console.log("USER HAS ALREADY COMPLETED ACHIEVEMENT " + getFieldName(achievementId) + ".");
}

function getFieldName(achievementId) {
  var fieldName = "ACH";
  if (achievementId < 10) fieldName += "00";
  else if (achievementId < 100) fieldName += "0";
  return fieldName + achievementId;
}

function IsAchievementIncomplete(achievementId) {
  if (UserRecord[getFieldName(achievementId)] != undefined) return false;
  else {
    console.log("ACHIEVEMENT " + achievementId + " COMPLETED");
    return true;
  } 
}

function RemoveSounds()
{
  console.log("REMOVING SOUNDS BECAUSE THERE ARE MORE THAN FIVE ACHIEVEMENTS.  SSML CAN'T HAVE MORE THAN 5 SOUND EFFECTS IN ONE RESPONSE.")
  AchievementSpeech = AchievementSpeech.split(AchievementSound).join("");
  AchievementSpeech = AchievementSound + AchievementSpeech;
}

async function GetUserRecord(userId)
{
  console.log("GETTING USER RECORD")
  var filter = "&filterByFormula=%7BUserId%7D%3D%22" + encodeURIComponent(userId) + "%22";
  const userRecord = await httpGet("appx5AkeU3qgwlYDn", filter, "User");
  //IF THERE ISN'T A USER RECORD, CREATE ONE.
  if (userRecord.records.length === 0){
    console.log("CREATING NEW USER RECORD");
    var airtable = await new Airtable({apiKey: process.env.airtable_key}).base("appx5AkeU3qgwlYDn");
    return new Promise((resolve, reject) => {
    airtable('User').create({"UserId": userId, "Score":0, "SessionCount":0, "InteractionCount":0}, 
                    function(err, record) {
                            if (err) { console.error(err); return; }
                            resolve(record);
                        });
                    });
  }
  else{
    console.log("RETURNING FOUND USER RECORD = " + JSON.stringify(userRecord.records[0]));
    return await userRecord.records[0];
  }
}

function httpGet(base, filter, table = "Data"){
  //console.log("IN HTTP GET");
  //console.log("BASE = " + base);
  //console.log("FILTER = " + filter);
  
  var options = {
      host: "api.airtable.com",
      port: 443,
      path: "/v0/" + base + "/" + table + "?api_key=" + process.env.airtable_key + filter,
      method: 'GET',
  };
  
  return new Promise(((resolve, reject) => {
    const request = https.request(options, (response) => {
      response.setEncoding('utf8');
      let returnData = '';

      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(new Error(`${response.statusCode}: ${response.req.getHeader('host')} ${response.req.path}`));
      }
      console.log("FULL PATH = http://" + options.host + options.path);
      //console.log("HTTPS REQUEST OPTIONS = " + JSON.stringify(options));

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    request.end();
  }));
}

const RequestLog = {
  async process(handlerInput) {
    console.log("REQUEST ENVELOPE = " + JSON.stringify(handlerInput.requestEnvelope));
    var userRecord = await GetUserRecord(handlerInput.requestEnvelope.session.user.userId);
    await console.log("USER RECORD = " + JSON.stringify(userRecord.fields));
    UserRecord = userRecord.fields;
    await IncrementInteractionCount();
    await IncrementSessionCount(handlerInput);
    CheckForAchievements(handlerInput);
    return;
  }
};

const ResponseLog = {
  process(handlerInput) {
    console.log("RESPONSE BUILDER = " + JSON.stringify(handlerInput.responseBuilder.getResponse()));   
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = dashbot.handler(skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AmazonActorIntentHandler,
    AmazonAdministrativeAreaIntentHandler,
    AmazonAirlineIntentHandler,
    AmazonAirportIntentHandler,
    AmazonAnimalIntentHandler,
    AmazonArtistIntentHandler,
    AmazonAthleteIntentHandler,
    AmazonAuthorIntentHandler,
    AmazonBookIntentHandler,
    ChangeVoiceIntentHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    UnusedIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(RequestLog)
  .addResponseInterceptors(ResponseLog)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda());
