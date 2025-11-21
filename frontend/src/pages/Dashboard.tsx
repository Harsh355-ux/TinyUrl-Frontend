import { useEffect, useState } from "react";
import { API } from "../api";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from "../components/Linktable";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

  async function loadLinks() {
    const res = await API.get("/api/links");
    setLinks(res.data);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <>
      <AddLinkForm onSuccess={loadLinks} />
      <LinkTable links={links} refresh={loadLinks} />
    </>
  );
}
