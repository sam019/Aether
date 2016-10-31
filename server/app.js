const Koa = require('koa');
const serve = require('koa-static');
const convert = require('koa-convert');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Group = require('./models/Group');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/im');

app.use(convert(serve(__dirname + '/public')));
/* app.use((ctx) => {
  // todo: return index page
  ctx.redirect('http://localhost:8080'); // dev：redirect to webpack-dev-server
}); */

// 在线用户及人数
let online = {
  users: [],
  count: 0,
  addUser(socket, user) {
    socket.username = user.username;
    socket.groups = user.groups;
    for (const group of socket.groups) {
      socket.join(group);
    }
    this.users.push(socket);
    this.count++;
    console.log(`The user login: ${socket.username}`);
    console.log(`The current number of online: ${this.count}`);
  },
  removeUser(socket) {
    if (this.users.includes(socket)) {
      for (const group of socket.groups) {
        socket.leave(group);
      }
      this.users = this.users.filter(item => item !== socket);
      this.count--;
      console.log(`The user logout: ${socket.username}`);
      console.log(`The current number of online: ${online.count}`);
      delete socket.username;
      delete socket.groups;
    }
  },
};

io.on('connect', (socket) => {
  console.log('connected');
  /* 用户注册 */
  socket.on('signup', async ({ username, password }, cb) => {
    try {
      const user = await User.findByName(username);
      if (user) {
        console.log('signup fail: username already exist');
        cb({
          success: false,
          reason: '用户名已存在',
        });
      } else {
        let newUser = new User({ username, password });
        newUser = await newUser.save();
        const token = jwt.sign({ username }, 'Aether', { expiresIn: '3d' });
        online.addUser(socket, newUser);
        cb({
          success: true,
          token,
          user: newUser,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
  /* 前端使用token登录 */
  socket.on('loginWithToken', async (token, cb) => {
    try {
      const username = jwt.verify(token, 'Aether').username;
      let user = await User.findByName(username);
      if (user) {
        user = user.toObject();
        delete user.password;
        online.addUser(socket, user);
        cb({
          success: true,
          user,
        });
      } else {
        console.log('verify fail: user not exist');
        cb({
          success: false,
          reason: 'not exist',
        });
      }
    } catch (err) {
      cb({
        success: false,
        reason: 'token expired',
      });
    }
  });
  /* 前端用户名和密码登录 */
  socket.on('login', async ({ username, password }, cb) => {
    try {
      const user = await User.findByName(username);
      if (user) {
        if (user.password === password) {
          online.addUser(socket, user);
          const token = jwt.sign({ username }, 'Aether', { expiresIn: '3d' });
          cb({
            success: true,
            token,
            user,
          });
        } else {
          console.log('password err');
          cb({
            success: false,
            reason: 'password err',
          });
        }
      } else {
        console.log('user not exist');
        cb({
          success: false,
          reason: 'no exist',
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
  /* 推送初始化数据 */
  socket.on('getGroupsInfo', async ({ groupsName }, cb) => {
    try {
      const groupsPromise = [];
      for (const groupName of groupsName) {
        groupsPromise.push(Group.findByName(groupName));
      }
      let groups = await Promise.all(groupsPromise);
      if (!groups[0]) {
        cb([]);
        return;
      }
      groups = groups.map((group) => {
        group = group.toObject();
        delete group._id;
        group.messages = group.messages.slice(-30);
        for (const message of group.messages) {
          delete message._id;
        }
        return group;
      });
      cb(groups);
    } catch (err) {
      console.log(err);
    }
  });
  /* 消息推送 */
  socket.on('message', async (message) => {
    console.log('receive message');
    message.username = socket.username;
    const groupName = message.groupName;
    socket.broadcast.to(groupName).emit('message', message);
    delete message.groupName;
    try {
      const group = await Group.findByName(groupName);
      if (group) {
        group.messages.push(message);
        group.updated = Date.now();
        console.log('存储消息');
        group.save();
      } else {
        const newGroup = new Group({
          groupName,
          messages: [message],
        });
        console.log('创建新房间');
        newGroup.save();
      }
    } catch (e) {
      console.log(e);
    }
  });
  /* 推送历史消息 */
  socket.on('getHistoryMessages', async ({ groupName, before }, cb) => {
    try {
      const group = await Group.findByName(groupName);
      if (group && before < group.messages.length) {
        let messages = group.messages.toObject();
        messages = messages.slice(-before - 15, -before);
        for (const message of messages) {
          delete message._id;
        }
        cb({
          success: true,
          messages,
        });
      } else {
        cb({ success: false });
      }
    } catch (e) {
      console.log(e);
    }
  });
  /* 用户登出 */
  socket.on('logout', () => {
    online.removeUser(socket);
  });
  /* 用户断开连接 */
  socket.on('disconnect', () => {
    console.log('disconnected');
    online.removeUser(socket);
  });
});

server.listen(3000, () => console.log('listening on port: 3000'));
