const { App } = require("@slack/bolt");

const token = process.env.SLACK_BOT_TOKEN || 'INSERT_TOKEN';
const signingSecret = process.env.SLACK_SIGNING_SECRET || 'INSERT_SIGNING_SECRET';
const channel = process.env.SLACK_CHANNEL || '#SLACK_CHANNEL';

const createApp = async () => {
  try {
    const app = new App({
      token: token,
      signingSecret: signingSecret,
    });
    return app;
  } catch (e) {
    console.log(e);
  }
}

exports.handler = async (event) => {
  const theBody = JSON.parse(event.body);
  
  const text = theBody.text == undefined ? "Default" : theBody.text;

  try {
    const app = await createApp();

    const result = await app.client.chat.postMessage({
      channel: channel,
      token: token,
      text: text,
    });
    
    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify('Slack message sent! + Result: ' + result.ok),
    };

    return response;
  } catch (e) {
    console.log(e);
    throw("Error. Message didn't get sent to Slack!");
  }
    
};

