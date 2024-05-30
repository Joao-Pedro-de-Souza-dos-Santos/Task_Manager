import { PropsWithChildren, createContext } from "react";
import { API } from "../config/api";

export type SingInTypes = {
    email: string;
    password: string;
};

type AuthContextTypes = {
    singIn: (params: SingInTypes) => Promise<boolean | void>
};

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({children}: PropsWithChildren){
    async function singIn({email, password}: SingInTypes){
        if(!email || !password) throw alert("Por Favor, insira o Email e Senha!");

        return API
            .post("/login", {email, password})
            .then((response) => {
                console.log({ userID: response.data.id });
                return true;
            })
            .catch((error) => {
                if(error.response) alert(error.response.data.message);
                else alert("Um erro inesperado no login");
            });

    }

    return (
        <AuthContext.Provider value={{singIn}}>
            {children}
        </AuthContext.Provider>
    );
}