import { useState } from "react";
import { API } from "../api";

interface Props {
  onSuccess: () => void;
}

export default function AddLinkForm({ onSuccess }: Props) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/api/links", { url, code });
      setUrl("");
      setCode("");
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating link");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded mb-6 shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        className="border p-2 w-full mb-3"
        placeholder="Target URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Custom Code (optional)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
