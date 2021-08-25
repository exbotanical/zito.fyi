import { not, isFunction } from 'js-heuristics';
import { ref, watch } from 'vue';

export {
  useNetwork
};

/**
 * @summary Generates reactive network status listeners
 */
function useNetwork () {
  const navigator = window?.navigator;

  const isSupported = Boolean(navigator && 'connection' in navigator);

  /**
   * Is the user is currently connected?
   */
  const isOnline = ref(true);

  /**
   * The time at which the user was last connected
   */
  const offlineAt = ref(undefined);

  /**
   * The download speed in Mbps
   */
  const downlink = ref(undefined);

  /**
   * The max reachable download speed in Mbps
   */
  const downlinkMax = ref(undefined);

  /**
   * The detected connection/network type.
   */
  const connType = ref('unknown');

  const conn = isSupported && navigator.connection;

  function updateNetworkInformation () {
    if (not(navigator)) return;

    isOnline.value = navigator.onLine;
    offlineAt.value = isOnline.value ? undefined : Date.now();

    if (conn) {
      downlink.value = conn.downlink;
      downlinkMax.value = conn.downlinkMax;
      connType.value = conn.type;
    }
  }

  if (window) {
    window.addEventListener('offline', () => {
      isOnline.value = false;
      offlineAt.value = Date.now();
    });

    window.addEventListener('online', () => {
      isOnline.value = true;
    });
  }

  if (conn) {
    conn.onchange = updateNetworkInformation;
  }

  updateNetworkInformation();

  function handleConn (offline, online) {
    watch(
      () => isOnline.value,
      (next, prev) => {
        if (!next && isFunction(offline)) {
          offline();
        } else if (isFunction(online)) {
          online();
        }
      });
  }

  return {
    isSupported,
    isOnline,
    offlineAt,
    downlink,
    downlinkMax,
    connType,
    handleConn
  };
}
