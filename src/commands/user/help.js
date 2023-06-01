import { SlashCommandBuilder } from "discord.js";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

export default {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Show an overview of commands.")
        .setDMPermission(false),
    /**
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction){
        const userCommands = /** @type {import("../../util/client.js").default} */ (interaction.client)
            .commands.filter(cmd => cmd.data.default_member_permissions !== "8");

        const str = await Promise.all(userCommands.map(async(cmd) => {
            const desc = cmd.data.description;
            return `**/${cmd.data.name}** - ${desc}`;
        }));

        return await interaction.reply({
            content: str.join("\n"),
            ephemeral: true,
        });
    },
};
