import { fetchAllUsers } from '@/app/apis/authApis';
import UserRow from '@/components/settings/UserRow';
import React, { useEffect, useState } from 'react'

const Settings = () => {
    const [userArr, setUserArr] = useState([]);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchAllUsers();
            if (data) {
                console.log(data);
                setUserArr(data.payload);
            }
        })();
    }, []);

    return (
        <div className='w-full'>
            <div className='mb-3'>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Settings</h2>
            </div>
            <div className='w-full overflow-auto'>
                <h3 className='text-2xl font-medium'>Users</h3>
                <div className='table w-full overflow-auto'>
                    <div className="thead w-[1262px] overflow-auto flex bg-slate-100 rounded-md border">
                        <p className="text-center py-2 w-[16.66%]">Sr. No.</p>
                        <p className="text-center py-2 w-[16.66%]">Name</p>
                        <p className="text-center py-2 w-[16.66%]">Email</p>
                        <p className="text-center py-2 w-[16.66%]">Role</p>
                        <p className="text-center py-2 w-[16.66%]">Department</p>
                        <p className="text-center py-2 w-[16.66%]">Disabled</p>
                    </div>
                    <div className="tbody thead w-[1262px] overflow-auto ">
                        {userArr.map((user, index) => (
                            <UserRow user={user} srno={index + 1} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings