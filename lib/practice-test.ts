import type { Exercise } from "../content/exercises.ts";

export const testQuota = { Inicial: 1, Intermedio: 2, Desafío: 2 } as const;
export type TestLevel = keyof typeof testQuota;
export const testLevels = Object.keys(testQuota) as TestLevel[];
export const topicKey = (exercise: Pick<Exercise, "courseSlug" | "topic">) => `${exercise.courseSlug}::${exercise.topic}`;
export function isTestReady(exercise: Exercise) {
  return exercise.difficulty in testQuota && exercise.hints.length > 0 && exercise.solution.length > 0 && !!exercise.finalAnswer.trim();
}
export function testPool(exercises: Exercise[], topics: string[]) {
  const seenSlugs = new Set<string>();
  const seenStatements = new Set<string>();
  return exercises.filter(exercise => {
    if (!topics.includes(topicKey(exercise)) || !isTestReady(exercise)) return false;
    const content = exercise.statement.join(" ").replace(/\s+/g, "");
    if (seenSlugs.has(exercise.slug) || seenStatements.has(content)) return false;
    seenSlugs.add(exercise.slug);
    seenStatements.add(content);
    return true;
  });
}
export function testAvailability(exercises: Exercise[]) {
  return Object.fromEntries(testLevels.map(level => [level, exercises.filter(e => e.difficulty === level).length])) as Record<TestLevel, number>;
}
export function generatePracticeTest(exercises: Exercise[], topics: string[], random = Math.random): Exercise[] {
  const pool = testPool(exercises, topics);
  const available = testAvailability(pool);
  if (testLevels.some(level => available[level] < testQuota[level])) return [];
  return testLevels.flatMap(level => {
    const choices = pool.filter(e => e.difficulty === level);
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices.slice(0, testQuota[level]);
  });
}
