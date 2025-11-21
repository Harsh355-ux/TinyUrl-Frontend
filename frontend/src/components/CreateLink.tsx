import { useState } from "react";
import { api } from "../api";

export default function CreateLink() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/links", {
        url,
        code
      });

      const shortUrl = `http://localhost:5000/${res.data.code}`;
      setResult(shortUrl);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating link");
    }
  };

  return (
    <div>
      <h2>Create Short Link</h2>

      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        type="text"
        placeholder="Custom code (optional)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Shorten
      </button>

      {result && (
        <p>
          Short URL: <a href={result} target="_blank">{result}</a>
        </p>
      )}
    </div>
  );
}
