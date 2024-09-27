import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './CustomPagination.css';

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
	const [currentPage, setCurrentPage] = useState();
	let [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const page = Number(searchParams.get('page')) || 1;

	useEffect(() => {
		setCurrentPage(page);
	}, [page]);

	const setCurrentPageNumber = (pageNumber) => {
		setCurrentPage(pageNumber);

		if (searchParams.has('page')) {
			searchParams.set('page', pageNumber);
		} else {
			searchParams.append('page', pageNumber);
		}
		const path = window.location.pathname + '?' + searchParams.toString();
		navigate(path);
	};
	return (
		<div className=''>
			{filteredProductsCount > resPerPage && (
				<div className='my-4 flex flex-col items-center'>
					<Pagination
						activePage={currentPage}
						itemsCountPerPage={resPerPage}
						totalItemsCount={filteredProductsCount}
						onChange={setCurrentPageNumber}
						nextPageText={'Next'}
						prevPageText={'Prev'}
						firstPageText={'First'}
						lastPageText={'Last'}
						itemClass='page-item'
						linkClass='page-link'
					/>
				</div>
			)}
		</div>
	);
};

export default CustomPagination;
