import { ref, unref } from 'vue';

export {
  useClipboard
};

/**
 * @summary Enable copying of text to the user's clipboard; unrefs any proxied targets
 * @param {string} source Optional. Copy source target
 * @param {number} timeout Optional, default. Timeout denoting the limit after which the `copy` operation must resolve
 */
function useClipboard ({ source, timeout = 1500 } = {}) {
  const isSupported = Boolean(navigator && 'clipboard' in navigator);

  const text = ref('');
  const isCopied = ref(false);

  // presumably won't need `clipboard-write` permissions as the user will need to be
  // in the active tab to invoke the event to which this callback is bound
  async function copy (value = unref(source)) {
    if (isSupported && value != null) {
      await navigator.clipboard.writeText(value);
      text.value = value;
      isCopied.value = true;

      // limit before fail
      setTimeout(() => isCopied.value = false, timeout);
    }
    return isCopied.value;
  }

  return {
    isSupported,
    isCopied,
    copy
  };
}
