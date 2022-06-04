import {Discord, SimpleCommand, SimpleCommandMessage, Slash} from "discordx";
import {CommandInteraction, MessageEmbed} from "discord.js";


@Discord()
export class Info {

    // General information
    embed(): MessageEmbed {
        return new MessageEmbed({
            title: "Dream-City - Lebe dein Leben!",
            description: "Viel Spaß auf dem Server", //"Webseite:  \nForum: https://forum.dream-city.net \nTeamspeak: dream-city\nFiveM: Dream-CityV3RP oder `connect dream-city.net`",
            fields: [
                {name: "Webseite:", value: "https://dream-city.net"},
                {name: "Forum:", value: "https://forum.dream-city.net"},
                {name: "Teamspeak:", value: "dream-city"},
                {name: "FiveM:", value: "Dream-CityV3RP oder `connect dream-city.net`"},
            ],
            timestamp: new Date(),
            color: "DARK_PURPLE"
        });
    }

    @Slash("info", {description: "Informationen zum Server"})
    infoslash(interaction: CommandInteraction):void {
        interaction.reply({embeds: [this.embed()]})
    }

    @SimpleCommand("info", {aliases: ["connect", "ts", "website", "www", "forum"]})
    info(command: SimpleCommandMessage): void {
        command.message.reply({embeds:[this.embed()]})
    }

    // Information about Saltychat

    saltyembed(): MessageEmbed {
        return new MessageEmbed({
            title: "Dream-City - Saltychat!",
            fields: [
                { name: 'Teamspeak 3 Download', value: 'https://www.teamspeak.de/download/' },
                { name: 'SaltyChat Download', value: 'https://www.saltmine.de/saltychat/download/stable' },

            ],
            description: "Wir nutzen Saltychat als Voice-Client für Teamspeak 3.",
            timestamp: new Date(),
            color: "DARK_PURPLE",
        });
    }

    @Slash("voice", {description: "Informationen zum Voice-System"})
    saltyslash(interaction: CommandInteraction):void {
        interaction.reply({embeds: [this.saltyembed()]})
    }

    @SimpleCommand("voice", {aliases: ["toko", "salty", "saltychat"]})
    salty(command: SimpleCommandMessage): void {
        command.message.reply({embeds:[this.saltyembed()]})
    }

}