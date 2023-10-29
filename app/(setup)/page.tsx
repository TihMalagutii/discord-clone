import NavigationSidebar from "@/components/navigation/navigation-sidebar"
import ProfilePage from "@/components/profile-page"
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation"

export default async function SetupPage() {

    const profile = await initialProfile()

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(server) {
        return redirect(`/servers/${server.id}`)
    }

  return (
    <>
        <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">

            <NavigationSidebar />

        </div>

        <div className="flex h-full z-10 flex-col fixed inset-y-0 md:pl-[72px]">
            <ProfilePage />
        </div>
    </>
  )

}
