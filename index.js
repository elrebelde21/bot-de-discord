//CÓDIGO ECHO DESDE 0 
//POR @elrebelde21
//base para tu bot de discord, espero te gustes :v

//----------------[ IMPORTACIONES ]--------------------
require('./settings.js'); 
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Partials, EmbedBuilder } = require('discord.js'); // Importa las clases necesarias de discord.js para manejar el bot de Discord
const {isUrl, runtime, sendButton} = require('./libs/fuctions'); // Importa funciones personalizadas para validar URLs, medir tiempo de ejecución y enviar botones
const fs = require('fs'); // Permite trabajar con el sistema de archivos
const yargs = require('yargs/yargs'); // Facilita la creación y gestión de comandos en la línea de comandos
const chalk = require('chalk'); // Permite estilizar el texto en la consola con colores
const { promisify } = require('util'); // Convierte funciones basadas en callback a promesas
const cp = require('child_process'); // Permite ejecutar comandos del sistema y crear procesos secundarios
const exec = promisify(cp.exec).bind(cp); // Convierte la función exec en una promesa
const yts = require("youtube-yts"); // Permite buscar videos en YouTube
const cheerio = require('cheerio'); // Permite manipular y analizar HTML
const _ = require('lodash'); // Ofrece utilidades para manipulación de datos
const fetch = require('node-fetch'); // Permite realizar peticiones HTTP
const sqlite3 = require('sqlite3').verbose(); // Maneja bases de datos SQLite, con modo verbose para mayor información de depuración
const moment = require('moment-timezone'); // Maneja fechas y zonas horarias
const hispamemes = require('hispamemes'); 

//----------------[ BASE DE DATOS ]--------------------
const low = require('lowdb'); 
const { Low, JSONFile } = low;
const mongoDB = require('./libs/database/mongoDB'); //Conexión a MongoDB
const yargs = require('yargs/yargs'); //Parsing de argumentos

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse()); 

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ? 
    new cloudDBAdapter(opts['db']) : 
  /mongodb/.test(opts['db']) ? 
    new mongoDB(opts['db']) : 
  new JSONFile(`./database.json`)
);

global.DATABASE = global.db;

//Función para cargar la base de datos
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => 
    setInterval(function () {
      (!global.db.READ ? 
        (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : 
        null)
    }, 1 * 1000)
  );
  
  //Leer la base de datos
  if (global.db.data !== null) return global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  
  //Inicializar la estructura de la base de datos
  global.db.data = { 
    users: {}, 
    chats: {}, 
    game: {}, 
    database: {}, 
    settings: {}, 
    setting: {}, 
    others: {}, 
    sticker: {}, 
    ...(global.db.data || {})
  };
  
  global.db.chain = _.chain(global.db.data);
}; //Crear una cadena de métodos para la base de datos

loadDatabase(); //Cargar la base de datos

//Guardar la base de datos cada 30 segundos
if (global.db) setInterval(async () => {
  if (global.db.data) await global.db.write();
}, 30000);

//-----------------------------------------------------------------------------
//Crear un nuevo cliente de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel],
});

//----------------[ INICIOS ]--------------------
client.once('ready', () => {
  console.log(`Bot iniciado como: ${client.user.tag}`);
});

//-----------------------------------------------------------------------------
//Funcion envio de memes automático al un canal
setInterval(async () => {
try {
const memeUrl = await hispamemes.meme();
const guilds = await client.guilds.fetch();
guilds.forEach(async (guild) => {
const memeChannelId = db.data.settings[guild.id]?.memeChannelId;
if (memeChannelId) {
const channel = client.channels.cache.get(memeChannelId);
if (channel) {
await channel.send({ content: "", files: [memeUrl] });
} else {
console.error('❌ El canal de memes no se encuentra.');
}} else {
console.log('❌ No se ha configurado un canal de memes para el servidor:', guild.name);
}});
} catch (error) {
console.error('Error al obtener el meme:', error);
}}, 60 * 60 * 1000); // 1 hora
});
//----------------------------------------------------------------------------- 

