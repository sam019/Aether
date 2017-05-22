# Aether

## 技术栈
* 前后端分离开发
* 前端使用react全家桶，包括react-router，redux，Immutablejs
* 后端使用Node.js开发，基于koa框架, MongoDB数据库
* 使用websocket做消息推送

## 基础功能
* 注册登录、创建和加入群组、发起私聊、历史消息
* 发送文本、发送表情、发送图片、发送链接
* 个人信息查看和修改
* 桌面提醒、声音提醒(pc端)
* 兼容移动端

## 安装
    git clone https://github.com/sam019/Aether.git
    cd Aether/client // 前端目录
    npm install
    npm run build
    cd ../server // 后端目录
    npm install
    npm run build
    npm run serve // 开启服务器

## tips:
1. Node.js的版本不低于v6.x
2. MongoDB服务需要运行在默认的27017端口，也可以在后端配置文件server/lib/conf.js中修改
4. 部署需要pm2
