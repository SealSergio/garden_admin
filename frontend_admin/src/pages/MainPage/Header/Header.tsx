import { FC } from "react";
import { logout } from "../../../features/auth/api/auth"; 
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../app/queryClient";
import "./Header.scss";

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
            <h1 className="header__title">
            <a href="#" target="_blank">Музыка камня</a>
            </h1>
            <div className="header__btns-right">
            <button
                onClick={()=>logoutMutation.mutate()}
                className="header__btn header__btn--user btn-reset"
            >
                Выйти
            </button>
            </div>
        </div>
        </header>
    );
};
