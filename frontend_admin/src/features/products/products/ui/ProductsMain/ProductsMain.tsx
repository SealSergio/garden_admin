import { ErrorMessage } from "../../../../../shared/components/Error/Error";
import { Loader } from "../../../../../shared/components/Loader/Loader";
import { useGetAllProductsQuery } from "../../api/products";
import { ProductForm } from "../ProductForm/ProductForm";
import { ProductListView } from "../ProductsListView/ProductListView";
// import { Filters } from "../ProductsListView/Filters/Filters";

export const ProductsMain: React.FC = () => {
    const { data: productsData, isError: productsIsError, isLoading: productsIsLoading } = useGetAllProductsQuery();

    if (productsIsLoading) {
        return (<Loader />);
    }

    if (productsIsError) {
        return (<ErrorMessage />);
    }

    if (productsData) {
        return (
            <>
                {/* <ProductForm
                    products={productsData}
                /> */}
                <div className="section-products">
                    {productsData.length > 0 ? (
                        <ProductListView productList={productsData}/>
                    ) : (
                        <div>Нет изделий</div>
                    )}
                </div>
            </>
        )
    }
}
