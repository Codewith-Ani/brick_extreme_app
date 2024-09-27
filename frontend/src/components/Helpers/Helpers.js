export const getPriceQueryParams = (searchParams, key, value) => {
	const hasValueinParam = searchParams.has(key);

	if (value && hasValueinParam) {
		searchParams.set(key, value);
	} else if (value) {
		searchParams.append(key, value);
	} else if (hasValueinParam) {
		searchParams.delete(key);
	}

	return searchParams;
};
