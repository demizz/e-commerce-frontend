import axios from 'axios';
export const logout = async (next) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/v1/auth/logout`,
    });
    if (res.data.status === 'success') {
      localStorage.setItem('jwt', null);
      localStorage.clear();

      next();
    }
  } catch (err) {
    console.log(err);
  }
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
