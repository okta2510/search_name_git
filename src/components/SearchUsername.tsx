"use client"
import { useState } from "react";
import { fetchGitHubUser } from "../helpers/api";
import Image from 'next/image';
import Link from "next/link";

export default function SearchUsername() {
  const [username, setUsername] = useState("");
  interface GitHubUser {
    avatar_url: string;
    name: string;
    bio: string;
    login: string;
  }

  const [userData, setUserData] = useState<GitHubUser[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchGitHubUser(username);
      console.debug('data', data);
      setUserData(data.items || []);
      setError("");
    } catch {
      setError("User not found");
      setUserData([]);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <input
        type="text"
        value={username}
        className="bg-white border-2 border-gray-400 p-3 w-full"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"/>
        <button className="bg-blue-700 text-white px-3 py-3 ml-2 min-w-[200px]" onClick={handleSearch}>Search</button>
      </div>
      {userData.length > 0 && (
        <div>
          {userData.map((user, index) => (
          <div key={index} className="flex items-center border-b py-4">
            <Image src={user.avatar_url} alt={user.login} width={50} height={50} className="rounded-full" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{user.login}</h2>
              <p className="text-gray-800">{user.bio}</p>
              <Link href={`/repository/${user.login}`}>View Repositories</Link>
            </div>
          </div>
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
