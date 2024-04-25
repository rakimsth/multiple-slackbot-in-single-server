require("dotenv").config();
const express = require("express");
const app = express();
const { rumsanBot } = require("./apps/rumsanBot");
const PORT = Number(process.env.PORT) || 3000;

app.use(rumsanBot.router);

app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`);
});
