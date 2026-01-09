import path from 'path';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createServer } from 'vite';

const __dirname = fileURLToPath(new URL('..', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

void (async () => {
  const server = await createServer({
    base: '/',
    publicDir: resolvePath('dev/public'),
    server: {
      port: 6100,
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': resolvePath('dev'),
        '~~': resolvePath('packages'),
        '~': resolvePath('packages/Editor')
      }
    },
    plugins: [vue(), vueJsx()],
    css: {
      modules: {
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  });

  await server.listen();

  server.printUrls();
})();
