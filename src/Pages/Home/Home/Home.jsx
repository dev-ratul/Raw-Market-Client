import React from 'react';
import { motion } from 'framer-motion';
import Banner from '../Banner/Banner';
import HomeProductSec from '../HomeProductSec/HomeProductSec';
import HomeAdvertisement from '../HomeAdvertisement/HomeAdvertisement';
import MarketTips from '../MarketTips/MarketTips';
import HomeSpecialOffer from '../HomeSpecialOffer/HomeSpecialOffer';
import AllReviewSec from '../reviewSection/AllReviewSec';
import OurPartner from '../OurPartner/OurPartner';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const Home = () => {
  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key="banner"
      >
        <Banner />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        key="product-section"
      >
        <HomeProductSec />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        key="advertisement"
      >
        <HomeAdvertisement />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        key="advertisement"
      >
        <HomeSpecialOffer></HomeSpecialOffer>
      </motion.div>

      

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        key="advertisement"
      >
        <OurPartner></OurPartner>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        key="advertisement"
      >
        <MarketTips></MarketTips>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        key="advertisement"
      >
        <AllReviewSec></AllReviewSec>
      </motion.div>


      
    </div>
  );
};

export default Home;
