import React from 'react';
import Banner from '../Banner/Banner';
import HomeProductSec from '../HomeProductSec/HomeProductSec';
import HomeAdvertisement from '../HomeAdvertisement/HomeAdvertisement';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeProductSec></HomeProductSec>
            <HomeAdvertisement></HomeAdvertisement>
        </div>
    );
};

export default Home;