import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: (params) => ({
				url: '/products',
				params: {
					page: params?.page,
					keyword: params?.keyword,
					'price[gte]': params?.min,
					'price[lte]': params?.max,
					category: params?.category,
				},
			}),
		}),
		getProductsDetails: builder.query({
			query: (id) => `/product/${id}`,
		}),
		getLatestProducts: builder.query({
			query: () => ({
				url: '/products',
				params: {
					category: 'Latest',
				},
			}),
		}),
		getBestSellerProducts: builder.query({
			query: () => ({
				url: '/products',
				params: {
					category: 'BestSeller',
				},
			}),
		}),
		getCategories: builder.query({
			query: () => '/products/categories',
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductsDetailsQuery,
	useGetLatestProductsQuery,
	useGetBestSellerProductsQuery,
	useGetCategoriesQuery,
} = productApi;
