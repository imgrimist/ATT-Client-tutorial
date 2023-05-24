const { Client: AttClient } = require('att-client');
const { attConfig } = require('./bot-config');

bot.on('connect', async (connection) => {
    
    // Subscribes to the 'ObjectKilled' event
    connection.subscribe(`ObjectKilled`, message => { 
       
        // Declares the name of the object killed, and the player who killed the object
        const { killerPlayer, name,  } = message.data;
        
        // Checks the the name of the object that was killed
        if (name.startsWith('Spriggull')) {
            
            // If the name of the object starts with 'Spriggull', send a message to the player saying they killed a spriggull
            connection.send(`player message ${killerPlayer} "You killed a spriggull!" 3`);
        }
    })
})

// Start the bot
bot.start()





