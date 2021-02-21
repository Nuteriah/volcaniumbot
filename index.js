const Discord = require("discord.js");
let bot = new Discord.Client();
const config = require("./config.json");
let embed = new Discord.MessageEmbed()
const fs = require ('fs');
const file = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
const newUsers = [];
var prefix = "-"
bot.on("ready",function(){
    console.log("Runn..");
})


bot.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === prefix + "8ball") {
      if (!args[1]) return message.channel.send("Veuillez **poser une question** :x:")
      message.delete()
      let answers = ["Non :x:", "Tu me fatigue :zzz:", "Je ne sais pas :face_palm:", "Peut être... :thinking:", "Absolument :interrobang:"]
      let question = args.slice(1).join(" ")
      let embed = new Discord.MessageEmbed()
          .setFooter("Question posée par " + message.author.tag, message.author.displayAvatarURL)
          .setColor("DARK_BLUE")
          .addField("Question :", question)
          .addField("Réponse :", answers[Math.floor(Math.random() * answers.length)])
          .setTimestamp()
          .setFooter("Volcabot  bot •  Par 5989")
      message.channel.send(embed)
  }
})





bot.on('message', function (message) {
if (message.content === '-user') {
  let embed = new Discord.MessageEmbed()
      embed.setAuthor(message.author.username)
      embed.setDescription("Vos Informations")
      embed.setColor("#FF00FF")
      embed.addField("Pseudo", `${message.author.username}#${message.author.discriminator}`)
      embed.addField("ID", message.author.id)
      embed.addField("Nickname :", `${message.nickname !== null ? `${message.nickname}` : 'None'}`, true)
      embed.addField("Compte créer le ", message.author.createdAt)
      embed.addField("Vous avez join le serveur le ", message.member.joinedAt)
      embed.setTimestamp()
      embed.setFooter("Volcabotbot • Par 5989")



      message.channel.send(embed);

      return;
     
      }
  })



bot.on("message", async message =>{
if (message.content === '-server') {
  let embed = new Discord.MessageEmbed()
  embed.setDescription("C'est tout ce que vous devez savoir sur notre serveur !")
  embed.addField('Nom', `${message.guild.name}`, (`${message.guild.nameAcronym, true}`))
  embed.addField('Proprio du serveur :', message.guild.owner.user.tag, true)
  embed.addField("Serveur créer le :", message.guild.createdAt, true)
  embed.addField("Total de membre", message.guild.memberCount, true)
  embed.addField("Total de salon :", message.guild.channels.size, true)
  embed.addField(`Roles`, message.guild.roles.size, true)
  embed.setColor("#FF00FF")
  embed.setTimestamp()
  embed.setFooter("Volcabot • Par 5989")


      message.channel.send(embed);

      return;
     
      }
  });

bot.on("ready", () => console.log("Warns activer !"));



bot.on('message', async (msg) => {


if (!msg.content.startsWith("-")) return;

if (msg.author.bot) return;



if (msg.content.startsWith("-warn")) {


if (!msg.member.hasPermission("DEAFEN_MEMBERS")) return msg.channel.send("Oh, nan tu n'a pas la permission ADMINISTRATEUR");


if (!file[msg.mentions.members.first().id]) {
  file[msg.mentions.members.first().id] = {
    warns: 0
  }

};


file[msg.mentions.members.first().id] = {
  warns: file[msg.mentions.members.first().id].warns + 1
}


fs.writeFile("./warns.json", JSON.stringify(file), (err) => {
  if (err) console.error(err);

  console.log("Ajout d'un avertissement à cet enfant bitchass !")
});

msg.channel.send("Warns ajouté à " + msg.mentions.members.first().user.tag);


}
})

bot.on('message', message => {
   
    if (!message.guild) return;
 
 
    if (message.content.startsWith('-ban')) {
      const user = message.mentions.users.first()
   
      if (user) {
       
        const member = message.guild.member(user);
     
        if (member) {
         
          member.ban({
            reason: 'Ils étaient mauvais !',
          }).then(() => {
            message.reply(`Banni avec succès ${user.tag}, PERDANT HAH! Obtenez le ban marteau boi!`); 
          }).catch(err => {
         
            message.reply('Je n’ai pas été en mesure de ban le membre. Vérifiez si leurs rôles sont plus élevés, puis le mien ou s’ils ont des autorisations administratives !'); // if a user does not have permission to use a command on a user or as a member, this message will be send.

       
            console.error(err);
          });
        } else {
         
          message.reply('Cet utilisateur n’est pas dans cette guild !');
        }
      } else {
     
        message.reply('Vous n’avez pas mentionné l’utilisateur à ban !');
      }
    }
  }); 

bot.on("message",message=>{
 
    if (!message.guild) return;
   
   
    if (message.content.startsWith('-kick')) { 
     
      const user = message.mentions.users.first();
     
      if (user) {
     
        const member = message.guild.member(user);
     
        if (member) {
       
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Oh, nan ! Il te manque la permission ADMINISTRATEUR");

          member.kick('Raison facultative qui s’affichera dans les journaux de vérification').then(() => {
         
            message.reply(`Kick avec succès ${user.tag}, vous devriez vous sentir mal ! Ils ne pourras jamais rejoindre jusqu’à ce qu’ils cliquent à nouveau !`);
          }).catch(err => {
           
            message.reply('Je n’ai pas été en mesure de donner un coup de pied au membre. Vérifiez si leurs rôles sont plus élevés, puis le mien ou s’ils ont des autorisations administratives !');
           
            console.error(err);
          });
        } else {
         
          message.reply('Cet utilisateur n’est pas dans cette guild !');
        }
   
      } else {
        message.reply('Vous n’avez pas mentionné l’utilisateur à kick !'); 
      }
    }
  });

