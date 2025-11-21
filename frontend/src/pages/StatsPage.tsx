import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api";

export default function StatsPage() {
  const { code } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    API.get(`/api/links/${code}`).then((res) => setData(res.data));
  }, [code]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Stats for {code}</h2>

      <p>
        <strong>URL: </strong> {data.url}
      </p>

      <p>
        <strong>Total Clicks: </strong> {data.clicks}
      </p>

      <p>
        <strong>Last Clicked: </strong>{" "}
        {data.lastClicked ? new Date(data.lastClicked).toLocaleString() : "-"}
      </p>
    </div>
  );
}
