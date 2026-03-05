import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../api/auth";
import { queryClient } from "../../../app/queryClient";
import { Login } from "../../../pages/Login/Login";
import { MainPage } from "../../../pages/MainPage/MainPage";
import { Loader } from "../../../shared/components/Loader/Loader";

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
