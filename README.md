# Aether

[在线聊天室](http://aether.liangsen.tk)

## 特性
* 前后端分离开发
* 前端react，包括react，redux，react-router，immutablejs
* 后端koa2, mongodb
* 使用socket.io做消息推送

## 基础功能
* 注册登录、创建和加入群组、发起私聊、历史消息
* 发送文本、发送表情、发送图片、发送链接
* 个人信息查看和修改
* 桌面提醒、声音提醒（pc端）
* 兼容移动端

## 安装
    git clone https://github.com/sam019/Aether.git
    cd Aether/client
    npm install --production  //安装前端依赖
    npm run build //编译并打包前端
    cd ../server
    npm install --production //安装后端依赖
    npm run build //编译后端
    npm run server //开启server

## tips:
1. node.js的版本是v6.x
2. mongodb服务运行在默认的27017端口。
3. 生产环境默认监听80端口。
4. 启动需要pm2。
