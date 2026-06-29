# NocoBase Login Settings Plugin

English | [简体中文](./README.md)

`@youchaoyun/plugin-login-settings` is a plugin for customizing the NocoBase login page. It lets you configure the login page layout, background image carousel, title font size, and footer technical support text.

## Features

- **Three login page layouts**
  - Default layout: keeps the clean default NocoBase login page structure.
  - Center layout: supports a full-screen background image carousel and places the login form in the center.
  - Left-right layout: displays the background image carousel on the left and the login form on the right. On narrow screens, it automatically switches to a vertical layout.
- **Background image upload and carousel**
  - Upload multiple background images.
  - Automatically display them as a carousel in the center and left-right layouts.
- **Login page title font size**
  - Configure the title font size independently for the login page.
- **Technical support text**
  - Customize the technical support text displayed at the bottom of the login page.
- **Keeps existing authentication capabilities**
  - Continues to use the NocoBase authenticator list, so it works with enabled authentication methods such as username/password, SMS, Enterprise WeChat, and more.
  - Keeps the language switch on the login page.
- **Admin settings entry**
  - Adds a "Login settings" page to plugin settings.

## Preview

<img src="./docs/assets/left_right.png" alt="Left-right layout" />

<img src="./docs/assets/center.png" alt="Center layout" />

<img src="./docs/assets/setting.png" alt="Settings page" />

## Compatibility

This plugin is for NocoBase `1.x`.

For the NocoBase `2.x` version, please contact us through the channels at the end of this document.

## Usage

1. Enable the plugin and enter the NocoBase admin panel.
2. Open "Login settings" in plugin settings.
3. Select a login page layout:
   - `Default`: does not show the background image configuration.
   - `Center`: centers the login form and uses a full-screen background image carousel.
   - `Left and right`: shows the background image carousel on the left and the login form on the right.
4. Upload one or more background images.
5. Set the title font size, for example `32`.
6. Set the technical support text.
7. Click "Submit" to save, then revisit the login page to see the result.

## Noco Plugin Exchange

Scan the QR code to join the Noco plugin exchange group. We discuss NocoBase plugin development, plugin usage, and enterprise extension practices.

<img src="./docs/assets/noco-plugin-exchange.png" alt="Noco plugin exchange QR code" width="360" />

If the QR code has expired, you can contact us through the "More plugins" page below to get the latest group entry.

## More Plugins

Youchao Digital Intelligence continues to build enterprise-ready NocoBase plugins and extension capabilities. See more plugins here:

[More NocoBase plugins and extensions](https://docs.youchaoyun.com/cn/infrastructure/nocobase_plugin_extension/)
