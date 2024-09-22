const { sendDMAndKick } = require('../utils/checkUser');

module.exports = {
    async handleKick(member, secondServer) {
        try {
            const secondServerMember = await secondServer.members.fetch(member.id).catch(() => null); // Handling fetch errors
            if (secondServerMember) {
                console.log(`Member ${member.user.tag} is in the second server, kicking them...`); // Debug log
                await sendDMAndKick(secondServerMember);
            } else {
                console.log(`Member ${member.user.tag} is not in the second server.`); // Debug log
            }
        } catch (error) {
            console.error(`Error in handleKick: ${error}`);
        }
    }
};
