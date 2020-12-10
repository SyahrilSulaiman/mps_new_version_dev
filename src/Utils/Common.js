  import sha256 from 'js-sha256';

  export const getNOKP = () => {
    return sessionStorage.getItem('nokp');
  }

  export const getUser = () => {
    return sessionStorage.getItem('username');
  }
  
  export const getToken = () => {
    return sessionStorage.getItem('token');
  }

  export const getEmail = () => {
    return sessionStorage.getItem('email');
  }

  export const getGoogleToken = () => {
    return sessionStorage.getItem('GoogleToken');
  }

  export const getGoogleEmail = () => {
    return sessionStorage.getItem('GoogleEmail');
  }

  export const getGoogleName = () => {
    return sessionStorage.getItem('GoogleName');
  }

  export const getRole = () => {
    return sessionStorage.getItem('role');
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('nokp');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('GoogleToken');
    sessionStorage.removeItem('GoogleEmail');
    sessionStorage.removeItem('GoogleName');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('cukai');
    sessionStorage.removeItem('notel');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (token, username, nokp, email, role) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('nokp', nokp);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('role', role);
  }

  export const setGoogleToken = (token, email, name) => {
    sessionStorage.setItem('GoogleToken', token);
    sessionStorage.setItem('GoogleEmail', email);
    sessionStorage.setItem('GoogleName', name);
  }

  export const setAuthorization = (nokp, email) => {
    let token = sha256(nokp+'DEADCE6F498F6E88'+email);
    return token;
  }