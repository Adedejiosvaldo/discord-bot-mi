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

// Schedule tasks to be run on the server.
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-BingApis-SDK': 'true',
// 		'X-RapidAPI-Key': 'f7ad762662mshba6d72e8875454ap1c2533jsncc007be8b2c3',
// 		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
// 	}
// };

// fetch('https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
