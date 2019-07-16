/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");
const https = require('https');
const Airtable = require('airtable');
const dashbot = require('dashbot')(process.env.dashbot_key).alexa;



const AchievementSound = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>"
var AchievementSpeech = "";
var AchievementCardText = "";  //TODO: WRITE A CARD WHEN THEY GET ANY ACHIEVEMENTS.
var AchievementCount = 0;
var UserRecord = "";

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Welcome to Achievement Unlocked!  There are over 500 different achievements you can collect in this game.  You have already completed " + UserRecord.Score + " of them.  What will you try next?";

    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
    return handlerInput.responseBuilder.getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent";
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Hello World!";

    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
    return handlerInput.responseBuilder.getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + "In this skill, you can try saying anything you want. Try to unlock new achievements!";
    
    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
    return handlerInput.responseBuilder.getResponse();
  }
};

const DateIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "DateIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + "Today's date is irrelevant.";
    
    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
    return handlerInput.responseBuilder.getResponse();
  }
};

const TimeIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "TimeIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + "Time is a construct.";
    
    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
    return handlerInput.responseBuilder.getResponse();
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

    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
    return handlerInput.responseBuilder.getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log("SESSION ENDED REQUEST. '" + handlerInput.requestEnvelope.request.reason + "'");
    return handlerInput.responseBuilder.getResponse();
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
    
    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
    return handlerInput.responseBuilder.getResponse();
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

    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
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

    handlerInput.responseBuilder.speak(setVoice(speechText)).reprompt(setVoice(speechText));
    if (AchievementCardText != "") handlerInput.responseBuilder.withStandardCard("ACHIEVEMENT UNLOCKED!", AchievementCardText, "https://achievementunlocked.s3.amazonaws.com/art/card_small_720x480.png", "https://achievementunlocked.s3.amazonaws.com/art/card_large_1200x800.png");
    return handlerInput.responseBuilder.getResponse();
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

  if (handlerInput.requestEnvelope.session.new === true) sessionAttributes.requestCount = 1;
  else sessionAttributes.requestCount++;

  //FIVE REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 5) createAchievement(1, "You talked with this skill five times in one session.");

  //TEN REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 10) createAchievement(2, "You talked with this skill ten times in one session.");

  //TWENTY-FIVE REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 25) createAchievement(3, "You talked with this skill 25 times in one session.");

  //FIFTY REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 50) createAchievement(4, "You talked with this skill fifty times in one session.");

  //ONE HUNDRED REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 100) createAchievement(5, "You talked with this skill one hundred times in one session.");

  //STARTED FIRST SESSION.
  if (UserRecord.SessionCount >= 1) createAchievement(49, "You opened this skill for the first time!");

  //FIFTH SESSION.
  if (UserRecord.SessionCount >= 5) createAchievement(50, "You opened this skill for the fifth time!");

  //TENTH SESSION.
  if (UserRecord.SessionCount >= 10) createAchievement(51, "You opened this skill for the tenth time!");

  //TWENTY-FIFTH SESSION.
  if (UserRecord.SessionCount >= 25) createAchievement(52, "You opened this skill for the twenty-fifth time!");

  //FIFTIETH SESSION.
  if (UserRecord.SessionCount >= 50) createAchievement(53, "You opened this skill for the fiftieth time!");

  //ONE HUNDRETH SESSION.
  if (UserRecord.SessionCount >= 100) createAchievement(54, "You opened this skill for the one hundreth time! Congratulations!");

  //USER LET THE SKILL TIME OUT.
}

