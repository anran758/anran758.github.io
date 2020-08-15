import React, { FC, memo } from 'react';
import classnames from 'classnames';
import { Row } from '@/components/Row';
import dayjs from 'dayjs';

import styles from './index.less';

export interface OptionItem {
  key?: React.ReactText;
  link: string;
  linkText: string;
  date?: string | number;
}

export interface PostsProps {
  style?: React.CSSProperties;
  className?: string;
  options?: OptionItem[];
}

/**
 * 约定式列表
 */
export const Posts: FC<PostsProps> = ({ options, style, className }) => (
  <section className={className} style={style}>
    {options?.map((item, idx) => {
      return (
        <Row justify="space-between" key={item.key || idx} className={styles.row}>
          <a className={styles.link} href={item.link} target="_blank">
            {item.linkText}
          </a>
          {item.date ? (
            <div className={styles.date}>
              {dayjs(item.date).format('YYYY-MM-DD')}
            </div>
          ) : null}
        </Row>
      );
    })}
  </section>
);

Posts.displayName = 'Posts';
