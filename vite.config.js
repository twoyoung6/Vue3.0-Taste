const path = require('path')
import vue from '@vitejs/plugin-vue' // vite 2.0 升级操作
// vite.config.js # or vite.config.ts

module.exports = {
<<<<<<< HEAD
  plugins: [vue()],
=======
  alias: {
    // 键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, 'src'),
  },
>>>>>>> e2e97612ef429ed9d77ff25bfa06eeb3c78086fa
  hostname: 'localhost',
  port: 6060,
  // 是否自动在浏览器打开
  open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: './',
  assetsDir: "",
  build: {
    /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
    outDir: 'dist',
    // 剥离vue外部引入
    rollupOptions: {
      external: {
        vue: 'Vue'
      }
    }
  },
  // 反向代理
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
<<<<<<< HEAD
      rewrite: path => path.replace(/^\/api/, '')
    }
  },
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      '@': path.resolve(__dirname, './src')
    },
  },
}
=======
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
>>>>>>> e2e97612ef429ed9d77ff25bfa06eeb3c78086fa
