import axios from 'axios';
export const logout = async (next) => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
    });
    if (res.data.status === 'success') {
      localStorage.setItem('jwt', null);
      localStorage.clear();

      next();
    }
  } catch (err) {}
};

export const isAuth = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt') && localStorage.getItem('data')) {
    return {
      jwt: localStorage.getItem('jwt'),
      userData: JSON.parse(localStorage.getItem('data')),
    };
  } else {
    return false;
  }
};
