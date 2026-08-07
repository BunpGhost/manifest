import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import UserDiscoveryBanner, {
  USER_DISCOVERY_BANNER_DISMISSED_KEY,
  USER_DISCOVERY_BOOKING_URL,
} from '../../src/components/UserDiscoveryBanner';

describe('UserDiscoveryBanner', () => {
  it('renders nothing (marketing banner disabled in this fork)', () => {
    render(() => <UserDiscoveryBanner />);
    expect(screen.queryByText(/Talk to us and get \$25/)).toBeNull();
    expect(document.querySelector('a[href*="calendly"]')).toBeNull();
  });

  it('stays hidden even when localStorage reads throw (disabled)', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    render(() => <UserDiscoveryBanner />);
    expect(screen.queryByText(/Talk to us and get \$25/)).toBeNull();
    getItem.mockRestore();
  });

  it('does not persist any dismissed state (disabled)', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    render(() => <UserDiscoveryBanner />);
    expect(setItem).not.toHaveBeenCalled();
    setItem.mockRestore();
  });

  it('never renders interactive elements (disabled)', () => {
    render(() => <UserDiscoveryBanner />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
