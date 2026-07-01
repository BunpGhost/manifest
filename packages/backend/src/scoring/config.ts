import { ScorerConfig } from './types';
import { DEFAULT_KEYWORDS, getKeywordsByLanguage } from './keywords';

export { DEFAULT_KEYWORDS } from './keywords';

const DEFAULT_LANGUAGE = 'en';

const DIMENSION_DEFS: Array<{
  name: string;
  weight: number;
  direction: 'up' | 'down';
}> = [
  { name: 'formalLogic', weight: 0.07, direction: 'up' },
  { name: 'analyticalReasoning', weight: 0.06, direction: 'up' },
  { name: 'codeGeneration', weight: 0.06, direction: 'up' },
  { name: 'codeReview', weight: 0.05, direction: 'up' },
  { name: 'technicalTerms', weight: 0.07, direction: 'up' },
  { name: 'simpleIndicators', weight: 0.08, direction: 'down' },
  { name: 'multiStep', weight: 0.07, direction: 'up' },
  { name: 'creative', weight: 0.03, direction: 'up' },
  { name: 'questionComplexity', weight: 0.03, direction: 'up' },
  { name: 'imperativeVerbs', weight: 0.02, direction: 'up' },
  { name: 'outputFormat', weight: 0.02, direction: 'up' },
  { name: 'domainSpecificity', weight: 0.05, direction: 'up' },
  { name: 'agenticTasks', weight: 0.03, direction: 'up' },
  { name: 'relay', weight: 0.02, direction: 'down' },
  { name: 'webBrowsing', weight: 0, direction: 'up' },
  { name: 'dataAnalysis', weight: 0, direction: 'up' },
  { name: 'imageGeneration', weight: 0, direction: 'up' },
  { name: 'videoGeneration', weight: 0, direction: 'up' },
  { name: 'socialMedia', weight: 0, direction: 'up' },
  { name: 'emailManagement', weight: 0, direction: 'up' },
  { name: 'calendarManagement', weight: 0, direction: 'up' },
  { name: 'trading', weight: 0, direction: 'up' },
  { name: 'tokenCount', weight: 0.05, direction: 'up' },
  { name: 'nestedListDepth', weight: 0.03, direction: 'up' },
  { name: 'conditionalLogic', weight: 0.03, direction: 'up' },
  { name: 'codeToProse', weight: 0.02, direction: 'up' },
  { name: 'constraintDensity', weight: 0.03, direction: 'up' },
  { name: 'expectedOutputLength', weight: 0.04, direction: 'up' },
  { name: 'repetitionRequests', weight: 0.02, direction: 'up' },
  { name: 'toolCount', weight: 0.04, direction: 'up' },
  { name: 'conversationDepth', weight: 0.03, direction: 'up' },
];

/**
 * Build a ScorerConfig with keywords for the given language.
 * Falls back to English if the language is unsupported.
 */
export function buildConfig(language: string = DEFAULT_LANGUAGE): ScorerConfig {
  const keywords = getKeywordsByLanguage(language);
  return {
    dimensions: DIMENSION_DEFS.map((d) => ({
      ...d,
      keywords: d.name in keywords ? keywords[d.name] : undefined,
    })),
    boundaries: { simpleMax: -0.1, standardMax: 0.08, complexMax: 0.35 },
    confidenceK: 8,
    confidenceMidpoint: 0.15,
    confidenceThreshold: 0.45,
    language,
  };
}

/** Default English config — backward compatible. */
export const DEFAULT_CONFIG: ScorerConfig = buildConfig('en');
