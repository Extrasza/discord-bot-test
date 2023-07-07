const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("alive")
        .setDescription("Verifica se o bot está respondendo"),

    async execute(interaction) {
        await interaction.reply("Estou vivo! ");
    }
}