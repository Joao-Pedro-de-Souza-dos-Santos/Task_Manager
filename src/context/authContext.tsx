import { PropsWithChildren, createContext, useState } from "react";
import { API } from "../config/api";

export type SingInTypes = {
    email: string;
    password: string;
};

export type SingUpTypes = {
    name: string
    email: string;
    password: string;
};

type AuthContextTypes = {
    singIn: (params: SingInTypes) => Promise<boolean | void>;
    singUp: (params: SingUpTypes) => Promise<boolean | void>;
    singOut: () => void;
    isLoading: boolean;
};

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({children}: PropsWithChildren){
    const [isLoading, setIsLoading] = useState(false);

    async function singIn({email, password}: SingInTypes){
        if(!email || !password) throw alert("Por Favor, insira o Email e Senha!");

        setIsLoading(true);
        return API
            .post("/login", {email, password})
            .then((response) => {
                const userID = { userID: response.data.id };

                localStorage.setItem("@task_manager:user", JSON.stringify(userID));

                return true;
            })
            .catch((error) => {
                if(error.response) alert(error.response.data.message);
                else alert("Um erro inesperado no login");
                console.log(error);
             }).finally(() => {
                setIsLoading(false);
             });

    }

    async function singUp({name, email, password}: SingUpTypes){
        if(!name || !email || !password) throw alert("Por Favor, insira o Email e Senha!");

        setIsLoading(true);
        return API
            .post("/user", {name, email, password})
            .then((response) => {
                alert(response?.data.message);
                return true;
            })
            .catch((error) => {
                if(error.response) alert(error.response.data.message);
                else alert("Um erro inesperado ao criar usuário");

                console.log(error);
             }).finally(() => {
                setIsLoading(false);
             });

    }

    function singOut(){
        localStorage.removeItem("@task_manager:user");
        //remove cookie
    }
    return (
        <AuthContext.Provider value={{singIn, singUp, singOut, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
}