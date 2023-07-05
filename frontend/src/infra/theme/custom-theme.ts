import {extendTheme} from '@chakra-ui/react'
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

export const customtheme = extendTheme({
	fonts: {
		heading: 'Roboto',
		body: 'Roboto',
	},
	fontWeights: {
		thin: 100,
		light: 300,
		normal: 400,
		medium: 500,
		bold: 700,
		black: 900
	},
	components:{
		FormLabel: {
			baseStyle: {
				fontWeight: 'normal',
				color:'#3D3D3D'
			},
			variants:{
				'flex-b':{
					display:'flex',
					justifyContent:'space-between'
				}
			}
		},
		Button:{
			variants: {
				default: {
					bg:'#059183',
					color:'#FAFCFF',
				},
				icon:{
					color:'#011640'
				},
				transparent:{
					fontWeight: 'bold',
					fontSize:18,
					color:'#00B2A0',
					outline: 'none',
					_hover: {
						bg: 'transparent',
						color: '#10DDCA', 
						borderColor: 'transparent',
					},
					_focus: {
						outline: 'none',
					},
					padding:'0px'
				},
				forgotPassword:{
					fontWeight: 'bold',
					fontSize:15,
					color:'#00B2A0',
					outline: 'none',
					_hover: {
						bg: 'transparent',
						color: '#10DDCA', 
						borderColor: 'transparent',
					},
					_focus: {
						outline: 'none',
					},
					padding:'0px'
				}
			}
		},
		Heading:{
			variants:{
				h1: {
					//color:'#01403A',
					fontWeight: 'medium'
				},
				h2: {
					fontWeight: 'normal',
				},
				h3: {color:'#2B9DF4'}
			}
		},
		Text:{
			variants:{
				sub: {color:'#025959'},
				error: {color:'#DE5110'},
				medium: {
					fontWeight: 'normal',
					color:'#3D3D3D'
				}
				
			}
		},
		Input: {
			baseStyle: {
				outline: 'none',
				borderColor: 'transparent',
				field: {
					_hover: {
						color: '#3D3D3D', 
						borderColor: 'transparent',
					},
				}
			},
		},
		
	}
})