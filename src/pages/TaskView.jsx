import { selectViewFunction, setViewFunction } from '@/app/features/viewFunctionSlice';
import { getAllFunctionTemplatesByTaskTemplateId } from '../app/apis/functionTemplateApis';
import FunctionMetadataDetails from '@/components/task-view/function-metadata-details/FunctionMetadataDetails';
import TaskDetails from '@/components/task-view/task-details/TaskDetails';
import TaskFunctions from '@/components/task-view/task-functions/TaskFunctions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectToken } from '@/app/features/authSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchUserByEmail } from '@/app/apis/authApis';
import { fetchTaskbyId } from '@/app/apis/taskApis';

const TaskView = () => {
    const dispatch = useDispatch();

    const { taskId } = useParams();

    const token = useSelector(selectToken);
    const viewFunction = useSelector(selectViewFunction);

    const [functionTemplateArr, setFunctionTemplateArr] = useState([]);

    const [user, setUser] = useState();

    useEffect(() => {
        fetchAllTaskTemplates();
        fetchUser().then(()=> {console.log(user)});
    }, [viewFunction]);

    const fetchAllTaskTemplates = async () => {
        const { data: taskResponse, error: errorResponse } = await fetchTaskbyId(taskId);
        if(taskResponse) {
            const taskTemplateId = taskResponse.payload.taskTemplateModelId

            const { data, error } = await getAllFunctionTemplatesByTaskTemplateId(taskTemplateId);
            // console.log(data.payload, error);
            setFunctionTemplateArr(data?.payload);
        }

    }

    const fetchUser = async () => {
        console.log("Fetch user")
        console.log(jwtDecode(token?.token).sub)
        const { data, error } = await fetchUserByEmail(jwtDecode(token?.token).sub);
        console.log(data.payload, error);
        setUser(data.payload);
    }

    return (
        <div className="md:w-[1262px] border overflow-auto md:overflow-hidden h-full text-slate-600">
            <TaskDetails taskId={taskId} functionTemplateArr={functionTemplateArr} />
            <div id="task-workflow" className="w-[100vw] overflow-auto">
                <div className="min-w-[1262px] flex gap-3 h-full">
                    {functionTemplateArr.length > 1 && 
                        <TaskFunctions user={user} taskId={taskId} functionTemplateArr={functionTemplateArr} />
                    }
                    {viewFunction && <FunctionMetadataDetails taskId={taskId} />}
                </div>
            </div>
        </div>
    )
}

export default TaskView