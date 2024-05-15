import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { selectFunctionArr } from '@/app/features/functionArrSlice'
import { selectIsForwarded } from '@/app/features/isForwarderSlice'
import { forwardTask } from '@/app/apis/taskApis'
import { useToast } from '@/components/ui/use-toast'
import { getFormattedDate } from '@/utils/helper'

const ForwardTask = ({ taskId, isTaskDone, canMarkTaskDone }) => {
    const dispatch = useDispatch();

    const functionArr = useSelector(selectFunctionArr);
    const isForwarded = useSelector(selectIsForwarded);

    const { toast } = useToast()

    const [forwardToDepartment, setForwardToDepartment] = useState("QUOTATION");

    const handleForwardTask = async () => {
        const { data, error } = await forwardTask(taskId, forwardToDepartment);
        if (data) {
            toast({
                title: `Task Forwarded to - ${forwardToDepartment}`,
                description: getFormattedDate(new Date()),
                variant: "success",
                color: "green"
            });
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>

                <button disabled={!canMarkTaskDone || isForwarded} className={`px-4 py-1 text-[14px] ${!canMarkTaskDone ? 'bg-purple-300 hover:bg-purple-300' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-md`}>Forward Task</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Forward Task</DialogTitle>
                    <DialogDescription>
                        Forward the task from here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 ">
                    <div className="grid w-full items-center gap-4">
                        <Select value={forwardToDepartment} onValueChange={(value) => setForwardToDepartment(value)}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel></SelectLabel>
                                    <SelectItem value="QUOTATION">QUOTATION</SelectItem>
                                    <SelectItem value="ACCOUNTS">ACCOUNTS</SelectItem>
                                    <SelectItem value="DISPATCH">DISPATCH</SelectItem>
                                    <SelectItem value="SERVICES">SERVICES</SelectItem>
                                    {/* <SelectItem value="CUSTOMER">CUSTOMER</SelectItem> */}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleForwardTask} type="button">Forward</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ForwardTask