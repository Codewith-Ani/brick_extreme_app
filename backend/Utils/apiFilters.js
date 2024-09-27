class APIFilters {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	// SEARCH PRODUCT

	search() {
		/* console.log('Query:', this.query);
		console.log('Query String ', this.queryStr);
		*/
		const keyword = this.queryStr.keyword
			? {
					name: {
						$regex: this.queryStr.keyword,
						$options: 'i',
					},
			  }
			: {};
		this.query = this.query.find({ ...keyword });
		return this;
	}

	// FILTER

	filter() {
		const queryCopy = { ...this.queryStr };
		const fieldToRemove = ['keyword', 'page'];

		fieldToRemove.forEach((element) => delete queryCopy[element]);

		//APPLYING ADVANCED FILTERS FOR PRICE, RATING, ETC

		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(
			/\b(gt|gte|lt|lte)\b/g,
			(match) => `$${match}`
		);
		/* 
		console.log(
			'----------------------------------------------------------------'
		);
		console.log('Query String:', queryStr);
		console.log(
			'----------------------------------------------------------------'
		); */

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	// PAGINATION

	pagination(resultPerPage) {
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = resultPerPage * (currentPage - 1);

		this.query = this.query.limit(resultPerPage).skip(skip);
		return this;
	}
}

export default APIFilters;
