export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const logout = dispatch => {
  return () => {
    console.log('logging out');
  };
};