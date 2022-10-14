import React, { FC, memo, useEffect, useState } from 'react';
import Parser from 'rss-parser';

import { Empty, Card } from '@/components';
import { List as SkeletonList } from '@/components/Skeleton/List';
import conf from 'Config/site';

import { Posts, OptionItem } from './components/Posts';

import styles from './index.less';

const DATA_SIZE = 10;

const recommendList = [
  {
    link:
      'https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b',
    linkText: 'Introducing npx: an npm package runner | npx 简介',
  },
  {
    link: 'https://usehooks.com/',
    linkText: 'usehooks | React Hooks 封装示例',
  },
  {
    link: 'https://missing-semester-cn.github.io/',
    linkText:
      'The Missing Semester of Your CS Education (中译版) | 计算机教育中缺失的一课 | MIT',
    tipsText: 'The Missing Semester of Your CS Education (中译版) | MIT',
  },
];

const animationList = [
  {
    link: 'https://csstriggers.com/',
    linkText: 'CSS triggers | CSS 属性触发的回流与重绘参照表',
  },
  {
    link: 'http://jeremyckahn.github.io/stylie/',
    linkText: 'stylie, web animation tool | web 动画工具',
  },
  {
    link: 'https://easings.net/cn',
    linkText: '缓动函数速查表',
  },
  {
    link: 'https://cubic-bezier.com/',
    linkText: '贝塞尔曲线可视化',
  },
];



const toolsList = [
  {
    link: 'https://cli.im/',
    linkText: '草料二维码',
  },
  {
    link: 'http://tool.oschina.net/encrypt?type=3',
    linkText: 'Base64 在线加解密',
  },
  {
    link: 'https://regexper.com/',
    linkText: 'regexper - 正则可视化',
  },
  {
    link: 'https://designer.mocky.io/',
    linkText: 'Mocky - API 数据 mock',
  },
  {
    link: 'http://jsonplaceholder.typicode.com/',
    linkText: 'JSONPlaceholder - 面向开发者的 Fake online REST API',
  },
  {
    link: 'http://jsonplaceholder.typicode.com/',
    linkText: 'tldr - 命令行中的命令使用示例',
  },
  {
    link: 'https://ts-ast-viewer.com/#',
    linkText: 'TypeScript AST Viewer - 根据 TypeScript 代码生成对应的抽象语法树',
  },
  {
    link: 'https://carbon.now.sh/',
    linkText: 'carbon - 创建和源代码的精美图像',
  },
  {
    link: 'http://suo.im/',
    linkText: '网址缩短 - 缩我',
  },
];

const imageToolsList = [
  {
    link: 'https://tinypng.com/',
    linkText: '图片压缩 - tinypng',
  },
  {
    link: 'https://www.iloveimg.com/zh-cn/resize-image/resize-png#resize-options,pixels',
    linkText: '图片裁剪 - iloveimg',
  },
  {
    link: 'https://convertio.co/zh/png-converter/',
    linkText: '图片转换 - PNG 转换器',
  },
  {
    link: 'https://png2jpg.com/zh/',
    linkText: '图片转换 - PNG to JPG',
  },
  {
    link: 'https://c.runoob.com/front-end/59/',
    linkText: '图片转换 - 图片转为 Base64 编码',
  },
  {
    link: 'https://www.iconfont.cn/',
    linkText: 'Iconfont - 阿里巴巴矢量图标库',
  },
  {
    link: 'https://favicon.io/favicon-generator/',
    linkText: 'favicon - 可根据配置生成你想要的网站 favicon',
  },
  {
    link: 'https://loading.io/',
    linkText: 'loading - 配置化生成 loading',
  },
];

const designToolsList = [
  {
    link: 'https://www.checklist.design/',
    linkText: 'Checklist Design - 最佳设计实践的集合',
  },
  {
    link: 'https://dribbble.com/shots/popular/animation',
    linkText: 'dribbble - 用于展示设计师制作的艺术作品的线上社群',
  },
  {
    link: 'https://www.pinterest.com/ideas/',
    linkText: 'pinterest - 图片分享类的社交网站',
  },
  {
    link: 'https://onepagelove.com/',
    linkText: 'onepagelove - 单页网站模板与设计',
  },
  {
    link: 'https://uigradients.com/',
    linkText: 'uigradients - UI 渐变色参考示例',
  },
  {
    link: 'http://zhongguose.com/#shenqianniuzi',
    linkText: '中国色 - 中国传统颜色参考',
  },
  {
    link: 'https://unsplash.com/',
    linkText: 'unsplash - 免费的高清图片',
  },
];


/**
 * 获取博客 RSS 数据
 */
const fetchRSS = async (limit?: number) => {
  const parser = new Parser();
  const { items = [] } = await parser.parseURL(conf.blogRSS);

  const result = items.map((item) => ({
    link: item.link || '',
    linkText: item.title || '',
    date: item.isoDate,
  }));

  if (limit) {
    return result.slice(0, limit);
  }

  return result;
};

const Column: FC = memo((props) => {
  return <section className={styles.column}>{props.children}</section>;
});

/**
 * 数据预览页
 */
const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [latestPosts, setLatestPosts] = useState<OptionItem[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchRSS(DATA_SIZE)
      .finally(() => {
        setLoading(false);
      })
      .then((list) => {
        console.log('RSS list: ', list);
        setLatestPosts(list);
        setErrorMsg(null);
      })
      .catch((err) => {
        console.log('fetch rss error: ', err);
        setErrorMsg('获取 RSS 数据失败');
      });
  }, []);

  return (
    <section className={styles.container}>
      <Card
        title="最近文章"
        extra={
          <a
            href="https://anran758.github.io/blog/archives/"
            target="https://anran758.github.io/blog/archives/"
          >
            全部
          </a>
        }
      >
        <SkeletonList loading={loading} size={DATA_SIZE}>
          {!errorMsg ? (
            <Posts options={latestPosts} />
          ) : (
            <Empty.EmptyCard text={errorMsg} />
          )}
        </SkeletonList>
      </Card>

      <Column>
        <Card title="推荐阅读">
          <Posts options={recommendList} />
        </Card>
        <Card title="CSS / Animation">
          <Posts options={animationList} />
        </Card>
      </Column>

      <Card title="在线工具">
        <Posts options={toolsList} />
      </Card>

      <Card title="图片处理">
        <Posts options={imageToolsList} />
      </Card>

      <Card title="设计元素">
        <Posts options={designToolsList} />
      </Card>

      <Column>
        <Card style={{ minHeight: 300 }}>
          <Empty.WorkingCard />
        </Card>
      </Column>
    </section>
  );
};

export default Dashboard;
