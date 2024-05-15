import { fetchTaskbyId } from '@/app/apis/taskApis'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import React, { useEffect, useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

const TaskInfo = ({ taskId }) => {
    const [task, setTask] = useState();
    
    useEffect(() => {
        (async () => {
            const {data, error} = await fetchTaskbyId(taskId);
            console.log(data)
            console.log(data.payload)
            if(data) {
                setTask(data.payload);
            }
        })();
    }, []);


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="bg-[#2daeeb] text-[15px] flex gap-2 py-1 px-2 text-white rounded-sm">
                    <IoInformationCircleOutline className="text-xl" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"text-center py-3 text-xl mb-7"}>Task Details</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="space-y-3 pb-3">
                            <div className="flex gap-2">
                                <p className="text-[15px] w-[100px]">Priority:</p>
                                <Badge className="bg-slate-500 hover:bg-slate-500">{task?.taskPriority}</Badge>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-[15px] w-[100px]">Status:</p>
                                <Badge className="bg-orange-400 hover:bg-orange-400">{task?.taskCompleted === true ? "CLOSED" : "IN PROGRESS"}</Badge>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-[15px] w-[100px]">Department:</p>
                                <Badge className="bg-fuchsia-500 hover:bg-fuchsia-500">{task?.taskDepartment}</Badge>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default TaskInfo