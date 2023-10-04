import { sysInfoPlugin } from './plugin';

describe('sys-info', () => {
  it('should export plugin', () => {
    expect(sysInfoPlugin).toBeDefined();
  });
});
