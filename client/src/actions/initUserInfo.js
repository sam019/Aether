export default function initUserInfo(user) {
  return {
    type: 'INIT_USER_INFO',
    payload: user,
  };
}
