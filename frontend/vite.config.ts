import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(),EnvironmentPlugin('all')],
	define: {
		'process.env': {
			VITE_API_URL:'http://localhost:5050/api/',
			VITE_API_AUTHENTICATION_URL:'http://localhost:5050/api/',
			VITE_API_CONTACTS_URL:'http://localhost:5051/api/',
			VITE_API_MESSAGER:'http://localhost:5055'
		}
	},
	resolve: {
		alias: {
			'@public': '/public',
			'@domain': '/src/domain',
			'@aplication': '/src/aplication',
			'@infra': '/src/infra',
			'@main': '/src/main',
			'@presentation': '/src/presentation',
			'@shared': '/src/shared',
		},
	},
})