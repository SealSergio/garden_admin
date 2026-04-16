import { useState } from "react"



export const useProductForm = () => {
    const [isOpenProductForm, setIsOpenProductForm] = useState<boolean>(false);
    const [productData, setProductData] = useState();
    
    // получение данных из localStorage при открытии страницы

    return 
}