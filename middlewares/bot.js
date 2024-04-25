const { App, ExpressReceiver } = require("@slack/bolt");
const signingSecret = process.env["SLACK_SIGNING_SECRET"];
const token = process.env["SLACK_BOT_TOKEN"];

const createApp = (appName) => {
  const receiver = new ExpressReceiver({
    signingSecret,
    endpoints: {
      events: `/${appName}/slack/events`,
    },
  });
  const app = new App({
    token,
    receiver,
  });

  return { app, receiver };
};

module.exports = createApp;
