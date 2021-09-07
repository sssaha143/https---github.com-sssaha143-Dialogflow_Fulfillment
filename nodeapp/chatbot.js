const dialogflow = require("dialogflow");

const dialogflowConfig = require("./config");
const projectId = dialogflowConfig.projectId;
const configuration = {
  credentials: {
    private_key: dialogflowConfig.privateKey,
    client_email: dialogflowConfig.clientEmail
  }
};

const sessionId = "987654";
const languageCode = "en-US";
const sessionClient = new dialogflow.SessionsClient(configuration);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

async function talkToChatbot(message) {
  console.log("message " + message);
  const botRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    }
  };

  const response = await sessionClient
    .detectIntent(botRequest)
    .then((responses) => {
      console.log(JSON.stringify(responses));
      //new code
      console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }
    //new code
      const requiredResponse = responses[0].queryResult;
      return requiredResponse;
    })
    .catch((error) => {
      console.log("ERROR: " + error);
    });
    
    

  return response;
}

module.exports = talkToChatbot;