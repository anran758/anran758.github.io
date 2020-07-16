import React from 'react';

import styles from './index.less';

export default ({ text }: { text?: string }) => (
  <p className={styles.content}>{text || '正在努力开发中...'}</p>
);
