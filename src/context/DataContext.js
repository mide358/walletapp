import { createContext, useState } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <DataContext.Provider
      value={{
        id,
        setId,
        email,
        setEmail,
        password,
        setPassword,
        setUsers,
        users,
        receiver,
        setReceiver,
        amount,
        setAmount,
        userInfo,
        setUserInfo,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
