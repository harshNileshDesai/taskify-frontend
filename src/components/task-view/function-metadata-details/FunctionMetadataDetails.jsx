import React, { useEffect, useState } from "react";

import DoneMetadata from "./DoneMetadata";
import EditMetaFields from "./EditMetaFields";
import ForwardMetadata from "./ForwardMetadata";
import MetadataTimelineCard from "./MetadataTimelineCard";
import { useDispatch, useSelector } from "react-redux";
import { selectViewFunction } from "@/app/features/viewFunctionSlice";
import { selectFunctionArr } from "@/app/features/functionArrSlice";
import { fetchAllUsers, fetchUserByEmail, fetchUserById } from "@/app/apis/authApis";
import { selectIsForwarded } from "@/app/features/isForwarderSlice";
import { selectUser } from "@/app/features/userSlice";

const FunctionMetadataDetails = ({ taskId }) => {
    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const functionArr = useSelector(selectFunctionArr);
    const isForwarded = useSelector(selectIsForwarded);
    const viewFunction = useSelector(selectViewFunction);

    const [functionMetadataFinishedByUser, setFunctionMetadataFinishedByUser] = useState();
    const [metadata, setMetadata] = useState();
    const [openForwardFunction, setOpenForwardFunction] = useState(false);
    const [usersArr, setUsersArr] = useState([]);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchAllUsers();
            console.log(data.payload);
            setUsersArr(data.payload);
        })();
    }, []);

    useEffect(() => {
        if (viewFunction) {
            // Filter the metadata which are not marked as done
            const notDoneArr = viewFunction.functionMetadataDtoList?.filter((ele) => ele.functionMetadataDone === false);

            // Set the first metadata among the not marked 
            if (notDoneArr !== undefined && notDoneArr?.length > 0) {
                setMetadata(notDoneArr[0]);
            }
            else if (notDoneArr?.length == 1) {
                setMetadata(viewFunction.functionMetadataDtoList[0]);
            }
            else {
                setMetadata(viewFunction?.functionMetadataDtoList[0]);
            }
        }
    }, [viewFunction]);

    const handleMetadataView = (viewMetadata) => {
        const viewMetadataIndex = viewFunction?.functionMetadataDtoList.findIndex(ele => (ele.id === viewMetadata.id));
        const metadataIndex = viewFunction?.functionMetadataDtoList.findIndex(ele => ele.id === metadata.id);

        const notDoneArr = viewFunction.functionMetadataDtoList?.filter((ele) => ele.functionMetadataDone === false);

        if (notDoneArr.length >= 1) {
            const notDoneIndexStarts = viewFunction.functionMetadataDtoList.findIndex(ele => (ele.id === notDoneArr[0]?.id));

            if (viewMetadataIndex <= notDoneIndexStarts) {
                setMetadata(viewMetadata);
            }
        }
        else {
            setMetadata(viewMetadata);
        }
    }

    const getFunctionMetadataFinishedByUser = async (userId) => {
        console.log(userId)
        const { data, error } = await fetchUserById(userId);
        if (data) {
            return data.payload.name;
        }
    }


    return (
        <div id="function-metadata-container" className="w-full h-full">
            <h4 className="flex gap-2 scroll-m-20 text-xl border-b p-2 pb-[10px] font-semibold tracking-tight shadow-sm">Function Metadata</h4>
            <div className="py-7 pl-3 min-h-[140px] w-full">
                <ol className="overflow-x-auto w-full items-center min-w-[500px] flex gap-3">
                    {viewFunction.functionMetadataDtoList?.map((metadataDto, index) => (
                        <MetadataTimelineCard
                            key={`function-metadata-timeline-${index}`}
                            metadataDto={metadataDto}
                            metadata={metadata}
                            handleMetadataView={handleMetadataView}
                        />
                    ))}
                </ol>
            </div>
            <div className="border p-3 ">
                <div className="mb-9 min-h-[80px]">
                    <h5 className="font-medium my-2">{metadata?.metadataTitle}</h5>
                    <p className="text-[14px]">{metadata?.metadataDescription}</p>
                </div>
                {metadata?.metaFieldModelList?.length >= 1 &&
                    <div className="w-full  my-3">
                        <h5 className="font-medium my-2">Meta Fields</h5>
                        <div className="border w-full overflow-y-auto text-[14px] pb-3">
                            <div className="thead flex justify-between border-b bg-slate-50">
                                {metadata !== undefined && metadata.metaFieldModelList?.length > 0 && (
                                    <div className="w-full flex">
                                        {metadata.metaFieldModelList.map((metafield, index, arr) => (
                                            <p key={index} className={`min-w-[30%] border-b bg-slate-50 text-center py-2 border-r flex justify-center items-center`}>
                                                {metafield.fieldName}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="tbody w-full flex justify-between ">
                                {metadata !== undefined && metadata.metaFieldModelList?.length > 0 && (
                                    <div className="w-full flex border-b ">
                                        {metadata?.metaFieldModelList.map((metafield, index) => (
                                            <p key={index} className={`min-w-[30%] text-center py-3 border-r flex justify-center items-center`}>
                                                {metafield.fieldValue}
                                            </p>

                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
                {console.log(metadata)}
                <div className="flex gap-2 my-7">
                    {!metadata?.functionMetadataDone &&
                        <>
                            {metadata?.metaFieldModelList.length > 1  && !isForwarded && metadata?.metadataAssignedToUserId === user.id &&
                                <EditMetaFields setMetadata={setMetadata} metadata={metadata} />
                            }
                            {console.log("user:", user, metadata?.metadataAssignedToUserId)}
                            {!isForwarded && metadata?.metadataAssignedToUserId === user.id &&
                                <ForwardMetadata
                                    usersArr={usersArr}
                                    openForwardFunction={openForwardFunction}
                                    metadata={metadata}
                                    setOpenForwardFunction={setOpenForwardFunction}
                                />
                            }
                            {!isForwarded && metadata?.metadataAssignedToUserId === user.id &&
                                <DoneMetadata taskId={taskId} metadata={metadata} setMetadata={setMetadata} />
                            }
                        </>
                    }
                    {/* <p>Marked by: {getFunctionMetadataFinishedByUser(metadata?.functionMetadataFinishedByUserId)}</p> */}
                </div>
            </div>
        </div>
    )
}

export default FunctionMetadataDetails