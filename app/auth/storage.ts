import * as SecureStore from 'expo-secure-store';

const key = 'auth-token';

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

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (err) {
    console.log(err);
  }
};

export default { getToken, storeToken, removeToken };
