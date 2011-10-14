var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId;
  
var conf = require('./config/oauth_providers');
var UserSchema = new Schema({
  role: String
})
	, User;
var mongooseAuth = require('mongoose-auth');

UserSchema.plugin(mongooseAuth, {
  everymodule: {
    everyauth: {
      User: function() {
        return User;
      }
    }
  },
  facebook: {
    everyauth: {
      myHostname: 'http://local.host:3000',
      appId: conf.fb.appId,
      appSecret: conf.fb.appSecret,
      redirectPath: '/'
    }
  },
  twitter: {
    everyauth: {
      myHostname: 'http://local.host:3000',
      consumerKey: conf.twit.consumerKey,
      consumerSecret: conf.twit.consumerSecret,
      redirectPath: '/'
    }
  },
  github: {
    everyauth: {
      myHostname: 'http://local.host:3000',
      appId: conf.github.appId,
      appSecret: conf.github.appSecret,
      redirectPath: '/'
    }
  }
});



mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/example');

User = mongoose.model('User');

var express = require('express');
var app = express.createServer();

abilities = {
  editor: {
    index: ['read'],
    protected: ['read']
  },
  default: {
    index: ['read'],
    // protected: ['read']
  }
}
var ability = require('ability')();
ability.add(abilities);


ability.configure({
  // whether or not to redirect
  redirect: true,
  // where to redirect
  redirect_to: '/',
  // the name of our everyauth role
  role_name: 'role'
})


app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({secret: 'secret'}));
  app.use(mongooseAuth.middleware());
});

app.dynamicHelpers({ messages: require('express-messages') });
ability.addHelpers(app);
mongooseAuth.helpExpress(app);


app.get('/', function(req, res){
	authorize();
	res.render('index');
});

app.get('/protected', function(req, res) {
  authorize();
  res.render('protected');
});



app.listen(3000);