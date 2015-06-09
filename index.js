'use strict'

var assert = require('assert')

module.exports = function(req, res, next) {

  assert(req.session, 'req.session is required!')

  if (!req.session.flash) {

    req.session.flash = {}

  }

  res.locals.flash = pull(req.session)

  res.flash = push

  next()

}

function pull(session) {

  var flash = session.flash

  delete session.flash

  return flash
}

function push(message, details) {

  var flash = this.req.session.flash || {}

  if (message instanceof Error) {

    flash.err = message.toString()

  } else {

    flash[message] = details || {}

  }

  this.req.session.flash = flash

}