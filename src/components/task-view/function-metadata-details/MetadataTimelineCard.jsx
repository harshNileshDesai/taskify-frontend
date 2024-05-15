
import { selectViewFunction } from "@/app/features/viewFunctionSlice";
import { getFormattedDate } from "@/utils/helper";
import { MdOutlineDone } from "react-icons/md";
import { RiProgress8Line } from "react-icons/ri"
import { useSelector } from "react-redux";

const MetadataTimelineCard = ({ metadataDto, metadata, handleMetadataView }) => {
    const viewFunction = useSelector(selectViewFunction);
    const notDoneFunctionMetadataArr = viewFunction.functionMetadataDtoList.filter(ele => ele.functionMetadataDone === false);

    return (
        <li className="relative mb-6 sm:mb-0 cursor-pointer min-w-[200px]" onClick={()=> {handleMetadataView(metadataDto)}}>
            <div className="flex items-center ">
                <div className="z-10 flex items-center justify-center w-6 h-6 text-xl">
                    {metadataDto.functionMetadataDone ?
                        <MdOutlineDone className="text-green-500" /> 
                        : notDoneFunctionMetadataArr[0].id === metadataDto.id ? <RiProgress8Line className="text-blue-500" /> 
                        : <RiProgress8Line className="text-slate-500" /> 
                    }
                </div>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className={`mt-3 p-2 sm:pe-8 h-[70px] hover:border-slate-300 rounded-md border ${metadata?.id===metadataDto.id? 'border-slate-300' : 'border-transparent '} `}>
                <h3 className="font-semibold text-gray-900 dark:text-white">{metadataDto?.metadataTitle}</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {metadataDto.functionMetadataDone ? getFormattedDate(metadataDto.functionMetadataFinishedDate) : ""}
                </time>
            </div>
        </li>
    )
}

export default MetadataTimelineCard