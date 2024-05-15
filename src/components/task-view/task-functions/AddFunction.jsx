import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PiFunction } from "react-icons/pi";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useEffect, useRef, useState } from "react";
import { addFunction } from "@/app/apis/functionApis";
import { useDispatch, useSelector } from "react-redux";
import { setViewFunction } from "@/app/features/viewFunctionSlice";
import { selectFunctionArr, setFunctionArr } from "@/app/features/functionArrSlice";
import { useToast } from "@/components/ui/use-toast";
import { getFormattedDate } from "@/utils/helper";

const AddFunction = ({ taskId, user, openAddFunction, setOpenAddFunction, functionTemplateArr }) => {

    const dispatch = useDispatch();

    const functionArr = useSelector(selectFunctionArr);

    const { toast } = useToast()

    const [open, setOpen] = useState(openAddFunction);

    const handleItemSelect = async (functionTemplate) => {
        console.log("Creating function based on template:", functionTemplate);

        const newFunction = {
            functionTitle: functionTemplate.functionTitle,
            functionDescription: functionTemplate.functionDescription,
            functionDepartment: functionTemplate.functionDepartment,
            functionCreatedDate: new Date(),
            functionCreatedByUserId: user.id,
            functionAssignedToUserId: user.id,
            functionDone: false,
            functionFinishedDate: null,
            functionFinishedByUserId: -1,
            defaultFunction: functionTemplate.defaultFunction,
            taskModelId: taskId,
            functionMetadataDtoList: functionTemplate.functionMetadataTemplateDtos,
        }

        const { data, error } = await addFunction(newFunction, functionTemplate);
        console.log(data.payload, error);

        const newFunctionArr = [];
        newFunctionArr.push(data.payload);
        for(let i = functionArr.length - 1; i >= 0; i--) {
            newFunctionArr.push(functionArr[i]);
        }
        dispatch(setFunctionArr(newFunctionArr));
        dispatch(setViewFunction(newFunctionArr[0]));
        setOpenAddFunction(false)
        setOpen(false);

        toast({
            title: `Function Created - ${functionTemplate.functionTitle}`,
            description: getFormattedDate(new Date()),
            variant: "success",
            color: "green"
          })

    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                <AlertDialog open={openAddFunction}>
                    <AlertDialogTrigger asChild>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <Command className="h-[350px] overflow-y-auto">
                            <CommandInput autoFocus placeholder="Type a command or search..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions" className="text-left">
                                    {functionTemplateArr.map((functionTemplate, index) => (
                                        <CommandItem
                                            key={`function-template-${index}`}
                                            onSelect={() => handleItemSelect(functionTemplate)}
                                            className="w-full h-full flex gap-3 cursor-pointer text-black"
                                        >
                                            <PiFunction />
                                            {functionTemplate.functionTitle}
                                            {/* {console.log(functionTemplate)} */}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpenAddFunction(false)}>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DialogTrigger>
        </Dialog>
    );
}

export default AddFunction;
