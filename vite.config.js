import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    base: "/FiveWeaponsHomepage/",
    plugins: [vue()],
    test: {
        environment: "jsdom"
    }
});
