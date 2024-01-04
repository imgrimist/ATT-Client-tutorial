const { Client: AttClient } = require('att-client');
const { attConfig } = require('./bot-config');
const bot = new AttClient(attConfig);

bot.on('connect', async (connection) => {
    
    // Subscribes to the PlayerMovedChunk event
    connection.subscribe(`PlayerMovedChunk`, message => {
        
        // Declares the 'player, newChunk, oldChunk' constants
        const { player, newChunk, oldChunk } = message.data;
        
        // Sees if player enters the Townhall
        if (newChunk.startsWith(`Townhall Building`)) {
            connection.send(`player message ${player.id} "Welcome to Townhall, ${player.username}!" 4`);
        }
        
        // Sees if player left Townhall
        if (oldChunk.startsWith(`Townhall Building`)) {
            connection.send(`player message ${player.id} "See you later, ${player.username}!" 4`);
        }

    })
})

// Start the bot
bot.start()
