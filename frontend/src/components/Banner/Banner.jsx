import React from 'react';
import Slider from 'react-slick'; // Import the Slider component from react-slick
import images from './BannerImages'; // Import images from the images.js file
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme CSS

const Banner = () => {
	// Slider settings for React Slick
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
	};

	return (
		<div className='relative w-full'>
			<Slider {...settings}>
				{images.map((image, index) => (
					<div
						key={index}
						className='w-full h-[75vh]'
					>
						<img
							src={image}
							alt={`Banner ${index + 1}`}
							className='w-full h-full object-fill'
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Banner;
