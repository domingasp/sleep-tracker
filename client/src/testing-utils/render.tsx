/* eslint-disable @typescript-eslint/no-explicit-any */
import { render as testingLibraryRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

export function render(
  ui: React.ReactNode,
  { url = "/", path = "/", ...renderOptions }: Record<string, any> = {}
) {
  const router = createMemoryRouter(
    [
      {
        path: path,
        element: ui,
      },
    ],
    {
      initialEntries: url ? ["/", url] : ["/"],
      initialIndex: url ? 1 : 0,
    }
  );

  return testingLibraryRender(<>{ui}</>, {
    wrapper: () => (
      <MantineProvider forceColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>
    ),
    ...renderOptions,
  });
}
