import { Link, useSearchParams } from "react-router-dom"
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import { cn, formatPrice } from "../lib/utils";
import { IProduct } from "../lib/types/types";

const ProductList = () => {
    return (
        <DaisyTable />
    )
}


const DaisyTable = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {

        setIsLoading(true);
        console.log("fetching products");

        axios.get('data/products.json')
            .then((res) => {
                setProducts(res.data.products);
                console.log(res.data);
                setIsLoading(false);
            }
            )
            .catch((e) => {
                console.error("Error: ", e);
                setError(e);
                setIsLoading(false);
            })
    }, [])

    const filterProducts = (query: string | null) => {

        if (!query) return products;

        query = query.toLowerCase();

        return products.sort((a, b) => {
            return a.name.localeCompare(b.name)
        }).filter((product) => {
            const productName = product.name.toLowerCase();
            return productName.includes(query);
        })
    }

    const filteredProducts = useMemo(() => {
        return filterProducts(query)
    }, [isLoading, searchParams])

    const noFilteredProducts = filteredProducts.length == 0

    return (
        <div className={cn(`py-3 md:px-6 bg-white border md:border-gray-300 rounded-lg`)}>
            <div className="overflow-x-auto">
                <table className="table">

                    {/* head */}
                    <thead>
                        <tr className={cn('', {
                            'hidden': noFilteredProducts
                        })}>
                            <th>Name</th>
                            <th className={cn('', {
                                'hidden': noFilteredProducts
                            })}>Price</th>
                            <th className="hidden md:block">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            noFilteredProducts && (
                                <tr className="p-4 opacity-50 flex justify-center" >
                                    <td style={{ height: '3rem' }}>
                                        <p>No items found with&nbsp;"<span className="italic">{query}</span>"</p>
                                    </td>

                                </tr>
                            )
                        }
                        {
                            isLoading && (
                                <Skeleton.List />
                            )
                        }

                        {
                            products && filteredProducts.map((product, i) => (
                                <tr key={i}>
                                    <td>
                                        <Link to={`/products/${product.id}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={product.thumbnail}
                                                            alt={product.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold truncate">{product.name}</div>
                                                    <div className="text-sm opacity-50">{product.make}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td className="font-mono">{formatPrice(product.price)}</td>
                                    <th className="hidden md:block">
                                        <button className="btn btn-ghost btn-xs"><BsThreeDots /></button>
                                    </th>
                                </tr>
                            ))
                        }


                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr className={cn('', {
                            'hidden': noFilteredProducts
                        })}>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="hidden md:block">Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div >
    )
}



// const CustomList = () => {
//     return (
//         <div>
//             <ul className="divide-y divide-gray-200 dark:divide-gray-700">

//                 {
//                     products.map((product, i) => (
//                         <li className="py-3 px-3 cursor-pointer hover:bg-white/10">
//                             <Link to={'/products/id'} key={i}>
//                                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
//                                     <div className="flex-shrink-0">
//                                         <img className="w-8 h-8 rounded-full" src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723507200&semt=ais_hybrid" alt="Neil image" />
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <p className="font-medium text-gray-900 truncate ">
//                                             Argentina Corned Beef 100 mg
//                                         </p>
//                                         <p className="text-sm text-gray-500 truncate ">
//                                             Argentina
//                                         </p>

//                                     </div>
//                                     <div className="inline-flex items-center text-lg font-semibold text-gray-900 ">
//                                         32
//                                     </div>
//                                 </div>
//                             </Link>
//                         </li>
//                     ))

//                 }


//             </ul>

//         </div>

//     )
// }

export default ProductList