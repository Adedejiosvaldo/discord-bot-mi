require("dotenv").config();
const cron = require("node-cron");
const fetch = require("node-fetch");
const { Client, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const client = new Client({ intents: ["Guilds", "GuildMessages"] });

client.on("ready", async () => {
  const channel = client.channels.cache.get(`1022070433996087296`);
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
  );
  const data = await response.json();

  const exampleEmbed = {
    title: `${data.title}`,
    image: {
      url: `${data.hdurl}`,
    },
  };
  // 0 8 * * *
  console.log("running a task every minute");

  cron.schedule("0 8 * * * *", function () {
    console.log("running from cron");
    channel.send({ embeds: [exampleEmbed] });
  });
});
client.login(process.env.Token);
