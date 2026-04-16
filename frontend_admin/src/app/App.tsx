import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "../features/auth/ui/Auth.js";

export const App = () => {
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