function CheckRequestAchievements(handlerInput)
{
  console.log("CHECKING REQUEST ACHIEVEMENTS");

  //FIVE TOTAL REQUESTS
  if (UserRecord.InteractionCount >= 5) createAchievement(42, "You just said something to this skill for the fifth time!");

  //TEN TOTAL REQUESTS
  if (UserRecord.InteractionCount >= 10) createAchievement(43, "You just said something to this skill for the tenth time!");

  //TWENTY-FIVE REQUESTS.
  if (UserRecord.InteractionCount >= 25) createAchievement(44, "You just said something to this skill for the twenty-fifth time!");

  //FIFTY REQUESTS.
  if (UserRecord.InteractionCount >= 50) createAchievement(45, "You just said something to this skill for the fiftieth time!");

  //ONE HUNDRED REQUESTS.
  if (UserRecord.InteractionCount >= 100) createAchievement(46, "You just said something to this skill for the one hundreth time!");

  //FIVE HUNDRED REQUESTS.
  if (UserRecord.InteractionCount >= 500) createAchievement(47, "You just said something to this skill for the five hundreth time!");

  //ONE THOUSAND REQUESTS.
  if (UserRecord.InteractionCount >= 1000) createAchievement(48, "You just said something to this skill for the one thousandth time!  Congratulations!");

  //IF THE USER ONE-SHOT THE SKILL.  (NEW SESSION + INTENTREQUEST)
  if ((handlerInput.requestEnvelope.session.new === true) && (handlerInput.requestEnvelope.request.type === "IntentRequest")) createAchievement(57, "You asked the skill to do something before it was opened.  This is called a one-shot request.  Nice work!");

  //MORNING

  //AFTERNOON

  //EVENING

  //SPECIFIC LOCALES & LANGUAGES
  if (handlerInput.requestEnvelope.request.locale.includes("en-")) createAchievement(64, "You used this skill in English.");

  if (handlerInput.requestEnvelope.request.locale.includes("de-")) createAchievement(65, "You used this skill in German.");

  if (handlerInput.requestEnvelope.request.locale.includes("es-")) createAchievement(66, "You used this skill in Spanish.");

  if (handlerInput.requestEnvelope.request.locale.includes("fr-")) createAchievement(67, "You used this skill in French.");

  if (handlerInput.requestEnvelope.request.locale.includes("it-")) createAchievement(68, "You used this skill in Italian.");

  if (handlerInput.requestEnvelope.request.locale.includes("ja-")) createAchievement(69, "You used this skill in Japanese.");
  
  if (handlerInput.requestEnvelope.request.locale.includes("pt-")) createAchievement(70, "You used this skill in Portuguese.");

  if (handlerInput.requestEnvelope.request.locale.includes("-DE")) createAchievement(71, "You used this skill in Germany.");

  if (handlerInput.requestEnvelope.request.locale.includes("-AU")) createAchievement(72, "You used this skill in Australia.");

  if (handlerInput.requestEnvelope.request.locale.includes("-CA")) createAchievement(73, "You used this skill in Canada.");

  if (handlerInput.requestEnvelope.request.locale.includes("-UK")) createAchievement(74, "You used this skill in the United Kingdom.");

  if (handlerInput.requestEnvelope.request.locale.includes("-IN")) createAchievement(75, "You used this skill in India.");

  if (handlerInput.requestEnvelope.request.locale.includes("-US")) createAchievement(76, "You used this skill in the United States.");

  if (handlerInput.requestEnvelope.request.locale.includes("-ES")) createAchievement(77, "You used this skill in Spain.");

  if (handlerInput.requestEnvelope.request.locale.includes("-MX")) createAchievement(78, "You used this skill in Mexico.");

  if (handlerInput.requestEnvelope.request.locale.includes("-FR")) createAchievement(79, "You used this skill in France.");

  if (handlerInput.requestEnvelope.request.locale.includes("-IT")) createAchievement(80, "You used this skill in Italy.");

  if (handlerInput.requestEnvelope.request.locale.includes("-JP")) createAchievement(81, "You used this skill in Japan.");

  if (handlerInput.requestEnvelope.request.locale.includes("-BR")) createAchievement(82, "You used this skill in Brazil.");
}

async function CheckDeviceAchievements(handlerInput) {
  console.log("CHECKING DEVICE ACHIEVEMENTS");

  if (UserRecord.DeviceIdList === undefined) UserRecord.DeviceIdList = handlerInput.requestEnvelope.context.System.device.deviceId;
  else if (!UserRecord.DeviceIdList.includes(handlerInput.requestEnvelope.context.System.device.deviceId)) UserRecord.DeviceIdList += handlerInput.requestEnvelope.context.System.device.deviceId;
  else createAchievement(63, "You used a device more than once.");

  await UpdateDeviceIdList();

  //SECOND DEVICE
  if ((UserRecord.DeviceIdList.match(/.device./g) || []).length === 2) createAchievement(58, "You used a second device with this skill.");

  //THIRD DEVICE
  if ((UserRecord.DeviceIdList.match(/.device./g) || []).length === 3) createAchievement(59, "You used a third device with this skill.");

  //FOURTH DEVICE
  if ((UserRecord.DeviceIdList.match(/.device./g) || []).length === 4) createAchievement(60, "You used a fourth device with this skill.");

  //FIFTH DEVICE
  if ((UserRecord.DeviceIdList.match(/.device./g) || []).length === 5) createAchievement(61, "You used a fifth device with this skill.");

  //TENTH DEVICE
  if ((UserRecord.DeviceIdList.match(/.device./g) || []).length === 10) createAchievement(62, "You used a tenth device with this skill.");

  //RECTANGULAR SCREEN
  if (handlerInput.requestEnvelope.context.Viewport.shape === "RECTANGLE") createAchievement(56, "You used a device with a rectangular screen.");

  //ROUND SCREEN
  if (handlerInput.requestEnvelope.context.Viewport.shape === "ROUND") createAchievement(55, "You used a device with a round screen.");
  
  //NO SCREEN
}

