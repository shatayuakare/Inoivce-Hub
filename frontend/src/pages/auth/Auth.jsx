import React, { useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"

const Auth = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(true)

    const [loader, setLoader] = useState(false)


    const loginHandler = async (e) => {
        e.preventDefault();

        if (!email) return toast.warning("Email is reequired")
        if (!password) return toast.warning("Password is reequired")

        setLoader(true)
        const loginData = {
            email, password
        }

        await axios.post("http://localhost:4000/auth/login", loginData).then((res) => {
            toast.success(res.data.message)

            localStorage.setItem("User", JSON.stringify(res.data.user))
            setLoader(false)
            window.location.reload()
        }).catch((err) => toast.error(err.response.data.message))
        setLoader(false)
    }

    const signUpHandler = async (e) => {
        e.preventDefault();

        if (!fullName) return toast.warning("Name is reequired")
        if (!email) return toast.warning("Email is reequired")
        if (!password) return toast.warning("Password is reequired")
        setLoader(true)
        const signUpData = {
            fullName, email, password
        }

        await axios.post("http://localhost:4000/auth/signup", signUpData).then((res) => {
            toast.success(res.data.message)
            localStorage.setItem("User", JSON.stringify(res.data.user))
            setLoader(false)
            window.location.reload()
        }).catch((err) => toast.error(err.response.data.message))
        setLoader(false)
    }



    return (
        <section className='content-center bg-blue-100'>
            <div className="md:px-12 sm:px-2">
                <div className="md:w-2/5 mx-auto p-6 rounded-lg bg-blue-200" id='auth'>

                    <div className="text-center">
                        <div className='join mx-auto'>
                            <button className={`btn  ${active ? 'text-white bg-blue-500  hover:bg-blue-600' : 'bg-blue-100 hover:bg-blue-50 text-gray-700'} border-0 ps-10 pe-8 rounded-none rounded-s-full`}
                                onClick={() => setActive(!active)}
                            >
                                Login
                            </button>
                            <button className={`btn  ${!active ? 'text-white bg-blue-500 hover:bg-blue-600' : 'bg-blue-100 hover:bg-blue-50 text-gray-700'} border-0 ps-7 pe-7 rounded-none rounded-e-full`}
                                onClick={() => setActive(!active)}>
                                Signup
                            </button>
                        </div>
                    </div>

                    {
                        !active ?
                            <form action="" method='post' className='gap-4 flex flex-col' onSubmit={signUpHandler}>
                                <div className="">
                                    <label htmlFor="fname">Full Name </label>
                                    <input className='input bg-zinc-100' type="text" name="fname" id="fname" placeholder='Full Name...'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="email">Email Address</label>
                                    <input className='input bg-zinc-100' type="email" name="email" id="email" placeholder='Email address...'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="password">Password</label>
                                    <input className='input bg-zinc-100' type="password" name="password" id="password" placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className='text-center'>
                                    <button type='submit' className="btn bg-blue-500 hover:bg-blue-600 text-white border-none btn-wide">
                                        {
                                            loader ?
                                                <span className="loading loading-bars loading-sm"></span>
                                                :
                                                <span>Sign up</span>
                                        }
                                    </button>
                                </div>
                            </form>
                            :
                            <form action="" method='post' className='gap-4 flex flex-col' onSubmit={loginHandler}>
                                <div className="">
                                    <label htmlFor="email">Email Address</label>
                                    <input className='input bg-zinc-100' type="email" name="email" id="email" placeholder='Email address...'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="password">Password</label>
                                    <input className='input bg-zinc-100' type="password" name="password" id="password" placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className='text-center'>
                                    <button type='submit' className="btn bg-blue-500 hover:bg-blue-600 text-white border-none btn-wide">
                                        {
                                            loader ?
                                                <span className="loading loading-bars loading-sm"></span>
                                                :
                                                <span>Login</span>
                                        }
                                    </button>
                                </div>
                            </form>
                    }
                </div>
            </div>
        </section >
    )
}

export default Auth