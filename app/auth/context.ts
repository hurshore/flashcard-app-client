import React from 'react';

type User = {
  name: string;
  email: string;
};

interface ContextType {
  user: User | null;
  setUser: (value: User | null) => void;
}

const AuthContext = React.createContext<ContextType>({
  user: null,
  setUser: () => {},
});

export default AuthContext;
