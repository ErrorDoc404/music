
const GuildConfig = require("../api/database/schemas/GuildConfig");
const client = require("../structures/DiscordMusicBot");
const message = require("discord.js").Message;

module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  const serverGuildConfig = await GuildConfig.findOne({guildId: message.guild.id});
  let prefix = serverGuildConfig.prefix;

  let GuildDB = await client.GetGuild(message.guild.id);
  if (GuildDB && GuildDB.prefix) prefix = GuildDB.prefix;

  //Initialize GuildDB
  if (!GuildDB) {
    await client.database.guild.set(message.guild.id, {
      prefix: prefix,
      DJ: null,
    });
    GuildDB = await client.GetGuild(message.guild.id);
  }

  //Prefixes also have mention match
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  prefix = message.content.match(prefixMention)
    ? message.content.match(prefixMention)[0]
    : prefix;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  //Making the command lowerCase because our file name will be in lowerCase
  const command = args.shift().toLowerCase();

  //Searching a command
  const cmd =
    client.commands.get(command) ||
    client.commands.find((x) => x.aliases && x.aliases.includes(command));

  //Executing the codes when we get the command or aliases
  if (cmd) {
    if (
      (cmd.permissions &&
        cmd.permissions.channel &&
        !message.channel
          .permissionsFor(client.user)
          .has(cmd.permissions.channel)) ||
      (cmd.permissions &&
        cmd.permissions.member &&
        !message.channel
          .permissionsFor(message.member)
          .has(cmd.permissions.member)) ||
      (cmd.permissions &&
        GuildDB.djRole &&
        !message.channel
          .permissionsFor(message.member)
          .has(["ADMINISTRATOR"]) &&
        !message.member.roles.cache.has(GuildDB.djRole))
    )
      return client.sendError(
        message.channel,
        "Missing Permissions!" + GuildDB.djRole
          ? " You need the `DJ` role to access this command."
          : ""
      );
    cmd.run(client, message, args, { GuildDB });
    client.CommandsRan++;
  } else return;
};
