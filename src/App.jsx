import React, { useEffect, useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch SSO user info:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>Dedicated Entra ID App Registration</div>
        <h1 style={styles.title}>Prism App</h1>
        <hr style={styles.divider} />
        
        {loading ? (
          <p>Authenticating SSO user...</p>
        ) : (
          <div>
            <h2 style={styles.greeting}>
              Hello World, <span style={styles.highlight}>{user?.username || 'User'}</span>! 👋
            </h2>
            <p style={styles.subtitle}>
              Signed in via Microsoft Entra ID SSO as: <strong>{user?.email}</strong>
            </p>
            <div style={styles.statusBadge}>
              ✓ Authenticated & Session Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '520px',
    textAlign: 'center',
    border: '1px solid #334155'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#3b82f620',
    color: '#60a5fa',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '12px',
    marginBottom: '12px',
    border: '1px solid #3b82f640'
  },
  title: {
    margin: 0,
    color: '#f8fafc',
    fontSize: '28px'
  },
  divider: {
    margin: '20px 0',
    border: '0',
    borderTop: '1px solid #334155'
  },
  greeting: {
    color: '#f1f5f9',
    fontSize: '22px',
    marginBottom: '10px'
  },
  highlight: {
    color: '#38bdf8'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '24px'
  },
  statusBadge: {
    display: 'inline-block',
    backgroundColor: '#05966920',
    color: '#34d399',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    border: '1px solid #05966940'
  }
};