async function UpdateDeviceIdList() {
  console.log("UPDATING DEVICE ID LIST.");

  var airtable = await new Airtable({apiKey: process.env.airtable_key}).base("appx5AkeU3qgwlYDn");
  airtable('User').update(UserRecord.RecordId, {
    DeviceIdList: UserRecord.DeviceIdList
    }, function(err, record) {
        if (err) { console.error(err); return; }
    });
}

function CheckIntentAchievements(handlerInput)
{
  if (handlerInput.requestEnvelope.request.type === "IntentRequest") {
    if (1 === 2) {}
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent") createAchievement(6, "You said 'cancel'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.FallbackIntent") createAchievement(7, "You said something we didn't anticipate.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent") createAchievement(8, "You said 'help'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.LoopOffIntent") createAchievement(9, "You said 'loop off'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.LoopOnIntent") createAchievement(10, "You said 'loop on'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.MoreIntent") createAchievement(11, "You said 'more'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateHomeIntent") createAchievement(12, "You said 'navigate home'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateSettingsIntent") createAchievement(13, "You 'navigate settings'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NextIntent") createAchievement(14, "You said 'next'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NoIntent") createAchievement(15, "You said 'no'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PageDownIntent") createAchievement(16, "You said 'page down'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PageUpIntent") createAchievement(17, "You said 'page up'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PauseIntent") createAchievement(18, "You said 'pause'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PreviousIntent") createAchievement(19, "You said 'previous'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.RepeatIntent") createAchievement(20, "You said 'repeat'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ResumeIntent") createAchievement(21, "You said 'resume'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollDownIntent") createAchievement(22, "You said 'scroll down'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollLeftIntent") createAchievement(23, "You said 'scroll left'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollRightIntent") createAchievement(24, "You said 'scroll right'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollUpIntent") createAchievement(25, "You said 'scroll up'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.SelectIntent") createAchievement(26, "You said 'select'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ShuffleOffIntent") createAchievement(27, "You said 'shuffle off'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ShuffleOnIntent") createAchievement(28, "You said 'shuffle on'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StartOverIntent") createAchievement(29, "You said 'start over'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent") createAchievement(30, "You said 'stop'.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.YesIntent") createAchievement(31, "You said 'yes'.");

    else if (handlerInput.requestEnvelope.request.intent.name === "DateIntent") createAchievement(41, "You asked me about a date.");
    //TODO: Respond with the date that the user indicated.

    else if (handlerInput.requestEnvelope.request.intent.name === "TimeIntent") createAchievement(32, "You asked me about a time.");
    //TODO: Respond with the time that the user indicated.



    //else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAdministrativeAreaIntent") createAchievement(33, "You said the name of an administrative area.");
    //else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAirlineIntent") createAchievement(34, "You said the name of an airline.");
    //else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAirportIntent") createAchievement(35, "You said the name of an airport.");
    //else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAnimalIntent") createAchievement(36, "You said the name of an animal.");
    //else if (handlerInput.requestEnvelope.request.intent.name === "AmazonArtistIntent") createAchievement(37, "You said the name of an artist.");
    //else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAthleteIntent") createAchievement(38, "You said the name of an athlete.");
    //else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAuthorIntent") createAchievement(39, "You said the name of an author.");
    //else if (handlerInput.requestEnvelope.request.intent.name === "AmazonBookIntent") createAchievement(40, "You said the name of a book.");
  }
}

async function createAchievement(achievementId, speechText)
{
  if (IsAchievementIncomplete(achievementId)) {
    console.log("USER COMPLETED ACHIEVEMENT " + getFieldName(achievementId) + ". '" + speechText + "'");
    AchievementSpeech += AchievementSound + "Achievement Unlocked: " + speechText + " ";
    AchievementCardText += speechText + "\n";
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
  else console.log("USER HAS ALREADY COMPLETED ACHIEVEMENT " + getFieldName(achievementId) + ". '" + speechText + "'");
}

function getFieldName(achievementId) {
  var fieldName = "ACH";
  if (achievementId < 10) fieldName += "00";
  else if (achievementId < 100) fieldName += "0";
  return fieldName + achievementId;
}

function IsAchievementIncomplete(achievementId) {
  if (UserRecord[getFieldName(achievementId)] != undefined) return false;
  else return true;
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
    if (handlerInput.requestEnvelope.request.type != "SessionEndedRequest") {
      await IncrementInteractionCount();
      await IncrementSessionCount(handlerInput);
      CheckForAchievements(handlerInput);
    }
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
    DateIntentHandler,
    TimeIntentHandler,
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
