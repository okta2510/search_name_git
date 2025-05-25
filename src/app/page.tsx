'use client';
import SearchUsername from "@/components/SearchUsername";

export default function Home() {
  return (
    <div className="container mx-auto py-[100px] app-container">
      <h1>Search GitHub Username</h1>
      <SearchUsername />
    </div>
  );
}