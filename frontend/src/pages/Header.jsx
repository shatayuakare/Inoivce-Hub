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
        <div className="navbar shadow w-full top-0 bg-blue-950 z-40 text-white md:px-24">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl uppercase font-extrabold tracking-widest">Invoice Hub</Link>
            </div>
            <div className="flex-none">

                {
                    authUser ?
                        <div className='join'>
                            <Link to={"/invoices"} className='btn btn-sm join-item bg-blue-600 h-auto py-3 hover:bg-blue-700 text-white'>My Invoice</Link>
                            <div className="join-item dropdown dropdown-hover">
                                <button className="btn btn-sm h-auto     bg-blue-600 hover:bg-blue-700 text-white">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAqJJREFUSEuVVz2LFEEQfW/BQBCEA8FA0MDA5BIzlVPQ2FC4SEwu88BAf8VFfkRiIEaCobGgHmpmYnLBZSYHwoEgGAj93Nme6emtru6Zm2R3u3vq1auqV9VLVB8C0LibfsYv+a7ZMhbNSWpltlvNHgL9RtxaB0gHjU9x3V0sX+mPdUgZWP5+yTj61AYonTD2e1dKYNf3nH3NoQZvx9cInHLZCG+9GEYOeU0kAmX6hsTMrq82diMFPuOGuZqtvIypsR5r1TcLuK2NPIAxsA3VGYGsFYGRkzE0KRtXzXOMWB3X5GiqOlHJSbSr3SbUldNgTgqnALwF8I5k9+myySElbQO4B2Cb5L+iT2QacKtLCqcBvgdwp9fbA5JvWpUt6T6A14A6Qh8A3CX51+s5ZcvstSjpGYDdHEjAzoJ8Na6NXCXtQHiZktdVHvGU5KMxTuN500BiJLsUBukMgE8Arq6AoqHu2SX5Ys0h6SGA5yYa3wXcWpB/vE5eVnWmRSmcXYZ6H9CmmScJXEGPQexZUAC3Sf6uDY/EuFROpK6gDQAfAWxG0t2kWL32pI/EntHGDwBbEbTdFLNdv28HhQ2AX5YVfmU4PEZ+zfgBgBskj1ugQ+inzkRi0rll+D7n4HniAR0AvEnyV6G6LH3DQGrkuFRtD/4VwGXj7SGA6wl0BpUI7E4uvx1KOg/g21Kvl3rGhwK2Flwc2fFa4ls5uROm5jYhhQsC9vtwXSN5VFyV3GEztt7E2MzwxtiJWwq6CCCQ/OmksPDaXjEMcGOYz8hb9Yhz7aq2zHplTl4oZ7mYgOdwnXMmR7Xhzck0cpzLyZhwC6dRw36oa/fqUsduDGuXkIl22WZ80thOZndNxxOuDX+fXCcanpkte9JcfU5K0Z1p5d8cpzP+B7LFGzCjhA/kAAAAAElFTkSuQmCC" />
                                </button>
                                <ul className="menu dropdown-content rounded-box z-[1] p-2 shadow">
                                    <li>
                                        <Link to={"/invoices"} className="btn btn-sm btn-ghost" onClick={logoutHandler}>
                                            Logout
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="btn btn-sm btn-ghost" onClick={logoutHandler}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        :
                        <Link to={"/auth"} className="btn btn-sm btn-ghost">
                            Login
                        </Link>
                }
            </div>
        </div>
    )
}

export default Header