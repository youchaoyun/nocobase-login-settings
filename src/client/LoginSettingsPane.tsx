/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema, SchemaComponent, useAPIClient, useActionContext, useRequest } from '@nocobase/client';
import React from 'react';
import { NAMESPACE, useT } from './locale';
import { Card, message } from 'antd';
import { useForm } from '@formily/react';
import { useLoginSettings } from './LoginSettingsProvider';
import cloneDeep from 'lodash/cloneDeep';
import { uid } from '@nocobase/utils/client';

const useSaveLoginSettingsValues = () => {
  const { setVisible } = useActionContext();
  const form = useForm();
  const { mutate, data } = useLoginSettings() || {};
  const api = useAPIClient();
  const t = useT();
  return {
    async run() {
      await form.submit();
      const values = cloneDeep(form.values);
      mutate({
        data: {
          ...data?.data,
          ...values,
        },
      });
      await api.request({
        url: 'loginSettings:update/1',
        method: 'post',
        data: values,
      });
      message.success(t('Saved successfully'));
      setVisible(false);
    },
  };
};

const useLoginSettingsValues = (options) => {
  const { visible } = useActionContext();
  const result = useLoginSettings();
  return useRequest(() => Promise.resolve(result?.data), {
    ...options,
    refreshDeps: [visible, result?.data],
  });
};

const useCloseAction = () => {
  const { setVisible } = useActionContext();
  return {
    async run() {
      setVisible(false);
    },
  };
};

const schema: ISchema = {
  type: 'object',
  properties: {
    [uid()]: {
      'x-decorator': 'Form',
      'x-decorator-props': {
        useValues: '{{ useLoginSettingsValues }}',
      },
      'x-component': 'div',
      type: 'void',
      title: `{{t('Login settings',{ns:"${NAMESPACE}"})}}`,

      properties: {
        layout: {
          type: 'string',
          title: "{{t('Layout')}}",
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: [
            {
              label: '{{ t("Default") }}',
              value: 'default',
            },
            {
              label: '{{ t("Center") }}',
              value: 'center',
            },
            {
              label: '{{t("Left and right")}}',
              value: 'leftRight',
            },
          ],
          // 'x-reactions': {
          //   target: 'layoutImage',
          //   fulfill: {
          //     state: {
          //       value: '{{$self.value}}',
          //     },
          //   },
          // },
        },
        // layoutImage: {
        //   type: 'string',
        //   title: "{{t('Layout')}}",
        //   'x-decorator': 'FormItem',
        //   'x-component': 'Upload.Attachment',
        //   // 'x-read-pretty': true,
        //   'x-component-props': {
        //     action: 'attachments:create',
        //     value: {
        //       title: '1',
        //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //       size: 40,
        //     },
        //   },
        //   'x-use-component-props': 'useFileCollectionStorageRules',
        // },
        backgroundImages: {
          type: 'string',
          title: `{{t('Background images',{ns:"${NAMESPACE}"})}}`,
          'x-decorator': 'FormItem',
          'x-component': 'Upload.Attachment',
          'x-component-props': {
            action: 'attachments:create',
            multiple: true,
            // accept: 'jpg,png'
          },
          'x-use-component-props': 'useFileCollectionStorageRules',
          'x-reactions': {
            dependencies: ['layout'],
            when: '{{$deps[0] == "default"}}',
            fulfill: {
              state: {
                hidden: true,
              },
            },
            otherwise: {
              state: {
                hidden: false,
              },
            },
          },
        },
        titleFontSize: {
          type: 'string',
          title: "{{t('Title font size (px)')}}",
          'x-decorator': 'FormItem',
          'x-component': 'InputNumber',
        },
        technicalSupport: {
          type: 'string',
          title: "{{t('Technical support')}}",
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },

        footer1: {
          type: 'void',
          'x-component': 'ActionBar',
          'x-component-props': {
            layout: 'one-column',
          },
          properties: {
            submit: {
              title: '{{t("Submit")}}',
              'x-component': 'Action',
              'x-component-props': {
                type: 'primary',
                htmlType: 'submit',
                useAction: '{{ useSaveLoginSettingsValues }}',
              },
            },
            // cancel: {
            //   title: 'Cancel',
            //   'x-component': 'Action',
            //   'x-component-props': {
            //     useAction: '{{ useCloseAction }}',
            //   },
            // },
          },
        },
      },
    },
  },
};

export const LoginSettingsPane = () => {
  const t = useT();
  return (
    <Card bordered={false}>
      <SchemaComponent
        scope={{ useSaveLoginSettingsValues, useLoginSettingsValues, useCloseAction, t }}
        schema={schema}
      />
    </Card>
  );
};
