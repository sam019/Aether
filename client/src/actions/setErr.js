export default function setErr(code) {
  return {
    type: 'SET_ERR',
    payload: { code },
  };
}
