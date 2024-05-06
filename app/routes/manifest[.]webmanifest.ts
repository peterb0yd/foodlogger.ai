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
					src: '/imgs/foodlogger-favicon-64.png',
					sizes: '48x48',
					type: 'image/png',
				},
                {
                    src: '/imgs/foodlogger-favicon-128.png',
                    sizes: '72x72 96x96 128x128',
                    type: 'image/png',
                },
				{
					src: '/imgs/foodlogger-favicon-256.png',
					sizes: '256x256',
                    type: 'image/png',
				},
				{
					src: '/imgs/foodlogger-favicon.svg',
					sizes: '257x257',
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
