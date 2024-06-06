import { PropsWithChildren, createContext, useEffect, useState } from "react";
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
    authUserId: string;
};

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({children}: PropsWithChildren){
    const [isLoading, setIsLoading] = useState(false);
    const [authUserId, setAuthUserId] = useState("");

    async function singIn({email, password}: SingInTypes){
        if(!email || !password) throw alert("Por Favor, insira o Email e Senha!");

        setIsLoading(true);
        return API
            .post("/login", {email, password})
            .then((response) => {
                const userID = response.data.id;

                console.log(userID);


                setAuthUserId(userID);

                localStorage.setItem("@task_manager:userID", JSON.stringify(userID));

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
        localStorage.removeItem("@task_manager:userID");
        setAuthUserId("");
        API.post("/logout").catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        const userID = localStorage.getItem("@task_manager:userID");

        if (userID){
            const id = JSON.parse(userID);

            API.get("/user")
                .then((res) => {
                if (id == res.data.id) setAuthUserId(userID);
                })
                .catch((error) => {
                    if (error.response?.status == 401) singOut();
                })
            setAuthUserId(userID); // get user in api
        }
    }, []);

    return (
        <AuthContext.Provider value={{singIn, singUp, singOut, isLoading, authUserId}}>
            {children}
        </AuthContext.Provider>
    );
}