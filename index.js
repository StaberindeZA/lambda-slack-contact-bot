const { App } = require("@slack/bolt");

const token = process.env.SLACK_BOT_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;

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
  
  const channel = 'personal-site-contact';
  
  const theBody = JSON.parse(event.body);
  
  const text = theBody.text == undefined ? "Default" : theBody.text;

  try {
    const app = await createApp();

    const result = await app.client.chat.postMessage({
      channel: channel,
      token: token,
      text: text,
    });
    // TODO implement
    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify('Hello from Lambda! + Result: ' + result.ok),
    };

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    throw("Message didn't get sent");
  }
    
};
