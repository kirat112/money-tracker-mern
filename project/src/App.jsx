/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { cloneElement, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  let x = 1; // change render _> reset
  const [xs, setXs] = useState(1); // change render
  const xr = useRef(1); // no renreder ' but bhulda ni

  const [txns, setTxns] = useState([]);
  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    price: "",
    time: "",
    desc: "",
  });

  useEffect(() => {
    // this will be called 
    console.log("lcoal storage upadte logic  called");
    if (txns.length > 0) localStorage.setItem("txns", JSON.stringify(txns));
    let temp = 0;
    for(let i=0; i<txns.length; i++){
      temp += Number(txns[i].price);
    }
    setTotal(temp);
  }, [txns]);

  useEffect(() => {
    // api call
    const oldTxn = localStorage.getItem("txns");
    if (oldTxn) {
      // pai hai
      setTxns(JSON.parse(oldTxn));
    }
    console.log("useeffect 2");

  }, []);

  console.log("rerenderd");

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const logx = () => {
    console.log(x);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orignalTxns = [...txns];
    orignalTxns.push(formData);
    setTxns(orignalTxns);
    setFormData({
      price: "",
      time: "",
      desc: "",
    });
  };

  return (
    <main>
      <h1 >
        Total : {total}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="basic">
          <input
            value={formData.price}
            name="price"
            type="number"
            onChange={handleChange}
            placeholder={"+200"}
          />
          <input
            value={formData.time}
            onChange={handleChange}
            name="time"
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            value={formData.desc}
            onChange={handleChange}
            name="desc"
            type="text"
            placeholder={"description"}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {txns.length > 0 &&
          txns.map((txn, index) => {
            return <Transaction key={index} txn={txn} />;
          })}
      </div>
      {/* <button onClick={logx}>logx</button>
      <button onClick={() => x++}>innc x : {x}</button>
      <button onClick={() => setXs((prev) => prev + 1)}>innc xs : {xs}</button>
      <button onClick={() => (xr.current = xr.current + 1)}>
        innc xr : {xr.current}
      </button> */}
    </main>
  );
}

const Transaction = ({ txn }) => {
  return (
    <div className="transaction">
      <div className="left">
        <div className="name">{txn.desc}</div>
        <div className="description">{txn.desc}</div>
      </div>
      <div className="right">
        {/* {txn.price < 0 ? (
          <div className="price red">{txn.price}</div>
        ) : (
          <div className="price green">{txn.price}</div>
          )} */}
        <div className={"price " + (txn.price > 0 ? "green" : "red")}>
          {txn.price}
        </div>
        <div className="datetime">{txn.time}</div>
      </div>
    </div>
  );
};

export default App;
