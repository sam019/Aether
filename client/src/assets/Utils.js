import socket from '../socket';

/* 表情顺序 */
export const expressions = [
  '呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
  '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心',
  '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
  '生气', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳',
];

/**
 * 图片上传
 * @param  {[type]} key  [description]
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
export function uploadToCloud(key, file) {
  return new Promise((resolve, reject) => {
    function getURL(token) {
      // 七牛云
      const body = new FormData();
      body.append('token', token);
      body.append('key', key);
      body.append('file', file);
      return fetch('http://upload.qiniu.com/', {
        method: 'POST',
        body,
      })
      .then(res => res.json());
    }
    function uploader(count = 0) {
      const newCount = count + 1;
      function responseTreater(json) {
        if (json.key) {
          resolve(encodeURI(`http://oemazp8bp.bkt.clouddn.com/${json.key}`));
        } else {
          if (json.error === 'bad token') {
            localStorage.removeItem('uploadToken');
            if (newCount < 3) {
              uploader(newCount);
            } else {
              reject(json.error);
            }
          }
          reject(json.error);
        }
      }
      const token = localStorage.getItem('uploadToken');
      if (!token) {
        socket.emit('getUploadToken', (sign) => {
          localStorage.setItem('uploadToken', sign);
          getURL(sign)
          .then(responseTreater)
          .catch(reject);
        });
      } else {
        getURL(token)
        .then(responseTreater)
        .catch(reject);
      }
    }
    uploader();
  });
}
