const bolt = require("../middlewares/bot");

bolt.message("/slack/events", async ({ message, say }) => {
  if (req.body.challenge) {
    res.json({ challenge: req.body.challenge });
  } else {
    console.log("message", message);
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
    const { data } = await axios.post(
      "http://0.0.0.0:8001/v1/chat/completions",
      payload
    );
    await say(
      `Hello, <@${message.user}>, ${
        data.choices[0]?.message?.content || "Something went wrong. Try later."
      }`
    );
  }
});

module.exports = bolt;
