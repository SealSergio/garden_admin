import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "../../app/providers/store.js";
import { Header } from "./Header/Header.js";
import { ProductsMain } from "../../features/products/ui/ProductsMain/ProductsMain.js"; 
import { Support } from "../../features/support/ui/Support.js";
import { ProductFormWrapper } from "../../features/productForm/ui/ProductFormWrapper.js";
import "./MainPage.scss";

export const MainPage: React.FC = () => {    
    return (
        <>
            <Header />
            <div className="container container--admin-inner">
                <Provider store={store}>
                    <main className="main">
                        <Routes>
                            <Route path="/products" element={<ProductsMain />}/>
                            <Route path="/support" element={<Support />}/>
                            <Route index element={<Navigate to="/products" replace />} />
                        </Routes>
                        <ProductFormWrapper />
                    </main>
                </Provider>
            </div>
        </>
    );
}
