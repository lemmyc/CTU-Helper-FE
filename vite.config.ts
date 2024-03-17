import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

const baseUrl = process.env.BASE_URL || '/tvts';

export default defineConfig({
  plugins: [react()],
  base: baseUrl,
})