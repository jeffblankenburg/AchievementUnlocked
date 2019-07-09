/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

const AchievementSound = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>"
var AchievementSpeech = "";
var AchievementCount = 0;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Welcome to Achievement Unlocked!  There are over 500 different achievements you can collect in this game.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
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
      //.withSimpleCard("Hello World", speechText)
      .getResponse();
  },
};

const AmazonActorIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonActorIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " What is your favorite thing that " + handlerInput.requestEnvelope.request.intent.slots.actor.value + " has been in?";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};

const AmazonAdministrativeAreaIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAdministrativeAreaIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Have you ever been to " + handlerInput.requestEnvelope.request.intent.slots.administrativearea.value + "?  It's one of my favorite places.";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};

const AmazonAirlineIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAirlineIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " I tend to avoid flying on airlines like " + handlerInput.requestEnvelope.request.intent.slots.airline.value + ".  I prefer to drive on the information superhighway.";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};

const AmazonAirportIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAirportIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " I've never been to the " + handlerInput.requestEnvelope.request.intent.slots.airport.value + " airport. What's your favorite restaurant there?";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};

const AmazonAnimalIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAnimalIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " Have you ever seen a " + handlerInput.requestEnvelope.request.intent.slots.animal.value + "?  Do you know where they are from?";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};

const AmazonArtistIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonArtistIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " What is your favorite thing that " + handlerInput.requestEnvelope.request.intent.slots.artist.value + " created? I'm still learning to appreciate their work.";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};

const AmazonAthleteIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAthleteIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " I can't remember what team " + handlerInput.requestEnvelope.request.intent.slots.athlete.value + " played for. Do you know?";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};

const AmazonAuthorIntentHandler = {
  canHandle(handlerInput) { return handlerInput.requestEnvelope.request.type === "IntentRequest" && handlerInput.requestEnvelope.request.intent.name === "AmazonAuthorIntent"; },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " What is your favorite thing that " + handlerInput.requestEnvelope.request.intent.slots.author.value + " has written?";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
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
    const speechText = AchievementSpeech + "In this skill, you can try saying anything you want to try to unlock new achievements!";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
  }
};


const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent"
        || handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent");
  },
  handle(handlerInput) {
    const speechText = AchievementSpeech + " If you are trying to actually leave this skill, say quit.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
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
      .speak(speechText)
      .reprompt(speechText)
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
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.FallbackIntent") createAchievement("You said something we didn't anticipate.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent") createAchievement("You asked for help.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.LoopOffIntent") createAchievement("You asked for the loop to be off.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.LoopOnIntent") createAchievement("You asked for the loop to be on.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.MoreIntent") createAchievement("You asked for more.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateHomeIntent") createAchievement("You asked to navigate home.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NavigateSettingsIntent") createAchievement("You asked to navigate to settings.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NextIntent") createAchievement("You said next.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.NoIntent") createAchievement("You said no.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PageDownIntent") createAchievement("You said page down.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PageUpIntent") createAchievement("You said page up.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PauseIntent") createAchievement("You said pause.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.PreviousIntent") createAchievement("You said previous.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.RepeatIntent") createAchievement("You said repeat.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ResumeIntent") createAchievement("You said resume.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollDownIntent") createAchievement("You said scroll down.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollLeftIntent") createAchievement("You said scroll left.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollRightIntent") createAchievement("You said scroll right.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ScrollUpIntent") createAchievement("You said scroll up.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.SelectIntent") createAchievement("You said select.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ShuffleOffIntent") createAchievement("You said shuffle off.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.ShuffleOnIntent") createAchievement("You said shuffle on.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StartOverIntent") createAchievement("You said start over.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent") createAchievement("You said stop.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AMAZON.YesIntent") createAchievement("You said yes.");

    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonActorIntent") createAchievement("You said the name of an actor.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAdministrativeAreaIntent") createAchievement("You said the name of an administrative area.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAirlineIntent") createAchievement("You said the name of an airline.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAirportIntent") createAchievement("You said the name of an airport.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAnimalIntent") createAchievement("You said the name of an animal.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonArtistIntent") createAchievement("You said the name of an artist.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAthleteIntent") createAchievement("You said the name of an athlete.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonAuthorIntent") createAchievement("You said the name of an author.");
    else if (handlerInput.requestEnvelope.request.intent.name === "AmazonBookIntent") createAchievement("You said the name of a book.");
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
  console.log("REMOVING SOUNDS BECAUSE THERE ARE MORE THAN FIVE ACHIEVEMENTS.")
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
    AmazonActorIntentHandler,
    AmazonAdministrativeAreaIntentHandler,
    AmazonAirlineIntentHandler,
    AmazonAirportIntentHandler,
    AmazonAnimalIntentHandler,
    AmazonArtistIntentHandler,
    AmazonAthleteIntentHandler,
    AmazonAuthorIntentHandler,
    AmazonBookIntentHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    UnusedIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(RequestLog)
  .addResponseInterceptors(ResponseLog)
  .lambda();
