export default function getUserInfo(user) {
  return {
    type: 'GET_USER_INFO',
    payload: user,
  };
}
