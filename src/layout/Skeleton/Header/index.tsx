import React, { FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BadgeButton } from '@/components/BadgeButton';

import styles from './index.less';

interface LinkItemProps {
  href: string;
  label: string;
}

interface HeaderProps {
  links?: LinkItemProps[];
  collapsed?: boolean;
  githubRepo?: string;
  toggleCollapsed?: () => void;
}

export const Header: FC<HeaderProps> = React.memo(
  ({ githubRepo, collapsed = true, links = [], toggleCollapsed }) => (
    <header className={styles.header}>
      <span className={styles.headerTrigger} onClick={toggleCollapsed}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </span>
      <ul className={styles.links}>
        {links.map((item, idx) => (
          <a key={idx} className={styles.link} href={item.href}>
            {item.label}
          </a>
        ))}
        {githubRepo && (
          <BadgeButton
            className={styles.link}
            path={`/github/stars/${githubRepo}`}
            queryParams={{ label: 'Stars' }}
          />
        )}
      </ul>
    </header>
  )
);

Header.displayName = 'Header';
