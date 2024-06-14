"use client";
import React, {createContext, useState} from 'react';
import { ServerResponse, request } from '@/services/request';

export enum Category{
    Uncategorized,
    Salgados,
    Doces,
    Bebidas,
    Drinks
}

export type Product = {
    _id: number,
    name: string,
    qtd: number,
    category: Category,
    preco: number,
    description: string
}

type ProductContextType = {
    Products: Product[];
    addProduct: (_id:number, name:string, qtd:number, category:Category, preco:number, description:string) => void;
    removeProduct: (_id:number) => void;
    changeCategory: (_id:number, new_Category:Category) => void;
    deleteProduct: (_id:number) => void;
    updateProducts: () => void;
    updatedProducts: boolean;
}

export const ProductContext = createContext({} as ProductContextType);

export const ProductContextProvider = ({ children } : {children: React.ReactNode;}) => {
    // UseStates para controle de variáveis.
    const [Products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [updatedProducts, setUpdatedProducts] = useState(false);

    // Função que adiciona o produto a lista do navegador
    const addProduct = (_id:number, name:string, qtd:number, category:Category, preco:number, description:string) => {
        let newProduct = {
            _id: _id,
            name: name,
            qtd: qtd,
            category: category,
            preco: preco,
            description: description
        }
        setProducts([...Products, newProduct]);
    };

    // Função que deleta o produto do banco de dados.
    const deleteProduct = async (_id:number) => {
        let res = await request<ServerResponse>(`http://127.0.0.1:5000/products/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJDYXJvbGluZSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNzE4MTEzMzk0fQ.J8uH7BVAXE9YSGEWB5GMo7QWLE78MVyYjjIJEVUbhHQ',
                'isAdmin': 'true'
            },
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        }, false)
    }

    // Função que atualiza a lista do navegador com os itens já existentes no banco de dados.
    const updateProducts = async () => {
        if(!updatedProducts){
            let res = await request<Product[]>('http://127.0.0.1:5000/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            }, false);
            setProducts(res);
            setUpdatedProducts(true);
        }
    }

    // Função que remove o produto da lista do navegador.
    const removeProduct = async (_id:number) => {
        setProducts(Products.filter((_:Product, index:number) =>
            _id !== index
        ))
    };

    // Função que muda a categoria do produto.
    const changeCategory = (_id:number, new_Category:Category) => {
        Products[_id].category = new_Category;
    };

    return (
        <ProductContext.Provider value={{ Products, addProduct, removeProduct, changeCategory, deleteProduct, updateProducts, updatedProducts }}>
            {children}
        </ProductContext.Provider>
    );
}