import { afterEach, describe, expect, test } from 'bun:test';

import {
  disposeHighlighter,
  getSharedHighlighter,
} from '../src/highlighter/shared_highlighter';
import { getFiletypeFromFileName } from '../src/utils/getFiletypeFromFileName';

afterEach(async () => {
  await disposeHighlighter();
});

describe('baml language support', () => {
  test('maps .baml files to the baml language', () => {
    expect(getFiletypeFromFileName('main.baml')).toBe('baml');
    expect(getFiletypeFromFileName('nested/dir/clients.baml')).toBe('baml');
  });

  test('resolves and highlights baml via the shared highlighter', async () => {
    const highlighter = await getSharedHighlighter({
      themes: ['pierre-dark'],
      langs: ['baml'],
      preferredHighlighter: 'shiki-js',
    });

    expect(highlighter.getLoadedLanguages()).toContain('baml');

    const tokens = highlighter.codeToTokensBase(
      'function ExtractResume(resume: string) -> Resume {\n  client GPT4\n}',
      { lang: 'baml', theme: 'pierre-dark' }
    );
    // The grammar should split the first line into multiple scoped tokens
    // rather than falling back to a single plain-text token.
    expect(tokens[0].length).toBeGreaterThan(1);
  });
});
