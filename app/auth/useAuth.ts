import { useContext } from 'react';
import jwtDecode from 'jwt-decode';
import AuthContext from './context';
import authStorage from './storage';

type User = {
  _id: string;
  name: string;
  email: string;
  iat: string;
};

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (token: string) => {
    const user: User = jwtDecode(token);
    setUser({ name: user.name, email: user.email });
    await authStorage.storeToken(token);
  };

  const logOut = async () => {
    setUser(null);
    await authStorage.removeToken();
  };

  return { user, logIn, logOut };
};

export default useAuth;
