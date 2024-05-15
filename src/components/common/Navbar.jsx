import React from "react"

const Navbar = () => {
    return (
        <nav className="w-full h-full p-2 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
                <div className="p-2 flex justify-center items-center cursor-pointer">
                    <img src="/taskify-logo.png" alt="taskify-logo" className="h-10 rounded-full w-10" />
                </div>
                <span className="text-xl font-semibold text-blue-500">Taskfiy Software</span>
            </div>
        </nav>
    )
}

export default Navbar