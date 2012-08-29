#!/usr/bin/env node

// Make sure the irc lib is available
//require.paths.unshift(__dirname + '/node_modules/irc/lib');

var irc = require('irc');

var bot = new irc.Client('irc.freenode.net', 'Cobaye', {
    port: 8001, 
    debug: true,
    channels: ['#stoil-chan'],
});

bot.addListener('error', function(message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

bot.addListener('message#stoil-chan', function (from, message) {
    console.log('<%s> %s', from, message);
});

bot.addListener('message', function (from, to, message) {
    console.log('%s => %s: %s', from, to, message);

    if ( to.match(/^[#&]/) ) {
        // channel message
        if ( message.match(/hello/i) ) {
            bot.say(to, 'Hello there ' + from);
        }
        if ( message.match(/dance/) ) {
            setTimeout(function () { bot.say(to, "\u0001ACTION dances: _o|\u0001") }, 1000);
            setTimeout(function () { bot.say(to, "\u0001ACTION dances: \\o|\u0001")  }, 2000);
            setTimeout(function () { bot.say(to, "\u0001ACTION dances: |o|\u0001")  }, 3000);
            setTimeout(function () { bot.say(to, "\u0001ACTION dances: |o/\u0001")  }, 4000);
            setTimeout(function () { bot.say(to, "\u0001ACTION dances: |o_\u0001")  }, 4000);
        }
        if ( message.match(/Cobaye, flip the table/) ) {
          bot.say(to, '(╯°□°）╯︵ ┻━┻');
        }
    }
    else {
        // private message
    }
});
bot.addListener('pm', function(nick, message) {
    console.log('Got private message from %s: %s', nick, message);
});
bot.addListener('join', function(channel, who) {
    console.log('%s has joined %s', who, channel);
});
bot.addListener('part', function(channel, who, reason) {
    console.log('%s has left %s: %s', who, channel, reason);
});
bot.addListener('kick', function(channel, who, by, reason) {
    console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});
