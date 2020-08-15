import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

import { Empty, Row, Card } from '@/components';
import conf from 'Config/site';

import { Posts, OptionItem } from './components/Posts';

const { WorkingCard } = Empty;

const fetchRss = async (limit?: number) => {
  const parser = new Parser();
  const { items = [] } = await parser.parseURL(conf.blogRSS);

  let result = items.map((item) => ({
    link: item.link || '',
    linkText: item.title || '',
    date: item.isoDate,
  }));

  if (limit) {
    result = result.slice(0, limit);
  }

  return result;
};

export default () => {
  const [latestPosts, setLatestPosts] = useState<OptionItem[]>([]);

  useEffect(() => {
    fetchRss(10).then((list) => {
      console.log(list);
      setLatestPosts(list);
    });
  }, []);

  return (
    <section style={{ height: '100%' }}>
      <Row>
        <Card title="最近文章" style={{ width: '50%' }}>
          <Posts options={latestPosts}></Posts>
        </Card>
        <Card
          style={{ width: '50%', marginLeft: 16 }}
          bodyStyle={{ height: '100%' }}
        >
          <WorkingCard />
        </Card>
      </Row>
    </section>
  );
};
