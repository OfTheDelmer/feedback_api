var db = require('../../models');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');


function setup(mainRouter) {

  function attach(opts) {

    mainRouter.use(bodyParser.urlencoded({ extended: true}));
    mainRouter.use(bodyParser.json());

    function serviceSetup(req, res, next) {
      req.jwt = jwt;
      req.db = db;
      next();
    }

    console.log(path.resolve( __dirname +'/../../log'));
    var logStream = fs.createWriteStream(path.resolve( __dirname +'/../../log'), {flags: 'a'});
    mainRouter.use(morgan('combined', {stream:  logStream}));

    mainRouter.use(serviceSetup);

    return mainRouter;
  }


  return {
    attach: attach
  };
}

module.exports.setup = setup
