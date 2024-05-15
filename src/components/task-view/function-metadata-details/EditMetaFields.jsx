import { updateMetafield } from "@/app/apis/metafieldApis"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { DialogClose } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"

const EditMetaFields = ({ setMetadata, metadata }) => {
    const { toast } = useToast();

    useEffect(() => { console.log(metadata) }, [metadata])

    const handleEditMetafield = (e) => {
        const { name, value } = e.target;
        console.log("name, value:", name, value)
        const newMetadata = { ...metadata }
        let newMetaFieldModelList = [...newMetadata.metaFieldModelList];

        newMetaFieldModelList = newMetaFieldModelList.map((metafield) => {
            if (metafield.fieldName === name) {
                return { ...metafield, fieldValue: value }; // Update fieldValue
            }
            return metafield;
        });
        console.log("newMetaFieldModelList:", newMetaFieldModelList);
        newMetadata.metaFieldModelList = newMetaFieldModelList
        console.log("newMetadata:", newMetadata);
        setMetadata(newMetadata);
    }

    const handleMetafieldSave = async (e) => {
        e.preventDefault();
        for (let i = 0; i < metadata.metaFieldModelList.length; i++) {
            const { data, error } = await updateMetafield(metadata.metaFieldModelList[i]);
            console.log("metafield save:", data);
        }
        toast({
            title: `Metafield Saved`,
            description: getFormattedDate(new Date()),
            variant: "success",
            color: "green"
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">Edit Metafields</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
                
                    <DialogHeader>
                        <DialogTitle>Edit Metafield</DialogTitle>
                        <DialogDescription>
                            Make changes to the metafields here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 px-2 h-[300px] overflow-y-auto">
                        {metadata !== undefined && metadata.metaFieldModelList?.length > 0 && (
                            <div className="w-full border-b ">
                                {metadata?.metaFieldModelList.map((metafield, index) => (
                                    <div key={index} className="grid grid-co ls-4 items-center gap-3 my-3 py-2">
                                        <Label htmlFor={metafield.fieldName} className="text-righ t">
                                            {metafield.fieldName}
                                        </Label>
                                        <Input value={metafield.fieldValue} onChange={handleEditMetafield} name={metafield.fieldName} className="col-span-3" />
                                    </div>

                                ))}
                            </div>
                        )}
                    </div>
                    <DialogClose asChild>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleMetafieldSave} >Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default EditMetaFields