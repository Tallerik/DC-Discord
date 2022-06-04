import "reflect-metadata"
import {Client} from "discordx";
import { Intents } from "discord.js";
import {importx, dirname} from "@discordx/importer";
import {init as mysql_init, execute as query} from "./mysql.js";
import {config} from "./config.js";

export class Main {
    private static _client: Client;
    private static prefix = "#"

    static async start(): Promise<void> {

        mysql_init()

        this._client = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],

            silent: true,

            simpleCommand: {
                prefix: this.prefix,
                responses: {
                    notFound: `Befehl nicht gefunden. Versuch mal ${this.prefix}help`,
                    unauthorized: (command) => {
                        command.message.reply(
                            `Du hast keine Berechtigung um ${command.prefix}${command.name} auszuführen`
                        );
                        return;
                    },
                },
            },
        });

        this._client.on("messageCreate", (message) => {
            this._client.executeCommand(message);
        });

        this._client.once("ready", async () => {
            await this._client.initApplicationCommands();
            await this._client.initApplicationPermissions();

            console.log("Bot started");
            query("SELECT 1+1;").catch(reason => {
                console.log(reason);
            });
        });

        this._client.on("interactionCreate", (interaction) => {
            this._client.executeInteraction(interaction);
        });

        await importx(dirname(import.meta.url) + "/commands/**/*.{js,ts}");

        // let's start the bot
        if (!config.bot.token) {
            throw Error("Could not find BOT_TOKEN in your environment");
        }
        await this._client.login(config.bot.token);

    }

    static get Client(): Client {
        return this._client;
    }
}

Main.start();