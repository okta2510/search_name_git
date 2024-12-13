import SearchUsername from "@/components/SearchUsername";

export default function Home() {
  return (
    <div className="container mx-auto py-[100px]">
      <h1>Search GitHub Username</h1>
      <SearchUsername />
    </div>
  );
}