import React, { FC } from 'react';
import BrowserFrame from '@/layout/BrowserFrame';

import styles from './index.less';

interface PreviewProps {
  meta?: { path: string };
}

const Preview: FC<PreviewProps> = ({ meta }) => {
  return (
    <section className={styles.container}>
      <BrowserFrame>
        <iframe className={styles.iframe} src={meta?.path || ''}></iframe>
      </BrowserFrame>
    </section>
  );
};

Preview.displayName = 'Preview';

export default Preview;
