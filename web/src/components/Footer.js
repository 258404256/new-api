import React, { useEffect, useState } from 'react';

import { getFooterHTML, getSystemName } from '../helpers';
import { Layout, Tooltip } from '@douyinfe/semi-ui';

const Footer = () => {
  const systemName = getSystemName();
  const [footer, setFooter] = useState(getFooterHTML());
  let remainCheckTimes = 5;

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  const defaultFooter = (
    <div className='custom-footer'>
      <a
        href='https://api.bigaipro.com'
        target='_blank'
        rel='noreferrer'
      >
        BigAiPro API {import.meta.env.VITE_REACT_APP_VERSION}{' '}
      </a>
      由{' '}
      <a
        href='https://macfun.org'
        target='_blank'
        rel='noreferrer'
      >
        MacFun
      </a>{' '}
      开发，基于{' '}
      <a
        href='https://macfun.org/archives/category/rengongzhineng/bigai-topic'
        target='_blank'
        rel='noreferrer'
      >
        New API
      </a>
    </div>
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainCheckTimes <= 0) {
        clearInterval(timer);
        return;
      }
      remainCheckTimes--;
      loadFooter();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Layout.Content style={{ textAlign: 'center' }}>
        {footer ? (
          <div
            className='custom-footer'
            dangerouslySetInnerHTML={{ __html: footer }}
          ></div>
        ) : (
          defaultFooter
        )}
      </Layout.Content>
    </Layout>
  );
};

export default Footer;
