import { Show, createSignal, type Component } from 'solid-js';

export const USER_DISCOVERY_BANNER_DISMISSED_KEY = 'manifest:user-discovery-banner-dismissed:v1';

export const USER_DISCOVERY_BOOKING_URL =
  'https://calendly.com/sebastien-manifest/15min';

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(USER_DISCOVERY_BANNER_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeDismissed(): void {
  try {
    window.localStorage.setItem(USER_DISCOVERY_BANNER_DISMISSED_KEY, 'true');
  } catch {
    /* ignore */
  }
}

// User discovery banner disabled in this fork — cloud marketing, not useful for self-hosted.
const UserDiscoveryBanner: Component = () => null;

export default UserDiscoveryBanner;
