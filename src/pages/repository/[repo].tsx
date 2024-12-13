import { useRouter } from 'next/router';
import RepoDetails from '../../components/RepoDetails';

export default function RepositoryPage() {
  const router = useRouter();
  const { repo } = router.query;

  if (!repo) {
    return <div>Loading...</div>;
  }

  return <RepoDetails repoName={repo as string} />;
}