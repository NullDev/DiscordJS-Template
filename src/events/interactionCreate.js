import path from "node:path";
import { QuickDB } from "quick.db";
import Log from "../util/log.js";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const statDb = new QuickDB({
    filePath: path.resolve("./data/cmd_stats.sqlite"),
});

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
        await interaction.reply({ content: `I don't seem to know the command '${interaction.commandName}' :/`, ephemeral: true });
        return;
    }

    try {
        await statDb.add(interaction.commandName, 1);
        await command.execute(interaction);
    }
    catch (error){
        Log.error("Error during command execution: ", error);
        const content = "There was an error while executing this command! =(";
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
