import Log from "../util/log.js";
import __ from "../util/i18n.js";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/**
 * Handle command Interaction events
 *
 * @param {import("discord.js").ChatInputCommandInteraction} interaction
 * @return {Promise<void>}
 */
const handleCommandInteraction = async function(interaction){
    const command = /** @type {import("../util/client.js").default} */ (interaction.client)
        .commands.get(interaction.commandName);

    if (!command){
        Log.warn(`No command matching ${interaction.commandName} was found.`);
        await interaction.reply({ content: await __("errors.command_not_found", interaction.commandName)(interaction.guildId), ephemeral: true });
        return;
    }

    try {
        await command.execute(interaction);
    }
    catch (error){
        Log.error("Error during command execution: ", error);
        const content = await __("errors.generic_command_execution_failed")(interaction.guildId);
        if (interaction.replied || interaction.deferred) await interaction.followUp({ content, ephemeral: true });
        else await interaction.reply({ content, ephemeral: true });
    }
};

/**
 * Handle interactionCreate event
 *
 * @param {import("discord.js").Interaction} interaction
 * @return {Promise<void>}
 */
const interactionCreateHandler = async function(interaction){
    if (interaction.isChatInputCommand()) await handleCommandInteraction(interaction);
};

export default interactionCreateHandler;
