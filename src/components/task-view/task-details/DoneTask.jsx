import React, { useEffect, useState } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../../ui/button"
import { markTaskDone } from '@/app/apis/taskApis'
import { useDispatch, useSelector } from 'react-redux'
import { selectFunctionArr } from '@/app/features/functionArrSlice'
import { useToast } from '@/components/ui/use-toast'
import { getFormattedDate } from '@/utils/helper'
import { selectUser } from '@/app/features/userSlice'
import { setIsTaskClosed } from '@/app/features/isTaskClosedSlice'


const DoneTask = ({ isTaskDone, taskId, canMarkTaskDone, setCanMarkTaskDone }) => {
    const { toast } = useToast()

    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const functionArr = useSelector(selectFunctionArr);

    // useEffect(() => {
    //     let flag = false;
    //     for(let i = 0; i < functionArr.length; i++) {
    //         for(let j = 0; j < functionArr[i].functionMetadataDtoList.length; j++) {
    //             if(functionArr[i].functionMetadataDtoList[j].functionMetadataDone) {
    //                 console.log("metadata done")
    //                 flag = true;
    //             }
    //             else {
    //                 console.log("metadata not done")
    //                 flag = false;
    //             }
    //         }
    //     }
    //     setCanMarkTaskDone(flag);
    // }, [functionArr]);

    const handleMarkTaskDone = async () => {
        const { data, error } = await markTaskDone(taskId, user.id, new Date());
        console.log(data);
        if (data) {
            toast({
                title: `Task Done: #${taskId}`,
                description: getFormattedDate(new Date()),
                variant: "success",
                color: "green"
            });
            setCanMarkTaskDone(false);
            dispatch(setIsTaskClosed(true));
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button disabled={!canMarkTaskDone} className={`${!canMarkTaskDone ? 'bg-blue-300 hover:bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}  text-[15px] flex gap-2 py-1 px-2 text-white rounded-sm`}>
                    Mark as done!
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently mark the task as done from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleMarkTaskDone}>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DoneTask