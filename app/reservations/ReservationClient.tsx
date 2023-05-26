'use client'

import { useRouter } from "next/navigation";
import Container from "../components/container";
import Heading from "../components/Heading";
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "../types";
import { useCallback, useState } from "react";
import { id } from "date-fns/locale";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

type ReservationWithListings = Reservation & { listing: Listing }

interface ReservationClientProps {
    reservations: ReservationWithListings[],
    currentUser?: SafeUser
}

const ReservationClient: React.FC<ReservationClientProps> = ({ reservations, currentUser }) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success('Reservation cancelled')
            router.refresh()
        }).catch(() => {
            toast.error('something went wrong')
        }).finally(() => {
            setDeletingId('');
        })

    }, [router])

    return (
        <Container>
            <Heading title='Reservations' subtitle="Bookings on your properties" />

            <div
                className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-8"
            >
                {
                    reservations.map((reservation) => {
                        return (<ListingCard key={reservation.id} reservation={reservation} data={reservation.listing} currentUser={currentUser} disabled={deletingId === reservation.id} onAction={onCancel} actionId={reservation.id} actionLabel="Cancle reservation" />)
                    })
                }
            </div>

        </Container>
    );
};

export default ReservationClient;