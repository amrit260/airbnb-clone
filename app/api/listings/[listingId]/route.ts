import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"

interface IParams {
    listingId?: string
}

export const DELETE = async (requerst: Request, { params }: { params: IParams }) => {
    try {


        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.error()
        }

        const { listingId } = params

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid ID')
        }

        const listing = await prisma?.listing.deleteMany({
            where: {
                id: listingId,
                userId: currentUser.id
            }
        })

        return NextResponse.json(listing)
    }
    catch (error) {
        throw new Error('this is an error')
    }

}