const { SlashCommandBuilder } = require("discord.js");
const { channel } = require("node:diagnostics_channel");
const fs = require("node:fs");
const path = require("node:path");
const filePath = path.join(__dirname, "../server_channels.txt");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("configure")
    .setDescription("Configura o bot para criar as reações no canal")
    .addBooleanOption((option) =>
      option
        .setName("enable")
        .setDescription("Habilita ou desabilita as reações").setRequired(true)
    ),

  async execute(interaction) {
    const channelID = interaction.channelId;
    let date = new Date().toLocaleDateString("pt-BR");
    const enable = interaction.options.getBoolean("enable");

    if (enable) {
      fs.writeFile(filePath, `${channelID}|${date}`, (err) => {
        if (err) throw err;
        console.log(
          `Canal ${channelID} adicionado ao arquivo server_channels.txt`
        );
        interaction.reply("Canal configurado!");
      });
    } else if (!enable) {
      fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }

        fs.writeFile(filePath, '', "utf8", function (err) {
          if (err) return console.log(err);
        });
      });
      interaction.reply("Canal removido!");
    }
  },
};
