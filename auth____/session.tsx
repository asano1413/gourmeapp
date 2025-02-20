import React from 'react';
import { useEffect, useState } from 'react';

export default function Session() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        setSession(data.session);
      } else {
        setSession(null);
      }
    };

    fetchSession();
  }, []);

  if (!session) {
    return <div>ログインしていません</div>;
  }

  return (
    <div>
      <h1>セッション情報</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}