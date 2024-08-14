import { useState } from "react";
import ProductList from "../components/ProductList"
import Search from "../components/Search"
import ProductPage from "./ProductPage"

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className='min-h-screen container mx-auto px-3 max-w-4xl'>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ProductList />
        </div>
    )
}

export default Home