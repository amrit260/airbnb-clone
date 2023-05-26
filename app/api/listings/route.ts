import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await req.json()
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error()
        }
    })
    console.log({
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    })

    const listing = await prisma?.listing.create({
        data: {
            title,
            description,
            bathroomCount,
            imageSrc,
            guestCount,
            category,
            locationValue: location.value,
            price: parseInt(price, 10),
            roomCount,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)

}