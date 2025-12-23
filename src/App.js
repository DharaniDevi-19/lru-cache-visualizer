import React, { useState } from "react";
import LRUCache from "./LRUCache";
import "./App.css";

function App() {
  const [capacity, setCapacity] = useState(3);
  const [cache, setCache] = useState(new LRUCache(3));
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [getKey, setGetKey] = useState("");
  const [result, setResult] = useState("");

  const refreshCache = () => {
    setCache(Object.assign(Object.create(Object.getPrototypeOf(cache)), cache));
  };

  const createCache = () => {
    setCache(new LRUCache(capacity));
    setResult("");
  };

  const putValue = () => {
    if (keyInput === "") return;
    cache.put(keyInput, valueInput);
    refreshCache();
    setKeyInput("");
    setValueInput("");
  };

  const getValue = () => {
    setResult(cache.get(getKey));
    refreshCache();
    setGetKey("");
  };

  return (
    <div className="container">
      <h1>LRU Cache Visualizer</h1>

      <div className="card">
        <h3>Cache Capacity</h3>
        <div className="row">
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
          <button onClick={createCache}>Create</button>
        </div>
      </div>

      <div className="card">
        <h3>PUT</h3>
        <div className="row">
          <input
            placeholder="Key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
          />
          <input
            placeholder="Value"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
          <button onClick={putValue}>PUT</button>
        </div>
      </div>

      <div className="card">
        <h3>GET</h3>
        <div className="row">
          <input
            placeholder="Key"
            value={getKey}
            onChange={(e) => setGetKey(e.target.value)}
          />
          <button onClick={getValue}>GET</button>
        </div>
        {result !== "" && <div className="result">Result: {result}</div>}
      </div>

      <div className="card">
        <h3>Cache (MRU → LRU)</h3>
        <div className="cache-items">
          {cache.getAll().map(([k, v], index, arr) => (
            <React.Fragment key={k}>
              <div className="cache-box">
                <div className="cache-key">{k}</div>
                <div className="cache-value">{v}</div>
              </div>
              {index < arr.length - 1 && (
                <div className="arrow">➜</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="footer">
        LRU Cache • React UI • Java-style logic
      </div>
    </div>
  );
}

export default App;
