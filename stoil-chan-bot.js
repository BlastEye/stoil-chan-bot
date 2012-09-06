#!/usr/bin/env nodejs

/* ------------------------------------- */
/* COBAYE PROJECT : stoil-chan-bot v.0.1 */
/* ===================================== */
/* IRC NodeJS bot - 2012                 */
/* Use NodeJS IRC client library         */
/* ------------------------------------- */
/* File : cobaye.js                      */
/* ------------------------------------- */

// TODO : Code structuration
//        Pipotron
//        Excuzotron (http://gilo-com.fr.chez-alice.fr/Rub_excuzo_tron.php)
//        Bug RAH
//        Arrival/Departure
//        Games : Seek, Quizz
//        Tweak time for speak
//        Sentences occurences ponderation
//        Request from wikipedia

/* --- Includes --- */
var irc = require('irc');
//require('./custom_functions.js');

/* --- Various declarations --- */
var chanListHello = new Array();

var smilist = new Array(
  ":(", "D:", ":'(", ":)", ";)",
  ":D", ":/", ":o", "Oo", ":P",
  "lol", "XD", "^^", "-_-", "...",
  "?", "!", "!!!", "?!", "???",
  "???!!!"
);

var smalist = new Array(
  'small',
  'tiny',
  'petit',
  'minuscule'
);

var bigList = new Array(
  'big',
  'huge',
  'gros',
  'énorme',
  'enorme'
);

var quotes = new Array(
  "\u0001ACTION s'ennuie... :(\u0001",
  "Je suis un bot à nick ! *padoum ! tsssh !*",
  "BURP ! Pardon... j'ai fais un rot bot ! *padoum ! tsssh !*",
  "SERAAAAAAAAAAAHHHHH !!!",
  "CSS ROXX !",
  "AAAHHH !!! Les zombies attaquent !!!",
  "Bon... on fume un pétard ?",
  "Apéro ce soir ! Et je refuse tout refus !",
  "...",
  "N'hesitez pas à me donner des idées hein :P"
);

var channel = '#stoil-chan';
var botname = 'Cobaye'
var botname_search = new RegExp(botname, 'i');

// bot object instanciation
var bot = new irc.Client('irc.freenode.net', botname, {
  port: 8001, 
  debug: true,
  channels: [channel],
});

// Listeners
bot.addListener('error', function(message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

bot.addListener('message#stoil-chan', function (from, message) {
  console.log('<%s> %s', from, message);
});

/* --- MAIN MESSAGE LISTENER --- */

bot.addListener('message', function (from, to, message) {
  
  console.log('%s => %s: %s', from, to, message);
 
  if (to.match(/^[#&]/)) {

    /* ---------------- */
    /* --- COMMANDS --- */
    /* ---------------- */  
    
    if (message.match(botname_search)) { // If botname is inside message, maybe it's a command
 
      /* --- PING --- */
 
      if (message.match(/ping/i)) {
        bot.say(to, 'pong ' + from);
      }
        
      /* --- GREATINGS --- */
      
      var hello = new RegExp('hello|yop|salut|hey', 'i');
      
      if (message.match(hello)) {
        if (in_array(from, chanListHello)) {
          bot.say(to, ';)');
        }
        else {
          bot.say(to, 'Yop ' + from + ' :)');
          chanListHello.push(from);
        }
      }

      /* --- FLIP THE TABLE  --- */

      if (message.match(/flip the table/) || message.match(/^(ra+h+)/i)) {
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
       
      /* --- SAY SOMETHING  --- */

      if (message.match(/say something/i)) {
        var randQuote = randme(quotes.length);
        bot.say(to, quotes[randQuote]);
      }

      /* --- ? 42  --- */

      if (message.match(/\?/)) { 
        bot.say(to, '42');
      }

    }
    
    /* --------------------- */
    /* --- INTERVENTIONS --- */
    /* --------------------- */  
    
    /* --- QUOTES  --- */

    if (randnb <= 10) {
      var randTime = randme(180000);
      var randQuote = randme(quotes.length);
      
      setTimeout(function () { bot.say(to, quotes[randQuote]) }, randTime);
    }

    /* --- STOI *  --- */

    var randnb = randme(100);
    console.log('randnb = ' + randnb);
    
    if (randnb >= 95) {
      var theMessage = message.split(' ');
      var poped = '';
      while (in_array(poped = theMessage.pop(), smilist)) {}
      if (poped) {
        if (poped.match(/^([a-zA-Z0-9_-]+)$/))
          bot.say(to, 'stoi ' + poped);
      }
    }

    if (message.match(botname_search) && message.match(/stoi/)) { 
      var theMessage = message.split(' ');
      var poped = '';
      while (in_array(poped = theMessage.pop(), smilist)) {}
      if (poped.match(/^([a-zA-Z0-9_-]+)$/))
        bot.say(to, 'Non ' + from + ', stoi ' + poped + ' :P');
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
  if (who !== botname) {
    bot.say('#stoil-chan', 'Yop ' + who + ' :)');
    chanListHello.push(who);
  }
});

/* ------ */

bot.addListener('part', function(channel, who, reason) {
  console.log('%s has left %s: %s', who, channel, reason);
});

bot.addListener('kick', function(channel, who, by, reason) {
  console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});

/* ------------------------ */ 
/* --- CUSTOM FUNCTIONS --- */
/* ------------------------ */ 

/* --- Find a needle in a haystack... classic :P  ;) --- */

function in_array(needle, haystack) {
  for (var key in haystack) {
    if (needle ===  haystack[key]) {
      return true;
    }
  }
  return false;
}

/* --- Generate an random number --- */

function randme(nb) {
  return Math.floor(Math.random() * (nb + 1));
}

