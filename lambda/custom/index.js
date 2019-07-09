/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

const AchievementSound = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>"
var AchievementSpeech = "";
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
    const speechText = "Hello World!";

    return handlerInput.responseBuilder
      .speak(speechText)
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
  CheckSessionAchievements(handlerInput);
  CheckRequestAchievements(handlerInput);
  CheckDeviceAchievements(handlerInput);
  CheckIntentAchievements(handlerInput);
}

function CheckSessionAchievements(handlerInput)
{
  //STARTED FIRST SESSION.

  //FIFTH SESSION.

  //TENTH SESSION.

  //TWENTY-FIFTH SESSION.

  //FIFTIETH SESSION.

  //ONE HUNDRETH SESSION.

  //FIVE REQUESTS IN ONE SESSION.

  //TEN REQUESTS IN ONE SESSION.

  //TWENTY-FIVE REQUESTS IN ONE SESSION.

  //FIFTY REQUESTS IN ONE SESSION.

  //ONE HUNDRED REQUESTS IN ONE SESSION.
}

function CheckRequestAchievements(handlerInput)
{
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
  //SECOND DEVICE

  //THIRD DEVICE

  //FOUTH DEVICE

  //FIFTH DEVICE

  //TENTH DEVICE
}

function CheckIntentAchievements(handlerInput)
{
  if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent")
  {
    createAchievement("Achievement Unlocked: You asked for help.")
  }
}

function createAchievement(speechText)
{
  AchievementSpeech += AchievementSound + speechText;
  //TODO: RECORD THIS ACHIEVEMENT SOMEWHERE.
}

const RequestLog = {
  async process(handlerInput) {
    CheckForAchievements(handlerInput);
    console.log("REQUEST ENVELOPE = " + JSON.stringify(handlerInput.requestEnvelope));
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
