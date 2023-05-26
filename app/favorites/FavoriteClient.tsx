import { Listing } from "@prisma/client";
import { SafeUser } from "../types";
import Container from "../components/container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoriteClientProps {
    listings: Listing[],
    currentUser: SafeUser | null
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({ listings, currentUser }) => {
    return (
        <Container>
            <Heading title='My favorites' subtitle="List of your favorite places" />
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
                    listings.map((listing) => {
                        return <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
                    })
                }

            </div>
        </Container>
    );
};

export default FavoriteClient;