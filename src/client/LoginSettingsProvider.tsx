/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { createContext, ReactNode, useContext } from 'react';
import { useRequest } from '@nocobase/client';

export const LoginSettingsContext = createContext<any>(null);
LoginSettingsContext.displayName = 'LoginSettingsContext';

export const useLoginSettings = () => {
  return useContext(LoginSettingsContext);
};

export const LoginSettingsProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const result = useRequest({
    url: 'loginSettings:get/1?appends=backgroundImages',
  });

  return <LoginSettingsContext.Provider value={result}>{props.children}</LoginSettingsContext.Provider>;
};
