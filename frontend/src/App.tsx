import { useEffect, useState } from "react";

interface LinkData {
  code: string;
  url: string;
  clicks: number;
  lastClicked: string | null;
}

const api_BASE = "http://localhost:5000";

function App() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [longUrl, setLongUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLinks = async () => {
    try {
      const res = await fetch(`${api_BASE}/api/links`);
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error("Error loading links:", err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const createLink = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${api_BASE}/api/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: longUrl,
          code: code || undefined,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      setLongUrl("");
      setCode("");
      fetchLinks();
    } catch (err: any) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (code: string) => {
    await fetch(`${api_BASE}/api/links/${code}`, {
      method: "DELETE",
    });
    fetchLinks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">TinyLink Dashboard</h1>

      <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Create Short Link</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="text"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <button
          onClick={createLink}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Link"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Your Links</h2>

        {links.length === 0 ? (
          <p>No links found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Code</th>
                <th className="border p-2">URL</th>
                <th className="border p-2">Clicks</th>
                <th className="border p-2">Last Click</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.code}>
                  <td className="border p-2 text-blue-600">
                    <a href={`${api_BASE}/${link.code}`} target="_blank">
                      {link.code}
                    </a>
                  </td>
                  <td className="border p-2 truncate">{link.url}</td>
                  <td className="border p-2">{link.clicks}</td>
                  <td className="border p-2">
                    {link.lastClicked
                      ? new Date(link.lastClicked).toLocaleString()
                      : "Never"}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteLink(link.code)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
