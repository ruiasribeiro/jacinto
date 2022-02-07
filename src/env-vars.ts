import dotenv from "dotenv";

dotenv.config();

/** Bot token. */
export const token = process.env.DISCORD_TOKEN;
/** ID of the client (also known as Application ID). */
export const clientId = process.env.CLIENT_ID;
/** ID of the guild (server) where the bot is running. */
export const guildId = process.env.GUILD_ID;
