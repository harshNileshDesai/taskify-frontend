import React from "react";
import FunctionCard from "./FunctionCard";
import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setViewFunction } from "@/app/features/viewFunctionSlice";
import { getFunctionsByTaskId } from "@/app/apis/functionApis";
import AddFunction from "./AddFunction";
import { selectFunctionArr, setFunctionArr } from "@/app/features/functionArrSlice";
// import { getFunctionsByTaskId } from "../../../app/apis/functionApis.js"

const TaskFunctions = ({ user, taskId, functionTemplateArr = [] }) => {
    const dispatch = useDispatch();

    const functionArr = useSelector((state) => state.functionArr.functionArr);
    console.log(functionArr);

    const [openAddFunction, setOpenAddFunction] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await getFunctionsByTaskId(taskId);
            console.log("Fetching Functions by task id:", data);
            dispatch(setViewFunction(data.payload[data.payload.length - 1]));
            const tmpFunctionArr = [];
            for (let i = data.payload.length - 1; i >= 0; i--) {
                tmpFunctionArr.push(data.payload[i]);
            }
            dispatch(setFunctionArr(tmpFunctionArr));
        })();
    }, [])

    const handleAddFunctionOpen = () => {
        for(let i = 0; i < functionArr.length; i++) {
            for(let j = 0; j < functionArr[i].functionMetadataDtoList.length; j++) {
                if(functionArr[i].functionMetadataDtoList[j].functionMetadataDone !== true) {
                    console.log(functionArr[i].functionMetadataDtoList[j])
                    return;
                }
            }
        }
        setOpenAddFunction(true);
    }

    return (
        <div id="task-function-container" className="h-full border-r">
            <h4 className="flex gap-2 scroll-m-20 text-xl border-b p-2 font-semibold tracking-tight shadow-sm">
                <span>Functions</span>
                <button
                    type="button"
                    className="p-1 rounded-md border"
                    onClick={handleAddFunctionOpen}>
                    <IoAddSharp />
                </button>
                <AddFunction
                    functionArr={functionArr}
                    taskId={taskId}
                    user={user}
                    setOpenAddFunction={setOpenAddFunction}
                    openAddFunction={openAddFunction}
                    functionTemplateArr={functionTemplateArr}
                />
            </h4>
            <div id="task-function-display" className="py-7 px-3 overflow-y-auto">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {functionArr?.map((func, index) => {
                        if (index === 0) {
                            return (
                                <>
                                    <FunctionCard key={`task-function-card-timeline-${index}`} functionArr={functionArr} func={func} />
                                    {functionArr.length > 1 && <div className="w-full my-9 border-dotted pb-3 border-t-4"></div>}
                                </>
                            )
                        }
                        else {
                            return <FunctionCard key={`task-function-card-timeline-${index}`} functionArr={functionArr} func={func}/>
                        }

                    })}
                </ol>
            </div>
        </div>
    )
}

export default TaskFunctions