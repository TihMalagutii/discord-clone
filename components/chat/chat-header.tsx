import { ChevronsRight, Hash } from "lucide-react"
import MobileToggle from "../mobile-toggle"

interface ChatHeaderProps {
    serverId: string
    name: string
    type: "channel" | "conversation"
    description?: string
    imageUrl?: string
}

const ChatHeader = ({
    serverId,
    name,
    type,
    description,
    imageUrl
}: ChatHeaderProps) => {



    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            
            <MobileToggle serverId={serverId} />

            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}

            <p className="font-semibold text-black dark:text-white">
                {name}
            </p>

            <ChevronsRight className="w-5 h-5 text-zinc-500 dark:text-zinc-400 ml-14" />

            <p className="font-semibold text-black dark:text-zinc-400">
                {description}
            </p>


        </div>
    )
}

export default ChatHeader