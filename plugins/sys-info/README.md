# sys-info

Welcome to the sys-info plugin!

_This plugin was created through the Backstage CLI_

## Getting started

This plugin calls an API in the **sys-info-backend** plugin to retrieve the System Information data and displays it in
the UI. To access this plugin, run it using `yarn start` in the root directory, and then navigate
to [/sys-info](http://localhost:3000/sys-info).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

### Features

This plugin retrieves the System Information data by invoking the `sys-info-backend` plugin API to retrieve and
displays it in the UI. It also displays _contactUs_ and _externalLink_ icons in the InfoCard at the top of the page.
The information for these are pulled from teh `sysInfo` properties defined in the Config file.

To enable the Config file properties to be available in the UI, following changes were done to the plugin:

- A `config.d.ts` file is added to the plugin root dir with `@visibility frontend` added for the properties to be made
  available to the frontend
- Following section is added to this plugin's `package.json`:

  ```json
  "configSchema": "config.d.ts",
  "files": [
    ...
    "config.d.ts"
  ]

  ```

### Config

1. Add `instance url` and `contact us` to the config:

```yaml
sysInfo:
  frontendBaseUrl: ${SYS_INFO_BASE_URL}
  contactUsLink: mailto:${SYS_INFO_CONTACT_EMAIL}
```
