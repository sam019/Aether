/**
 * 计算元素的相对于整个页面的上偏移
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
export function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}
/**
 * 计算元素的相对于整个页面的左偏移
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
export function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}
export const expressions = [
  '呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
  '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心',
  '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
  '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳',
];
