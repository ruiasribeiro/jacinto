import { MessageEmbed } from "discord.js";

export function create(message: string): MessageEmbed {
    return new MessageEmbed()
        .setTitle("Error")
        .setColor("RED")
        .setDescription(message);
}
