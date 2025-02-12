import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    user: { id: number; email: string } | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<{ id: number; email: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // トークンをデコードしてユーザー情報を取得（簡易的な例）
            const decoded = JSON.parse(atob(token.split('.')[1])); 
            setUser({ id: decoded.id, email: decoded.email });
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: decoded.id, email: decoded.email });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
