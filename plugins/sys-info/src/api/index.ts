import { ConfigApi, createApiRef } from '@backstage/core-plugin-api';
import { SysInfoData } from './types';
import { SYS_INFO_BACKEND_URL } from './constants';
import { NotFoundError, ResponseError } from '@backstage/errors';

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
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (res.ok) {
      return (await res.json()) as SysInfoData;

      // SG: Uncomment following lines to see the data coming back
      // const data = await res.json() as SysInfoData;
      // // eslint-disable-next-line no-console
      // console.log(`Data:: CPUs -> ${data.cpus}\n\n OTHER_DATA -> ${data.otherData}`);
      // return data;
    } else if (res.status === 404) {
      throw new NotFoundError(`Not found for backend url: [${backendUrl}]`);
    }

    throw await ResponseError.fromResponse(res);
  }
}
