import { fetchAllTasks } from '@/app/apis/taskApis';
import TaskRow from '@/components/default-task/TaskRow';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const DefaultAllTask = () => {
    const [searchTaskText, setSearchTaskText] = useState('');
    const [allTasks, setAllTasks] = useState([]);
    const [taskArr, setTaskArr] = useState([]);
    const [tabArr, setTabArr] = useState([
        { tabName: "All Task", isSelected: true, totalTask: 0, },
        { tabName: "Completed", isSelected: false, totalTask: 0, },
        { tabName: "Pending", isSelected: false, totalTask: 0, },
        { tabName: "HIGH", isSelected: false, totalTask: 0, },
        { tabName: "INTERMEDIATE", isSelected: false, totalTask: 0, },
        { tabName: "NORMAL", isSelected: false, totalTask: 0, },
    ]);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchAllTasks();
            console.log("All Tasks:", data.payload);
            if (data) {
                const tmpArr = [];

                for (let i = data.payload.length - 1; i >= 0; i--) {
                    tmpArr.push(data.payload[i]);
                }

                setAllTasks(tmpArr);
                setTaskArr(tmpArr);

                const newTabArr = [...tabArr];
                for (let i = 0; i < newTabArr.length; i++) {
                    if (newTabArr[i].tabName === "All Task") {
                        newTabArr[i].totalTask = tmpArr.length;
                    }
                    else if (newTabArr[i].tabName === "Completed") {
                        let totalTask = tmpArr.filter((ele) => ele.taskCompleted === true);
                        newTabArr[i].totalTask = totalTask.length;
                    }
                    else if (newTabArr[i].tabName === "Pending") {
                        let totalTask = tmpArr.filter((ele) => ele.taskCompleted === false);
                        newTabArr[i].totalTask = totalTask.length;
                    }
                    else if (newTabArr[i].tabName === "HIGH") {
                        let totalTask = tmpArr.filter((ele) => ele.taskPriority === "HIGH");
                        newTabArr[i].totalTask = totalTask.length;
                    }
                    else if (newTabArr[i].tabName === "INTERMEDIATE") {
                        let totalTask = tmpArr.filter((ele) => ele.taskPriority === "INTERMEDIATE");
                        newTabArr[i].totalTask = totalTask.length;
                    }
                    else if (newTabArr[i].tabName === "NORMAL") {
                        let totalTask = tmpArr.filter((ele) => ele.taskPriority === "NORMAL");
                        newTabArr[i].totalTask = totalTask.length;
                    }
                    console.log(newTabArr[i]);
                }
                setTabArr(newTabArr);
            }


        })();
    }, []);

    const handleTabClick = (tab) => {
        let newTabArr = [...tabArr];
        newTabArr = newTabArr.map((ele) => {
            if (ele.tabName === tab.tabName) {
                // Select the tab
                ele.isSelected = true;
                // TODO: Filter the task data
                if (ele.tabName === "All Task") {
                    ele.totalTask = allTasks.length;
                    setTaskArr(allTasks);
                }
                else if (ele.tabName === "Completed") {
                    let totalTask = allTasks.filter((ele) => ele.taskCompleted === true);
                    console.log("Completed task:", totalTask);
                    ele.totalTask = totalTask.length;
                    setTaskArr(totalTask);
                }
                else if (ele.tabName === "Pending") {
                    let totalTask = allTasks.filter((ele) => ele.taskCompleted === false);
                    ele.totalTask = totalTask.length;
                    setTaskArr(totalTask);
                }
                else if (ele.tabName === "HIGH") {
                    let totalTask = allTasks.filter((ele) => ele.taskPriority === "HIGH");
                    ele.totalTask = totalTask.length;
                    setTaskArr(totalTask);
                }
                else if (ele.tabName === "INTERMEDIATE") {
                    let totalTask = allTasks.filter((ele) => ele.taskPriority === "INTERMEDIATE");
                    ele.totalTask = totalTask.length;
                    setTaskArr(totalTask);
                }
                else if (ele.tabName === "NORMAL") {
                    let totalTask = allTasks.filter((ele) => ele.taskPriority === "NORMAL");
                    ele.totalTask = totalTask.length;
                    setTaskArr(totalTask);
                }
                console.log(ele);

            }
            else {
                ele.isSelected = false;
            }
            return ele;
        });
        console.log(newTabArr);
        setTabArr(newTabArr);
    }

    // const handleSearchTask = (e) => {
    //     const { name, value } = e.target;
    //     console.log(value);
    //     let newTaskArr = [...taskArr];
    //     newTaskArr = newTaskArr.filter((ele) => {
    //         const tmpDefaultFunction = ele.functionDtoList.find((ele) => ele.defaultFunction === true);
    //         console.log(tmpDefaultFunction.functionTitle);
    //         let taskType = '';
    //         if (tmpDefaultFunction?.functionTitle === 'New Enquiry') {
    //             taskType = 'New Enquiry';
    //         }
    //         else if (tmpDefaultFunction?.functionTitle === 'Prepare Job Card') {
    //             taskType = 'Repair Service';
    //         }


    //         if (value.includes(ele.id) || taskType.toLowerCase().includes(value.toLowerCase())) {
    //             return ele;
    //         } 
    //         if(value.trim() === '') {
    //             // tabArr.
    //         }
    //     });

    //     setSearchTaskText(value);
    //     setTaskArr(newTaskArr);
    // }

    const handleSearch = (e) => {
        e.preventDefault();
    }

    const tabContent = (
        <ul className='flex gap-3 min-w-[800px] overflow-x-auto '>
            {tabArr.map((tab, index) => (
                <li
                    key={`task-tab-${index}`}
                    onClick={(e) => { handleTabClick(tab) }}
                    className={`flex justify-center items-center gap-2 py-3 border-b ${tab.isSelected ? 'border-blue-500' : 'border-transparent'} cursor-pointer min-w-[120px] text-center`}
                >
                    <p className={`font-medium ${tab.isSelected ? 'text-blue-500' : ''}`}>{tab.tabName}</p>
                    <p className={`border p-1 ${tab.isSelected ? 'text-blue-500' : ''} px-[5px] text-[9px] rounded-full bg-slate-50`}>{tab.totalTask}</p>
                </li>
            ))}
        </ul>
    )

    return (
        <div className='w-full'>
            <div>
                <div className='flex justify-between items-center my-4'>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        All Task
                    </h2>
                    <Link to={"/home/create-task"} className='text-center border px-4 py-2 rounded-md bg-blue-500 text-white '>Create Task</Link>
                </div>
                <p>View All of your task here</p>
            </div>
            <div className='my-5 border-b w-full overflow-auto'>
                {tabContent}
            </div>
            <div className='w-full overflow-auto'>
                <div className="min-w-[1262px] overflow-auto thead flex gap-3 text-center bg-slate-100 border rounded-md">
                    <p className='text-center w-[11.0%] py-2'>Sr. No.</p>
                    <p className='text-center w-[11.0%] py-2'>Task Id</p>
                    <p className='text-center w-[11.0%] py-2'>Type</p>
                    <p className='text-center w-[11.0%] py-2'>Created By</p>
                    <p className='text-center w-[11.0%] py-2'>Created Date</p>
                    <p className='text-center w-[11.0%] py-2'>Finished Date</p>
                    <p className='text-center w-[11.0%] py-2'>Priority</p>
                    <p className='text-center w-[11.0%] py-2'>Status</p>
                    <p className='text-center w-[11.0%] py-2'>Action</p>
                </div>
                <div className="tbody my-3 h-[59vh] min-w-[1262px] overflow-auto">
                    {taskArr.map((task, taskIndex) => (
                        <TaskRow task={task} srno={taskIndex + 1} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DefaultAllTask