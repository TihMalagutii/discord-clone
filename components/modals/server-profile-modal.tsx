"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { ServerWithMembersWithProfiles } from "@/types"
import { ScrollArea } from "../ui/scroll-area"
import UserAvatar from "../user-avatar"
import { ShieldAlert, ShieldCheck } from "lucide-react"
import Image from "next/image"

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
}

const ServerProfileModal = () => {

    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "serverProfile"
    const { server } = data as { server: ServerWithMembersWithProfiles }

    return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black overflow-hidden">

            <DialogHeader className="pt-8 px-6">
                <div className="flex justify-center">
                    <Image
                        className="rounded-full h-[64px] w-[64px]"
                        src={server?.imageUrl}
                        alt="Channel"
                        width={64}
                        height={64}
                    />
                </div>
                <DialogTitle className="text-2xl text-center font-bold">
                    <span className="text-indigo-500">{server?.name}</span> profile
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    <div><i>{formatData(server?.createdAt)}</i></div>
                    <div>{membersCount(server?.members)}</div>
                </DialogDescription>
            </DialogHeader>
            
            <div className="flex justify-center">
                {server?.description}
            </div>

            <ScrollArea className="mt-8 max-h-[420px] pr-6">
                {server?.members?.map((member) => (
                    <div key={member.id} className="flex items-center gap-x-2 mb-6">

                        <UserAvatar src={member.profile.imageUrl} />
                        <div className="flex flex-col gap-y-1">
                            <div className="font-semibold flex items-center gap-x-1">
                                {member.profile.name}
                                {roleIconMap[member.role]}
                            </div>
                        </div>

                    </div>
                ))}
            </ScrollArea>

        </DialogContent>
    </Dialog>
    )

}

export default ServerProfileModal

function formatData(date: Date | null): string{

    if(date instanceof Date){

        const month = `${date.getMonth()}`.padStart(2, '0')
        const year = `${date.getFullYear()}`

        return [
            'Created at',
            ' ',
            month,
            '/',
            year
        ].join('')

    }

    return ''
    
}

function membersCount(members: unknown[] | null) {

    if(Array.isArray(members)){

        const count = members.length
        const isPlural = count !== 1

        return [
            count,
            ' ',
            isPlural ? 'Members' : 'Member'
        ].join('')
    }

    return ''
}