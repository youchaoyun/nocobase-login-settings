/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defineCollection } from "@nocobase/database";
import { NAMESPACE } from "..";


export default defineCollection({
  name: 'loginSettings',
  fields: [
    {
      name: 'id',
      type: 'bigInt',
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    {
      type: 'string',
      name: 'layout'
    },
    {
      type: 'belongsToMany',
      name: "backgroundImages",
      target: 'attachments',
      through: 'loginSettings_attachments',
      foreignKey: 'attachmentId',
      otherKey: 'loginSettingsId',
      targetKey: 'id',
      sourceKey: 'id'
    },
    {
      type: 'bigInt',
      name: 'titleFontSize'
    },
    {
      type: 'string',
      name: 'technicalSupport'
    },
  ]
});