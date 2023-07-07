const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tally")
    .setDescription("Contas as reações das mensagens")
    .addIntegerOption((option) =>
      option
        .setName("date")
        .setDescription("Data da mensagem")
        .setRequired(false)
    ),

    async  execute(interaction) {
        try {
          // Ler todas as mensagens do canal
          const channel = interaction.channel;
          const messages = await channel.messages.fetch();
          const days = interaction.options.getInteger("date");
      
          // Objeto para armazenar a contagem de cada tipo de reação por mensagem
          const reactionCount = {};
      
          // Loop através de cada mensagem
          messages.forEach((message) => {
            ///verifica se a mensagem está entre hoje e `days` dias atrás
            if (days) {
                const date = new Date();
                const date2 = new Date(message.createdTimestamp);
                const diffTime = Math.abs(date2 - date);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays > days) {
                    return;
                }}

            // Verificar se a mensagem contém anexos (imagens)
            if (message.attachments.size > 0) {
              // Inicializar a contagem de reações para esta mensagem
              const messageId = message.id;
              reactionCount[messageId] = {};

              const reactionList = ("0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟");
      
              // Loop através de cada reação na mensagem
              message.reactions.cache.forEach((reaction) => {
                if(reactionList.includes(reaction.emoji.name)){
                // Armazenar a contagem de reações para cada tipo
                reactionCount[messageId][reaction.emoji.name] = reaction.count;
              }}
              );
            }
          });
      
          // Retornar a contagem de reações como um JSON
          const reactionCountJSON = JSON.stringify(reactionCount);
          console.log(reactionCountJSON);
          
          // Converter emojis para valores de 0 a 10
          const emojiValues = {
              "0️⃣": 0,
              "1️⃣": 1,
              "2️⃣": 2,
              "3️⃣": 3,
              "4️⃣": 4,
              "5️⃣": 5,
              "6️⃣": 6,
              "7️⃣": 7,
              "8️⃣": 8,
              "9️⃣": 9,
              "🔟": 10,
            };


            
            const reactionCountJSON2 = reactionCountJSON.replace(
                /0️⃣|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|7️⃣|8️⃣|9️⃣|🔟/g,
                (match) => emojiValues[match] || 0
                );


                const reactionCountJSON3 = JSON.parse(reactionCountJSON2);
                const reactionCountJSON4 = {};
                for (const [key, value] of Object.entries(reactionCountJSON3)) {
                    let sum = 0;
                    for (const [key2, value2] of Object.entries(value)) {
                        sum += key2 * value2;
                    }
                    reactionCountJSON4[key] = sum - 55;
                }
                const reactionCountJSON5 = JSON.stringify(reactionCountJSON4);

                
                console.log(reactionCountJSON5);

                const reactionCountJSON6 = JSON.parse(reactionCountJSON5);
                const reactionCountJSON7 = {};
                Object.keys(reactionCountJSON6).sort(function(a,b){return reactionCountJSON6[b]-reactionCountJSON6[a]}).forEach(function(key){
                    reactionCountJSON7[key] = reactionCountJSON6[key];
                });
                const reactionCountJSON8 = JSON.stringify(reactionCountJSON7);
                console.log(reactionCountJSON8);
                
                const reactionCountJSON9 = JSON.parse(reactionCountJSON8);
                const embeddedMessage1 = {
                    color: 0x00ff00, 
                    title: '🥇 O VENCEDOR 🥇',
                    description: `ESTA FOTO TEVE ${Object.values(reactionCountJSON9)[0]}`,
                  };
                  const embeddedMessage2 = {
                    color: 0x00ff00, // Set the color of the embedded message
                    title: '🥈 SEGUNDO LUGAR 🥈', // Set the title of the embedded message
                    description: `ESTA FOTO TEVE ${Object.values(reactionCountJSON9)[1]}`, // Set the description of the embedded message
                  };
                  const embeddedMessage3 = {
                    color: 0x00ff00, // Set the color of the embedded message
                    title: '🥉 TERCEIRO LUGAR 🥉', // Set the title of the embedded message
                    description: `ESTA FOTO TEVE ${Object.values(reactionCountJSON9)[2]}`, // Set the description of the embedded message
                  };

                        const targetMessage = Object.keys(reactionCountJSON9)[0];
                        const targetMessage2 = Object.keys(reactionCountJSON9)[1];
                        const targetMessage3 = Object.keys(reactionCountJSON9)[2];

                        interaction.reply("Votos contados!");
                        await new Promise(r => setTimeout(r, 3000));

              
                    const message = await channel.messages.fetch(targetMessage);
                    await message.reply({ embeds: [embeddedMessage1] });

                    const message1 = await channel.messages.fetch(targetMessage2);
                    await message1.reply({ embeds: [embeddedMessage2] });

                    const message2 = await channel.messages.fetch(targetMessage3);
                    await message2.reply({ embeds: [embeddedMessage3] });
                
              
                
                return reactionCountJSON8;
            } catch (error) {
                console.error(error);
            }
      }
}