//---------------------[ WELCOME ]-------------------------
client.on('guildMemberAdd', member => {
const guildId = member.guild.id;
const welcomeChannelId = db.data.settings[guildId]?.welcomeChannelId;
if (welcomeChannelId) {
const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
if (welcomeChannel) {
const avatarUrl = member.user.displayAvatarURL({ dynamic: true, size: 1024 });
            const imgWel1 = 'https://qu.ax/yqlE.jpg'; //Imagen te salen si el usuarios no tiene foto. pueden cambiar la imágen por otras, como gusten.
            const totalMembers = member.guild.memberCount;
            const textt = `*╭┈⊰* ${member.guild.name} *⊰┈ ✦*\n┃✨ BIENVENIDO(A)!!\n┃💖 <@${member.user.id}>\n┃👥 Total de usuarios: ${totalMembers}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ✦`;

            welcomeChannel.send({ content: textt, files: [avatarUrl || imgWel1] });
        } else {
            console.log('❌ El canal de bienvenida no existe.');
        }
    } else {
        console.log('❌ No se ha configurado ningún canal de bienvenida');
    }
});

//---------------------[ DESPEDIDA ]-------------------------
client.on('guildMemberRemove', member => {
    const guildId = member.guild.id;

    const farewellChannelId = db.data.settings[guildId]?.farewellChannelId; // aca pueden cambiarlo si quiere que el canal se envie el otros canal aparte de la bienvenida...
    
    if (farewellChannelId) {
        const farewellChannel = member.guild.channels.cache.get(farewellChannelId);
        if (farewellChannel) {
            const totalMembers = member.guild.memberCount;
            const avatarUrl = member.user.displayAvatarURL({ dynamic: true, size: 1024 });
            const imgBye = 'https://qu.ax/yqlE.jpg'; //Imagen de respaldo en caso de que no haya avatar, pueden cambiarla.
            const farewellImage = avatarUrl || imgBye; 
            const textt2 = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰\n┃ <@${member.user.id}>\n┃ *NO LE SABE AL GRUPO, CHAO!!* 😎\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰`;

            farewellChannel.send({ content: textt2, files: [farewellImage] });
        } else {
            console.log('❌ El canal de despedida no existe.');
        }
    } else {
        console.log('❌ No haz configurado ningun canal de despedida.');
    }
});

//---------------------[ EVENTO ]-------------------------
// Evento de actualización del nombre del servidor
client.on('guildUpdate', (oldGuild, newGuild) => {
    if (oldGuild.name !== newGuild.name) {
        console.log(`El nombre del servidor ha cambiado de "${oldGuild.name}" a "${newGuild.name}".`);
    }
});

//detecto de nuevo admins 
client.on('guildMemberUpdate', (oldMember, newMember) => {
const oldPermissions = oldMember.permissions;
const newPermissions = newMember.permissions;

if (!oldPermissions.has('ADMINISTRATOR') && newPermissions.has('ADMINISTRATOR')) {
message.reply(`[ PROMOTE ]\n${newMember.user.tag} ha sido asignado como nuevo administrador.`);
}

//Evento para detectar cuando alguien deja de ser administrador
client.on('guildMemberUpdate', (oldMember, newMember) => {
  const oldPermissions = oldMember.permissions;
  const newPermissions = newMember.permissions;

  if (oldPermissions.has('ADMINISTRATOR') && !newPermissions.has('ADMINISTRATOR')) {
    const demoteMessage = `[ DEMOTE ] ${newMember.user.tag} ha sido removido como administrador.`;
    message.reply(demoteMessage);
  }
});

//Evento para cuando se crea un nuevo rol
client.on('guildRoleCreate', (role) => {
  const roleCreateMessage = `Se ha creado un nuevo rol: ${role.name}`;
  message.reply(roleCreateMessage);
});

//Evento para cuando se elimina un rol
client.on('guildRoleDelete', (role) => {
  const roleDeleteMessage = `Se ha eliminado el rol: ${role.name}`;
  message.reply(roleDeleteMessage);
});

//Evento para cuando se banea a un usuario
client.on('guildBanAdd', (guild, user) => {
  const banMessage = `El usuario ${user.tag} ha sido baneado del servidor.`;
  message.reply(banMessage);
});

//---------------------[ CREAR CLIENTS ]-------------------------
client.on('messageCreate', async message => {
if (message.author.bot) return;
if (!db.data.users[message.author.id]) {
        db.data.users[message.author.id] = {
            id: message.author.id,
            tag: message.author.tag,
            joinedAt: new Date().toISOString()
        };
        await db.write(); // Guardar cambios en la base de datos
        console.log(`Nuevo usuario registrado: ${message.author.tag}`);
}
    
//----------------------------[ CONSOLA ]-----------------------------    
const isDM = message.channel.type === 'DM';
    console.log('┏┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅•');
    console.log(`┋[📩] Mensaje : ${message.content}`);
    console.log(`┋[👤] De: ${message.author.tag} en el canal: ${isDM ? 'DM' : message.channel.name} (${message.channel.id})`);
    console.log(`┋[⚡] Servidor: ${isDM ? 'DM' : message.guild ? message.guild.name : 'N/A'}`);
    console.log('┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅•');
//----------------------------------------------------------------------------

//---------------------[ Configuraciones ]-------------------------
//const isOwner = global.owner.map(([id]) => id).includes(message.author.id);
const isOwner = global.owner.map(ownerArray => ownerArray[0]);
const prefixRegex = /^[°•π÷×¶∆£¢*€¥®™+✓_=|~!?@#$%^&.©^]/gi;
const body = message.content;
const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '';
const commandBody = body.slice(prefix.length).trim();
const args = commandBody.split(' ');
const command = args.shift().toLowerCase();
const text = args.join(' ');

//---------------------[ ANTILINKS ]-------------------------
const antiDiscord = "https://discord.gg";
    
if (message.content.includes(antiDiscord)) {
try {
await message.delete();
await message.reply(`*『 ＡＮＴＩＬＩＮＫ 』*\n\nEl usuario <@${message.author.id}> acaba de mandan un enlace, esta prohibido enviar links de otros servidores de Discord.`);
} catch (err) {
console.error('Error', err);
}
return;
}

//-----------------------------------------------------------------------------
//funcion para probar si el usuario esta registrado o nell
function registrarte(message) {
    let user = db.data.users[message.author.id]; 
    if (!user || !user.registered) {
        message.reply('⚠️ Necesita registrarse para usar este comando. Use `!reg <nombre>.<edad>` para registrarse.');
        return false; // Detiene la ejecución si no está registrado
    }
    return true; // Continúa la ejecución si está registrado
}
        
//----------------------------------------------------------------------------- 
//Empieza la diversión :v        
switch (command) {

case 'setwelcome': //Comando para configurar un canal de bienvenida 
const channelMention = message.mentions.channels.first();
if (!channelMention) {
return message.reply(`❌ ACCIÓN MAL USADA\n\nElegir un canal válido para configurar bienvenida\n• Ejemplo: ${prefix + command} #canal`)}
db.data.settings[message.guild.id] = { ...db.data.settings[message.guild.id], welcomeChannelId: channelMention.id };
await db.write();
message.reply(`🔱 Canal de bienvenida establecido en: ${channelMention}.`);
break;

case 'setbye': //Comando para configurar un canal de despedida 
const farewellChannelMention = message.mentions.channels.first();
if (!farewellChannelMention) {
return message.reply(`❌ ACCIÓN MAL USADA\n\nElegir un canal válido para configurar la despedida\n• Ejemplo: ${prefix + command} #canal`)}
db.data.settings[message.guild.id] = { ...db.data.settings[message.guild.id], farewellChannelId: farewellChannelMention.id };
await db.write();
message.reply(`🔱 Canal de despedida establecido en: ${farewellChannelMention}.`);
break;

case 'setmemes': //Comando para configurar un canal de memes automático 
const memeChannelMention = message.mentions.channels.first();
if (!memeChannelMention) {
return message.reply(`❌ ACCIÓN MAL USADA\n\nElige un canal válido para configurar memes\n• Ejemplo: ${prefix + command} #canal (selecciona el canal)`)}
db.data.settings[message.guild.id] = { ...db.data.settings[message.guild.id], memeChannelId: memeChannelMention.id };
await db.write();
message.reply(`🔱 Canal de memes establecido en: ${memeChannelMention}.`);
break;
                          
case 'setnsfw':  //para configurar un canal para enviar comando +18
const nsfwChannelMention = message.mentions.channels.first();
if (!nsfwChannelMention) {
return message.reply(`❌ ACCIÓN MAL USADA\n\nElegir un canal válido para configurar el canal NSFW\n• Ejemplo: ${prefix + command} #canal`)}
db.data.settings[message.guild.id] = { ...db.data.settings[message.guild.id], nsfwChannelId: nsfwChannelMention.id };
await db.write();
message.reply(`🔞 Canal NSFW establecido en: ${nsfwChannelMention}.`);
break;                                                                      
//Herramientas
case 'id': { //Comando para sacar la ID del un usuarios 
const userMention = message.mentions.users.first(); 
if (userMention) {
message.reply(`**ID:** ${userMention.id}`);
} else {
message.reply('⚠️ Por favor menciona a un usuario para obtener su ID.');
}}
break; 

//help
case 'menu': case 'help': {
if (!registrarte(message)) return;
const si = require('systeminformation');
const os = require('os');
const speed = require('performance-now');
let timestamp = speed();
let latency = speed() - timestamp;
let fecha = moment.tz('America/Bogota').format('DD/MM/YYYY');
let hora = moment.tz('America/Argentina/Buenos_Aires').format('LT');
const totalUsers = Object.keys(db.data.users || {}).length; 

const embed = new EmbedBuilder()
.setColor(0x0099ff)
.setTitle('Menú')
.setDescription(`Hola, <@${message.author.id}> 👋\n\n` +  
`*• Fecha:* ${fecha}\n` +
`*• Hora:* ${hora}\n` +
`*• Uptime:* ${runtime(process.uptime())}\n` +
`*• Velocidad:* ${latency.toFixed(4)} milisegundos\n` +
`*• Usuarios totales:* ${totalUsers}\n` +
`*• Prefix:* ${prefix}

**LISTA DE COMANDO :**

• ${prefix}setwelcome
• ${prefix}setbye 
• ${prefix}setmemes
• ${prefix}setnsfw
• ${prefix}id
• ${prefix}reg
• ${prefix}verificar
• ${prefix}unreg
• ${prefix}myns
• ${prefix}tiktok
• ${prefix}ytmp3
• ${prefix}google 
• ${prefix}chatgpt
• ${prefix}ia
• ${prefix}memes
• ${prefix}boobs
• ${prefix}speedtest

**Selecione sus menus con los botones de abajo**`)
.setImage('https://qu.ax/wXciz.jpg')  
.setTimestamp()
.setFooter({ text: wm });

const rowMenu = new ActionRowBuilder()
.addComponents(new ButtonBuilder()
.setCustomId('opcion1')
.setLabel('Opción 1')
.setStyle(ButtonStyle.Primary),
new ButtonBuilder()
.setCustomId('opcion2')
.setLabel('Opción 2')
.setStyle(ButtonStyle.Secondary));
try {
const msgMenu = await message.channel.send({ embeds: [embed], components: [rowMenu] });

const filterMenu = i => true;  
const collectorMenu = msgMenu.createMessageComponentCollector({ filter: filterMenu });

collectorMenu.on('collect', async interaction => {
await interaction.deferReply({ ephemeral: true });
if (interaction.customId === 'opcion1') {
await interaction.followUp(`Hola <@${interaction.user.id}>. test.`);
} else if (interaction.customId === 'opcion2') {
await interaction.followUp(`XD`);
}});
} catch (error) {
console.error('Error al enviar el menú:', error);
}}
break;

case 'ytmp3':
if (!registrarte(message)) return;
const searchText = args.join(' ');
if (!searchText) {
return message.reply('🚩 Ejemplo de uso: #play maluma');
}

const videoSearch = await yts(searchText);
if (!videoSearch.all.length) {
return message.react("❌").then(() => message.channel.send("❌ No se encontraron resultados."));
}

const vid = videoSearch.all[0];
const videoUrl = vid.url;

const rowPlay = new ActionRowBuilder()
.addComponents(new ButtonBuilder()
.setCustomId('audio')
.setLabel('Audio')
.setStyle(ButtonStyle.Primary),
new ButtonBuilder()
.setCustomId('video')
.setLabel('Video')
.setStyle(ButtonStyle.Secondary));

const msgPlay = await message.channel.send({
content: `💖 Seleciones los que quieres hacer con **${vid.title}**?`,
components: [rowPlay]});

const filterPlay = i => i.user.id === message.author.id;
const collectorPlay = msgPlay.createMessageComponentCollector({ filter: filterPlay, time: 15000 });

collectorPlay.on('collect', async interaction => {
if (interaction.customId === 'audio') {
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();

if (!delius.status) {
return interaction.reply("⚠️ Error al descargar el audio.");
}

const downloadUrl = delius.data.download.url;
interaction.reply({files: [{
attachment: downloadUrl,
name: `${vid.title}.mp3`
}]}).then(() => message.react("✅"));
}

if (interaction.customId === 'video') {
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();

if (!delius.status) {
return interaction.reply("⚠️ Error al descargar el video.");
}

const downloadUrl = delius.data.download.url;

interaction.reply({files: [{attachment: downloadUrl,
name: `${vid.title}.mp4`
}]}).then(() => message.react("✅"));
}});

collectorPlay.on('end', collected => {
if (collected.size === 0) {
message.reply("⚠️ Tardante el seleccionar la opción, intentarlo de nuevo por favor.");
}});
break;

case 'google': {
if (!text) {
return message.reply(`❌ Uso incorrecto\n\n*Ejemplo:* ${prefix + command} gata`);
}
    
const google = require('google-it');
google({ 'query': text }).then(res => {
let response = `🔍 **Resultados de Google para:** ${text}\n\n`;
for (let g of res) {
response += `**• Título:** ${g.title}\n`;
response += `**• Descripción:** ${g.snippet}\n`;
response += `**• Link:** ${g.link}\n\n━━━━━━━━━━━━━━━━━━━━\n\n`;
}
message.reply(response);
}).catch(err => {
console.error('Error al buscar en Google:', err);
message.reply('❌ Hubo un error al realizar la búsqueda.');
})}
break;

case 'memes': 
if (!registrarte(message)) return;
try {
const memeUrl = await hispamemes.meme(); 
await message.channel.send({ content: "🤣 Memes 🤣", files: [memeUrl] }); 
} catch (error) {
console.error('Error al obtener el meme:', error);
await message.reply('❌ Error:\n\n' + error);
}
break;

case 'boobs':
if (!registrarte(message)) return;
const nsfwChannelIdBoobs = db.data.settings[message.guild.id]?.nsfwChannelId;
if (!nsfwChannelIdBoobs || message.channel.id !== nsfwChannelIdBoobs) {
return message.reply(`⚠️ Este comando solo se puede usar en el canal NSFW configurado: <#${nsfwChannelIdBoobs}>.`)}
const boobsImageUrl = "https://deliriussapi-oficial.vercel.app/nsfw/boobs";
try {
const boobsImageResponse = await fetch(boobsImageUrl);
if (boobsImageResponse.ok) {
const buffer = await boobsImageResponse.buffer();
await message.channel.send({ content: "", files: [{ attachment: buffer, name: 'boobs.png' }] });
} else {
}} catch (error) {
await message.reply("Ocurrió un error al procesar tu solicitud: " + error);
}
break;

case 'tiktok':
if (!registrarte(message)) return;
if (!args[0]) {
return message.reply(`Ejemplo:\n${prefix + command} https://vm.tiktok.com/ZMjdrFCtg/`);
}
if (!isUrl(args[0]) && !args[0].includes('tiktok')) {
return message.reply(`Link inválido!!`);
}
await message.reply(`${message.author}, espere...`);
try {
const data = await require('./libs/tiktok').Tiktok(args);
if (data.nowm && data.audio) {
await message.channel.send({content: 'Aquí tienes el video de Tiktok',
files: [{attachment: data.nowm,
name: `${data.title}.mp4`}]
});
await message.channel.send({content: 'Aquí estas el audios del video ✅',
files: [{attachment: data.audio,
name: `${data.title}.mp3` }]
});
} else {
message.reply('❌ No se encontró video o audio en el enlace proporcionado.');
}} catch (error) {
console.error(error);
message.reply('❌ Error al obtener el video de TikTok\n' + error);
}
break;
            
case 'ia': case 'chatgpt':
if (!registrarte(message)) return;
if (!text) {
return message.reply('*INGRESE EL TEXTO DE LO QUE QUIERE BUSCAR?*');
}
await message.channel.sendTyping(); 
try {
let gpt = await fetch(`https://deliriussapi-oficial.vercel.app/ia/chatgpt?q=${encodeURIComponent(text)}`);
let res = await gpt.json();
if (res.data) {
await message.reply(res.data);
} else {
await message.reply('❌ No se obtuvo respuesta de la API.');
}} catch (error) {
console.error(error);
message.reply('❌ Error al comunicarse con la API\n.' + error);
}
break;
            
case 'reg': case 'verificar': case 'datfar': {
const moment = require('moment-timezone');
const { createHash } = require('crypto');
const date = moment.tz('America/Bogota').format('DD/MM/YYYY');
const time = moment.tz('America/Bogota').format('HH:mm:ss');
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
let user = db.data.users[message.author.id]; 
if (user && user.registered === true) {
return message.reply('*¡YA ESTÁS REGISTRADO(A)!*')}

if (!Reg.test(args.join(' '))) { 
return message.reply('*INGRESE SU NOMBRE Y EDAD PARA ESTAR REGISTRADO*\n*EJEMPLO*\n\n!reg GataBot.18')}

let [_, name, splitter, age] = args.join(' ').match(Reg);
if (!name) return message.reply('INGRESE SU NOMBRE');
if (!age) return message.reply('INGRESE SU EDAD');
age = parseInt(age);
if (age > 100) return message.reply('USTED ES MUY MAYOR');
if (age < 5) return message.reply('USTED ES MUY MENOR');
if (name.length >= 30) return message.reply('ESCRIBA UN NOMBRE MÁS CORTO');
let sn = createHash('md5').update(message.author.id).digest('hex');
user.name = name.trim();
user.age = age;
user.regTime = +new Date();
user.registered = true;
user.limit = 10;
user.exp = 3000;
message.channel.send({content: `✅ *V E R I F I C A C I Ó N* ✅

• NOMBRE: ${name}
• EDAD: ${age}
• FECHA: ${date}
• USUARIO: <@${message.author.id}>
• NÚMERO DE SERIE: ${sn}`
})}
break;
                        
case 'myns': {
const { createHash } = require('crypto');
let sn = createHash('md5').update(message.author.id).digest('hex'); 
message.reply(`Su número de serie es: ${sn}`);
}
break;

case 'unreg': {
const { createHash } = require('crypto');
if (!args[0]) {
return message.reply('*✳️ Ingrese número de serie, verifique su número de serie con el comando:* !myns')}
const user = db.data.users[message.author.id]; 
const sn = createHash('md5').update(message.author.id).digest('hex'); 
if (args[0] !== sn) {
return message.reply('⚠️ Número de serie incorrecto, usar:* !myns')}
user.registered = false;
user.limit -= 5
user.exp -= 600; 
message.reply('*✅ ᴿᵉᵍᶦˢᵗʳᵒ ᵉˡᶦᵐᶦⁿᵃᵈᵒ*')}
break;
           
case 'speedtest': case 'speed': {
await message.reply('🚀 **Iniciando prueba de velocidad...**');
try {
const o = await exec('python3 speed.py --secure --share');
const { stdout, stderr } = o;

if (stdout.trim()) {
const match = stdout.match(/http[^"]+\.png/);
const urlImagen = match ? match[0] : null;
                    
const embed = new EmbedBuilder()
.setColor(0x0099ff)
.setTitle('🚀 Resultados de la prueba de velocidad')
.setDescription(stdout.trim())
.setTimestamp();
                    
if (urlImagen) {
embed.setImage(urlImagen);
}

await message.channel.send({ embeds: [embed] });
}

if (stderr.trim()) {
const match2 = stderr.match(/http[^"]+\.png/);
const urlImagen2 = match2 ? match2[0] : null;
const embed = new EmbedBuilder()
.setColor(0xff0000)
.setTitle('⚠️ Error')
.setDescription(stderr.trim())
.setTimestamp();

if (urlImagen2) {
embed.setImage(urlImagen2);
}

await message.channel.send({ embeds: [embed] });
}} catch (e) {
console.error(e);
await message.reply(`⚠️ Error: ${e.message}`);
}}
break; 
//-----------------------------------------------------------------------------
//------------------- fin de los comando ----------------------
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//funcion pickRandow
function pickRandom(list) {return list[Math.floor(list.length * Math.random())]}       
//-----------------------------------------------------------------------------

default:
break;
}});

//----------------------------[ START ]-----------------------------
//iniciar el bot
client.login(botToken);

//----------------------------[ UPDATE ]-----------------------------
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})