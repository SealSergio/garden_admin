import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "../../app/providers/store";
import { Aside } from "./Aside/Aside";
import { Header } from "./Header/Header";
import { AuthorsMain } from "../../features/books/authors/ui/AuthorsMain/AuthorsMain";
import { BooksMain } from "../../features/books/books/ui/BooksMain/BooksMain";
import { Support } from "../../features/support/ui/Support";
import { CyclesMain } from "../../features/books/cycles/ui/CyclesMain/CyclesMain";
import { GenresMain } from "../../features/books/genres/ui/GenresMain/GenresMain";
import "./MainPage.scss";

export const MainPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className="container container--admin-inner">
                <Aside />
                <Provider store={store}>
                    <main className="main">
                        <Routes>
                            <Route path="/books" element={<BooksMain />}/>
                            <Route path="/authors" element={<AuthorsMain />}/>
                            <Route path="/cycles" element={<CyclesMain />}/>
                            <Route path="/genres" element={<GenresMain />}/>
                            <Route path="/support" element={<Support />}/>
                            <Route index element={<Navigate to="/books" replace />} />
                        </Routes>
                    </main>
                </Provider>
            </div>
        </>
    );
}
