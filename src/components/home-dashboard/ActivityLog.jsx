import { getFormattedDate } from '@/utils/helper'
import React, { useEffect, useState } from 'react'
import { MdOutlineCreateNewFolder, MdOutlineTaskAlt } from "react-icons/md";
import { PiFunctionThin } from "react-icons/pi";
import { Badge } from '../ui/badge';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { fetchTodaysLogs } from '@/app/apis/logsApi';

const ActivityLog = () => {
    const [logArr, setLogArr] = useState([]);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchTodaysLogs();
            console.log("Today's logs: ", data);
            let tmpArr = [];
            for(let i = data.payload.length - 1; i >= 0; i--) {
                tmpArr.push(data.payload[i]);
            }
            setLogArr(tmpArr);
        })();
    }, []);

    const formatedDate = (givenDate) => {
        const date = new Date(givenDate);
        return `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, 0)}/${date.getFullYear()}`;
    }

    return (
        <div className='sm:w-2/3 border-r py-4 h-full px-2 '>
            {/* Today Activity */}
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Today's Activity Log
            </h2>
            <div className='px-2 h-[60vh] border overflow-auto space-y-7'>
                {logArr.map((log, index)=>(<div className='border-b p-3 '>
                    <p className=''>{getFormattedDate(log.date)}</p>
                    <div className='my-1'>
                        <p className='font-semibold flex gap-2 items-center'>
                            {log.type==="TASK" && log.action==="CREATE" && <MdOutlineCreateNewFolder className='text-xl text-blue-500' />}
                            {log.type==="FUNCTION" && log.action==="CREATE" && <PiFunctionThin className='text-xl text-blue-500' />}
                            {log.action==="COMPLETE" && <MdOutlineTaskAlt className='text-xl text-green-500' />}
                            {log.action==="UPDATE" && <FaEdit className='text-xl text-orange-500' />}
                            {log.action==="DELETE" && <MdDeleteOutline className='text-xl text-red-500' />}
                            <span>{log.type === "TASK" ? "Task" : "Function"} {log.action.toLowerCase()}</span>
                        </p>
                        <p>{log.message}</p>
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default ActivityLog