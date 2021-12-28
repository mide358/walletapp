import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const TransferConfirmation = () => {
  const navigate = useNavigate();
  const { receiver, amount } = useContext(DataContext);

  function addCur(num) {
    return '$' + num;
  }

  return (
    <main className="container">
      <div className="confirm">
        <div className="tick">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <div className="payText">
          <h3>Payment Success</h3>

          <p>
            <span>{addCur(amount)}</span>
            <br />
            was successfully transferred to
            <br />
          </p>
          <p className="pay-name"> {receiver.fname}</p>
        </div>

        <button className="done" onClick={() => navigate('/wallet')}>
          Done
        </button>
      </div>
    </main>
  );
};

export default TransferConfirmation;
