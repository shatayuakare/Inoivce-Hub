import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Header = () => {

    const [authUser, setAuthUser] = useAuth();
    setAuthUser(authUser)


    const logoutHandler = () => {
        localStorage.removeItem("User")
        window.location.reload()
    }

    return (
        <div className="navbar shadow fixed w-full top-0 bg-blue-950 z-40 text-white md:px-24">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl uppercase font-extrabold tracking-widest">Invoice Hub</Link>
            </div>
            <div className="flex-none">

                {authUser ?
                    <button className="btn btn-sm btn-ghost" onClick={logoutHandler}>
                        Logout
                    </button>
                    : <Link to={"/auth"} className="btn btn-sm btn-ghost">
                        Login
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header