/* Written by <xiam@menteslibres.org> */

/* Settings */
var CONF = {
  'server': 'irc.freenode.net',
  'port': 6665,
  'nickname': 'Marvin-H2G2',
  'realname': 'Marvin-H2G2',
  'channel': '#stoil-chan'
};

var util = require('util');

var net = require('net');

var client = new net.Socket();

client.connect(
    CONF.port || 6665, CONF.server,
    function () {
    /* Sending ident */
    client.write(util.format('USER %s %s %s: %s\r\n', CONF.nickname, CONF.nickname, CONF.nickname, CONF.realname));
    client.write(util.format('NICK %s\r\n', CONF.nickname));
    }
    );

client.on('data',
    function(data) {

    var buff = data.toString().split('\r\n');

    for (var i = 0; i < buff.length; i++) {

    /* Reading response line by line */
    var line = buff[i];

    console.log(line);

    var prefix = null;
    var command = null;
    var params = null;

    var match = null;
    
    if (match = line.match(/^:([^\s]+)\s([^\s]+)\s(.+)$/)) {
    prefix = match[1];
    command = match[2];
    params = match[3];
    } else if (match = line.match(/^([^\s]+)\s(.+)$/)) {
      command = match[1];
      params = match[2];
    };

    if (command == '376') {
      client.write(util.format('JOIN %s\r\n', CONF.channel));
    };
    
    if (command == '366') {
      client.write(util.format("PRIVMSG %s :I think you ought to know I'm feeling very depressed.\r\n", CONF.channel));
    }
    
    if (command == 'PRIVMSG') {
      console.log(params);
      if (params == CONF.channel + " :" + CONF.nickname + ", what's up?")
        client.write(util.format("PRIVMSG %s :I don't know, I've never been there.\r\n", CONF.channel));
    }

    if (command == 'PING') {
      client.write('PONG\r\n');
    }

    }
    }

);
