/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
		environment: "jsdom",
	}
  // test: {
	// 	globals: true,
	// 	environment: "node",
	// 	testTimeout: 60000,
	// 	deps: {
	// 		moduleDirectories: ["node_modules", resolve("../..")],
	// 	},
	// },
})
