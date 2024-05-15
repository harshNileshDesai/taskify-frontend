import { getFormattedDate } from '@/utils/helper'
import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { fetchUserById } from '@/app/apis/authApis';
import { useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';

const TaskRow = ({ task, srno }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [taskType, setTaskType] = useState('');

    const formatedDate = (givenDate) => {
        const date = new Date(givenDate);
        return `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, 0)}/${date.getFullYear()}`;
    }

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchUserById(task.taskCreatedByUserId);
            setUser(data.payload);
        })();
        const tmpDefaultFunction = task.functionDtoList.find((ele) => ele.defaultFunction === true);
        console.log(tmpDefaultFunction.functionTitle);
        if(tmpDefaultFunction?.functionTitle === 'New Enquiry') {
            setTaskType('New Enquiry');
        }
        else if(tmpDefaultFunction?.functionTitle === 'Prepare Job Card') {
            setTaskType('Repair Service');
        }
    }, []);

    const handleTaskView = (taskId) => {
        navigate(`${taskId}`, { replace: true });
    }

    return (
        <div onClick={()=>{handleTaskView(task.id)}} className='w-full flex items-center gap-2 border-b text-[14px] cursor-pointer hover:bg-slate-50 '>
            <p className='text-center w-[11.1%] py-2'>{srno}</p>
            <p className='text-center w-[11.1%] py-2 text-red-500'>#{task.id}</p>
            <p className='text-center w-[11.1%] py-2'>{taskType}</p>
            <p className='text-center w-[11.1%] py-2'>{user?.name}</p>
            <p className='text-center w-[11.1%] py-2'>{formatedDate(task.taskCreatedDate)}</p>
            <p className='text-center w-[11.1%] py-2'>{task.taskFinishedDate !== null ? formatedDate(task.taskFinishedDate) : '-'}</p>
            <p className='text-center w-[11.1%] py-2 '>
                {task.taskPriority === "NORMAL" ?
                    <Badge className={'bg-slate-400 hover:bg-slate-400 text-[9px]'}>NORMAL</Badge> 
                    : task.taskPriority === "INTERMEDIATE" ? <Badge className={'bg-blue-500 hover:bg-blue-500 text-[9px]'}>INTERMEDIATE</Badge>
                    : <Badge className={'bg-purple-500 hover:bg-purple-500 text-[9px]'}>HIGH</Badge>
                }
            </p>
            <p className='text-center w-[11.1%] py-2'>
                {task.taskCompleted ?
                    <Badge className={'bg-fuchsia-500 hover:bg-fuchsia-500'}>CLOSED</Badge>
                    : <Badge className={'bg-orange-500 hover:bg-orange-500 text-[9px]'}>IN_PROGRESS</Badge>
                }
            </p>
            <p className='text-center w-[11.1%] py-2'>
                <button className='bg-red-500 hover:bg-red-600 rounded-md text-white px-4 py-1'>Delete</button>
            </p>
        </div>
    )
}

export default TaskRow