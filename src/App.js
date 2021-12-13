import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import { useState } from 'react'
import Login from './components/Login'

import Wallet from './components/Wallet'
import Transfer from './components/Transfer'

function App() {
  const [userInfo, setUserInfo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [users, setUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              setId={setId}
              id={id}
              users={users}
              setUsers={setUsers}
            />
          }
        />
        <Route
          path="/wallet"
          element={
            <Wallet
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              users={users}
              email={email}
              password={password}
              setUsers={setUsers}
              receiver={receiver}
              setReceiver={setReceiver}
              amount={amount}
              setAmount={setAmount}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
            />
          }
        />
        <Route
          path="/transfer"
          element={
            <Transfer
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              users={users}
              email={email}
              password={password}
              receiver={receiver}
              setReceiver={setReceiver}
              amount={amount}
              setAmount={setAmount}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
            />
          }
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
