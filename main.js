const { Client, MessageAttachment } = require("discord.js");

// Create an instance of a Discord client
const client = new Client();

const request = require("request");

var data;
const prefix = "-";

client.once("ready", () => {
  console.log("DevBot is online");
  client.user.setActivity("Silicon Valley! S04", {
    type: "WATCHING",
  });

  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
    guild.channels.cache.forEach((channel) => {
      console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
    });
  });
});

client.on("message", (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    return;
  }
  if (receivedMessage.content.startsWith("-")) {
    processCommand(receivedMessage);
  }
});

client.on("guildMemberAdd", (member) => {
  console.log(member);
  const channel = member.guild.channels.cache.find(
    (channel) => channel.name === "general"
  );
  channel.send(
    `Welcome to this server 🥳, developer 👨🏾‍💻 ${member} ! and I got your back 😎`
  );
});

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1);
  let splitCommand = fullCommand.split(" ");
  let primaryCommand = splitCommand[0];
  let arguments = splitCommand.slice(1);
  console.log(fullCommand);

  if (primaryCommand == "help") {
    helpCommand(arguments, receivedMessage);
  } else if (primaryCommand == "courses") {
    courseCommand(arguments, receivedMessage);
  } else if (primaryCommand == "maker") {
    receivedMessage.channel.send(
      "He is my maker 😎👨🏻‍💻! " + "https://github.com/Devansh252"
    );
  } else if (primaryCommand == "hackathons") {
    request(
      {
        url: `https://www.googleapis.com/customsearch/v1?key=${search_key}&cx=e567aba6b1dfc8930&q=upcoming hackathons`,
        json: true,
      },
      (err, response, body) => {
        var l = body.items[1].pagemap.event.slice(0, body.items.length);
        var urls = [];
        receivedMessage.channel.send("Got Something for you 👨🏻‍💻!");
        for (var i = 0; i < l.length; i++) {
          receivedMessage.channel.send(l[i].url);
        }
      }
    );
  } else {
    const attachment = new MessageAttachment(
      "https://raw.githubusercontent.com/Devansh252/assets-DevBot/main/commands%20for%20DevBot.png"
    );
    receivedMessage.channel.send(attachment);
  }
}

function helpCommand(arguments, receivedMessage) {
  if (arguments.length == 0) {
    receivedMessage.channel.send(
      " I'm not sure what you need help with. Try `-help [topic]`"
    );
  } else if (arguments == "jobs" || arguments == "internships") {
    request(
      {
        url: `https://www.googleapis.com/customsearch/v1?key=${search_key}&cx=93e251d584d0ad946&q=${arguments}`,
        json: true,
      },
      (err, response, body) => {
        var l;
        receivedMessage.channel.send("Got Something for you 💼!");
        for (var i = 0; i < body.items.length; i++) {
          receivedMessage.channel.send(body.items[i].link);
        }
      }
    );
  }
}

function courseCommand(arguments, receivedMessage) {
  if (arguments.length == 0) {
    receivedMessage.channel.send(
      " I'm not sure what you need help with. Try `-courses [topic]`"
    );
  } else {
    request(
      {
        url: `https://www.googleapis.com/customsearch/v1?key=${search_key}&cx=903873ac190cb0347&q=${arguments}`,
        json: true,
      },
      (err, response, body) => {
        var l;
        receivedMessage.channel.send(
          "Got some hand-picked courses for you 📚!"
        );
        for (var i = 0; i < body.items.length; i++) {
          receivedMessage.channel.send(body.items[i].link);
        }
      }
    );
  }
}

client.login(`${client_token}`);
