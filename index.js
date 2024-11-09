require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const kickHandler = require('./commands/kickHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

// Create an Express app to keep the bot alive
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is alive and running!');
});

app.listen(port, () => {
    console.log(`Status server is running on http://localhost:${port}`);
});

// Set bot status to Streaming when ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    client.user.setPresence({
        activities: [
            {
                name: 'dsc.gg/billoxd',
                type: ActivityType.Streaming,
                url: 'https://www.twitch.tv/billoxd',
            },
        ],
        status: 'online',
    });

    console.log('Bot status set to Streaming');
});

// Handle user leaving the main server
client.on('guildMemberRemove', async (member) => {
    console.log(`Member ${member.user.tag} has left the main server.`);
    if (member.guild.id === process.env.MAIN_SERVER_ID) {
        const secondServer = client.guilds.cache.get(process.env.SECOND_SERVER_ID);
        if (secondServer) {
            console.log(`Checking if ${member.user.tag} is in the second server...`);
            await kickHandler.handleKick(member, secondServer);
        }
    }
});

// Handle user joining the second server
client.on('guildMemberAdd', async (member) => {
    if (member.guild.id === process.env.SECOND_SERVER_ID) {
        console.log(`User ${member.user.tag} has joined the second server.`);

        const mainServer = client.guilds.cache.get(process.env.MAIN_SERVER_ID);
        try {
            const mainServerMember = await mainServer.members.fetch(member.id).catch(() => null);

            // DM the user to inform them of the main server requirement
            try {
                await member.send(
                    `Welcome to ${member.guild.name}! Please note: If you leave the main server (BilloXD), you will also be removed from this backup server.`
                );
                console.log(`Sent a DM to ${member.user.tag} informing them about the main server requirement.`);
            } catch (error) {
                console.error(`Could not send DM to ${member.user.tag}: ${error}`);
            }

            if (!mainServerMember) {
                console.log(`User ${member.user.tag} is not in the main server. Kicking them from the second server.`);
                await kickHandler.handleKick(member, member.guild);
            } else {
                console.log(`User ${member.user.tag} is in the main server. No action needed.`);
            }
        } catch (error) {
            console.error(`Error checking if user is in the main server: ${error}`);
        }
    }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);
