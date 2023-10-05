# sys-info

Welcome to the sys-info plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/sys-info](http://localhost:3000/sys-info).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

1. Install the plugin
2. Make sure the sys-info backend plugin is installed... [TBD]

### Entity Pages

1. Add `sys-info/site-id` annotation to `catalog-info.yaml`

```yaml
metadata:
  name: sys-info
  annotations:
    sys-info/site-id: '<SOME-SITE'
```

2. Add `instance url` and `contact us` to the config:

```yaml
sysInfo:
  frontendBaseUrl: ${SYS-INFO_BASE_URL}
  contactUsLink: mailto:${SYS-INFO_CONTACT_EMAIL}
```
