import { Link } from "react-router-dom"



const Navbar = () => {
    return (
        <DaisyNavbar />
    )
}


const DaisyNavbar = () => {
    return (
        <div className="navbar bg-base-100 z-40" role='navbar'>
            <Link to={'/'} className="flex-1">
                <div className="btn btn-ghost text-xl">FamStore</div>
            </Link>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Source Code</a></li>
                    <li className="z-50">
                        <details>
                            <summary>Theme</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a>Light</a></li>
                                <li><a>Dark</a></li>
                                <li><a>System</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className='btn btn-ghost '>
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Navbar