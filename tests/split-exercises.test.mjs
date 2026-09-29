import test from 'node:test';
import assert from 'node:assert/strict';
import {exercises,getExerciseParts,exerciseGroups} from '../content/exercises.ts';
import {overleafExercises} from '../content/overleaf-exercises.ts';
import {splitPlans,separateExercises} from '../content/split-exercises.ts';
import {generatePracticeTest,topicKey} from '../lib/practice-test.ts';

test('cada grupo revisado se convierte en tarjetas con enunciado y solución propios',()=>{
  assert.equal(exerciseGroups.length,50);
  assert.equal(exercises.length,336);
  for(const parent of exerciseGroups){
    const children=getExerciseParts(parent.slug);
    assert.equal(children.length,parent.statement.filter(s=>/^\d+\./.test(s)).length);
    assert.ok(!exercises.some(e=>e.slug===parent.slug));
    for(const child of children){
      assert.ok(child.statement.length && child.solution.length && child.finalAnswer);
      assert.equal(child.hints.length,3);
      assert.ok(child.statement.every(s=>!/^\d+\./.test(s)));
      assert.ok(child.solution.every(s=>!/^\d+\./.test(s.body)));
      assert.deepEqual(child.relatedTheory,parent.relatedTheory);
      assert.equal(child.sourceCredit,parent.sourceCredit);
    }
  }
});
test('listas de datos y etapas dependientes permanecen juntas',()=>{
  for(const hash of ['50190d368339','c701b77850df','a3fb7bb73240','817e1b3cd571','125283c2c5a2']){
    const parent=overleafExercises.find(e=>e.slug.endsWith(hash));
    assert.equal(exercises.find(e=>e.slug===parent.slug),parent);
    assert.ok(!splitPlans[hash]);
  }
});
test('la separación es determinista y el generador usa solo tarjetas individuales',()=>{
  assert.deepEqual(separateExercises(overleafExercises),separateExercises(overleafExercises));
  const quiz=generatePracticeTest(exercises,[...new Set(exercises.map(topicKey))],()=>.4);
  assert.equal(quiz.length,5);
  assert.ok(quiz.every(e=>!exerciseGroups.some(parent=>e.slug===parent.slug)));
});
test('no se mezclan las respuestas al separar dominios y continuidad',()=>{
  const domain=exercises.find(e=>e.slug.endsWith('ac54adff0df4-parte-3'));
  assert.match(domain.finalAnswer,/-5/);
  assert.ok(!domain.statement.join(' ').includes('x^2+1'));
  const continuity=exercises.find(e=>e.slug.endsWith('8caca28938b7-parte-2'));
  assert.match(continuity.finalAnswer,/12\/5/);
  assert.ok(!continuity.finalAnswer.includes('27/2'));
});
