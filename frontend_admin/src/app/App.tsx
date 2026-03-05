import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "../features/auth/ui/Auth";
import { setDefaultMode } from "../shared/lib/mode/mode";

export const App = () => {
    try {
        setDefaultMode();
    } catch (error) {
        // Игнорируем ошибку
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={
                    <Auth
                />} />
            </Routes>
        </BrowserRouter>
    );
}
