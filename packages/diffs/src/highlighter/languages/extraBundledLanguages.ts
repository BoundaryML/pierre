import type { DynamicImportLanguageRegistration } from 'shiki';

/**
 * Languages that ship with @pierre/diffs but are not part of shiki's bundle.
 * Each loader mirrors shiki's bundled-language loaders: a dynamic import (so
 * bundlers can code-split the grammar) resolving to
 * `{ default: LanguageRegistration[] }`. Loaders here are resolved by
 * `resolveLanguage` after user-registered custom languages and shiki's own
 * bundled languages, so both of those take precedence.
 */
export const ExtraBundledLanguages: Record<
  string,
  DynamicImportLanguageRegistration
> = {
  baml: async () => {
    const { default: baml } = await import('@boundaryml/baml-grammar');
    return { default: [baml] };
  },
};