bot.on('message', message =>{
    if(message.content === "-info") {
    message.channel.send(`\n_SERVEUR INFORMATIONS_\n  \n**Nom du serveur :** ${message.guild.name}\n**Total de membres :** ${message.guild.memberCount}`)
    
}
})

bot.on('message', message => {
  if (!message.guild) return
      let args = message.content.trim().split(/ +/g)

      if (args[0].toLowerCase() === "-prune"){
          let count = args[1]
          if (!count) return message.channel.send(":exclamation: Indiquer un nombre de messages à supprimer")
          if (isNaN(count)) return message.channel.send(":exclamation: Indiquer un nombre valide")
          if (count < 1 || count > 100) return message.channel.send(" :exclamation:  Indiquer un nombre entre 1 et 99")
          message.channel.bulkDelete(parseInt(count) + 1)
          console.log(`Clear éffectué ${message.author.tag}`)
      }
});


bot.on("ready", () => {
  bot.user.setActivity(`a-hel / Par 5989 `, {type: "PLAYING"});
});



    bot.on("message",message=>{
      const uneCommande3 = prefix + 'new '
  if (message.content.startsWith(uneCommande3)) {
    message.delete()
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Oh, nan ! Il te manque la permission ADMINISTRATEUR");
    const str3 = message.content.substring(uneCommande3.length)
    if (str3 == " ") return message.channel.send(`Precisez un message afin que je puisse l'envoyer !`);
    let embed = new Discord.MessageEmbed()
  .setColor(`#e91414`)
  .setTitle(`Annonce`)
  .setDescription(`${str3}`)
  .setFooter(`VocalBot • Par 5989`)
  .setTimestamp()
  message.channel.send(embed)
    }
  });

bot.on("message",message=>{
    const uneCommande3 = prefix + 'say '
if (message.content.startsWith(uneCommande3)) {
  message.delete()
  const str3 = message.content.substring(uneCommande3.length)
  if (str3 == " ") return message.reply(`Precisez un message afin que je puisse l'envoyer !`);
  message.channel.send(`${str3}`)
  }
});

bot.on('message', message =>{
  if(message.content === "-help"){
message.delete()
let embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Commande help`)
.setDescription(`-say / -ban / -kick / -warn -dmall / -new / -ping / -roll `)
.setTimestamp('Volcabot')
.setTimestamp()
.setFooter('Volcabot • Par 5989')
message.channel.send(embed)
}
});


  bot.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.send(':ping_pong: **Pong !** Votre latence : `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    }
});


bot.on('channelCreate', channel => {
  console.log("Channel ID : " + channel.id + " à étais créer ! ");
});

bot.on('channelDelete', channel => {
  console.log("Channel ID : " + channel.id + " à étais supprimé !");
});

bot.on('message', message => {

  try {
      const embedmessage = new Discord.MessageEmbed()
      .setColor('#ff8a0c')
      .setTitle(`Serveur : ${message.guild.name}`)
      .addFields({name: 'Message de : ', value: message.author.toString()})
      .addFields({name: 'Contenu du Message :',value: message})
      .setTimestamp()
      .setFooter('id : ' + message.member.user.id);

      message.member.guild.channels.resolve('733619430835224639').send(embedmessage);
  } catch (error) {
  }

});


bot.on('message', (message) => {
  const messageWords = message.content.split(' ');
  const rollFlavor = messageWords.slice(2).join(' ');
  if (messageWords[0] === '-roll') {
    if (messageWords.length === 1) {
      // ~roll
      return message.channel.send(
        (Math.floor(Math.random() * 6) + 1) + ' ' + rollFlavor
      );
    }

    let sides = messageWords[1]; // ~roll 20
    let rolls = 1;
    if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
      // ~roll 4d20
      rolls = messageWords[1].split('d')[0] / 1;
      sides = messageWords[1].split('d')[1];
    } else if (messageWords[1][0] == 'd') {
      // ~roll d20
      sides = sides.slice(1);
    }
    sides = sides / 1;
    if (isNaN(sides) || isNaN(rolls)) {
      return;
    }
    if (rolls > 1) {
      const rollResults = [];
      for (let i = 0; i < rolls; i++) {
        rollResults.push(Math.floor(Math.random()*sides)+1);
      }
      const sum = rollResults.reduce((a,b) => a + b);
      return message.channel.send(`[${rollResults.toString()}] ${rollFlavor}`);
    } else {
      return message.channel.send(
        (Math.floor(Math.random() * sides) + 1) + ' ' + rollFlavor
      );
    }
  }
});

bot.on("message",message=>{
  if(message.author.equals(bot.user)) return;
  if (message.author.bot) return; 
  let MessageArr = message.content.split(" ");
  let cmd = MessageArr[0];
  let args = MessageArr.slice(1);
  if(cmd == "-dmall"){
      message.delete()
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Oh, nan ! Il te manque la permission ADMINISTRATEUR");
      let messagee = args.join(" ");
      if(!messagee) return message.channel.send("S'il te plait precise un message !");
      else{
         message.guild.members.cache.forEach(member=>{
              member.send(messagee).then(()=>{
                  console.log("Envoyer a : "+member.user.tag+" confirmée !");
              }).catch(function(){
                  console.log("je n'est pas reussie a envoyer de dm a : "+member.user.tag+".");
              });
          })
      }
  }
})

bot.login("NzA2OTMzODYxMjU0Mjk5NjQ4.XrBddg.cF3BrYCsBfjPvMFscHUkKTzcSfM");