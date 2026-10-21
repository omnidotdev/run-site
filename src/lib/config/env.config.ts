const env =
  typeof window === "undefined"
    ? { ...process.env, ...import.meta.env }
    : import.meta.env;

export const { VITE_BASE_URL: BASE_URL } = env;

/** @knipignore - Used when ComingSoon teaser is enabled */
export const isDevEnv = import.meta.env.DEV;
