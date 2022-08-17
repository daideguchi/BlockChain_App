import React from 'react'
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const Main = () => {
    const { name } = useContext(TransactionContext);
    console.log(name);
  return (
    <div className="mainContainer">
      {/* {左側} */}
      <div className="cryptContainer">
        <h1 className="title">Crypt Card</h1>
        <button type="button">
          <p className="buttonText">ウォレット連携</p>
        </button>
      </div>
          {/* {左側} */}
          <div className="inputContainer">
              <input type="text" placeholder="アドレス" name="addressTo" />
              <input type="number" placeholder="通貨(ETH)" name="amount" step="0.0001" />
              <button type="button">送信</button>
          </div>
    </div>
  );
}

export default Main