import React from 'react'
import axios from 'axios'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Wallet = ({
  users,
  setUsers,
  email,
  password,
  receiver,
  setReceiver,
  amount,
  setAmount,
}) => {
  const [allUsers, setAllUsers] = useState([])
  const [userInfo, setUserInfo] = useState('')
  // const [receiver, setReceiver] = useState('')

  const navigate = useNavigate()
  console.log(users.id)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/users`)
      console.log(response.data)
      let res = response.data
      setAllUsers(res)
      // setAllUsers(res.filter((list) => list.id !== users.id))
      console.log(allUsers)
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }

  const fetchReceiver = async () => {
    let theId = userInfo
    try {
      const response = await axios.get(`http://localhost:4500/users/${theId}`)
      console.log(response.data)
      setReceiver(response.data)
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }

  const goToTransfer = async (e) => {
    e.preventDefault()

    let senderId = users.id
    let receiverId = userInfo
    console.log(senderId)
    console.log(receiverId)

    let debit = users.walletBalance - amount
    let credit = Number(receiver.walletBalance) + Number(amount)
    const senderBal = { walletBalance: debit }
    const receiverBal = { walletBalance: credit }
    console.log(debit)
    console.log(credit)

    await axios
      .all(
        [
          axios.patch(`http://localhost:4500/users/${senderId}`, senderBal),
          axios.patch(`http://localhost:4500/users/${receiverId}`, receiverBal),
          axios.get(`http://localhost:4500/users`),
        ],
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then(
        axios.spread((response1, response2, response3) => {
          const responseOne = response1.data
          const responseTwo = response2.data
          const responseThree = response3.data

          console.log(responseOne, responseTwo)
          console.log(responseThree)

          setUsers(responseOne)

          setUserInfo(responseTwo)
          setAllUsers(responseThree)
        })
      )
      .catch((error) => {
        console.log(error)
      })
  }

  console.log(amount)

  let handleUser = (e) => {
    console.log(users)
    console.log(allUsers)

    console.log(Number(userInfo))
    fetchReceiver()
  }

  return (
    <main className="wallet">
      <div className="owner">
        <h4>Welcome to your Wallet {users.fname}</h4>
        {users && (
          <>
            {/* <p>name:{users.fname}</p> */}
            <p>Balance:{users.walletBalance}</p>
          </>
        )}
      </div>
      <br /> <br />
      <select onChange={(e) => setUserInfo(e.target.value)}>
        <option value="select user">Select User</option>
        {allUsers
          .filter((list) => list.id !== users.id)
          .map((list, i) => (
            <option key={i} value={list.id}>
              {list.fname} {list.walletBalance}
            </option>
          ))}
        {/* {allUsers.map((trf, i) => (
          <option key={i} value={trf.id}>
            {trf.fname} {trf.walletBalance}
          </option>
        ))} */}
      </select>
      <button onClick={handleUser}> check</button>
      <form onSubmit={goToTransfer}>
        <h2>
          {receiver.fname} {receiver.walletBalance}
        </h2>
        <label>
          Enter Amount:
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <button type="submit">Proceed to Tranfer</button>
      </form>
    </main>
  )
}

export default Wallet
