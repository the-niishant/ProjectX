export const trackEvent = (name, properties = {}) => {
  const detail = {
    name,
    properties,
    timestamp: new Date().toISOString()
  };

  window.dispatchEvent(new CustomEvent("elite-weavers:analytics", { detail }));

  if (import.meta.env.DEV) {
    console.info(`[analytics] ${name}`, properties);
  }
};
