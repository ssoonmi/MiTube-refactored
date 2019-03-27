export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


export const logout = () => dispatch => {
  document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  dispatch({ type: LOGOUT });
};