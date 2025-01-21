/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@clerk/astro/env" />

interface ImportMetaEnv {
  readonly POSTS_PER_PAGE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
