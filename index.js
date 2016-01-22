'use strict';

var net = require('net');
var tls = require('tls');
var url = require('url');
var util = require('util');
var events = require('events');
var Deque = require('double-ended-queue');
var ssh = require('ssh2');

const default_port = 6397;
const default_ip = '0.0.0.0';

var connection_id = 0;

function debug (msg) { if (exports.debug_mode) { console.error(msg); } }

exports.debug_mode = /\bredis-honeypot\b/i.test(process.env.NODE_DEBUG);

function RedisHoneypot(options) {
    
    options = JSON.parse(JSON.stringify(obj || {}));

    events.EventEmitter.call(this);

    if(options.path) {
        this.address = options.path;
    } else {
        options.port = +options.port || default_port;
        options.host = options.host || default_host;
        options.family = (!options.family && net.isIP(options.host)) || (options.family === 'IPv6' ? 6 : 4);
        this.address = options.host + ':' + options.port;
    }

    this.connected = false;
    this.ready = false;
    this.connection_id = ++connection_id;
    this.options = options;

    this.incoming = new Deque();
    this.outgoing = new Deque();

    // TODO: Listen on redis port/ip
    // TODO: Use ssh2 to listen for ssh connections on default ssh port
    // TODO: Pretty much the entire app once I get some time this weekend

};

var createHoneypot = function(port_arg, host_arg, options) {
    return new RedisHoneypot(options);
};

util.inherits(RedisHoneypot, events.EventEmitter);

exports.createHoneypot = createHoneypot;