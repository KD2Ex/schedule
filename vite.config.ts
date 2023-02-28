import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import {VitePluginFonts} from "vite-plugin-fonts";

export default defineConfig({
  plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      VitePluginFonts({
        google: {
          families: ['Nunito Sans','Nunito', 'Noto Sans', 'Source Sans Pro', 'Raleway', 'Work Sans', 'M PLUS 1p', 'Mulish', 'Overpass', 'Manrope', 'Roboto Mono',
          'Open Sans']
        }
      })
  ],
  server: {
    host: true,
  }
});