"use client";

import { createContext, useState } from "react";
import { request } from '../services/request';
import { setCookie } from 'nookies';
import { useRouter } from "next/navigation";

export type SignIdData = {
    username: string;
    password: string;
}

type AuthContextType = {
    login: (data: SignIdData) => void;
    authError: string | null;
}

type UserAuthentication = {
    'x-access-token': string
}

export const AuthContext = createContext({} as AuthContextType);


export default function AuthProvider( { children }: { children: React.ReactNode } ){
    const [authError, setAuthError] = useState<string | null>(null); // Controle de variáveis com o useState

    const router = useRouter(); // Montar o useRouter para forçar o usuário a ir para /products após logado.

    // Função que realiza a checagem das credenciais com o back-end
    async function login({username, password} : SignIdData) {
        // Requisição para o back-end com os dados recebidos
        let {'x-access-token': token} = await request<UserAuthentication>('http://localhost:5000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        }, true);

        // Decisões a serem tomadas caso o back-end valide ou não o usuário.
        if(!token) setAuthError('Usuário ou senha inválidos. Verifique e tente novamente!');
        else{
            setCookie(null, 'auth.token', token, {
                maxAge: 60 * 60 * 1,
            });
            // Se validado, force o usuário a ir para a página de produtos.
            router.push('/products');
        }
    }
    
    return (
        <AuthContext.Provider value={{login, authError}} >
            {children}
        </AuthContext.Provider>
    );
};