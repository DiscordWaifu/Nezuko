module.exports = {
	name: 'guildMemberRemove',
	async execute(member) {
        if (member.guild.id !== '324051061033926666') return;

        return await member.client.db.collection('presence').deleteOne({ _id: member.id });
    }
}