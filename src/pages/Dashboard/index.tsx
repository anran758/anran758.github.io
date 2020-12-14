import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

import { Empty, Card } from '@/components';
import { List as SkeletonList } from '@/components/Skeleton/List';
import conf from 'Config/site';

import { Posts, OptionItem } from './components/Posts';

import styles from './index.less';

const DATA_SIZE = 12;

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
    link: 'https://tinypng.com/',
    linkText: 'tinypng | 图片压缩',
  },
  {
    link: 'https://regexper.com/',
    linkText: 'regexper | 正则可视化',
  },
  {
    link: 'http://jeremyckahn.github.io/stylie/',
    linkText: '贝塞尔曲线可视化',
  },
  {
    link: 'https://designer.mocky.io/',
    linkText: 'Mocky - 数据 mock',
  },
  {
    link: 'http://jsonplaceholder.typicode.com/',
    linkText: 'JSONPlaceholder - Fake online REST API for developers',
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
      <Card title="最近文章">
        <SkeletonList loading={loading} size={DATA_SIZE}>
          {!errorMsg ? (
            <Posts options={latestPosts} />
          ) : (
            <Empty.EmptyCard text={errorMsg} />
          )}
        </SkeletonList>
      </Card>

      <section className={styles.column}>
        <Card title="推荐阅读">
          <Posts options={recommendList} />
        </Card>
        <Card title="在线工具">
          <Posts options={toolsList} />
        </Card>
      </section>

      <Card style={{ height: 300 }}>
        <Empty.WorkingCard />
      </Card>
    </section>
  );
};

export default Dashboard;
