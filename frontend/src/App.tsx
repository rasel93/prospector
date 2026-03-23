import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const scrape = async () => {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/scrape",
      { url }
    );
    setResult(JSON.stringify(res.data, null, 2));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Prospector</h1>
      <input
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={scrape}>Scrape</button>
      <pre>{result}</pre>
    </div>
  );
}