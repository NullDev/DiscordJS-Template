import fastify from "fastify";
import { config } from "../../config/config.js";
// eslint-disable-next-line no-unused-vars
import DiscordClient from "../util/client.js";
import Log from "../util/log.js";

/**
 *
 * @param {DiscordClient} client
 */
const api = (client) => {
    const app = fastify();
    app.decorate("discord", client);
    app.get("/", async(req, res) => {
        res.send(`API Running under: ${client.user.username}`);
    });

    app.listen({
        port: config.dashboard.port,
    }).then(() => Log.info(`Started API on port: ${config.dashboard.port}`));
};

export { api };
