import * as esbuild from 'esbuild'
import vuePlugin from 'esbuild-plugin-vue3'

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [vuePlugin()],
  loader: { '.ts': 'ts' },
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV !== 'production',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  platform: 'browser',
})