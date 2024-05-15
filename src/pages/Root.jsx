import React, { useState } from 'react'

// import { doLogin, doLoginByGoogle } from '@/app/apis/authApis';
// import { setAuthentication } from '@/app/features/authSlice';
// import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogin, fetchUserByEmail } from '@/app/apis/authApis';
import { setToken } from '@/app/features/authSlice';
import { setUser } from '@/app/features/userSlice';

const Root = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleCredentialChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials)
        const { data, error } = await doLogin(credentials);
        console.log(data)
        if (error !== null) {
            alert("Invalid credentials!");
            return;
        }
        dispatch(setToken(data.payload));

       

        navigate("/home", { replace: true });

    }

    // const handleGoogleLoginSuccess = async (credentialResponse) => {
    //     const { email, picture } = jwtDecode(credentialResponse.credential);
    //     const { data } = await doLoginByGoogle(email, picture);
    //     if (data.statusCode === 200) {
    //         console.log(data.payload);
    //         dispatch(setAuthentication(data.payload));
    //         navigate("/home", { replace: true });
    //     }else {
    //         alert("Invalid email or password");
    //     }
    // }

    const handleGoogleLoginFailure = (credentialResponse) => {
        alert("Unable to login with google!");
    }
    return (
        <main className="border border-red-500 overflow-hidden h-screen flex justify-center items-center relative inset-0 w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <section className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col w-full sm:w-3/4 items-center py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                    <div className="flex flex-col items-center">
                        <p href="#" className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                            <span className="text-sm font-medium">Optimizing tasks for global impact.</span>
                        </p>
                        <img src="/taskify-logo.png" className="rounded-full w-20 " />
                        <p className="mb-4 my-3 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">TASKIFY SOFTWARE</p>
                    </div>

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleLoginSubmit} className=" space-y-4 md:space-y-3">
                                <div className="text-left">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" value={credentials.email} onChange={handleCredentialChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div className="text-left">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" value={credentials.password} onChange={handleCredentialChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <div>
                                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                </div>

                            </form>
                            <div className="flex flex-col items-center justify-center">
                                {/* <p className="text-[14px] text-slate-600 py-2">Or continue with</p> */}
                                {/* <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        handleGoogleLoginSuccess(credentialResponse)
                                    }}
                                    onError={handleGoogleLoginFailure}
                                    useOneTap
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>

            </section>
        </main>
    )
}

export default Root