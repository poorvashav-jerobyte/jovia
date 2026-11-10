
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Allow the frontend build to use the existing
  // non-VITE environment variable names.
  // Only the URL and publishable key are exposed.
  // Never expose SUPABASE_SECRET_KEY here.

  const supabaseUrl =
    env.SUPABASE_URL ||
    env.VITE_SUPABASE_URL ||
    "";

  const supabasePublishableKey =
    env.SUPABASE_PUBLISHABLE_KEY ||
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    "";

  return {
    plugins: [react()],

    define: {
      "import.meta.env.VITE_SUPABASE_URL":
        JSON.stringify(supabaseUrl),

      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY":
        JSON.stringify(supabasePublishableKey),
    },

    server: {
      host: "0.0.0.0",
      port: 5175,
      strictPort: true,

      proxy: {
        "/api": {
          target: "http://localhost:4001",
          changeOrigin: true,
        },
      },
    },
  };
});
