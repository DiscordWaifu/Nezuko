const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('presence')
        .setDescription('Allows you to toggle allowing your presence to be shown.'),
    async execute(interaction) {
        const _id = interaction.member.id;

        const res = await interaction.client.db.collection('presence').find({ _id }).toArray()
        if (res.length === 0) {
            await interaction.client.db.collection('presence').insertOne({ _id, presence: true })
            return interaction.reply(`Turned on presence tracking for ${interaction.member.displayName}.`)
        } else {
            const presence = !Boolean(res[0].presence ?? true)
            await interaction.client.db.collection('presence').updateOne({ _id }, { $set: { presence }}, { upsert: true })
            return interaction.reply(`Toggled ${presence ? 'on' : 'off'} presence tracking for ${interaction.member.displayName}.`)
        }
    },
};