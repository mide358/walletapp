import React from 'react';
import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

import Tooltip from './Tooltip';

const Wallet = () => {
  const {
    users,
    setUsers,
    receiver,
    setReceiver,
    amount,
    setAmount,
    userInfo,
    setUserInfo,
    allUsers,
    setAllUsers,
  } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/users`);

        let res = response.data;
        setAllUsers(res);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchUser();
  }, []);

  const fetchReceiver = async () => {
    let theId = userInfo;
    try {
      const response = await axios.get(`http://localhost:4500/users/${theId}`);

      setReceiver(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const goToTransfer = async (e) => {
    e.preventDefault();

    let senderId = users.id;
    let receiverId = userInfo;

    let debit = users.walletBalance - amount;
    let credit = Number(receiver.walletBalance) + Number(amount);
    const senderBal = { walletBalance: debit };
    const receiverBal = { walletBalance: credit };

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
          const responseOne = response1.data;
          const responseTwo = response2.data;
          // const responseThree = response3.data;

          setUsers(responseOne);

          setUserInfo(responseTwo);

          navigate('/transfer');
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  let handleUser = (e) => {
    fetchReceiver();
  };

  // function to format the number
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return '$' + (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return '$' + (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    } else if (num < 900) {
      return '$' + num; // if value < 1000, nothing to do
    }
  }

  function addCur(num) {
    return '$' + num;
  }

  return (
    <main className="wallet">
      <div className="owner">
        <p>
          Welcome to your Wallet <br />
          <span> </span>
        </p>
        <div className="owner-name">
          <p>{users.fname}</p>
          {users && (
            <Tooltip
              text={
                users.walletBalance
                  ? addCur(users.walletBalance.toLocaleString('en-US'))
                  : ''
              }
            >
              <p className="balance">
                Balance:
                {numFormatter(users.walletBalance)} <br />
                <small>Hover on balance to see full amount </small>
              </p>
            </Tooltip>
          )}
        </div>
        {/* <Tooltip
          text={
            users.walletBalance
              ? addCur(users.walletBalance.toLocaleString('en-US'))
              : ''
          }
        >
          <button className="tool-btn"> Hover me!</button>
        </Tooltip> */}
      </div>
      <br /> <br />
      <select
        className="select"
        onChange={(e) => {
          setUserInfo(e.target.value);
        }}
        onClick={handleUser}
      >
        <option value="select user">Select User</option>
        {allUsers
          .filter((list) => list.id !== users.id)
          .map((list, i) => (
            <option key={i} value={list.id}>
              {list.fname}
            </option>
          ))}
      </select>
      <br />
      <form onSubmit={goToTransfer}>
        <h4>
          Receiver: {receiver.fname}
          {/* {receiver.walletBalance} */}
        </h4>
        <div className="amount">
          <label>
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
            />
          </label>
        </div>
        <button type="submit">Transfer</button>
      </form>
    </main>
  );
};

export default Wallet;

// onClick={() => setAmount(() => '')}
