import { json } from '@remix-run/node';

export const loader = async () => {
	return json(
		{
			short_name: 'FoodLogger.ai',
			name: 'FoodLogger.ai',
			start_url: '/',
			display: 'standalone',
			background_color: '#d3d7dd',
			theme_color: '#c34138',
			shortcuts: [
				{
					name: 'Homepage',
					url: '/',
					// icons: [
					// 	{
					// 		src: '/icons/android-icon-96x96.png',
					// 		sizes: '96x96',
					// 		type: 'image/png',
					// 		purpose: 'any monochrome',
					// 	},
					// ],
				},
			],
			// icons: [
			// 	{
			// 		src: '/icons/icon-192x192.png',
			// 		sizes: '192x192',
			// 		type: 'image/png',
			// 	},
			// 	{
			// 		src: '/icons/icon-512x512.png',
			// 		sizes: '512x512',
			// 		type: 'image/png',
			// 	},
			// ],
		},
		{
			headers: {
				'Cache-Control': 'public, max-age=600',
				'Content-Type': 'application/manifest+json',
			},
		}
	);
};
