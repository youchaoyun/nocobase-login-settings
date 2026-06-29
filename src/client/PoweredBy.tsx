/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { css, cx } from '@emotion/css';
import { useToken } from '@nocobase/client';
import { parseHTML } from '@nocobase/utils/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLoginSettings } from './LoginSettingsProvider';

export const PoweredBy = () => {
  const { data: loginSettingsData } = useLoginSettings() || {};
  const { i18n } = useTranslation();
  const { token } = useToken();
  // const urls = {
  //   'en-US': 'https://www.nocobase.com',
  //   'zh-CN': 'https://www.nocobase.com/cn/',
  // };
  const supports = {
    'en-US': 'Technical Support',
    'zh-CN': '技术支持',
  };
  const style = css`
    text-align: center;
    color: ${token.colorTextDescription};
    a {
      color: ${token.colorTextDescription};
      &:hover {
        color: ${token.colorText};
      }
    }
  `;
  // const appVersion = `<span class="nb-app-version">v${data?.data?.version}</span>`;

  return (
    <div
      className={cx(style, 'nb-brand')}
      // dangerouslySetInnerHTML={{
      //   __html: `${
      //     supports[i18n.language] || supports['en-US']
      //   }: <a href="http://www.youchaoyun.com/" target="_blank">${
      //     loginSettingsData?.data?.technicalSupport || '安徽有巢数智信息科技有限公司'
      //   }</a>`,
      // }}
      dangerouslySetInnerHTML={{
        __html: `${supports[i18n.language] || supports['en-US']}: ${
          loginSettingsData?.data?.technicalSupport || '安徽有巢数智信息科技有限公司'
        }`,
      }}
    ></div>
  );
};
