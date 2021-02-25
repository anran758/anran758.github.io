import React, { FC, memo } from 'react';
import classnames from 'classnames';

import styles from './index.less';

export interface CardProps {
  title?: string;
  className?: string;
  extra?: React.ReactNode;
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
export const Card: FC<CardProps> = ({
  title,
  extra,
  children,
  style,
  bodyStyle,
  className,
}) => (
  <section className={classnames(styles.card, className)} style={style}>
    {title || extra ? (
      <header className={styles.cardHeader}>
        <div>{title ? <GraffitiTitle text={title} /> : null}</div>
        <div>{extra}</div>
      </header>
    ) : null}
    <main className={styles.cardInner} style={bodyStyle}>
      {children}
    </main>
  </section>
);

Card.displayName = 'Card';
