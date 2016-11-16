import socket from '../socket';

/* 表情顺序 */
export const expressions = [
  '呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
  '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心',
  '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
  '生气', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳',
];

function getURL(token, key, file, resolve, reject) {
  // 七牛云
  const body = new FormData();
  body.append('token', token);
  body.append('key', key);
  body.append('file', file);
  fetch('http://upload.qiniu.com/', {
    method: 'POST',
    body,
  })
  .then(res => res.json())
  .then((json) => {
    if (json.key) {
      resolve(encodeURI(`http://oemazp8bp.bkt.clouddn.com/${json.key}`));
    } else {
      json.error === 'bad token' && sessionStorage.removeItem('uploadToken');
      reject(json.error);
    }
  })
  .catch(reject);
  // sm.ms
  /* const body = new FormData();
  body.append('smfile', file);
  const config = {
    method: 'POST',
    body,
  };
  return new Promise((resolve, reject) => {
    fetch('https://sm.ms/api/upload', config)
    .then(res => res.json())
    .then((json) => {
      json.code === 'success' ? resolve(json.data.url) : reject(json.message);
    })
    .catch(reject);
  }); */
}

/**
 * 图片上传
 * @param  {[type]} key  [description]
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
export function uploadToCloud(key, file) {
  return new Promise((resolve, reject) => {
    const token = sessionStorage.getItem('uploadToken');
    if (!token) {
      socket.emit('getUploadToken', (sign) => {
        sessionStorage.setItem('uploadToken', sign);
        getURL(sign, key, file, resolve, reject);
      });
    } else {
      getURL(token, key, file, resolve, reject);
    }
  });
}
