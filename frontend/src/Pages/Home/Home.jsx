import React from 'react';
import Metadata from '../../components/Layout/Metadata/Metadata';
import Banner from '../../components/Banner/Banner';
import BestSelling from '../../components/BestSelling/BestSelling.jsx';
import InstagramFollowBanner from '../../components/InstagramFollowBanner/InstagramFollowBanner';
import LegoFuture from '../../components/LegoFuture/LegoFuture';
import FAQ from '../../components/FAQ/FAQ';
import LatestProducts from '../../components/LatestProducts/LatestProducts';
import { useSelector } from 'react-redux';

const Home = () => {
	return (
		<>
			<Metadata title={'Home- Buy best products online'} />
			<div>
				<Banner />
				<BestSelling />
				<LatestProducts />
				<InstagramFollowBanner />
				<LegoFuture />
				<FAQ />
			</div>
		</>
	);
};

export default Home;
