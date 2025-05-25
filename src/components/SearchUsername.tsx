'use client';

import { useState,useEffect } from "react";
import { fetchGitHubUser } from "../helpers/api";
import Image from 'next/image';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUsername, setSelectedRepo } from '../store/repoSlice';

export default function SearchUsername() {
  // const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.repo.username);

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
  
  useEffect(() => {
    if (username && typeof username === 'string') {
      dispatch(setSelectedRepo(username));
    }
  }, [username, dispatch]);

  return (
    <div className="search-component">
  <div className="search-box">
    <input
      type="text"
      value={username}
      className="search-input"
      onChange={(e) => dispatch(setUsername(e.target.value))}
      placeholder="Enter GitHub username"
    />
    <button className="search-button" onClick={handleSearch}>Search</button>
  </div>

  {userData.length > 0 && (
    <div>

      {username && (
        <div className="search-result-text">
          Result search for <strong>{username}</strong>
        </div>
      )}
      <br></br>

    <div className="user-list">
      {userData.map((user, index) => (
        <div key={index} className="user-card">
          <Image src={user.avatar_url} alt={user.login} width={50} height={50} className="avatar" />
          <div className="user-info">
            <h2 className="user-name">{user.login}</h2>
            <p className="user-bio">{user.bio}</p>
            <Link
              href={`/repository/${user.login}`}
              className="user-link"
            >
              View Repositories
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  )}

  {error && <p className="error">{error}</p>}
</div>

  );
}
