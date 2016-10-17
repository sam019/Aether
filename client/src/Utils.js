/**
 * 计算元素的相对于整个页面的上偏移
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function getElementTop(element) {
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
function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

const Utils = {
  getElementTop,
  getElementLeft,
};
export { getElementTop, getElementLeft };
export default Utils;
