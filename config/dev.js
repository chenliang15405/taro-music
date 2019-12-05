// 需要把 package.json 中 scripts 的 "dev:h5": "..." 改成：
// "dev:h5": "CLIENT_ENV=h5 npm run build:h5 -- --watch"
// 那里增加的变量会注入到环境变量中
const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"http://localhost:8082"'
//TypeError: Cannot read property 'split' of null

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST
  },
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
}
