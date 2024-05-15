import { deleteFunction } from '@/app/apis/functionApis';
import { setFunctionArr } from '@/app/features/functionArrSlice';
import { selectIsForwarded } from '@/app/features/isForwarderSlice';
import { selectUser } from '@/app/features/userSlice';
import { selectViewFunction, setViewFunction } from '@/app/features/viewFunctionSlice';
import { Badge } from '@/components/ui/badge';
import { getFormattedDate } from '@/utils/helper';
import React from 'react'
import { MdOutlineDone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const FunctionCard = ({ func, functionArr }) => {
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const isForwarded = useSelector(selectIsForwarded);
    const viewFunction = useSelector(selectViewFunction);

    console.log("viewFunction:", viewFunction);

    const handleFunctionCardClick = (functionId) => {
        const functionObj = functionArr.find((ele) => ele.id === functionId);
        dispatch(setViewFunction(functionObj));
    }

    const handleFunctionDelete = async (functionId) => {
        const {data, error} = await deleteFunction(functionId);
        if(data.status === 404) {
            console.error(data.message);
        }
        let newFunctionArr = [...functionArr];
        newFunctionArr = newFunctionArr.filter((ele) => ele.id !== functionId);

        dispatch(setViewFunction(newFunctionArr[0]));
        
        dispatch(setFunctionArr(newFunctionArr));
    }

    return (
        <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{func.functionTitle}</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {func.functionDone ? 
                    <span>Finished {getFormattedDate(func.functionFinishedDate)}</span> 
                    : <span>Created on {getFormattedDate(func.functionCreatedDate)}</span>
                }
            </time>
            <p className="mb-4 text-[14px] font-normal text-gray-500 dark:text-gray-400">{func.functionDescription}</p>
            <p className="mb-4">
                <Badge className={"bg-slate-200 text-black hover:bg-slate-200 hover:text-black"}>{func.functionDepartment}</Badge>
            </p>
            <div className='flex gap-2 items-center'>
                <button
                    onClick={() => { handleFunctionCardClick(func.id) }}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 ${func.id == viewFunction?.id ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-white hover:bg-gray-100'} border rounded-lg  `}
                >View</button>
                {func.id === viewFunction?.id && !viewFunction?.functionDone && !viewFunction?.defaultFunction && !isForwarded && viewFunction?.functionAssignedToUserId == user?.id &&
                    <button
                        onClick={() => { handleFunctionDelete(viewFunction?.id) }}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-500  border border-gray-200 rounded-lg  focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700`}
                    >Delete</button>
                }
            </div>
        </li>
    )
}

export default FunctionCard