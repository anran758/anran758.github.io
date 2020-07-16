import React, { useEffect } from 'react';
import { Link, LinkProps as ReactLinkProps } from 'react-router-dom';

import styles from './index.css';

interface LinkProps {
  name: string;
  href?: string;
  target?: string;
  to?: ReactLinkProps['to'];
}

const links: LinkProps[] = [
  {
    name: 'Blog',
    href: 'https://anran758.github.io/blog',
    // target: '_blank',
  },
  {
    name: 'Demos',
    to: { pathname: 'content' },
  },
  {
    name: 'Github',
    href: 'https://github.com/anran758',
    target: '_blank',
  },
  {
    name: 'segmentfault',
    href: 'https://segmentfault.com/u/anran758',
    target: '_blank',
  },
  {
    name: '知乎专栏',
    href: 'https://zhuanlan.zhihu.com/c_1147180666474176512',
    target: '_blank',
  },
];

export const Introduction = () => {
  useEffect(() => {
    const { classList } = document.body;
    classList.add(styles.introduction);

    return function removeClass() {
      classList.remove(styles.introduction);
    };
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.name}>
          Anran758 / <span className={styles.desc}>Web Developer</span>
        </h1>
        <nav className={styles.nav}>
          {links.map(({ name, href, to, ...restProps }) =>
            to ? (
              <Link key={name} className={styles.navItem} to={to}>
                {name}
              </Link>
            ) : (
              <a
                key={name}
                className={styles.navItem}
                href={href}
                {...restProps}
              >
                {name}
              </a>
            )
          )}
        </nav>
      </section>
    </main>
  );
};

export default Introduction;
