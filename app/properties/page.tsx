import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import PropertyClient from "./PropertyClient";

const PropertyPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login"
        />
    }

    const properties = await getListings({
        userId: currentUser.id
    })

    if (properties.length === 0) {
        return <EmptyState title="No Property found" subtitle="Looks like you havent registered any Property," />
    }

    return (
        <PropertyClient
            properties={properties}
            currentUser={currentUser}
        />
    );
};

export default PropertyPage;