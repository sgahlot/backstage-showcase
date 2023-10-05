import { ConfigApi, createApiRef } from '@backstage/core-plugin-api';
import { SysInfoData } from './types';
import { SYS_INFO_BACKEND_URL } from './constants';

export type SysInfoAPI = {
  getData: (id: string) => Promise<SysInfoData>;
};

type Options = {
  configApi: ConfigApi;
};

export const sysInfoApiRef = createApiRef<SysInfoAPI>({
  id: 'plugin.sysinfo.service',
});

export class SysInfoApiClient implements SysInfoAPI {
  private readonly configApi: ConfigApi;

  constructor(options: Options) {
    this.configApi = options.configApi;
  }

  async getData(id: string): Promise<SysInfoData> {
    const backendUrl = this.configApi.getString(SYS_INFO_BACKEND_URL);
    const res = await fetch(
      `${backendUrl}/api/sys-info/system-info?module=API&format=json&id=${id}`,
      {
        method: 'GET',
      },
    );

    return res.json();
  }
}
