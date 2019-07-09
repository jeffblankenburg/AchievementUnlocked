/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

const AchievementSound = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>"
var AchievementSpeech = "";
var AchievementCount = 0;
var sessionCounter = 0;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Welcome to Achievement Unlocked, you can say hello!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello World", speechText)
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
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + "In this skill, you can try saying anything you want to try to unlock new achievements!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent"
        || handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent");
  },
  handle(handlerInput) {
    const speechText = "Goodbye!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
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

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  },
};

function CheckForAchievements(handlerInput)
{
  console.log("CHECKING FOR ACHIEVEMENTS");
  AchievementSpeech = "";
  AchievementCount = 0;
  CheckSessionAchievements(handlerInput);
  CheckRequestAchievements(handlerInput);
  CheckDeviceAchievements(handlerInput);
  CheckIntentAchievements(handlerInput);
  if (AchievementCount > 5) RemoveSounds(handlerInput)
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
  if (sessionAttributes.requestCount >= 5) createAchievement("You talked with this skill five times in one session.");

  //TEN REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 10) createAchievement("You talked with this skill ten times in one session.");

  //TWENTY-FIVE REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 25) createAchievement("You talked with this skill 25 times in one session.");

  //FIFTY REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 50) createAchievement("You talked with this skill fifty times in one session.");

  //ONE HUNDRED REQUESTS IN ONE SESSION.
  if (sessionAttributes.requestCount >= 100) createAchievement("You talked with this skill one hundred times in one session.");

  //STARTED FIRST SESSION.

  //FIFTH SESSION.

  //TENTH SESSION.

  //TWENTY-FIFTH SESSION.

  //FIFTIETH SESSION.

  //ONE HUNDRETH SESSION.
}

function CheckRequestAchievements(handlerInput)
{
  console.log("CHECKING REQUEST ACHIEVEMENTS");
  //FIVE TOTAL REQUESTS

  //TEN TOTAL REQUESTS

  //TWENTY-FIVE REQUESTS.

  //FIFTY REQUESTS.

  //ONE HUNDRED REQUESTS.

  //FIVE HUNDRED REQUESTS.

  //ONE THOUSAND REQUESTS.
}

function CheckDeviceAchievements(handlerInput)
{
  console.log("CHECKING DEVICE ACHIEVEMENTS");
  //SECOND DEVICE

  //THIRD DEVICE

  //FOUTH DEVICE

  //FIFTH DEVICE

  //TENTH DEVICE
}

function CheckIntentAchievements(handlerInput)
{
  if (handlerInput.requestEnvelope.request.type === "IntentRequest") {
    if (1 === 2) {}
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent") createAchievement("You said cancel.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent") createAchievement("You asked for help.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateHomeIntent") createAchievement("You asked to navigate home.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent") createAchievement("You said stop.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonActorIntent") createAchievement("You said the name of an actor.");
  }
}

function createAchievement(speechText)
{
  console.log("CREATING ACHIEVEMENT");
  AchievementSpeech += AchievementSound + "Achievement Unlocked: " + speechText + " ";
  AchievementCount++;
  //TODO: RECORD THIS ACHIEVEMENT SOMEWHERE.
}

function RemoveSounds()
{
  console.log("REMOVING SOUNDS")
  AchievementSpeech = AchievementSpeech.split(AchievementSound).join("");
  AchievementSpeech = AchievementSound + AchievementSpeech;
}

const RequestLog = {
  async process(handlerInput) {
    console.log("REQUEST ENVELOPE = " + JSON.stringify(handlerInput.requestEnvelope));
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

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(RequestLog)
  .addResponseInterceptors(ResponseLog)
  .lambda();
