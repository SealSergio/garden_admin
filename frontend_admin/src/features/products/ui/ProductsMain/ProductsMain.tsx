import { ErrorMessage } from "../../../../shared/components/Error/Error.js";
import { Loader } from "../../../../shared/components/Loader/Loader.js";
import { useGetAllProductsQuery } from "../../api/products.js";
// import { ProductForm } from "../../../productForm/ui/ProductForm.js";
import { ProductListView } from "../ProductsListView/ProductListView.js";

export const ProductsMain: React.FC = () => {
    const { data: productsData, isError: productsIsError, isLoading: productsIsLoading } = useGetAllProductsQuery();

    if (productsIsLoading) {
        return (<Loader />);
    }

    if (productsIsError) {
        return (<ErrorMessage />);
    }

    if (productsData) {
        console.log(productsData)
        return (
            <div className="section-products">
                {productsData.length > 0 ? (
                    <ProductListView productList={productsData}/>
                ) : (
                    <div>Нет изделий</div>
                )}
            </div>
        )
    }
}

// Create product

// const product = getProduct();