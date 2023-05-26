import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }
        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds || [])]
                }
            }
        })

        return favorites


    } catch (error) {
        throw new Error('failed to get favourites')
    }
}