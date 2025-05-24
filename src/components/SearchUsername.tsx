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
    <div className="search-component">
  <div className="search-box">
    <input
      type="text"
      value={username}
      className="search-input"
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter GitHub username"
    />
    <button className="search-button" onClick={handleSearch}>Search</button>
  </div>

  {userData.length > 0 && (
    <div className="user-list">
      {userData.map((user, index) => (
        <div key={index} className="user-card">
          <Image src={user.avatar_url} alt={user.login} width={50} height={50} className="avatar" />
          <div className="user-info">
            <h2 className="user-name">{user.login}</h2>
            <p className="user-bio">{user.bio}</p>
            <Link href={`/repository/${user.login}`} className="user-link">View Repositories</Link>
          </div>
        </div>
      ))}
    </div>
  )}

  {error && <p className="error">{error}</p>}
</div>

  );
}
