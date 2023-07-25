const { Client: AttClient } = require('att-client');
const { attConfig } = require('./bot-config');
const bot = new AttClient(attConfig);

bot.on('connect', async (connection) => {
    
        // Subscribes to the player joined event
        connection.subscribe(`PlayerJoined`, message => {
            
            // Declares the 'user' constant
            const { user } = message.data;
            
            // Sends the welcome message
            connection.send(`player message * "${user.username} has joined ${connection.server.name}" 4`);

        })
})

// Start the bot
bot.start()
