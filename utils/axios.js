const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.AI_URL,
  timeout: 15000,
});

module.exports = instance;
