const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

async function sendButton(channel, text, buttons, embedOptions = {}) {
    const row = new ActionRowBuilder();
    
    buttons.forEach(([label, customId]) => {
        row.addComponents(
            new ButtonBuilder()
                .setCustomId(customId)
                .setLabel(label)
                .setStyle(ButtonStyle.Primary)
        );
    });

    const embed = new EmbedBuilder()
        .setDescription(text)
        .setColor(embedOptions.color || 0x0099ff)
        .setImage(embedOptions.image || null)
        .setFooter({ text: embedOptions.footer || 'Bot', iconURL: embedOptions.footerIcon || null });

    const msg = await channel.send({ embeds: [embed], components: [row] });
    return msg; // Asegúrate de devolver el mensaje
}

function isUrl(url) {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

function runtime(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
    //𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗
	var dDisplay = d < 10 ? String("0" + d) : d >= 10 ? String(d) : "00"; 
         var hDisplay = h < 10 ? String("0" + h) : h >= 10 ? String(h) : "00"; 
         var mDisplay = m < 10 ? String("0" + m) : m >= 10 ? String(m) : "00"; 
         var sDisplay = s < 10 ? String("0" + s) : s > 10 ? String(s) : "0"; 
     dDisplay = dDisplay.replace(/1/g, "1") 
     dDisplay = dDisplay.replace(/2/g, "2") 
     dDisplay = dDisplay.replace(/3/g, "3") 
     dDisplay = dDisplay.replace(/4/g, "4") 
     dDisplay = dDisplay.replace(/5/g, "5") 
     dDisplay = dDisplay.replace(/6/g, "6") 
     dDisplay = dDisplay.replace(/7/g, "7") 
     dDisplay = dDisplay.replace(/8/g, "8") 
     dDisplay = dDisplay.replace(/9/g, "9") 
     dDisplay = dDisplay.replace(/1/g, "1") 
     dDisplay = dDisplay.replace(/2/g, "2") 
     dDisplay = dDisplay.replace(/3/g, "3") 
     dDisplay = dDisplay.replace(/4/g, "4") 
     dDisplay = dDisplay.replace(/5/g, "5") 
     dDisplay = dDisplay.replace(/6/g, "6") 
     dDisplay = dDisplay.replace(/7/g, "7") 
     dDisplay = dDisplay.replace(/8/g, "8") 
     dDisplay = dDisplay.replace(/9/g, "9") 
     dDisplay = dDisplay.replace(/1/g, "1") 
     dDisplay = dDisplay.replace(/2/g, "2") 
     dDisplay = dDisplay.replace(/3/g, "3") 
     dDisplay = dDisplay.replace(/4/g, "4") 
     dDisplay = dDisplay.replace(/5/g, "5") 
     dDisplay = dDisplay.replace(/6/g, "6") 
     dDisplay = dDisplay.replace(/7/g, "7") 
     dDisplay = dDisplay.replace(/8/g, "8") 
     dDisplay = dDisplay.replace(/9/g, "9") 
     dDisplay = dDisplay.replace(/1/g, "1") 
     dDisplay = dDisplay.replace(/2/g, "2") 
     dDisplay = dDisplay.replace(/3/g, "3") 
     dDisplay = dDisplay.replace(/4/g, "4") 
     dDisplay = dDisplay.replace(/5/g, "5") 
     dDisplay = dDisplay.replace(/6/g, "6") 
     dDisplay = dDisplay.replace(/7/g, "7") 
     dDisplay = dDisplay.replace(/8/g, "8") 
     dDisplay = dDisplay.replace(/9/g, "9") 
     dDisplay = dDisplay.replace(/0/g, "0") 
     hDisplay = hDisplay.replace(/0/g, "0") 
     mDisplay = mDisplay.replace(/0/g, "0") 
     sDisplay = sDisplay.replace(/0/g, "0") 

	return dDisplay + ":" + hDisplay + ":" + mDisplay + ":" + sDisplay;
}

module.exports = { sendButton, isUrl, runtime };

