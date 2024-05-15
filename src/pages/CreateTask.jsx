import { fetchUserByEmail } from '@/app/apis/authApis'
import { addDefaultFunction, addFunction, getFunctionsByTaskId } from '@/app/apis/functionApis'
import { addMetadataDefault } from '@/app/apis/functionMetadataApis'
import { addDefaultMetafield } from '@/app/apis/metafieldApis'
import { addTask } from '@/app/apis/taskApis'
import { fetchAllTaskTemplates } from '@/app/apis/taskTemplateApis'
import { selectToken } from '@/app/features/authSlice'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { getFormattedDate } from '@/utils/helper'
import { data } from 'autoprefixer'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CreateTask = () => {
    const { toast } = useToast();

    const token = useSelector(selectToken);

    const userEmail = jwtDecode(token.token).sub;

    const [user, setUser] = useState();
    const [taskType, setTaskType] = useState();
    const [taskTemplateArr, setTaskTemplateArr] = useState([]);
    const [selectedFunctionTemplate, setSelectedFunctionTemplate] = useState();
    const [selectedTaskTemplate, setSelectedTaskTemplate] = useState();
    const [task, setTask] = useState({
        id: 0,
        taskTemplateModelId: -1,
        taskCreatedByUserId: -1,
        taskCreatedDate: new Date(),
        taskPriority: "NORMAL",
        taskAssignedToDepartment: "QUOTATION",
        taskAssignedToDepartmentDate: new Date(),
        taskCompleted: false,
        taskFinishedDate: null,
        taskFinishedByUserId: -1,
        functionDtoList: [],
    });
    const [functionObj, setFunctionObj] = useState({
        id: 0,
        functionTitle: "",
        functionDescription: "",
        functionDepartment: "",
        functionCreatedDate: new Date(),
        functionCreatedByUserId: -1, // TODO
        functionAssignedToUserId: -1, // TODO
        isFunctionDone: false,
        functionFinishedDate: null,
        functionFinishedByUserId: -1, // TODO
        defaultFunction: true,
        taskModelId: -1, // TODO
        functionMetadataDtoList: [],
    });
    const [functionMetadata, setFunctionMetadata] = useState({
        id: 0,
        functionMetadataTemplateId: -1, // TODO
        metadataTitle: "",
        metadataDescription: "",
        metadataAssignedToUserId: -1, // TODO
        functionMetadataDone: false,
        functionMetadataFinishedDate: null,
        functionMetadataFinishedByUserId: -1, // TODO
        functionModelId: -1, // TODO
        metaFieldModelList: []
    });
    const [metafieldArr, setMetafieldArr] = useState([
        {
            id: 0,
            fieldName: "",
            fieldValue: "",
            functionMetadataModel: {}, // TODO
        }
    ]);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchAllTaskTemplates();
            if (error === null) {
                console.log("Task Templates:", data.payload)
                setTaskTemplateArr(data.payload);
                setSelectedTaskTemplate(taskTemplateArr[0]);
                const newTask = { ...task };

                const tmpSelectedFunctionTemplate = data?.payload[0].functionTemplateDtoList.find(ele => ele.defaultFunction === true);

                newTask.taskTemplateModelId = tmpSelectedFunctionTemplate.taskTemplateModelId;

                newTask.taskAssignedToDepartment = tmpSelectedFunctionTemplate.functionDepartment;

                setTaskType(tmpSelectedFunctionTemplate.functionTitle)
                setTask(newTask);

                setSelectedFunctionTemplate(tmpSelectedFunctionTemplate);
                console.log("in useEffect(), tmpSelectedFunctionTemplate:", tmpSelectedFunctionTemplate.functionMetadataTemplateDtos[0].metaFieldTemplateModelList);
                // setMetafieldArr(tmpSelectedFunctionTemplate.functionMetadataTemplateDtos[0].metaFieldTemplateModelList);

            }
        })();
        (async () => {
            const { data, error } = await fetchUserByEmail(userEmail);
            if (error === null) {
                console.log("User:", data.payload)
                setUser(data.payload);

                const newTask = { ...task };
                newTask.taskCreatedByUserId = data.payload.id;
                setTask(newTask);
            }
        })();

    }, []);

    const handleTaskTypeChange = (value) => {
        console.log(value);
        setTaskType(value);
        const newTask = { ...task };
        let tmpSelectedFunctionTemplate = {};
        for (let i = 0; i < taskTemplateArr.length; i++) {
            for (let j = 0; j < taskTemplateArr[i].functionTemplateDtoList.length; j++) {
                if (taskTemplateArr[i].functionTemplateDtoList[j].functionTitle === value) {
                    tmpSelectedFunctionTemplate = taskTemplateArr[i].functionTemplateDtoList[j];
                    setSelectedTaskTemplate(taskTemplateArr[i]);
                    break;
                }
            }
        }
        newTask.taskTemplateModelId = tmpSelectedFunctionTemplate.taskTemplateModelId;
        newTask.taskCreatedByUserId = user.id;
        newTask.taskAssignedToDepartment = tmpSelectedFunctionTemplate.functionDepartment;
        setTask(newTask);
        console.log(tmpSelectedFunctionTemplate)

        setSelectedFunctionTemplate(tmpSelectedFunctionTemplate);
        setMetafieldArr(tmpSelectedFunctionTemplate.metaFieldModelList);
    }

    const handleMetafieldChange = (e, metadataIndex) => {
        const { name, value } = e.target;
        const newSelectedFunctionTemplate = { ...selectedFunctionTemplate };
        console.log("metadata to change:", newSelectedFunctionTemplate.functionMetadataTemplateDtos[metadataIndex]);
        let newMetaFieldTemplateModelList = [...newSelectedFunctionTemplate.functionMetadataTemplateDtos[metadataIndex].metaFieldTemplateModelList];

        newMetaFieldTemplateModelList = newMetaFieldTemplateModelList.map((ele) => {
            if (ele.fieldName === name) {
                return { ...ele, fieldValue: value };
            }
            return ele;
        })
        newSelectedFunctionTemplate.functionMetadataTemplateDtos[metadataIndex].metaFieldTemplateModelList = newMetaFieldTemplateModelList;
        setSelectedFunctionTemplate(newSelectedFunctionTemplate);
    }

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const tmpSelectedFunctionTemplate = { ...selectedFunctionTemplate }

        // Create the task
        const newTask = { ...task };
        newTask.taskTemplateModelId = tmpSelectedFunctionTemplate.taskTemplateModelId;
        newTask.taskCreatedByUserId = user.id;
        newTask.taskAssignedToDepartment = tmpSelectedFunctionTemplate.functionDepartment;

        const { data: taskResponse, error: taskError } = await addTask(newTask);
        console.log(taskResponse);
        const taskId = taskResponse.payload.id;

        // Create the function
        const newFunction = {...functionObj}
        newFunction.functionTitle = tmpSelectedFunctionTemplate.functionTitle;
        newFunction.functionDescription = tmpSelectedFunctionTemplate.functionDescription;
        newFunction.functionDepartment = tmpSelectedFunctionTemplate.functionDepartment;
        newFunction.functionCreatedByUserId = user.id;
        newFunction.functionAssignedToUserId = user.id;
        newFunction.isFunctionDone = false;
        newFunction.defaultFunction = tmpSelectedFunctionTemplate.defaultFunction;
        newFunction.taskModelId = taskId;

        const { data: functionResponse, error: functionError } = await addDefaultFunction(newFunction, tmpSelectedFunctionTemplate);
        console.log(functionResponse);
        const functionId = functionResponse.payload.id;

        // Create the functionMetadata
        for(let i = 0; i < tmpSelectedFunctionTemplate.functionMetadataTemplateDtos.length; i++) {
            let functionMetadataTemplate = tmpSelectedFunctionTemplate.functionMetadataTemplateDtos[i];

            let newfunctionMetadata = {...functionMetadata}
            newfunctionMetadata.functionMetadataTemplateId = functionMetadataTemplate.id;
            newfunctionMetadata.metadataTitle = functionMetadataTemplate.metadataTitle;
            newfunctionMetadata.metadataDescription = functionMetadataTemplate.metadataDescription;
            newfunctionMetadata.metadataAssignedToUserId = user.id;
            newfunctionMetadata.functionMetadataDone = false;
            newfunctionMetadata.functionModelId = functionId;

            let { data: metadataResponse, error: metadataError } = await addMetadataDefault(newfunctionMetadata);
            console.log(metadataResponse);
            newfunctionMetadata.id = metadataResponse.payload.id;

            // Create the metafields
            for(let j = 0; j < tmpSelectedFunctionTemplate.functionMetadataTemplateDtos[i].metaFieldTemplateModelList.length; j++) {
                let newMetafield = {
                    id: 0,
                    fieldName: tmpSelectedFunctionTemplate.functionMetadataTemplateDtos[i].metaFieldTemplateModelList[j].fieldName,
                    fieldValue: tmpSelectedFunctionTemplate.functionMetadataTemplateDtos[i].metaFieldTemplateModelList[j].fieldValue
                }
                console.log("Creating newMetafield:", newMetafield, newfunctionMetadata.id);
                let { data: metafieldResponse, error: metafieldError } = await addDefaultMetafield(newMetafield, newfunctionMetadata.id);
                console.log(metafieldResponse, metafieldError);
            }


        }

        toast({
            title: `Task Created: #${taskId}`,
            description: getFormattedDate(new Date()),
            variant: "success",
            color: "green"
        });


    }

    return (
        <div className='w-full h-full overflow-auto'>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Create Task
            </h2>
            <form className='my-9' onSubmit={handleCreateTask}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-3">
                        <Label htmlFor="taskType">Task Type</Label>
                        {taskType && <Select value={taskType} onValueChange={(value) => handleTaskTypeChange(value)}>
                            <SelectTrigger id="taskType">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {taskTemplateArr?.map((ele, index) => {
                                    const defaultFunctionTemplate = ele.functionTemplateDtoList?.find(e => e.defaultFunction === true);
                                    if (defaultFunctionTemplate) {
                                        return (
                                            <SelectItem value={defaultFunctionTemplate.functionTitle}>
                                                {defaultFunctionTemplate.functionTitle}
                                            </SelectItem>
                                        )
                                    }
                                })}
                            </SelectContent>
                        </Select>}
                    </div>

                    <div>
                        <Label>Task Priority</Label>
                        <Select value={task.taskPriority} onValueChange={(value) => setTask((prev)=> ({...prev, taskPriority: value}))}>
                            <SelectTrigger id="taskType">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="NORMAL">NORMAL</SelectItem>
                                <SelectItem value="INTERMEDIATE">INTERMEDIATE</SelectItem>
                                <SelectItem value="HIGH">HIGH</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>

                    {selectedFunctionTemplate &&
                        <>
                            <div className='my-4'>
                                <h3 className="scroll-m-20 my-2 mb-4 text-2xl font-semibold tracking-tight">Function</h3>
                                <div className='space-y-5 border p-2 rounded-md'>
                                    <div className="flex flex-col space-y-1.5">
                                        <p className="font-medium">{selectedFunctionTemplate?.functionTitle}</p>
                                        <p>{selectedFunctionTemplate.functionDescription}</p>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <p className="font-medium">Department</p>
                                        <p>
                                            <Badge className={"bg-orange-500 hover:bg-orange-500"}>{selectedFunctionTemplate.functionDepartment}</Badge>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='my-4'>
                                <h3 className="scroll-m-20 my-2 mb-4 text-2xl font-semibold tracking-tight">Function Metadata</h3>
                                <div className='space-y-5 border p-2 rounded-md'>
                                    {
                                        selectedFunctionTemplate?.functionMetadataTemplateDtos.map((metadata, metadataIndex) => (
                                            <div>
                                                <p className="font-medium">{metadata.metadataTitle}</p>
                                                <p>{metadata.metadataDescription}</p>
                                                {metadata?.metaFieldTemplateModelList.length > 0 &&
                                                    <div className='p-2'>
                                                        <h4 className="scroll-m-20 my-2 mb-4 text-xl font-semibold tracking-tight">Metafields</h4>
                                                        {console.log(metadata)}
                                                        {metadata?.metaFieldTemplateModelList?.map((metafield, metafieldIndex) => (
                                                            <div className='my-2'>
                                                                <Label htmlFor={metafield.fieldName}>{metafield.fieldName}</Label>
                                                                <Input
                                                                    name={metafield.fieldName}
                                                                    onChange={(e) => { handleMetafieldChange(e, metadataIndex) }}
                                                                    value={metafield.fieldValue}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    }

                </div>
                <div>
                    <button type='submit' className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md '>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask