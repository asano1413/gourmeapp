import { signOut, useSession } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();

    return (
        <header>
            {session ? (
                <>
                    <span>Welcome, {session.user?.email}!</span>
                    <button onClick={() => signOut()}>Logout</button>
                </>
            ) : (
                <a href="/auth/login">Login</a>
            )}
        </header>
    );
}
