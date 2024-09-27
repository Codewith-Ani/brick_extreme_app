import React from 'react';
import NotFoundImage from '../../../assets/404.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<>
			<div className='row'>
				<div className='flex justify-center page-not-found-wrapper'>
					<img
						src={NotFoundImage}
						alt='Not Found'
						width={550}
						height={550}
					/>
				</div>
				<h5>
					Page Not Found. Go to <Link to='/'>Homepage</Link>
				</h5>
			</div>
		</>
	);
};

export default NotFound;
