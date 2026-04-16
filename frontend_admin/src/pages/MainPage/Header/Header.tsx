import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../features/auth/api/auth.js"; 
import { queryClient } from "../../../app/queryClient.js";
import "./Header.scss";
import { Link } from "react-router-dom";

export const Header: FC = () => {
    // handleClickOnBtnUser();


    function handleClickOnBtnExit() {
        logout();
    }

    // const [isPending, setPending] = useState(false);
    const logoutMutation = useMutation(
        {
        mutationFn: logout,
        //   onMutate: () => setPending(true),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users", "me"]});
            // queryClient.invalidateQueries({queryKey: ["users", "me"]}).finally(() => setPending(false));
        },
        }, queryClient
    );

    return (
        <header className="header">
        <div className="container container--header">
            <a className="header__left" href="https://garden-decoration.ru" target="_blank">
                <img className="header__logo" src="../public/img/ms.jpeg" alt="Музыка камня" />
                {/* <h1 className="header__title">
                    Музыка камня
                </h1> */}
            </a>
            <ul className="header-menu">
                <li>
                    <Link to={"/products"}>
                        <button className="btn-reset header-menu__btn">
                            Изделия
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to={"/products"}>
                        <button className="btn-reset header-menu__btn">
                            Список
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to={"/products"}>
                        <button className="btn-reset header-menu__btn">
                            Архив
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to={"/products"}>
                        <button className="btn-reset header-menu__btn">
                            Фото
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to={"/products"}>
                        <button className="btn-reset header-menu__btn">
                            Справка
                        </button>
                    </Link>
                </li>
            </ul>
            <button
                onClick={()=>logoutMutation.mutate()}
                className="header__btn header__btn--user btn-reset"
            >
                Выйти
            </button>
        </div>
        </header>
    );
};
