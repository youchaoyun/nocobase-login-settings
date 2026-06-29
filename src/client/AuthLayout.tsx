/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import {
  ReadPretty,
  SwitchLanguage,
  css,
  useAPIClient,
  useDocumentTitle,
  useRequest,
  useSystemSettings,
} from '@nocobase/client';
import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Spin, Carousel } from 'antd';
import { AuthenticatorsContext } from '@nocobase/plugin-auth/client';
import { useLoginSettings } from './LoginSettingsProvider';
import { PoweredBy } from './PoweredBy';

export const AuthenticatorsContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = useAPIClient();
  const {
    data: authenticators = [],
    error,
    loading,
  } = useRequest(() =>
    api
      .resource('authenticators')
      .publicList()
      .then((res) => {
        return res?.data?.data || [];
      }),
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Spin />
      </div>
    );
  }

  if (error) {
    throw error;
  }

  return <AuthenticatorsContext.Provider value={authenticators as any}>{children}</AuthenticatorsContext.Provider>;
};

const contentStyle: React.CSSProperties = {
  height: '100vh',
  width: '100%',
  color: '#fff',
  textAlign: 'center',
};
const carouselWrapper = css`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;

  .ant-carousel {
    height: 100%;
  }
`;

const formWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 420px;
  transform: translate(-50%, -50%);
  padding: 30px 40px 70px 40px;
  border-radius: 20px;
  background: #ffffffb3;
  box-shadow:
    0 6px 16px 0 hsl(0 0% 0% /0.05),
    0 3px 6px -4px hsl(0 0% 0% /0.05),
    0 9px 28px 8px hsl(0 0% 0% /0.05);
`;

const rightFormWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 420px;
  transform: translate(-50%, -50%);
  padding: 30px 40px 70px 40px;
  border-radius: 20px;
  @media (max-width: 1025px) {
    top: 40%;
  }
`;

const leftWrapper = css`
  width: 66%;
  height: 100%;
  @media (max-width: 1025px) {
    width: 100%;
    height: 40vh;
    .slick-slide img {
      height: 40vh !important;
    }
  }
`;
const rightWrapper = css`
  position: relative;
  width: 34%;
  height: 100%;
  @media (max-width: 1025px) {
    width: 100%;
    height: 60vh;
  }
`;
const leftCarouselWrapper = css`
  width: 100%;
  height: 100%;
  .ant-carousel {
    height: 100%;
  }
`;

export const AuthLayout = () => {
  const { data } = useSystemSettings() || {};
  const { data: loginSettingsData } = useLoginSettings() || {};
  const { setTitle: setDocumentTitle } = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle(data?.data?.title);
  }, []);

  {
    if (loginSettingsData?.data?.layout == 'leftRight') {
      return (
        <div
          className={css`
            display: flex;
            width: 100vw;
            height: 100vh;
            @media (max-width: 1025px) {
              flex-direction: column;
            }
          `}
        >
          <div className={leftWrapper}>
            <div className={leftCarouselWrapper}>
              <Carousel autoplay autoplaySpeed={5000}>
                {loginSettingsData?.data?.backgroundImages?.length > 0 ? (
                  loginSettingsData?.data?.backgroundImages?.map((i) => {
                    return (
                      <div>
                        <img style={contentStyle} src={i.url} alt="background image" />
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </Carousel>
            </div>
          </div>
          <div className={rightWrapper}>
            <div style={{ position: 'absolute', top: '2em', right: '2em', zIndex: 1 }}>
              <SwitchLanguage />
            </div>
            <div className={rightFormWrapper}>
              <h1 style={{ textAlign: 'center', fontSize: loginSettingsData?.data?.titleFontSize }}>
                <ReadPretty.TextArea value={data?.data?.title} />
              </h1>

              <AuthenticatorsContextProvider>
                <Outlet />
              </AuthenticatorsContextProvider>
            </div>
            <div
              className={css`
                position: absolute;
                bottom: 24px;
                width: 100%;
                left: 0;
                text-align: center;
                @media (max-width: 1025px) {
                  position: fixed;
                }
              `}
            >
              <PoweredBy />
            </div>
          </div>
        </div>
      );
    } else if (loginSettingsData?.data?.layout == 'center') {
      return (
        <div
          style={{
            maxWidth: 420,
            margin: '0 auto',
            paddingTop: '20vh',
          }}
        >
          <div className={carouselWrapper}>
            <Carousel autoplay autoplaySpeed={5000}>
              {loginSettingsData?.data?.backgroundImages?.map((i) => {
                return (
                  <div>
                    <img style={contentStyle} src={i.url} alt="background image" />
                  </div>
                );
              })}
            </Carousel>
          </div>

          <div style={{ position: 'fixed', top: '2em', right: '2em' }}>
            <SwitchLanguage />
          </div>
          <div className={formWrapper}>
            <h1 style={{ textAlign: 'center', fontSize: loginSettingsData?.data?.titleFontSize }}>
              <ReadPretty.TextArea value={data?.data?.title} />
            </h1>

            <AuthenticatorsContextProvider>
              <Outlet />
            </AuthenticatorsContextProvider>

            <div
              className={css`
                position: absolute;
                bottom: 30px;
                width: 100%;
                left: 0;
                text-align: center;
              `}
            >
              <PoweredBy />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            maxWidth: 320,
            margin: '0 auto',
            paddingTop: '20vh',
          }}
        >
          <div style={{ position: 'fixed', top: '2em', right: '2em' }}>
            <SwitchLanguage />
          </div>
          <h1 style={{ textAlign: 'center', fontSize: loginSettingsData?.data?.titleFontSize }}>
            <ReadPretty.TextArea value={data?.data?.title} />
          </h1>
          <AuthenticatorsContextProvider>
            <Outlet />
          </AuthenticatorsContextProvider>
          <div
            className={css`
              position: absolute;
              bottom: 24px;
              width: 100%;
              left: 0;
              text-align: center;
            `}
          >
            <PoweredBy />
          </div>
        </div>
      );
    }
  }
};
