import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import UserDiscoveryModal, {
  USER_DISCOVERY_MODAL_DISMISSED_KEY,
  readUserDiscoveryModalDismissed,
  writeUserDiscoveryModalDismissed,
} from '../../src/components/UserDiscoveryModal';
import { USER_DISCOVERY_BOOKING_URL } from '../../src/components/UserDiscoveryBanner';

describe('UserDiscoveryModal', () => {
  it('renders nothing when closed (component disabled in this fork)', () => {
    const { container } = render(() => (
      <UserDiscoveryModal open={false} onClose={vi.fn()} />
    ));
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing even when open (disabled)', () => {
    const onClose = vi.fn();
    const { container } = render(() => (
      <UserDiscoveryModal open onClose={onClose} />
    ));
    expect(container.innerHTML).toBe('');
    expect(screen.queryByText('Book my slot to get $25')).toBeNull();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('exposes helper constants for compatibility', () => {
    expect(USER_DISCOVERY_MODAL_DISMISSED_KEY).toBe(
      'manifest:user-discovery-modal-dismissed:v1',
    );
    expect(typeof readUserDiscoveryModalDismissed).toBe('function');
    expect(typeof writeUserDiscoveryModalDismissed).toBe('function');
    expect(USER_DISCOVERY_BOOKING_URL).toContain('calendly.com');
  });
});
