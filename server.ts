import express from 'express';
import config from './build/webpack/webpack.prod';

const app = express();
const PORT = 8001;

// 将dist作为静态资源入口
app.use(express.static(config?.output?.path || '8001'));

// 监听端口
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(
    `Server is running at http://localhost:${PORT} . Press Ctrl+C to stop.\n`
  );
});
