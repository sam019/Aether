export default function setUserInfo(info) {
  return {
    type: 'SET_USER_INFO',
    payload: info,
  };
}
