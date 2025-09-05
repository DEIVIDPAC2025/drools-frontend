import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
       // 🔹 cualquier request que empiece con /app va a tu backend
      "/app": {
                target: "http://dev0.sii.cl:8089/",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/app/, "/iva-impuestos-descuentos-drools-cover-cloud-ms/"),
            },
    }
  }
})

