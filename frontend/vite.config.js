import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8000/api",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  // ...
});
