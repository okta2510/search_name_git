import { useEffect, useState } from 'react';
import { fetchGitHubRepo, fetchGitHubRepoReadme } from '@/helpers/api';
import ReactMarkdown from 'react-markdown';
import { atob } from 'abab';

interface RepoDetailsProps {
  repoName: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  full_name: string;
}

export default function RepoDetails({ repoName }: RepoDetailsProps) {
  const [repoData, setRepoData] = useState<GitHubRepo[] | null>(null);
  const [readmeData, setReadmeData] = useState<{ [key: string]: string | null }>({});
  const [error, setError] = useState('');

  useEffect(() => {
    const getRepoData = async () => {
      try {
        const data = await fetchGitHubRepo(repoName);
        setRepoData(data);
        setError('');
      } catch {
        setError('Repository not found');
        setRepoData(null);
      }
    };

    getRepoData();
  }, [repoName]);

  const handleFetchReadme = async (repoFullName: string) => {
    try {
      const readmeResponse = await fetchGitHubRepoReadme(repoFullName);
      setReadmeData((prevData) => ({
        ...prevData,
        [repoFullName]: atob(readmeResponse.content),
      }));
      setError('');
    } catch {
      setError('README not found');
      setReadmeData((prevData) => ({
        ...prevData,
        [repoFullName]: null,
      }));
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!repoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repoData.map((repo) => (
      <div key={repo.name} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">{repo.name}</h2>
        <p className="text-gray-700 mb-2">{repo.description}</p>
        <p className="text-gray-600 mb-1">⭐ Stars: {repo.stargazers_count}</p>
        <p className="text-gray-600 mb-4">🍴 Forks: {repo.forks_count}</p>
        <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
        >
        View on GitHub
        </a>
        <br></br>
        <button
        onClick={() => handleFetchReadme(repo.full_name)}
        className="bg-blue-500 text-white px-3 py-2 mt-4 rounded"
        >
        Show README
        </button>
        {readmeData[repo.full_name] && (
        <div className="mt-6 bg-gray-100 p-4 rounded p-5">
          <h3 className="text-lg font-bold mb-2">README</h3>
          <div className="prose">
          <ReactMarkdown>{readmeData[repo.full_name]}</ReactMarkdown>
          </div>
        </div>
        )}
      </div>
      ))}
    </div>
  );
}