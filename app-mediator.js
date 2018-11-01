const User = function(name) {
  this.name = name;
  this.chatroom = null;
};

User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
};

const Chatroom = function() {
  let users = {};

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
        if (to) {
            // single user message
            to.receive(message, from);
        } else {
            //mass message
            for (key in users) {
                if (users[key] !== from) {
                    users[key].receive(message, from);
                }
            }
        }
    }
  };
};


const gheorghe = new User('gheorghe');
const marcel = new User('marcel');
const vasile = new User('vasile');
const tanta = new User('tanta');

const chatroom = new Chatroom();

chatroom.register(gheorghe);
chatroom.register(marcel);
chatroom.register(vasile);
chatroom.register(tanta);

vasile.send('hai la o bereee!', gheorghe);
tanta.send('sa mergem la plimbare', marcel);
gheorghe.send('ce buna e berea asta');