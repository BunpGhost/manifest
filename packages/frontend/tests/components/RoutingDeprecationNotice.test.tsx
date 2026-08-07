import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import RoutingDeprecationNotice from '../../src/components/RoutingDeprecationNotice';

describe('RoutingDeprecationNotice', () => {
  it('renders nothing (component disabled in this fork)', () => {
    render(() => (
      <RoutingDeprecationNotice title="Complexity routing is going away.">
        Some explanatory body text.
      </RoutingDeprecationNotice>
    ));
    expect(screen.queryByText('Complexity routing is going away.')).toBeNull();
    expect(screen.queryByText('Some explanatory body text.')).toBeNull();
  });

  it('exposes no note role for assistive technology (disabled)', () => {
    render(() => <RoutingDeprecationNotice title="T">B</RoutingDeprecationNotice>);
    expect(screen.queryByRole('note')).toBeNull();
  });

  it('renders no "View more" link to the deprecation blog post (disabled)', () => {
    render(() => <RoutingDeprecationNotice title="T">B</RoutingDeprecationNotice>);
    expect(screen.queryByRole('link', { name: 'View more' })).toBeNull();
  });
});
