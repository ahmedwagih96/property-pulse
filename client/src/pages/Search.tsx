import { Results, Sidebar } from "../components";
export default function Search() {
  return (
    <main className="flex flex-col md:flex-row">
      <Sidebar />
      <Results />
    </main>
  );
}