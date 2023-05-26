'use client'
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "../types";
import Container from "../components/container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

type ReservationWithListing = Reservation & { listing: Listing }

interface TripsClientProps {
    reservations: ReservationWithListing[],
    currentUser: SafeUser
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success('trip removed successfully')
            router.refresh()
        }).catch((err) => {
            toast.error(err.response?.data?.message || 'failed to cancel reservation')
        }).finally(() => {
            setDeletingId('');
        })
    }, [])

    return (
        <Container>
            <Heading title="Trips" subtitle="Where you've been and where you're going" />
            <div className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-col-3
        lg:grid-col-4
        gap-8">
                {
                    reservations.map((reservation) => {
                        return (<ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancle reservation"
                            currentUser={currentUser}

                        />
                        )
                    })
                }
            </div>
        </Container>
    );
};

export default TripsClient;