import React from 'react';
import { Card } from '@/components/Card';
import { Row } from '@/components/Row';

import styles from './index.less';

export interface EmptyProps {
  text?: string;
}

interface StaticComponents {
  WorkingCard: React.FC<EmptyProps>;
}

export const Empty: React.FC<EmptyProps> & StaticComponents = ({
  text,
}: {
  text?: string;
}) => <p className={styles.content}>{text || '正在努力开发中...'}</p>;

export const WorkingCard: React.FC<EmptyProps> = ({ text }) => (
  <Row center style={{ height: '100%' }}>
    <Card>
      <div className={styles.workingCard}>{text || '模块开发中...'}</div>
    </Card>
  </Row>
);


Empty.displayName = 'Empty';
Empty.WorkingCard = WorkingCard;
WorkingCard.displayName = 'WorkingCard';

export default Empty;
