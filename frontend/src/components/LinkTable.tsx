import { API } from "../api";

interface Link {
  code: string;
  url: string;
  clicks: number;
  lastClicked?: string;
}

interface Props {
  links: Link[];
  refresh: () => void;
}

export default function LinkTable({ links, refresh }: Props) {
  async function handleDelete(code: string) {
    await API.delete(`/api/links/${code}`);
    refresh();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Short</th>
          <th className="p-2">URL</th>
          <th className="p-2">Clicks</th>
          <th className="p-2">Last Click</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.map((l) => (
          <tr key={l.code} className="border-b">
            <td className="p-2">
              <a
                href={`/${l.code}`}
                target="_blank"
                className="text-blue-600 underline"
              >
                {l.code}
              </a>
            </td>

            <td className="p-2 max-w-xs truncate">{l.url}</td>

            <td className="p-2">{l.clicks}</td>

            <td className="p-2">
              {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "-"}
            </td>

            <td className="p-2 space-x-3">
              <button
                onClick={() =>
                  copyToClipboard(`${window.location.origin}/${l.code}`)
                }
                className="text-sm bg-green-600 text-white px-2 py-1 rounded"
              >
                Copy
              </button>

              <button
                onClick={() => handleDelete(l.code)}
                className="text-sm bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>

              <a
                href={`/code/${l.code}`}
                className="text-sm bg-gray-800 text-white px-2 py-1 rounded"
              >
                Stats
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
