import { json } from '@remix-run/node';

export const loader = async () => {
	return json(
		{
			short_name: 'FoodLogger.ai',
			name: 'FoodLogger.ai',
			start_url: '/',
			display: 'standalone',
			background_color: '#181620',
			theme_color: '#A3C4BC',
			permissions: {
				'audio-capture': {
					description: 'Required to capture audio for food logging',
				},
			},
			// shortcuts: [
			// 	{
			// 		name: 'Homepage',
			// 		url: '/',
			// 		icons: [
			// 			{
			// 				src: '/imgs/foodlogger-favicon-128.png',
			// 				sizes: '128x128',
			// 				type: 'image/png',
			// 				purpose: 'any monochrome',
			// 			},
			// 		],
			// 	},
			// ],
			icons: [
				{
					src: '/imgs/foodlogger-favicon-128.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/imgs/foodlogger-favicon-128.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
		},
		{
			headers: {
				'Cache-Control': 'public, max-age=600',
				'Content-Type': 'application/manifest+json',
			},
		}
	);
};
