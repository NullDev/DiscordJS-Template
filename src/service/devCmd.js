import path from "node:path";
import { config } from "../../config/config.js";
import { QuickDB } from "quick.db";
import Log from "../util/log.js";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const db = new QuickDB({
    filePath: path.resolve("./data/cmd_stats.sqlite"),
});

// Dev-only debug stuff

/**
 * Handle DM messages
 *
 * @param {import("discord.js").Message} message
 */
const devCmd = async function(message){ // @ts-ignore
    if (!config.discord.bot_owner_ids.includes(message.author.id)) return;

    const cont = message.content;

    if (cont.toLowerCase().startsWith(".cmdstats")){
        try {
            const s = (await db.all()).sort((a, b) => b.value - a.value);
            const m = s.map(({ id, value }) => `${id}: ${value}`).join("\n");
            if (!m){
                await message.channel.send("No stats available.");
                return;
            }
            await message.channel.send(m);
        }
        catch (e){
            Log.error(e);
        }
    }
};

export default devCmd;
