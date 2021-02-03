import React, { useCallback, useRef } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import styles from './index.less';

export interface IBrowserFrame {
  className?: string;
  title?: string;
  value?: string;
  children?: React.ReactNode;
  onReload?: React.MouseEventHandler;
  onSearch?: (value: string, event: React.KeyboardEventHandler) => void;
}

const BrowserFrame: React.FC<IBrowserFrame> = ({
  title,
  value,
  className,
  onSearch,
  onReload,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnter = useCallback(
    (evt) => {
      if (evt.nativeEvent.keyCode !== 13 || !onSearch) return;

      // user trigger enter key
      onSearch(evt.target.value || '', evt);
    },
    [onSearch]
  );

  return (
    <section className={classnames(styles.browserContainer, className)}>
      <header className={styles.browserHeader}>
        <div className={styles.browserHeaderTop}>
          <div className={styles.browserHeaderButtons}></div>
          {title && <h3 className={styles.browserHeaderTitle}>{title}</h3>}
        </div>
        <div className={styles.browserHeaderBottom}>
          <div className={styles.buttonArea}>
            <ReloadOutlined role="button" onClick={onReload} />
          </div>
          <input
            ref={inputRef}
            defaultValue={value}
            type="text"
            className={styles.browserInput}
            onKeyPress={handleEnter}
          />
        </div>
      </header>
      <main className={styles.content}>{children}</main>
    </section>
  );
};
BrowserFrame.displayName = 'BrowserFrame';

export default BrowserFrame;
