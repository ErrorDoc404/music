const Module = require("../api/database/schemas/Module");
const GuildConfig = require("../api/database/schemas/GuildConfig");

module.exports = async (client, guild) => {
  require("../util/RegisterSlashCommands")(client, guild.id);

  try{
    const findGuild = await Module.findOneAndUpdate({guildId: guild.id }, {
      music: true,
    }, {new: true});
    if(findGuild){
      console.log('Guild found');
    } else {
      const newGuild = await Module.create({
        guildId: guild.id,
        music: true,
      });
    }
  }catch (err){
    console.log(err);
  }

  try{
    const findGuildConfig = await GuildConfig.findOne({guildId: guild.id });
    if(findGuildConfig){
      console.log('Guild found');
    } else {
      const newGuildConfig = await GuildConfig.create({
        guildId: guild.id,
        prefix: '!',
      });
    }
  }catch (err){
    console.log(err);
  }
};
