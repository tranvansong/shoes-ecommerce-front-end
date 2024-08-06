import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/auth"
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const login = async (email, password) => {
        try {
            const data = await loginApi(email, password);
            setUser({
                name: data.fullName,
                email: data.email,
                avatar: data.avatar,
                roles: data.roles,
            });
            // localStorage.setItem('token', data.token);
            navigate('/admin/dashboard');
        } catch (error) {
            return error.data;
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        navigate('/admin/login');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}