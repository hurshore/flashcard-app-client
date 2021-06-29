import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const prefix = 'cache';
const expiryInMinutes = 5;

const store = async (key: string, value: any) => {
  const item = { value, timestamp: Date.now() };
  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    console.log(err);
  }
};

const isExpired = (item: { value: any; timestamp: Date }) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, 'minute') > expiryInMinutes;
};

const get = async (key: string) => {
  try {
    let item;
    const value = await AsyncStorage.getItem(prefix + key);
    if (value) item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (err) {
    console.log(err);
  }
};

export default { store, get };
