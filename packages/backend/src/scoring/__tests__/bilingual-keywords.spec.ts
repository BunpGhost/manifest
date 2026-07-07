/**
 * Tests for bilingual (EN ∪ PT) keyword merging.
 */
import { COMPLEXITY_KEYWORDS, getComplexityKeywords } from '../keywords/complexity';

describe('bilingual keywords — COMPLEXITY_KEYWORDS[bilingual]', () => {
  const en = COMPLEXITY_KEYWORDS.en;
  const pt = COMPLEXITY_KEYWORDS.pt;
  const bilingual = COMPLEXITY_KEYWORDS.bilingual;

  it('exists and is a Record<string, string[]>', () => {
    expect(bilingual).toBeDefined();
    expect(typeof bilingual).toBe('object');
  });

  it('has all dimensions from EN', () => {
    for (const dim of Object.keys(en)) {
      expect(bilingual).toHaveProperty(dim);
    }
  });

  it('has all dimensions from PT', () => {
    for (const dim of Object.keys(pt)) {
      expect(bilingual).toHaveProperty(dim);
    }
  });

  it('contains EN keywords (write a function in codeGeneration)', () => {
    expect(bilingual.codeGeneration).toContain('write a function');
  });

  it('contains PT keywords (criar uma funcao in codeGeneration)', () => {
    expect(bilingual.codeGeneration).toContain('criar uma funcao');
  });

  it('deduplicates case-insensitive duplicates', () => {
    const okCount = bilingual.simpleIndicators.filter((k) => k.toLowerCase() === 'ok').length;
    expect(okCount).toBe(1);

    const whatIsCount = bilingual.simpleIndicators.filter(
      (k) => k.toLowerCase() === 'what is',
    ).length;
    expect(whatIsCount).toBe(1);
  });

  it('keeps distinct keywords from both languages', () => {
    expect(bilingual.formalLogic).toContain('prove');
    expect(bilingual.formalLogic).toContain('provar');
  });

  it('has more keywords than EN alone', () => {
    const enTotal = Object.values(en).reduce((acc, arr) => acc + arr.length, 0);
    const biTotal = Object.values(bilingual).reduce((acc, arr) => acc + arr.length, 0);
    expect(biTotal).toBeGreaterThan(enTotal);
  });

  it('has more keywords than PT alone', () => {
    const ptTotal = Object.values(pt).reduce((acc, arr) => acc + arr.length, 0);
    const biTotal = Object.values(bilingual).reduce((acc, arr) => acc + arr.length, 0);
    expect(biTotal).toBeGreaterThan(ptTotal);
  });
});

describe('bilingual keywords — getComplexityKeywords fallback', () => {
  it('getComplexityKeywords(bilingual) returns the merged set', () => {
    const result = getComplexityKeywords('bilingual');
    expect(result.codeGeneration).toContain('write a function');
    expect(result.codeGeneration).toContain('criar uma funcao');
  });

  it('getComplexityKeywords(fr) falls back to EN', () => {
    const result = getComplexityKeywords('fr');
    expect(result).toBe(COMPLEXITY_KEYWORDS.en);
  });

  it('getComplexityKeywords(en) == COMPLEXITY_KEYWORDS.en', () => {
    expect(getComplexityKeywords('en')).toBe(COMPLEXITY_KEYWORDS.en);
  });

  it('getComplexityKeywords(pt) == COMPLEXITY_KEYWORDS.pt', () => {
    expect(getComplexityKeywords('pt')).toBe(COMPLEXITY_KEYWORDS.pt);
  });
});

describe('bilingual keywords — backward compatibility', () => {
  it('en mode is unchanged', () => {
    expect(COMPLEXITY_KEYWORDS.en.codeGeneration).toContain('write a function');
    expect(COMPLEXITY_KEYWORDS.en.codeGeneration).not.toContain('criar uma funcao');
  });

  it('pt mode is unchanged', () => {
    expect(COMPLEXITY_KEYWORDS.pt.codeGeneration).toContain('criar uma funcao');
    expect(COMPLEXITY_KEYWORDS.pt.codeGeneration).not.toContain('write a function');
  });
});
