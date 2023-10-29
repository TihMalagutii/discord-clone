"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from "@/components/ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"
import FileUpload from "@/components/file-upload"
import axios from "axios"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    }),
    description: z.string().min(1, {
        message: "Server description is required."
    })
})

const CreateServerModal = () => {

    const { isOpen, onClose, type } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === "createServer"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
            description: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        try {

            await axios.post("/api/servers", values)

            form.reset()
            router.refresh()
            onClose()

        } catch (error) { console.log(error) }

    }

    const handleClose = () => {
        form.reset()
        onClose()
    }

    return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">

            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    Create your server
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Give your server a personality with a name and an image. You can always change it later.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center text-center">
                            
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload 
                                                endpoint="serverImage"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </div>

                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel 
                                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                    >
                                        Server name
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring0 text-black focus-visible:ring-offset-0"
                                            placeholder="Enter server name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel 
                                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                    >
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            maxLength={1000}
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring0 text-black focus-visible:ring-offset-0"
                                            placeholder="Enter server description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <Button variant="primary" disabled={isLoading}>
                            Create
                        </Button>
                    </DialogFooter>
                    
                </form>
            </Form>

        </DialogContent>
    </Dialog>
    )

}

export default CreateServerModal