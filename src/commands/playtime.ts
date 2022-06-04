import {SimpleCommandMessage, SlashOption} from "discordx";
import type {User} from "../types";
import {Discord, SimpleCommand, Slash} from "discordx"
import {execute as query} from "../mysql.js";
import {CommandInteraction, Message, MessageEmbed} from "discord.js";


@Discord()
export class Playtime {

    @SimpleCommand("time")
    time(command: SimpleCommandMessage): void {
        this.processtime(command.argString, command.message);
    }


    @Slash("time", {description: "Informiert euch über eure Spielzeit!"})
    timeSlash(@SlashOption("name", {type: "STRING", description: "Dein Name", required: true}) namearg: String, interaction: CommandInteraction):void {
        this.processtime(namearg, interaction);
    }


    private processtime(name: String, replyer: Message | CommandInteraction):void {
        query<User[]>("SELECT firstname, lastname, name, timePlay FROM users WHERE name = ? LIMIT 1", [name]).then(result => {

            result.forEach(user => {
                const embed = new MessageEmbed({
                    title: `Spielzeit von ${user.firstname} ${user.lastname} (${user.name})`,
                    description: `Spielzeit: ${Math.round(user.timePlay / 3600)} Stunde/n`,
                    timestamp: new Date(),
                    color: "DARK_PURPLE"
                });
                replyer.reply({embeds: [embed]})

            })
        });
    }

}