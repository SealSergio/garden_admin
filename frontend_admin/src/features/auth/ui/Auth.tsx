import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../api/auth.js";
import { queryClient } from "../../../app/queryClient.js";
import { Login } from "../../../pages/Login/Login.js";
import { MainPage } from "../../../pages/MainPage/MainPage.js";
import { Loader } from "../../../shared/components/Loader/Loader.js";

export const Auth = () => {
    const meQuery = useQuery(
        {
            queryFn: () => fetchMe(),
            queryKey: ["users", "me"],
            retry: false,
        },
        queryClient,
    );

    switch (meQuery.status) {
        case "pending":
            return <Loader />;

        case "error":
            return <Login />;

        case "success":
            return <MainPage />;
    }
}
