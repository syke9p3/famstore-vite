import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../lib/types/products"
import { GrPowerReset } from "react-icons/gr";
import { BsSuitHeartFill } from "react-icons/bs";
import { cn, formatPrice } from "../lib/utils";
import BreadCrumbs from "../components/BreadCrumb";

const DEFAULT_QUANTITY = 1;

const ProductPage = () => {
    return (
        <div className='bg-white'>
            {/* <ProductPage1 /> */}
            <ProductPage2 />
        </div>
    )
}

const ProductPage2 = () => {


    const [product, setProduct] = useState<Product>();
    const [quantity, setQuantity] = useState<number>(1);
    const [isFavorite, setIsFavorite] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const params = useParams();
    const productId = params.id;

    useEffect(() => {
        setIsLoading(true)

        axios.get('/data/products.json')
            .then((res) => {

                const selectedProduct = res.data.products.find((product: Product) => {
                    return product.id === productId;
                })

                setProduct(selectedProduct);
            }).catch((e) => {
                setError(e);
                console.error(e);
            }
            )
        setIsLoading(false)
    }, [params])

    if (isLoading) return (<>Loading...</>)

    return (<>
        {product && (
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div>

                </div>
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-12 lg:mt-0">
                            <div className="mb-12">
                                <BreadCrumbs />
                            </div>

                            <div className="rounded-xl border border-gray-300 py-8 px-8">
                                <div className="mt-1 mb-6">
                                    <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
                                </div>
                                <div className="flex items-center">
                                    <div>
                                        <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{product?.brand}</h2>
                                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                                    </div>
                                </div>
                                <p className="leading-relaxed">{product.description}</p>
                                <div className="flex mt-6 items-end pb-5 border-b-2 border-gray-200 mb-5">
                                    <QuantityCount quantity={quantity} setQuantity={setQuantity} />
                                    <button title="Reset Price" disabled={quantity == DEFAULT_QUANTITY}
                                        onClick={() => setQuantity(DEFAULT_QUANTITY)}
                                        // className={cn(`disabled:opacity-50 active:scale-90 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center  active:bg-gray-300 hover:bg-gray-300 ml-2`)}>
                                        className={cn(`disabled:invisible hover:underline rounded-full w-10 h-10 text-blue-500 p-0 border-0 inline-flex items-center justify-center  ml-4`)}>
                                        <GrPowerReset size={18} className={cn('text-gray-500')} />
                                        Reset
                                    </button>
                                </div>
                                <div className="flex items-center justify-between title-font font-medium text-2xl text-gray-900">
                                    <div className="font-mono text-gray-500 text-base">{formatPrice(product.price)} x {quantity}</div>
                                    <div className="ml-auto">{formatPrice(product.price * quantity)}</div>
                                </div>
                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 " src={product?.thumbnail} />
                    </div>
                </div>

            </section>
        )}
    </>)
}

const FavoriteButton = ({ isFavorite, setIsFavorite }: { isFavorite: boolean, setIsFavorite: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <button
            onClick={() => setIsFavorite((prev) => !prev)}
            className={cn(`active:scale-90 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-auto`, {
                'bg-blue-500 active:bg-blue-600 hover:bg-blue-400': isFavorite,
                'bg-gray-200 active:bg-gray-300 hover:bg-gray-300': !isFavorite
            }
            )}>
            <BsSuitHeartFill size={18} className={cn({
                "text-white": isFavorite,
                "text-gray-500": !isFavorite
            })} />
        </button>
    )

}

const QuantityCount = ({ quantity, setQuantity }: { quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>> }) => {



    const handleQuantityChange = (value: any) => {

        // if input became empty
        if (!value) setQuantity(Number(DEFAULT_QUANTITY));

        // check if value is not a number 
        const re = /^[0-9\b]+$/;
        if (!re.test(value)) return;



        setQuantity(Number(value))


    }

    return (
        <form className="">
            <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 ">Choose quantity:</label>
            <div className="relative flex items-center max-w-[8rem]">
                <button
                    onClick={() => setQuantity((prev) => prev - 1 > 0 ? Number(prev - 1) : prev)}
                    type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 -gray-700 focus:ring-2 focus:outline-none rounded-full">
                    <svg className="w-3 h-3 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                </button>
                <input onChange={(e) => handleQuantityChange(e.target.value)}
                    value={quantity}
                    type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-100 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 -700 -600 -400  -blue-500 -blue-500" placeholder="999" required />
                <button
                    onClick={() => setQuantity((prev) => Number(prev + 1))}
                    type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 -700 -gray-600 -600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 -gray-700 focus:ring-2 focus:outline-none rounded-full">
                    <svg className="w-3 h-3 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>
            {/* <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 -400">Please select a 5 digit number from 0 to 9.</p> */}
        </form>

    )
}

