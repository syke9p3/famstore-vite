import { useState } from "react";
import ProductList from "../components/ProductList"
import Search from "../components/Search"

const Products = () => {
    return (
        <div className='min-h-screen container mx-auto px-3 max-w-4xl'>
            <Search />
            <ProductList />
        </div>
    )
}

export default Products