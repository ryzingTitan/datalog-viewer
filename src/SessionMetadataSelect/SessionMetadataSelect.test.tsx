import React from 'react';
import { render, screen } from '@testing-library/react';
import SessionMetadataSelect from './SessionMetadataSelect';

describe("renders the session metadata select element correctly", () => {
  test('when no values exist', () => {
    // render(<SessionMetadataSelect />);

    const sessionMetadataSelectLabel = screen.getByLabelText("Session");
    expect(sessionMetadataSelectLabel).toBeInTheDocument();

    // const sessionMetadataSelectMenuItems = screen.f
  });

  test('when multiple values exist', () => {
    // render(<SessionMetadataSelect />);
    const sessionMetadataSelectLabel = screen.getByLabelText("Session");
    expect(sessionMetadataSelectLabel).toBeInTheDocument();
  });
});
