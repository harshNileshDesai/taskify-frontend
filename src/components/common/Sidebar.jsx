import React from "react"

import { Link } from "react-router-dom";

import { GoWorkflow } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RiHomeOfficeLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = () => {
    const sideNavArr = [
        { path: "/home", label: "History", icon: <GoWorkflow /> },
        { path: "/home", label: "Home", icon: <RiHomeOfficeLine /> },
        { path: "tasks", label: "All Task", icon: <GoWorkflow /> },
        { path: "settings", label: "Settings", icon: <IoSettingsOutline /> },
        { path: "/", label: "Logout", icon: <RiLogoutBoxLine /> },
    ];

    const sidebarLinkContent = sideNavArr.map((sideNav, index) => (
      <>
          <li key={sideNav.path} className={`my-2 pl-4 `}>
              <Link to={sideNav.path} className="flex gap-3 items-center">
                  {sideNav.icon}
                  <span>{sideNav.label}</span>
              </Link>
          </li>
          {index===1 || index===3 ? <hr /> : ''}
      </>
  ))

    return (
        <div className="bg-slate-50 w-full h-full flex justify-center text-[15px]">
            <ul className="text-slate-500 w-3/4 mt-7 ">
                {sidebarLinkContent}
            </ul>
        </div>
    )
}

export default Sidebar