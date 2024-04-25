const instance = require("../utils/axios");
const createApp = require("../middlewares/bot");

const { app, receiver } = createApp("rumsanbot");

app.message(async ({ message, say }) => {
  try {
    const payload = {
      messages: [
        {
          role: "user",
          content: message.text,
        },
      ],
      system_prompt:
        "You can only answer questions about the provided context. If you know the answer but it is not based in the provided context, don't provide the answer. Just state the answer is not in the context provided.",
      use_context: true,
      stream: false,
    };
    const { data } = await instance.post("/v1/chat/completions", payload);
    await say(
      `Hello, <@${message.user}>, ${
        data.choices[0]?.message?.content || "Something went wrong. Try later."
      }`
    );
  } catch (e) {}
});

module.exports = { rumsanBot: receiver };
