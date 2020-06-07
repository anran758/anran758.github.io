import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from './index.css';

const links = [
  {
    name: 'Blog',
    href: 'https://anran758.github.io/blog',
    target: '_blank',
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

export const Etrance = () => {
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
            <a className={styles.navItem} {...restProps}>
              {name}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
};

export function createEtrance() {
  return observer(Etrance);
}
