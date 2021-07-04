import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = 'auth-token';
type User = {
  _id: string;
  name: string;
  email: string;
  iat: string;
};

const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(key, token);
  } catch (err) {
    console.log(err);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (err) {
    console.log(err);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (!token) return null;
  const user: User = jwtDecode(token);
  return token ? { name: user.name, email: user.email } : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (err) {
    console.log(err);
  }
};

export default { getToken, storeToken, removeToken, getUser };
