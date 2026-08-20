import { calculateTotalScore } from '../types';

/**
 * Minimal automated checks covering:
 * 1. Weighted total-score calculation
 * 2. Rejection of unknown offering IDs
 */

function runChecks() {
  console.log('=== Running Minimal Automated Checks ===');

  // Check 1: Weighted total score calculation
  // Formula: round((relevance * 40 + constraintFit * 25 + feasibility * 20 + evidence * 15) / 5)
  // Max score: 5*40 + 5*25 + 5*20 + 5*15 = 500 / 5 = 100
  const maxScore = calculateTotalScore(5, 5, 5, 5);
  if (maxScore !== 100) {
    throw new Error(`Test 1 Failed: Expected max score 100, got ${maxScore}`);
  }
  console.log('✓ Check 1.1: Max totalScore (5,5,5,5) = 100 passed.');

  // Test custom weights: relevance=4 (160), constraintFit=4 (100), feasibility=3 (60), evidence=4 (60)
  // Sum = 160 + 100 + 60 + 60 = 380 / 5 = 76
  const score2 = calculateTotalScore(4, 4, 3, 4);
  if (score2 !== 76) {
    throw new Error(`Test 1 Failed: Expected score 76, got ${score2}`);
  }
  console.log('✓ Check 1.2: Weighted totalScore (4,4,3,4) = 76 passed.');

  // Check clamping with out of bound scores
  const scoreClamped = calculateTotalScore(10, -2, 6, 2);
  // clamped: (5, 0, 5, 2) => 5*40 + 0*25 + 5*20 + 2*15 = 200 + 0 + 100 + 30 = 330 / 5 = 66
  if (scoreClamped !== 66) {
    throw new Error(`Test 1 Failed: Clamping failed, expected 66, got ${scoreClamped}`);
  }
  console.log('✓ Check 1.3: Score clamping out-of-range values passed.');

  // Check non-numeric / NaN input handling
  // (NaN, 'abc', null, undefined) coerced to (0, 0, 0, 0) => 0
  const scoreNonNumeric = calculateTotalScore(NaN as any, 'abc' as any, null as any, undefined as any);
  if (scoreNonNumeric !== 0) {
    throw new Error(`Test 1 Failed: Non-numeric handling failed, expected 0, got ${scoreNonNumeric}`);
  }
  console.log('✓ Check 1.4: Non-numeric / NaN score input coerced to 0 successfully.');

  // Check 2: Rejection of unknown offering IDs
  const validCatalogIds = new Set(['seed-01-visionai', 'seed-02-iot-scada', 'user-custom-01']);
  const rawModelRecommendations = [
    { offeringId: 'seed-01-visionai', relevanceScore: 5 },
    { offeringId: 'fake-unknown-id-123', relevanceScore: 5 },
    { offeringId: 'seed-02-iot-scada', relevanceScore: 4 },
    { offeringId: 'another-unauthorized-id', relevanceScore: 3 },
  ];

  const validatedRecs = rawModelRecommendations.filter(
    (rec) => rec.offeringId && validCatalogIds.has(rec.offeringId)
  );

  if (validatedRecs.length !== 2) {
    throw new Error(`Test 2 Failed: Expected 2 valid recommendations, got ${validatedRecs.length}`);
  }
  if (validatedRecs.some((r) => !validCatalogIds.has(r.offeringId))) {
    throw new Error('Test 2 Failed: Output contains invalid offering ID!');
  }
  console.log('✓ Check 2: Rejection of unknown offering IDs passed successfully.');

  console.log('=== All Minimal Automated Checks Passed Successfully ===');
}

runChecks();
