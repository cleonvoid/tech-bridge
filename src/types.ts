export type DeploymentModel = 'on-premise' | 'cloud' | 'hybrid' | 'consulting';

export type ReadinessLevel = 'prototype' | 'pilot-ready' | 'deployment-ready' | 'commercial';

export interface TechnologyOffering {
  id: string;
  ownerId: string | null;
  source: 'seed' | 'user';
  organizationName: string;
  solutionName: string;
  summary: string;
  categories: string[];
  industries: string[];
  problemsSolved: string[];
  capabilities: string[];
  deploymentModel: DeploymentModel;
  budgetMinMillionVND: number | null;
  budgetMaxMillionVND: number | null;
  implementationWeeksMin: number | null;
  implementationWeeksMax: number | null;
  locations: string[];
  readinessLevel: ReadinessLevel;
  evidence: string[];
  contactName: string;
  contactEmail: string;
  createdAt: string;
}

export interface TechnologyNeed {
  rawText: string;
  industry: string | null;
  problem: string;
  goals: string[];
  mustHaves: string[];
  budgetMaxMillionVND: number | null;
  desiredTimelineWeeks: number | null;
  location: string | null;
  assumptions: string[];
  missingInformation: string[];
}

export interface Recommendation {
  offeringId: string;
  relevanceScore: number; // 0-5
  constraintFitScore: number; // 0-5
  feasibilityScore: number; // 0-5
  evidenceScore: number; // 0-5
  totalScore: number; // 0-100 (computed via formula)
  reasons: string[];
  cautions: string[];
  catalogEvidence: string[];
  suggestedQuestions: string[];
}

export interface RecommendResponse {
  normalizedNeed: TechnologyNeed;
  recommendations: Recommendation[];
}

export interface NormalizeOfferingResponse {
  normalizedOffering: Omit<TechnologyOffering, 'id' | 'ownerId' | 'source' | 'createdAt'>;
  missingInformation: string[];
  confidence: 'low' | 'medium' | 'high';
}

/**
 * Deterministic formula to compute the 0-100 total score.
 * Formula: round((relevance*40 + constraintFit*25 + feasibility*20 + evidence*15) / 5)
 */
export function calculateTotalScore(
  relevance: number,
  constraintFit: number,
  feasibility: number,
  evidence: number
): number {
  const rel = Math.max(0, Math.min(5, Math.round(relevance)));
  const con = Math.max(0, Math.min(5, Math.round(constraintFit)));
  const fea = Math.max(0, Math.min(5, Math.round(feasibility)));
  const evi = Math.max(0, Math.min(5, Math.round(evidence)));

  return Math.round((rel * 40 + con * 25 + fea * 20 + evi * 15) / 5);
}
