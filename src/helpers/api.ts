export async function fetchGitHubUser(username: string) {
  const response = await fetch(`https://api.github.com/search/users?q=${username}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error("User not found");
  }
  return response.json();
}

export async function fetchGitHubRepo(repoName: string) {
  const response = await fetch(`https://api.github.com/users/${repoName}/repos`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error("Repository not found");
  }
  return response.json();
}

export async function fetchGitHubRepoReadme(repoName: string) {
  const response = await fetch(`https://api.github.com/repos/${repoName}/readme`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error("README not found");
  }
  return response.json();
}