import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { fetchAllUsers } from "@/app/apis/authApis"
import { Badge } from "@/components/ui/badge"
import { forwardMetadataFunctionAndTask } from "@/app/apis/functionMetadataApis";
import { useToast } from "@/components/ui/use-toast";
import { getFormattedDate } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setIsForwarded } from "@/app/features/isForwarderSlice";
import { selectUser } from "@/app/features/userSlice";

const ForwardMetadata = ({ usersArr, openForwardFunction, setOpenForwardFunction, metadata }) => {
    const dispatch = useDispatch();

    const loggeInUser = useSelector(selectUser);

    const [open, setOpen] = useState(openForwardFunction);

    const { toast } = useToast()

    const handleForward = async (user) => {
        console.log("Forward to: ", user);
        setOpenForwardFunction(false);
        const { data, error } = await forwardMetadataFunctionAndTask(user.id, metadata.id);
        console.log("forwarded:", data.payload);
        if (data) {
            dispatch(setIsForwarded(true));
            toast({
                title: `Function Forwarded To: ${user.name}`,
                description: getFormattedDate(new Date()),
                variant: "success",
                color: "green"
            });
        }
    }

    return (
        <AlertDialog open={openForwardFunction}>
            <AlertDialogTrigger asChild>
                <Button onClick={() => setOpenForwardFunction(true)} className="bg-blue-700 hover:bg-blue-600">Forward Metadata</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border">
                <Command className="h-[350px] overflow-y-auto ">
                    <CommandInput autoFocus placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {usersArr.map((user, index) => {
                                if (user.id !== loggeInUser.id) {
                                    return (
                                        <CommandItem
                                            key={`user-${index}`}
                                            className={`flex gap-5 mb-5 justify-start items-center`}
                                            onSelect={() => handleForward(user)}
                                        >
                                            <FaRegUserCircle className="text-xl" />
                                            <div>
                                                <p>{user?.name}</p>
                                                <p>{user?.email}</p>
                                                {/* <Badge className={"text-[9px]"}>{user?.department}</Badge> */}
                                            </div>
                                        </CommandItem>
                                    );
                                }
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
                <AlertDialogFooter className="relative bottom-0">
                    <AlertDialogCancel onClick={() => setOpenForwardFunction(false)}>Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}

export default ForwardMetadata