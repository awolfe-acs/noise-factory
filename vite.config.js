import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/noise-factory/" : "/",
  build: {
    cssCodeSplit: false,
  },
  plugins: [
    {
      name: "html-transform-preload",
      transformIndexHtml(html, ctx) {
        // ✅ Only run this during the build process
        if (!ctx || !ctx.bundle) return html;

        const cssFile = Object.keys(ctx.bundle).find((key) =>
          key.endsWith(".css")
        );
        const jsFile = Object.keys(ctx.bundle).find((key) =>
          key.endsWith(".js")
        );

        return html.replace(
          "</head>",
          `
            ${
              cssFile
                ? `<link rel="preload" href="/noise-factory/assets/${cssFile}" as="style">`
                : ""
            }
            ${
              jsFile
                ? `<link rel="preload" href="/noise-factory/assets/${jsFile}" as="script">`
                : ""
            }
          </head>`
        );
      },
    },
  ],
}));
