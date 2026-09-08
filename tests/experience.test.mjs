import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function loadTS(file) {
  const source = await readFile(new URL(file, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { calculatePayback } = await loadTS('../src/lib/payback.ts');
const { getExperienceCopy } = await loadTS('../src/content/experience.ts');
const { openDiagnostico, DIAGNOSTIC_FALLBACK_URL } = await loadTS('../src/lib/openDiagnostico.ts');

test('payback deducts recurring cost from monthly capacity value', () => {
  assert.deepEqual(calculatePayback(7000, 2000, 250), { valid: true, net: 1750, months: 4 });
});
test('non-positive net benefit never reports a payback', () => {
  assert.equal(calculatePayback(7000, 250, 250).months, null);
  assert.deepEqual(calculatePayback(7000, 100, 250), { valid: true, net: -150, months: null });
});
test('zero investment and positive value have zero payback time', () => {
  assert.equal(calculatePayback(0, 500, 100).months, 0);
});
test('invalid, negative and non-finite inputs are rejected', () => {
  for (const bad of [-1, NaN, Infinity, -Infinity]) {
    assert.equal(calculatePayback(bad, 100, 10).valid, false);
    assert.equal(calculatePayback(100, bad, 10).valid, false);
    assert.equal(calculatePayback(100, 100, bad).valid, false);
  }
});
test('localized demo scenarios provide different meaningful outcomes', () => {
  for (const language of ['es-CO', 'en-US', 'fr-FR']) {
    const copy = getExperienceCopy(language);
    assert.equal(copy.tabs.length, 3);
    for (const kind of ['agent', 'doc', 'analytics']) {
      assert.equal(copy[`${kind}Options`].length, 2);
      assert.equal(copy[`${kind}Results`].length, 2);
      assert.notDeepEqual(copy[`${kind}Results`][0], copy[`${kind}Results`][1]);
      assert.ok(copy[`${kind}Results`].every(result => result.length >= 3));
    }
    assert.equal(copy.plans.length, 3);
    assert.equal(copy.steps.length, 4);
  }
});
test('translations have matching content shape and no empty strings', () => {
  const shape = value => Array.isArray(value) ? value.map(shape) : typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)])) : typeof value;
  const es = getExperienceCopy('es');
  for (const language of ['en', 'fr']) assert.deepEqual(shape(getExperienceCopy(language)), shape(es));
  for (const language of ['es', 'en', 'fr']) assert.ok(!JSON.stringify(getExperienceCopy(language)).includes(':""'));
});
test('CTA falls back to the existing form when advisor is not ready', () => {
  const calls = [];
  globalThis.document = { getElementById: () => ({ dataset: { ready: 'false' } }) };
  globalThis.window = { open: (...args) => calls.push(args) };
  try { openDiagnostico(); assert.deepEqual(calls, [[DIAGNOSTIC_FALLBACK_URL, '_blank', 'noopener,noreferrer']]); }
  finally { delete globalThis.window; delete globalThis.document; }
});
test('CTA reveals the ready embedded advisor instead of opening another destination', () => {
  const events = [];
  globalThis.document = { getElementById: () => ({ dataset: { ready: 'true' } }) };
  globalThis.window = { dispatchEvent: event => events.push(event.type), open: () => assert.fail('unexpected popup') };
  try { openDiagnostico(); assert.deepEqual(events, ['husai:open-chat']); }
  finally { delete globalThis.window; delete globalThis.document; }
});
test('CTA is safe during server-side evaluation', () => { assert.doesNotThrow(openDiagnostico); });
