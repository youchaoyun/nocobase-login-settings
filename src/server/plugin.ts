/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/server';
import { resolve } from 'path';

export class PluginLoginSettingsServer extends Plugin {
  async afterAdd() { }

  async beforeLoad() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.login-settings`,
      actions: ['loginSettings:update'],
    });
  }

  async load() {
    await this.importCollections(resolve(__dirname, 'collections'));

    this.app.acl.addFixedParams('loginSettings', 'destroy', () => {
      return {
        'id.$ne': 1,
      };
    });

    this.app.acl.allow('loginSettings', '*', 'public');


    //oa调用 预约演示（公司官网） 接口不需要验证
    this.app.acl.allow('tabWebsiteDemoAppointment', '*', 'public');
  }

  async install() {
    await this.db.getRepository('loginSettings').create({
      values: {
        layout: 'default'
      },
    });
  }

  async afterEnable() { }

  async afterDisable() { }

  async remove() { }
}

export default PluginLoginSettingsServer;
