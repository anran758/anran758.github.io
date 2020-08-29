import React from 'react';
import './index.less?normal';

const BrowserFrame: React.FC = ({ children }) => (
  <div className="browser-mockup with-url">{children}</div>
);
BrowserFrame.displayName = 'BrowserFrame';

export default BrowserFrame;
