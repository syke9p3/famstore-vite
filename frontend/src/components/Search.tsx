import { Dispatch, useRef } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSearchChange = (query: string) => {
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('query', query);
        } else {
            params.delete('query');
        }

        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }

    return (
        <div className='py-6'>
            <label className="input input-sm input-bordered flex items-center gap-2">
                <input type="text" ref={inputRef} className="grow" placeholder="Search"
                    onChange={(e) => handleSearchChange(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()} />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>
        </div>




    )
}

export default Search