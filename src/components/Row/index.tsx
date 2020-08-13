import React, { FC } from 'react';

import styles from './index.less';

export interface RowProps {}

export const Row: FC<RowProps> = ({ children }) => (
  <section className={styles.row}>{children}</section>
);

Row.displayName = 'Row';
