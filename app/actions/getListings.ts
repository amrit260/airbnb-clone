import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: number;
    endDate?: number;
    locationValue?: string;
    category?: string;
}


const getListings = async (params: IListingsParams) => {
    try {

        const { userId, bathroomCount, roomCount, category, endDate, guestCount, locationValue, startDate } = params
        let query: any = {}

        if (userId) {
            query.userId = userId
        }
        if (category) {
            query.category = category
        }
        if (bathroomCount) {
            query.bathroomCount = { gte: +bathroomCount }
        }
        if (roomCount) {
            query.roomCount = { gte: +roomCount }
        }

        if (guestCount) {
            query.guestCount = { gte: +guestCount }
        }
        if (locationValue) {
            query.locationValue = locationValue
        }
        if (startDate && endDate) {
            query.NOT = {
                Reservation: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }

                        ]
                    }
                }
            }
        }



        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: query
        })




        return listings

    }
    catch (error: any) {
        throw new Error(error)
    }
}

export default getListings