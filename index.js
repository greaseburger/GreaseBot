const dotenv = require("dotenv");
dotenv.config();
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { Player, useMainPlayer } = require("discord-player");
const {
  joinVoiceChannel,
  VoiceConnectionStatus,
  entersState,
  createAudioPlayer,
} = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.login(process.env.DISCORD_TOEKN);

// client.commands = new Collection();

// const foldersPath = path.join(__dirname, "commands");
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
//   const commandsPath = path.join(foldersPath, folder);
//   const commandFiles = fs
//     .readdirSync(commandsPath)
//     .filter((file) => file.endsWith(".js"));
//   for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath);
//     // Set a new item in the Collection with the key as the command name and the value as the exported module
//     if ("data" in command && "execute" in command) {
//       client.commands.set(command.data.name, command);
//     } else {
//       console.log(
//         `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
//       );
//     }
//   }
// }

const player = new Player(client);

player.extractors.loadDefault((ext) => ext !== "YouTubeExtractor");

player.events.on("playerStart", (queue, track) => {
  queue.metadata.channel.send(`Started playing **${track.title}**!`);
});

client.on("messageCreate", async (message) => {
  if (!message?.author.bot) {
    console.log(message);
    message.channel.send(
      "SHUT THE FUCK UP " + message.author.displayName.toUpperCase() + "!"
    );
  }
});

// async function execute(interaction) {
//   const player = useMainPlayer();
//   const channel = interaction.member.voice.channel;
//   if (!channel)
//     return interaction.reply("You are not connected to a voice channel!"); // make sure we have a voice channel
//   const query = interaction.options.getString("query", true); // we need input/query to play

//   // let's defer the interaction as things can take time to process
//   await interaction.deferReply();

//   try {
//     const { track } = await player.play(channel, query, {
//       nodeOptions: {
//         // nodeOptions are the options for guild node (aka your queue in simple word)
//         metadata: interaction, // we can access this metadata object using queue.metadata later on
//       },
//     });

//     return interaction.followUp(`**${track.title}** enqueued!`);
//   } catch (e) {
//     // let's return error if something failed
//     return interaction.followUp(`Something went wrong: ${e}`);
//   }
// }

// const playSomeSound = () => {
//   const connection = joinVoiceChannel({
//     channelId: channel.id,
//     guildId: channel.guild.id,
//     adapterCreator: channel.guild.adapterCreator,
//   });
//   connection.on(VoiceConnectionStatus.Ready, () => {
//     console.log(
//       "The connection has entered the Ready state - ready to play audio!"
//     );
//   });
//   connection.on(
//     VoiceConnectionStatus.Disconnected,
//     async (oldState, newState) => {
//       try {
//         await Promise.race([
//           entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
//           entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
//         ]);
//         // Seems to be reconnecting to a new channel - ignore disconnect
//       } catch (error) {
//         // Seems to be a real disconnect which SHOULDN'T be recovered from
//         connection.destroy();
//       }
//     }
//   );
//   const player = createAudioPlayer({
//     behaviors: {
//       noSubscriber: NoSubscriberBehavior.Pause,
//     },
//   });
//   const subscription = connection.subscribe(audioPlayer);
// };
