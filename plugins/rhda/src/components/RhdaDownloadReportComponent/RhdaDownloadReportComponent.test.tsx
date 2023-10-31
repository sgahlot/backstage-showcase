import React from 'react';
import { RhdaDownloadReportComponent } from './RhdaDownloadReportComponent';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  setupRequestMockHandlers,
  renderInTestApp,
} from "@backstage/test-utils";
import {screen} from "@testing-library/react";

describe('RhdaDownloadReportComponent', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render', async () => {
    await renderInTestApp(<RhdaDownloadReportComponent />);
    expect(screen.getByText('Download Full Report')).toBeInTheDocument();
  });
});
