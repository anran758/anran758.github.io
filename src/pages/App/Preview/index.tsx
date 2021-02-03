import React, { FC, useCallback, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BrowserFrame from '@/layout/BrowserFrame';
import { RouteConfigComponentProps } from '@/router/index.d';

import styles from './index.less';


const Preview: FC<RouteConfigComponentProps> = ({ meta, route }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [path, setPath] = useState(meta?.path || '');

  const handleReload = useCallback(() => {
    if (!iframeRef.current) {
      console.log('[Preview Component]: iframeRef is underfined');
      return;
    }

    iframeRef.current.src = iframeRef.current.src;
  }, []);
  const handleSearch = useCallback((v) => setPath(v), [setPath]);

  return (
    <section className={styles.container}>
      <BrowserFrame
        className={styles.browserFrame}
        value={path}
        title={route.name}
        onSearch={handleSearch}
        onReload={handleReload}
      >
        <iframe ref={iframeRef} className={styles.iframe} src={encodeURI(path)}></iframe>
      </BrowserFrame>
    </section>
  );
};

Preview.displayName = 'Preview';

export default Preview;
