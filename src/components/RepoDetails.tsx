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
    <div className='container mx-auto' style={{ paddingTop: '100px' }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" >
      {repoData.map((repo) => (
      <div key={repo.name} className="p-6 mb-4 bg-white rounded-lg shadow-md "style={{ border: 'solid 1px #f1f1f1' }}>
        <h2 className="mb-2 text-xl font-bold">{repo.name}</h2>
        <p className="mb-2 text-gray-700">{repo.description}</p>
        <p className="mb-1 text-gray-600">⭐ Stars: {repo.stargazers_count}</p>
        <p className="mb-4 text-gray-600">🍴 Forks: {repo.forks_count}</p>
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
        className="px-3 py-2 mt-4 text-white bg-blue-500 rounded"
        >
        Show README
        </button>
        {readmeData[repo.full_name] && (
        <div className="p-4 p-5 mt-6 bg-gray-100 rounded">
          <h3 className="mb-2 text-lg font-bold">README</h3>
          <div className="overflow-hidden prose text-ellipsis whitespace-nowrap">
            <ReactMarkdown className="readme">{readmeData[repo.full_name]}</ReactMarkdown>
          </div>
        </div>
        )}
      </div>
      ))}
    </div>
    </div>
  );
}