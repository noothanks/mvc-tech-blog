const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const helpers = require('./utils/helpers')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
//sets up store
//uses session.Store as arg
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//create session obj
const sess = {
  //set session secret
  //should be stored in .env
  secret: process.env.SESSION_SECRET,

  //tell program to use cookies
  //set properties within obj
  cookie: {
    maxAge: 3600000
  }, 

  //forces session to saved back to store even if the cookie hasnt been modified
  //defaullt is true
  //depracated
  //recommended false
  resave: false,

  //when a new session is created itll be saved to the store
  saveUninitialized: true,

  //initializes store
  //object passed through creates connection to db
  //allows sequalize to save the session to db
  store: new SequelizeStore({
    db: sequelize
  })
};

//tells program to use session
app.use(session(sess));

//passes helpers into handlebars
const hbs = exphbs.create({helpers});

//sets up handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set public folder to be staticly served
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(require('./controllers/'));

//turn on connection to db and server
//force: false says to use the current tables without dropping and recreating them
//must be set to true and restarted when changes are made to shcema
//translates to DROP IF EXISTS
//then set back to false to avoid tables being dropped when you don't want them to
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
