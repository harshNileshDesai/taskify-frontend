import { getFunctionsByTaskId } from "@/app/apis/functionApis";
import { markFunctionMetadataDone } from "@/app/apis/functionMetadataApis";
import { selectFunctionArr, setFunctionArr } from "@/app/features/functionArrSlice";
import { selectUser } from "@/app/features/userSlice";
import { selectViewFunction, setViewFunction } from "@/app/features/viewFunctionSlice";
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
import { useToast } from "@/components/ui/use-toast";
import { getFormattedDate } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";

const DoneMetadata = ({ metadata, setMetadata, taskId }) => {
    const dispatch = useDispatch();

    const { toast } = useToast()

    const user = useSelector(selectUser);
    console.log(user)

    const functionArr = useSelector(selectFunctionArr);
    const viewFunction = useSelector(selectViewFunction);

    const handleConfirmDone = async (metadata) => {
        const metadataIndex = viewFunction.functionMetadataDtoList.findIndex(ele => ele.id === metadata.id);

        console.log("Mark the metadata as done: ", metadata);
        const { data, error } = await markFunctionMetadataDone(metadata.id, user.id, new Date());
        console.log("marked metadata:", data);
        if (data !== null) {
            // Update the functionArr
            const { data, error } = await getFunctionsByTaskId(taskId);
            if (data !== null) {
                // Update the viewFunction
                dispatch(setViewFunction(data.payload.find((ele) => ele.id === viewFunction.id)));
                console.log("had set viewFunction:", data.payload.find((ele) => ele.id === viewFunction.id));

                // Update the functionArr
                const tmpFunctionArr = [];
                for (let i = data.payload.length - 1; i >= 0; i--) {
                    tmpFunctionArr.push(data.payload[i]);
                }
                dispatch(setFunctionArr(tmpFunctionArr));

                // Filter the metadata which are not marked as done
                const notDoneArr = viewFunction.functionMetadataDtoList?.filter((ele) => ele.functionMetadataDone === false);

                // Set the first metadata among the not marked 
                if (notDoneArr !== undefined && notDoneArr?.length > 0) {
                    setMetadata(notDoneArr[0]);
                }
                else if (notDoneArr?.length == 1 || notDoneArr?.length == 0) {
                    setMetadata(viewFunction.functionMetadataDtoList[metadataIndex]);
                }




                toast({
                    title: `Metadata Completed: ${getFormattedDate(new Date())}`,
                    description: getFormattedDate(new Date()),
                    variant: "success",
                    color: "green"
                });

            }



        }

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="bg-blue-500 text-[15px] flex gap-2 py-2 px-2 text-white rounded-sm">
                    Done
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently mark the metadata as done.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {console.log("done:", metadata?.functionMetadataDone)}
                    <AlertDialogAction 
                        type="button" 
                        onClick={() => { handleConfirmDone(metadata) }}
                    >Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DoneMetadata