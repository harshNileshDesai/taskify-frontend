import React, { useEffect, useState } from 'react'

import { Badge } from "../../ui/badge"
import DoneTask from "./DoneTask"
import ForwardTask from "./ForwardTask"
import TaskInfo from "./TaskInfo"
import { fetchTaskbyId } from '@/app/apis/taskApis'
import { useDispatch, useSelector } from 'react-redux'
import { selectFunctionArr } from '@/app/features/functionArrSlice'
import { selectIsForwarded } from '@/app/features/isForwarderSlice'
import { setIsTaskClosed } from '@/app/features/isTaskClosedSlice'

const TaskDetails = ({ taskId, functionTemplateArr }) => {
    const dispatch = useDispatch();

    const functionArr = useSelector(selectFunctionArr);
    const isForwarded = useSelector(selectIsForwarded);

    const [isTaskDone, setIsTaskDone] = useState(false);
    const [canMarkTaskDone, setCanMarkTaskDone] = useState(true);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchTaskbyId(taskId);
            console.log("task details:", data.payload);
            setIsTaskDone(data.payload.taskCompleted);
            dispatch(setIsTaskClosed((data.payload.taskCompleted)));



        })();

    }, [functionArr]);

    useEffect(() => {
        let flag = false;
        for (let i = 0; i < functionArr.length; i++) {
            for (let j = 0; j < functionArr[i].functionMetadataDtoList.length; j++) {
                if (functionArr[i].functionMetadataDtoList[j].functionMetadataDone == true) {
                    console.log("metadata done")
                    flag = true;
                }
                else {
                    console.log("metadata not done")
                    flag = false;
                    break;
                }
            }
            break;
        }
        console.log("setCanMarkTaskDone:", flag)
        setCanMarkTaskDone(flag);

    }, [functionArr]);

    return (
        <div className="pb-4 border-b">
            <div className="mb-2">
                <h2 className="scroll-m-20 flex items-center gap-2 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    <span>Task</span>
                    <span className="text-red-400 text-xl">#{taskId}</span>
                </h2>
            </div>
            {
                <div id="task-btns" className="flex gap-2">
                    {/* <TaskInfo taskId={taskId}/> */}
                    <ForwardTask taskId={taskId} isTaskDone={isTaskDone} canMarkTaskDone={canMarkTaskDone} />
                    <DoneTask 
                        isTaskDone={isTaskDone} 
                        taskId={taskId} 
                        canMarkTaskDone={canMarkTaskDone} 
                        setCanMarkTaskDone={setCanMarkTaskDone}

                    />
                </div>
            }
        </div>
    )
}

export default TaskDetails