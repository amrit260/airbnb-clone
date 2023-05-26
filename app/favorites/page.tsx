

import React from 'react';
import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import ListingsCategory from '../components/listings/ListingCategory';
import FavoriteClient from './FavoriteClient';

const FavoritePage = async () => {
    const currentUser = await getCurrentUser()
    const favorites = await getFavoriteListings()

    if (favorites.length === 0) {
        return (<EmptyState
            title="No favorites found"
            subtitle='Looks like you have no favorite listings '
        />);
    }

    return <FavoriteClient listings={favorites} currentUser={currentUser} />




};

export default FavoritePage;