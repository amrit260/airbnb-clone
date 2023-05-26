import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { list } from "postcss";
import { toast } from "react-hot-toast";



interface IUseFavourite {
    listingId: string,
    currentUser?: SafeUser | null;
}

const useFavourite = ({
    listingId,
    currentUser
}: IUseFavourite) => {


    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favouriteIds || []

        return list.includes(listingId)
    }, [listingId, currentUser?.favouriteIds])

    const toggleFavourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favourites/${listingId}`)
            }
            else {
                request = () => axios.post(`/api/favourites/${listingId}`)
            }
            await request()
            router.refresh()
            toast.success('success')

        }
        catch (error) {
            toast.error('Something went wrong')
        }



    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavourite,

    }
}

export default useFavourite