const { Client: AttClient, Client } = require('att-client');
const { attConfig } = require('./bot-config');
const bot = new AttClient(attConfig);
const cooldown = [];

// While this is enabled there will be a cooldown for killing
const cooldownEnable = true;

// When killReward is enabled, players that kill other players will be given 50 coins every time they kill another player
const killReward = true;

bot.on('connect', async (connection) => {

    connection.subscribe("PlayerKilled", message => {
        const {killedPlayer, killerPlayer} = message.data;

        if (killedPlayer && killerPlayer) {
            if (cooldownEnable && !cooldown.includes(killerPlayer.id)) {
                cooldown.push(killerPlayer.id);
                setTimeout(function() {
                    cooldown.splice(cooldown.indexOf(killerPlayer.id), 1);
                }, 86400000);
            } 
            
            if (cooldown.includes(killerPlayer.id)) {
                connection.send(`bans from-server ${killerPlayer.id} 42 “Sorry, ${killerPlayer.username}...”`);
            }
            
            if (killReward) {
                connection.send(`trade post ${killerPlayer.id} GoldCoin 50`);
                connection.send(`player message ${killedPlayer.id} "50 Coins are now in your mailbox." 3`);
            }
            
            setTimeout(function() {
                connection.send(`bans from-server ${killedPlayer.id} 72 “Sorry, ${killedPlayer.username}...”`);
            }, 3000)
        }
    })
})

bot.start();
