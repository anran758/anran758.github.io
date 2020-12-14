import React, { FC } from 'react';
import { Card } from '@/components/Card';
import { Row } from '@/components/Row';

import styles from './index.less';

export interface EmptyProps {
  text?: string;
}

interface StaticComponents {
  EmptyCard: React.FC<EmptyProps>;
  WorkingCard: React.FC;
}

export const Empty: React.FC<EmptyProps> & StaticComponents = ({
  text,
}: {
  text?: string;
}) => <p className={styles.content}>{text || '正在努力开发中...'}</p>;

export const EmptyCard: React.FC<EmptyProps> = ({ text = '没有数据噢' }) => (
  <Row center style={{ height: '100%' }}>
    <div className={styles.emptyCard}>{text}</div>
  </Row>
);

export const WorkingCard: FC = () => <EmptyCard text="模块开发中..." />;

EmptyCard.displayName = 'EmptyCard';
WorkingCard.displayName = 'WorkingCard';

Empty.displayName = 'Empty';
Empty.EmptyCard = EmptyCard;
Empty.WorkingCard = WorkingCard;

export default Empty;
