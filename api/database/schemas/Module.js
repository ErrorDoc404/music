const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true,
  },
  channelCreate: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  channelDelete: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  channelUpdate: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  guildMemberAdd: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  guildMemberAddRemove: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  guildMemberUpdate: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  messageReactionAdd: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  messageReactionRemove: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  messageUpdate: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  voiceStateUpdate: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  }
});

module.exports = mongoose.model('Module', ModuleSchema);
