import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/Sidebar'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import "@/styles/Home.css"
import { Toaster } from '@/components/ui/toaster'
import { data } from 'autoprefixer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/app/features/userSlice'
import { fetchUserByEmail } from '@/app/apis/authApis'
import { jwtDecode } from 'jwt-decode'
import { selectToken } from '@/app/features/authSlice'

const Home = () => {
    const dispatch = useDispatch();

    const token = useSelector(selectToken);

    useEffect(() => {
        (async() => {
            const { data: userResponse, error: userError } = await fetchUserByEmail(jwtDecode(token.token).sub);
            console.log(userResponse);
            dispatch(setUser(userResponse.payload));
        })();
    }, []);
    return (
        <div className="h-screen text-slate-500 overflow-hidden">
            <header className="h-[56px] w-full">
                <Navbar />
            </header>
            <main id="home-main" className="flex w-full overflow-hidden">
                <aside id="sidebar-wrapper" className="h-full absolute -translate-x-[1000px] md:relative md:translate-x-0">
                    <Sidebar />
                </aside>
                <section id="shared-area" className="p-3">
                    <Outlet />
                </section>
                <Toaster />
            </main>
        </div>
    )
}

export default Home