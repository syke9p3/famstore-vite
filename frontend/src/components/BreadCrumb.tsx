import { Link } from "react-router-dom"

const BreadCrumbs = () => {
    return (
        <nav className="flex opacity-80" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-red-600  ">
                        Home
                    </Link>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <Link to="/" className="ms-1 text-sm font-normal text-gray-700 hover:text-red-600 md:ms-2  ">Prices</Link>
                    </div>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="ms-1 text-sm font-normal text-gray-500 md:ms-2 ">Magic Sarap</span>
                    </div>
                </li>
            </ol>
        </nav>
    )
}

export default BreadCrumbs