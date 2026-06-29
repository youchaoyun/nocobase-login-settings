/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { AuthLayout } from './AuthLayout';
import { LoginSettingsPane } from './LoginSettingsPane';
import { LoginSettingsProvider } from './LoginSettingsProvider';
import { NAMESPACE, useT } from './locale';
// import SystemCustomizationPlugin from '@youchaoyun/plugin-system-customization/client';

export class PluginLoginSettingsClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    const plugin = this.app.pm.get<any>('@youchaoyun/plugin-system-customization');
    if (plugin) {
      this.app.pluginSettingsManager.add('system-customization.login-settings', {
        title: `{{t("Login settings", { ns: "${NAMESPACE}" })}}`,
        Component: LoginSettingsPane,
        sort: 1,
      });
    } else {
      this.app.pluginSettingsManager.add('login-settings', {
        title: `{{t("Login settings", { ns: "${NAMESPACE}" })}}`,
        icon: 'ControlOutlined',
        Component: LoginSettingsPane,
      });
    }

    this.app.router.add('auth', {
      Component: AuthLayout,
    });

    this.app.addComponents({
      AuthLayout,
    });

    this.app.use(LoginSettingsProvider, this.options);
  }
}

export default PluginLoginSettingsClient;
