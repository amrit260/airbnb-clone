import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import ListingClient from "./ListingClient"
import { categories } from "@/app/components/navbar/Categories"
import { useMemo } from "react"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getReservations from "@/app/actions/getReservations"
import { Listing, User } from "@prisma/client"


interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const currentUser = await getCurrentUser()
    const listing = await getListingById({ listingId: params.listingId })
    const reservations = await getReservations(params)
    if (!listing) {
        return (
            <EmptyState />
        )
    }


    return (
        <div>
            <ListingClient
                listing={listing as (Listing & { user: User })}
                key={listing.id}
                currentUser={currentUser}
                reservations={reservations}
            />
        </div>
    )
}

export default ListingPage