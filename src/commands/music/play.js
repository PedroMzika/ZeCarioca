const Command = require('../../structures/command/Command');
const { ParrotEmbed } = require('../../')

module.exports = class ParrotCommand extends Command {
  constructor(client) {
    super(
      {
        name: 'play',
        aliases: ['tocar', 'p'],
        category: 'Música',
        description: 'Reproduza a sua música favorita no Discord.',
        utils: { voiceChannel: true },
        usage: "play <música/link/identifier>"
      },
      client
    );
  }

  async run({ message, client, channel, member }, args) {

    const memberChannel = member.voice.channel.id;
    
    if (player.voiceChannel !== memberChannel) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));
        
    const player = await this.client.music.join({
      guild: message.guild.id,
      voiceChannel: memberChannel,
      textChannel: message.channel,
      dj: message.author
    }, { selfDeaf: true });

    const { tracks, playlistInfo, loadType } = await this.client.music.fetchTracks(args.join(' '));
    		
    switch (loadType) {
    	case 'NO_MATCHES': {
    		channel.send(new ParrotEmbed() .setDescription("⚠️ | Não achei nenhum resultado."));
         break;
   		}

    	case 'SEARCH_RESULT':
    	case 'TRACK_LOADED': {
    		player.addToQueue(tracks[0], message.author);
      	channel.send(new ParrotEmbed() .setDescription(`Adicionado na fila: **${tracks[0].info.title}**!`));
      	if (!player.playing) return player.play();
      	break;
    	}

    	case 'PLAYLIST_LOADED': {
    		for (const track of tracks) {
        		player.addToQueue(track, message.author);
      		};
      	channel.send(new ParrotEmbed() .setDescription('Adicionei `' + tracks.length + '` músicas da playlist `' + playlistInfo.name + '`.'));
      	if (!player.playing) return player.play();
        break;  
    	}
    }
	}
}
