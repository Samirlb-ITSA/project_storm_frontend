declare module '*.svg' {
  const content: any;
  export default content;
}

interface ImportMetaEnv {
  VITE_BACKEND_BASE_URL?: string;
  // more env variables...
}

interface ImportMeta {
  env: ImportMetaEnv;
}