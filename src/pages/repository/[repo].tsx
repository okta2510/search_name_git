import { useRouter } from 'next/router';
import RepoDetails from '../../components/RepoDetails';

export default function RepositoryPage() {
  const router = useRouter();
  const { repo } = router.query;

  if (!repo) {
    return <div
      style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(90deg, #f3f4f6 0%, #e0e7ff 100%)',
      }}
    >
      <div
      style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(37,99,235,0.10)',
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '320px',
      }}
      >
      <div
        style={{
        color: '#2563eb',
        fontWeight: 600,
        fontSize: '1.3rem',
        letterSpacing: '0.02em',
        }}
      >
        Loading...
      </div>
      </div>
    </div>;
  }

  return <RepoDetails repoName={repo as string} />;
}