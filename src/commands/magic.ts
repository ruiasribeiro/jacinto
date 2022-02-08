import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { randomInRange } from "../utils/random";

const answers = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
];
const length = answers.length;

export const data = new SlashCommandBuilder()
    .setName("magic")
    .setDescription("Replies with a random Magic 8-Ball answer.");

export async function execute(interaction: CommandInteraction) {
    const num = randomInRange(0, length - 1);

    await interaction.reply(answers[num]);
}
