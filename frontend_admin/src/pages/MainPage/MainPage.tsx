import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "../../app/providers/store";
import { Aside } from "./Aside/Aside";
import { Header } from "./Header/Header";
import { ProductsMain } from "../../features/products/products/ui/ProductsMain/ProductsMain"; 
import { Support } from "../../features/support/ui/Support";
import "./MainPage.scss";

export const MainPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className="container container--admin-inner">
                {/* <Aside /> */}
                <Provider store={store}>
                    <main className="main">
                        <Routes>
                            <Route path="/products" element={<ProductsMain />}/>
                            <Route path="/support" element={<Support />}/>
                            <Route index element={<Navigate to="/products" replace />} />
                        </Routes>
                    </main>
                </Provider>
            </div>
        </>
    );
}
