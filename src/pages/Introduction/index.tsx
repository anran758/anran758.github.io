import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.css';

const links = [
  {
    name: 'Blog',
    to: 'https://anran758.github.io/blog',
    target: '_blank',
  },
  {
    name: 'Github',
    to: 'https://github.com/anran758',
    target: '_blank',
  },
  {
    name: 'segmentfault',
    to: 'https://segmentfault.com/u/anran758',
    target: '_blank',
  },
  {
    name: '知乎专栏',
    to: 'https://zhuanlan.zhihu.com/c_1147180666474176512',
    target: '_blank',
  },
  {
    name: 'Demos',
    to: {
      pathname: 'content',
    },
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
          {links.map(({ name, ...restProps }) => (
            <Link key={name} className={styles.navItem} {...restProps}>
              {name}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
};

export default Introduction;
