import client from './client';

const login = (email: string, password: string) =>
  client.post('/user/login', { email, password });
const register = (name: string, email: string, password: string) =>
  client.post('/user/signup', { name, email, password });

export default { login, register };
