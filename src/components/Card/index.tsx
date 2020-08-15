import React, { FC, memo } from 'react';
import classnames from 'classnames';

import styles from './index.less';

export interface CardProps {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export interface GraffitiTitleProps {
  text: string;
}

/**
 * 带涂鸦信息的 title
 */
export const GraffitiTitle: FC<GraffitiTitleProps> = memo(({ text }) => {
  return (
    <span className={styles.title}>
      <span className={styles.titleInner}>{text}</span>
    </span>
  );
});

/**
 * 卡片容器
 */
export const Card: FC<CardProps> = ({ title, children, style, bodyStyle ,className }) => (
  <section className={classnames(styles.card, className)} style={style}>
    {title ? (
      <header className={styles.cardHeader}>
        {title ? <GraffitiTitle text={title} /> : null}
      </header>
    ) : null}
    <main style={bodyStyle}>{children}</main>
  </section>
);

Card.displayName = 'Card';
