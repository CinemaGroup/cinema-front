import type { Config } from 'tailwindcss'

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const config: Config = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			outfit: ['var(--font-outfit)'],
		},
		colors: {
			white: colors.white,
			black: colors.black,
			transparent: colors.transparent,
			yellow: {
				700: '#F5C521',
			},
			gray: {
				base: '#00031c',
				950: '#101215',
				900: '#191B1F',
				800: '#242529',
				700: '#39393f',
				600: '#66676E',
				500: 'rgba(255,255,255,.56)',
				300: 'rgba(255,255,255,.96)',
			},
			purple: {
				300: '#7b61ff',
			},
			red: {
				300: '#F31559',
			},
			green: {
				300: '#2EE89A',
			},
		},
		extend: {
			spacing: {
				0.5: '0.12rem',
				layout: '2.75rem',
			},
			fontSize: {
				'extra-small': '10px',
				small: '12px',
				smaller: '14px',
				base: '16px',
				medium: '18px',
				lg: '20px',
				'2lg': '22px',
				'3lg': '24px',
				'4lg': '26px',
				'5lg': '28px',
				'6lg': '30px',
				'7lg': '32px',
				'8lg': '34px',
				'9lg': '36px',
				big: '67px',
			},
			borderRadius: {
				'extra-small': '5px',
				small: '10px',
				medium: '15px',
				big: '20px',
				'extra-big': '25px',
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out',
			},
			transitionDuration: {
				DEFAULT: '300ms',
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
			},
			keyframes: {
				hide: {
					from: { opacity: '1' },
					to: { opacity: '0' },
				},
				fade: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				scaleIn: {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)',
					},
					'50%': {
						opacity: '0.3',
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
					},
				},
			},
			animation: {
				hide: 'hide .5s ease-in-out forwards',
				fade: 'fade .5s ease-in-out forwards',
				scaleIn: 'scaleIn .35s ease-in-out forwards',
			},
		},
	},
	plugins: [
		plugin(
			({
				addComponents,
				theme,
				addUtilities,
			}: {
				addUtilities: Function
				addComponents: Function
				theme: Function
			}) => {
				addComponents({
					'.gradient': {
						background:
							'linear-gradient(26.57deg,#3c1a70 0%,rgba(93,14,245,.65))',
					},

					'.btn-primary': {
						background:
							'linear-gradient(248.28deg, #9e61ff 10%, rgba(142, 97, 255, 0) 33%), radial-gradient(82% 278% at -17% -92%, #619bff 29%, rgba(205, 219, 248, 0) 70%), #6c52ee',
						color: '#fff',
						fontWeight: 700,
						borderRadius: '10px',
						'&:hover': {
							boxShadow: '0 15px 40px -8px rgba(158,97,255,.8)',
							transform: 'translateY(-3px)',
						},
					},

					'.btn': {
						background:
							'linear-gradient(248.28deg, #9e61ff 10%, rgba(142, 97, 255, 0) 33%), radial-gradient(82% 278% at -17% -92%, #619bff 29%, rgba(205, 219, 248, 0) 70%), #6c52ee',
						color: '#fff',
						fontWeight: 700,
						borderRadius: '10px',
						'&:hover': {
							boxShadow: '0 8px 15px -8px rgba(158,97,255,.5)',
							transform: 'translateY(-3px)',
						},
					},
				})

				addUtilities({
					'.outline-border-none': {
						outline: 'none',
						border: 'none',
					},

					'.flex-center-between': {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					},

					'.image-like-bg': {
						width: '100%',
						height: '100%',
						objectPosition: 'center',
						objectFit: 'cover',
						pointerEvents: 'none',
					},
				})
			}
		),
	],
}
export default config
