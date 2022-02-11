import React from 'react'
import { CommentsList } from './CommentsList'
import { renderReactQuery, screen } from '../../test-utils'

describe('<CommentsList />', () => {
  it('should render loader', () => {
    renderReactQuery(<CommentsList />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
