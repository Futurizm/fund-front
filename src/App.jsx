import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import Error from "./pages/Error"
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";



function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

// 2:12:25

export default App;




// Если между переходами между страницами идет загрузка, то это нарушает принцип Single Page application

// Папка utils создана для различных вспомогательных функций (работа с датами, форматирование, работа со строками, с номерами страниц и т.д)
