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


interface PropertyClientProps {
    properties: Listing[],
    currentUser: SafeUser
}

const PropertyClient: React.FC<PropertyClientProps> = ({ properties, currentUser }) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`).then(() => {
            toast.success('Property removed')
            router.refresh()
        }).catch((err) => {
            toast.error(err.response?.data?.message || 'failed to delete property')
        }).finally(() => {
            setDeletingId('');
        })
    }, [router])

    return (
        <Container>
            <Heading title="Properties" subtitle="Your properties ~~~~~~~~~" />
            <div className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-col-3
        lg:grid-col-4
        gap-8">
                {
                    properties.map((property) => {
                        return (<ListingCard
                            key={property.id}
                            data={property}
                            actionId={property.id}
                            onAction={onCancel}
                            disabled={deletingId === property.id}
                            actionLabel="remove property"
                            currentUser={currentUser}

                        />
                        )
                    })
                }
            </div>
        </Container>
    );
};

export default PropertyClient;