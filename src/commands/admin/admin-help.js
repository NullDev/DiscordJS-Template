import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import translations from "../../../locales/commands/translations.js";
import __ from "../../util/i18n.js";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

export default {
    data: new SlashCommandBuilder()
        .setName("admin-help")
        .setDescription(translations.admin_help.desc)
        .setDescriptionLocalizations(translations.admin_help.translations)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction){
        const userCommands = /** @type {import("../../util/client.js").default} */ (interaction.client)
            .commands.filter(cmd => cmd.data.default_member_permissions !== undefined);

        const str = await Promise.all(userCommands.map(async(cmd) => {
            const serverLang = await __("__LANG__")(interaction.guildId);
            const desc = cmd.data.description_localizations?.[serverLang] || cmd.data.description;
            return `**/${cmd.data.name}** - ${desc}`;
        }));

        return await interaction.reply({
            content: str.join("\n"),
            ephemeral: true,
        });
    },
};
