// checkUser.js
const { EmbedBuilder } = require('discord.js'); // Correct import for discord.js v14+

// Function to send a DM and kick a user from the server
async function sendDMAndKick(member) {
    try {
        const user = member.user; // Access the user object
        const embedMessage = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('You were kicked from the server')
            .setDescription('<a:Alert:1222696669997437049> **You need to stay in the main server to be in the backup server.**\n\n <a:partner_server_owner:1261214803670863872> *Server Invite Link: https://discord.gg/mKZGkEK39m*')
            .setFooter({ text: 'Please join the main server to regain access.' })
           .setImage('https://media.discordapp.net/attachments/1260518295363260466/1260972790337769523/standard_4.gif?ex=66f0d8ac&is=66ef872c&hm=cbb1ea746629364755af5bf881464a9f03f24e8418f4eeb1762eecdad3c3f43b&=');

        // Step 1: Send a DM to the user
        await user.send({ embeds: [embedMessage] });
        console.log(`Sent kick notice DM to ${user.tag}`);

        // Step 2: Kick the user
        await member.kick('User is not part of the main server.');
        console.log(`Successfully kicked ${user.tag} from the server.`);
    } catch (error) {
        if (error.code === 50007) {
            console.log(`Could not send DM to ${user.tag}: User has DMs disabled or blocked the bot.`);
        } else {
            console.error(`Failed to kick ${user.tag}: ${error}`);
        }
    }
}

// Exporting the functions
module.exports = {
     sendDMAndKick,
};
