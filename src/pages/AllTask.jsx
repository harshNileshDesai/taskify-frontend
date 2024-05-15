import React from 'react'
import { Outlet } from 'react-router-dom'

const AllTask = () => {
    return (
        <div className="min-w-[1262px] overflow-auto h-full">
            <Outlet />
        </div>
    )
}

export default AllTask