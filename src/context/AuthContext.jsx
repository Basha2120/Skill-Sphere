import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await API.get("/users/me");
                    setUser(res.data);
                } catch (err) {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setUser({ name: res.data.name, email: res.data.email });
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await API.post("/auth/register", { name, email, password });
        localStorage.setItem("token", res.data.token);
        setUser({ name: res.data.name, email: res.data.email });
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
