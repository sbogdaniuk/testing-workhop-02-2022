import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Providers as ReactQueryProviders } from './react-query/Providers'

export const renderReactQuery = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: ReactQueryProviders, ...options })

export * from '@testing-library/react'
export {
  renderReactQuery as render,
}
