const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { scoreReactions } = require("./reactions.js");

const dotenv = require("dotenv");
dotenv.config();
const { TOKEN } = process.env;

const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds,,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions,] });
client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `Esse comando em ${filePath} está com "data" ou "execute ausentes"`
    );
  }
}

client.once(Events.ClientReady, (c) => {
  console.log(`Pronto! Login realizado como ${c.user.tag}`);
});
client.login(TOKEN);

client.on(Events.MessageCreate, message => {
  const channelID = message.channel.id;
  if (message.attachments.size > 0) {
  const filePath = path.join(__dirname, "server_channels.txt");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    if (data.includes(channelID)) {
        scoreReactions(message);
      }
    });};});


client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Comando não encontrado");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Houve um erro ao executar esse comando!");
  }
});