const ProductPage1 = () => {

    const params = useParams();

    const [product, setProduct] = useState();
    const [loading, setLoading] = useState();
    const [quantity, setQuantity] = useState(1);


    const handleChangeQuantity = (value: number) => {
        setQuantity(value)
    }

    const calculatePricePerQuantity = (price: number) => {
        return quantity * price;
    }

    return (
        <div>
            <section className="relative bg-white">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
                        <div className="img">
                            <div className="img-bsox h-full max-lg:mx-auto ">
                                <img src="https://pagedone.io/asset/uploads/1700471600.png" alt="Yellow Tropical Printed Shirt image"
                                    className="max-lg:mx-auto lg:ml-auto h-full" />
                            </div>
                        </div>
                        <div
                            className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                            <div className="data w-full max-w-xl">
                                <div className="breadcrumbs text-sm">
                                    <ul>
                                        <li><a>Home</a></li>
                                        <li><a>Documents</a></li>
                                        <li>Add Document</li>
                                    </ul>
                                </div>
                                <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">Clothing&nbsp; /&nbsp; Menswear
                                </p>
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">Basic
                                    Yellow
                                    Tropical Printed Shirt</h2>
                                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                    <h6
                                        className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                        $220 x {quantity}</h6>
                                    <h6>{calculatePricePerQuantity(32)}</h6>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_12029_1640)">
                                                    <path
                                                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                        fill="#FBBF24" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_12029_1640">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_12029_1640)">
                                                    <path
                                                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                        fill="#FBBF24" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_12029_1640">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_12029_1640)">
                                                    <path
                                                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                        fill="#FBBF24" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_12029_1640">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_12029_1640)">
                                                    <path
                                                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                        fill="#FBBF24" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_12029_1640">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_8480_66029)">
                                                    <path
                                                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                        fill="#F3F4F6" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_8480_66029">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </div>
                                        <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">Product id: {params.id}</span>
                                    </div>

                                </div>
                                <p className="text-gray-500 text-base font-normal mb-5">
                                    Introducing our vibrant Basic Yellow Tropical Printed Shirt - a celebration of style and
                                    sunshine! Embrace the essence of summer wherever you go with this eye-catching piece that
                                    effortlessly blends comfort and tropical flair. <a href="#"
                                        className="text-indigo-600">More....</a>
                                </p>
                                <ul className="grid gap-y-4 mb-8">
                                    <li className="flex items-center gap-3">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect width="26" height="26" rx="13" fill="#4F46E5" />
                                            <path
                                                d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        <span className="font-normal text-base text-gray-900 ">Branded shirt</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect width="26" height="26" rx="13" fill="#4F46E5" />
                                            <path
                                                d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        <span className="font-normal text-base text-gray-900 ">3 color shirt</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect width="26" height="26" rx="13" fill="#4F46E5" />
                                            <path
                                                d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        <span className="font-normal text-base text-gray-900 ">Pure Cotton Shirt with 60% as
                                            40%</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect width="26" height="26" rx="13" fill="#4F46E5" />
                                            <path
                                                d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        <span className="font-normal text-base text-gray-900 ">all size is available</span>
                                    </li>
                                </ul>
                                <p className="text-gray-900 text-lg leading-8 font-medium mb-4">Size</p>
                                <div className="w-full pb-8 border-b border-gray-100 flex-wrap">
                                    <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                                        <button
                                            className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">S</button>
                                        <button
                                            className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">M</button>
                                        <button
                                            className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">L</button>
                                        <button
                                            className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">XL</button>
                                        <button
                                            className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">XXL</button>

                                    </div>

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                                    <div className="flex sm:items-center sm:justify-center w-full">
                                        <button
                                            className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                                            <svg className="stroke-gray-900 group-hover:stroke-black" width="22" height="22"
                                                viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" strokeWidth="1.6"
                                                    strokeLinecap="round" />
                                                <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" strokeWidth="1.6"
                                                    strokeLinecap="round" />
                                            </svg>
                                        </button>
                                        <input type="text"
                                            id="quantity"
                                            onChange={(e) => handleChangeQuantity(Number(e.target.value))}
                                            value={quantity}
                                            className="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                                            placeholder="1" />
                                        <button
                                            onClick={() => setQuantity(prev => prev + 1)}
                                            className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                                            <svg className="stroke-gray-900 group-hover:stroke-black" width="22" height="22"
                                                viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" strokeWidth="1.6"
                                                    strokeLinecap="round" />
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                                                    strokeWidth="1.6" strokeLinecap="round" />
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                                                    strokeWidth="1.6" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button
                                        className="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100">
                                        <svg className="stroke-indigo-600 " width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                                                stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                        Add to cart</button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                            fill="none">
                                            <path
                                                d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                                                stroke="#4F46E5" strokeWidth="1.6" stroke-miterlimit="10"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </button>
                                    <button
                                        className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}


export default ProductPage