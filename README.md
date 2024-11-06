### `BASE PARA TU BOT DE DISCORD DESDE 0`

<p align="center">
<a href="#"><img title="The-LoliBot-MD" src="https://img.shields.io/badge/ME PUEDEN DAR UNA 🌟 SI TE AGRADA Y TE GUSTO :v ¡GRACIAS! -red?colorA=%255ff0000&colorB=%23017e40&style=for-the-badge"></a> 
<a href="#"><img title="LoliBot-MD" src="https://img.shields.io/badge/MIS REDES SOCIALES-red?colorA=%F77F48FF&colorB=%F77F48FF&style=for-the-badge">
<div align="center">
<a href="https://facebook.com/groups/872989990425789/">
<img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook">
</a>
<a href="https://www.youtube.com/@elrebelde.21">
<img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube">
</a>
<a href="https://www.tiktok.com/@lolibot_?_t=8ge2zeRZ04r&_r=1" target="_blank"> <img src="https://img.shields.io/badge/-TikTok-%23E4405F?style=for-the-badge&logo=tiktok&logoColor=black" target="_blank"></a> <img src="https://github.com/siegrin/siegrin/blob/main/Assets/Handshake.gif" height="30px">
</a>
<a href="https://paypal.me/OfcGB" target="_blank"> <img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" target="_blank"></a> <img src="https://github.com/siegrin/siegrin/blob/main/Assets/Handshake.gif" height="30px">
</a>
    
[![Enlaces](https://img.shields.io/badge/Encontra_todos_los_enlace_en_un_único_lugar-000000%7D?style=for-the-badge&logo=biolink&logoColor=white)](https://atom.bio/lolibot)
</div>
    
### `👑 DUDAS, SUGERENCIAS, PREGUNTA SOBRE EL BOT?, CONTACTAME 👑`
<p align="center">
<a href="https://github.com/elrebelde21"><img src="http://readme-typing-svg.herokuapp.com?font=mono&size=14&duration=3000&color=ABF7BB&center=verdadero&vCenter=verdadero&lines=Solo+escr%C3%ADba+si+tiene+dudas." height="40px"
</p>
    
<a href="https://facebook.com/groups/872989990425789/">
<img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Contactame">
</a>

-----

# Configuración y Instalación del Bot de Discord

Este documento te guiará en la obtención del token necesario para tu bot de Discord y en la instalación del bot, ya sea usando Termux en un dispositivo móvil o a través de nuestro hosting para mantenerlo activo 24/7.

## Requisitos

- Una cuenta de Discord
- Termux instalado si decides usar Termux:
- Node.js instalado en Termux
- Una cuenta en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)

## Paso 1: Crear una Aplicación en Discord

1. Ve al [Portal de Desarrolladores de Discord](https://discord.com/developers/applications) e inicia sesión con tu cuenta de Discord.
2. Haz clic en el botón **"New Application"**.
3. Asigna un nombre a tu aplicación y haz clic en **"Create"**.

## Paso 2: Crear un Bot

1. Dentro de tu aplicación recién creada, ve a la pestaña **"Bot"** en el menú de la izquierda.
2. Haz clic en el botón **"Add Bot"** y confirma la acción.
3. Ahora deberías ver tu bot en la sección de **"Bot"**.

## Paso 3: Obtener el Token del Bot

1. En la sección **"Bot"**, haz clic en el botón **"Copy"** debajo del campo **"Token"**. Este token es muy importante ya que es la clave para autenticar tu bot.
2. Guarda el token en un lugar seguro, ya que lo necesitarás más adelante.
3. Abre el archivo `settings.js` en tu proyecto y reemplaza `global.botToken = "token"` con el token que acabas de copiar:
   ```javascript
   global.botToken = "TU_TOKEN_AQUI"; // Reemplaza 'TU_TOKEN_AQUI' con el token de tu bot
   ```

## Paso 4: Invitar el Bot a un Servidor

1. Ve a la pestaña **"OAuth2"** en el menú de la izquierda.
2. En la sección **"OAuth2 URL Generator"**, marca la casilla **"bot"** en **"SCOPES"**.
3. En **"BOT PERMISSIONS"**, selecciona los permisos que desees otorgarle a tu bot.
4. Copia la URL generada y ábrela en tu navegador. Selecciona el servidor al que deseas invitar el bot y haz clic en **"Authorize"**.

## Instalación del Bot en Termux

1. Abre Termux en tu dispositivo móvil.
2. Actualiza los paquetes de Termux:
   ```sh
   pkg update
   ```
3. Instala Node.js en Termux:
   ```sh
   pkg install nodejs
   ```
4. Clona el repositorio de tu bot en Termux:
   ```sh
   git clone https://github.com/elrebelde21/bot-de-discord
   cd bot-de-discord
   ```
5. Instala las dependencias de tu bot:
   ```sh
   npm install
   ```
6. Ejecuta el bot:
   ```sh
   node index.js
   ```

## Instalación via host en SkyUltraPlus Hosting 24/7 online

[![YouTube](https://img.shields.io/badge/SkyUltraPlus-Host-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/fZbcCLpSH6Y?si=1sDen7Bzmb7jVpAI)

<a href="https://dash.corinplus.com"><img src="https://qu.ax/zFzXF.png" height="125px"></a>

### Información del Host
- **Dashboard:** [`Aquí`](https://dash.skyultraplus.com)
- **Panel:** [`Aquí`](https://panel.skyultraplus.com)
- **Estado de servicios:** [`Aquí`](https://estado.skyultraplus.com)
- **Canal de WhatsApp:** [`Aquí`](https://whatsapp.com/channel/0029VakUvreFHWpyWUr4Jr0g)
- **Comunidad:** [`Aquí`](https://chat.whatsapp.com/JPwcXvPEUwlEOyjI3BpYys)
- **Contacto(s):** [`Gata Dios`](https://wa.me/message/B3KTM5XN2JMRD1) / [`Russell`](https://api.whatsapp.com/send/?phone=15167096032&text&type=phone_number&app_absent=0) / [`elrebelde21`](https://facebook.com/elrebelde21)
- **Discord:** [`SkyUltraPlus`](https://discord.gg/Ph4eWsZ8)
