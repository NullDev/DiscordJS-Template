import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const commandName = import.meta.url.split("/").pop()?.split(".").shift() ?? "";

export default {
    data: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription("Show an overview of all admin commands.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction){
        const userCommands = /** @type {import("../../util/client.js").default} */ (interaction.client)
            .commands.filter(cmd => cmd.data.default_member_permissions !== undefined);

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
