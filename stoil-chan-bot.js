#!/usr/bin/env node

/* ------------------------------------- */
/* COBAYE PROJECT : stoil-chan-bot v.0.1 */
/* ===================================== */
/* IRC NodeJS bot - 2012                 */
/* Use NodeJS IRC client library         */
/* ------------------------------------- */
/* File : cobaye.js                      */
/* ------------------------------------- */

// Includes
var irc = require('irc');
//require('./custom_functions.js');

// bot object instanciation
var bot = new irc.Client('irc.freenode.net', 'Cobaye', {
  port: 8001, 
  debug: true,
  channels: ['#stoil-chan'],
});

// Various declarations
var chanListHello = new Array();
var smilist = new Array(
  ":(",
  "D:",
  ":'(",
  ":)",
  ";)",
  ":D",
  ":/",
  ":o",
  "Oo",
  ":P",
  "lol",
  "XD",
  "^^",
  "?",
  "!",
  "!!!",
  "?!"
);

// Listeners
bot.addListener('error', function(message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

bot.addListener('message#stoil-chan', function (from, message) {
  console.log('<%s> %s', from, message);
});

bot.addListener('message', function (from, to, message) {
  console.log('%s => %s: %s', from, to, message);

  if (to.match(/^[#&]/)) {
    // channel message
    
    /* --- GREATINGS --- */
    
    var hello = /hello/i;
    if (message.match(/hello/i)) {
      if (in_array(from, chanListHello)) {
        bot.say(to, ';)');
      }
      else {
        bot.say(to, 'Hello there ' + from + ' :)');
        chanListHello.push(from);
      }
    }
    
    /* ------ */

    /* --- DANCE --- */
    
    if (message.match(/dance/)) {
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: _o|\u0001") }, 1000);
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: \\o|\u0001")  }, 2000);
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: |o|\u0001")  }, 3000);
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: |o/\u0001")  }, 4000);
      setTimeout(function () { bot.say(to, "\u0001ACTION dances: |o_\u0001")  }, 4000);
    }

    /* ------ */

    /* --- FLIP THE TABLE  --- */

    if (message.match(/Cobaye, flip the table/) || message.match(/^(ra+h+)/i)) {
      var ftt = '';
      switch (from) {
        case 'BlastEye':
          ftt = '(ノಠ益ಠ)ノ彡┻━┻'; 
          break;
        default:
          ftt = '(╯°□°）╯︵ ┻━┻'; 
      }
      bot.say(to, ftt);
    }
    
    /* ------ */

    var randnb = Math.floor(Math.random() * 101);
    console.log('randnb = ' + randnb);

    if (randnb >= 85) {
      var theMessage = message.split(' ');
      var poped = '';
      while (in_array(poped = theMessage.pop(), smilist)) {}
      if (poped.match(/^([a-zA-Z0-9_-]+)$/))
        bot.say(to, 'stoi ' + poped);
    }

  }
  if (message.match(/!!!/i)) {
    //bot.send('KICK');
  }
  else {
    // private message
  }
});

bot.addListener('pm', function(nick, message) {
  console.log('Got private message from %s: %s', nick, message);
});

/* --- LISTENER ON JOIN EVENT --- */

bot.addListener('join', function(channel, who) {
  console.log('%s has joined %s', who, channel);
  if (who !== 'Cobaye') {
    bot.say('#stoil-chan', 'Hello there ' + who + ' :)');
    chanListHello.push(who);
  }
});

/* ------ */

bot.addListener('part', function(channel, who, reason) {
  console.log('%s has left %s: %s', who, channel, reason);
  // TODO : Greatings management on PART event
});

bot.addListener('kick', function(channel, who, by, reason) {
  console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});

/* --- CUSTOM FUNCTIONS --- */

/* --- Find a needle in a haystack... classic :P  ;) --- */

function in_array(needle, haystack) {
  for (var key in haystack) {
    if (needle ===  haystack[key]) {
      return true;
    }
  }
  return false;
}

function rand_time() {
  
}

