import { Show, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { USER_DISCOVERY_BOOKING_URL } from './UserDiscoveryBanner.jsx';

export const USER_DISCOVERY_MODAL_DISMISSED_KEY = 'manifest:user-discovery-modal-dismissed:v1';

export function readUserDiscoveryModalDismissed(): boolean {
  try {
    return window.localStorage.getItem(USER_DISCOVERY_MODAL_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function writeUserDiscoveryModalDismissed(): void {
  try {
    window.localStorage.setItem(USER_DISCOVERY_MODAL_DISMISSED_KEY, 'true');
  } catch {
    /* ignore */
  }
}

interface UserDiscoveryModalProps {
  open: boolean;
  onClose: () => void;
}

const benefits = [
  '15 minutes through a video call.',
  'Quick access to $25 of Gemini tokens through Manifest.',
  'You talk and we listen. Just questions and nothing to sell.',
];

// User discovery modal disabled in this fork — cloud marketing, not useful for self-hosted.
const UserDiscoveryModal: Component<UserDiscoveryModalProps> = () => null;

export default UserDiscoveryModal;
