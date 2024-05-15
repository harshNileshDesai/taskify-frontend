import React from 'react'
import { Badge } from '../ui/badge'

const UserRow = ({ user, srno }) => {
    console.log(user);

    return (
        <div className='flex items-center w-full border-b text-[14px]'>
            <p className="text-center py-2 w-[16.66%]">{srno}</p>
            <p className="text-center py-2 w-[16.66%]">{user.name}</p>
            <p className="text-center py-2 w-[16.66%]">{user.email}</p>
            <p className="text-center py-2 w-[16.66%]">
                {user.roles.map((roleObj, roleIndex) => (
                    <span key={`${srno}-role-${roleIndex}`}>{roleObj.role}</span>
                ))}
            </p>
            <p className="text-center py-2 w-[16.66%]">
                {user.department === "ADMIN" &&
                    <Badge className={"text-xs bg-red-500 hover:bg-red-500"}>{user.department}</Badge>
                }
                {user.department === "ACCOUNTS" &&
                    <Badge className={"text-xs bg-orange-500 hover:bg-orange-500"}>{user.department}</Badge>
                }
                {user.department === "QUOTATION" &&
                    <Badge className={"text-xs bg-blue-500 hover:bg-blue-500"}>{user.department}</Badge>
                }
                {user.department === "DISPATCH" &&
                    <Badge className={"text-xs bg-purple-500 hover:bg-purple-500"}>{user.department}</Badge>
                }
                {user.department === "SERVICES" &&
                    <Badge className={"text-xs bg-green-500 hover:bg-green-500"}>{user.department}</Badge>
                }
            </p>
            <p className="text-center py-2 w-[16.66%]">
                <button className={`text-black border px-4 rounded-md py-1 ${user.disabled ? 'bg-slate-300 border-slate-300' : 'bg-white border'}`}>
                    {user.disabled == true ? "YES" : "NO"}
                </button>
            </p>
        </div>
    )
}

export default UserRow