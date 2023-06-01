import path from "node:path";
import { QuickDB } from "quick.db";
import Log from "../util/log.js";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const guildDb = new QuickDB({
    filePath: path.resolve("./data/guild_data.sqlite"),
});

/**
 * Iterate over quick DB
 *
 * @param {object} dbObj
 * @param {import("../util/client.js").default} client
 * @return {Promise<Number>}
 */
const iterator = async function(dbObj, client){
    let counter = 0;
    for (const guild of dbObj){
        const guildId = guild.id.replace("guild-", "");
        const discordGuild = await client.guilds.fetch(guildId).catch(() => null);

        if (!discordGuild){
            Log.warn(`[CRON] Removing guild ${guildId} from DB...`);
            await guildDb.delete(guild.id);
            ++counter;
            continue;
        }
    }
    return counter;
};

/**
 * Delete guilds from DB that the bot is no longer in
 *
 * @param {import("../util/client.js").default} client
 */
const deleteRemovedGuilds = async(client) => {
    Log.wait("[CRON] Removing non-existant guilds from DB...");

    const removed = await iterator(await guildDb.all(), client);

    Log.done(`[CRON] Cleaned up DB. Removed ${removed} guilds.`);
};

export default deleteRemovedGuilds;
