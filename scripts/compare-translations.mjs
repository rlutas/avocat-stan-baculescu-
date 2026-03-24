import { readFileSync } from 'fs';

const ro = JSON.parse(readFileSync('messages/ro.json', 'utf8'));
const en = JSON.parse(readFileSync('messages/en.json', 'utf8'));

function getKeyPaths(obj, prefix = '') {
  const paths = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      paths.push(...getKeyPaths(obj[key], fullKey));
    } else {
      paths.push(fullKey);
    }
  }
  return paths;
}

function getValue(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

const roPaths = new Set(getKeyPaths(ro));
const enPaths = new Set(getKeyPaths(en));

// Keys in ro but not en
const missingInEn = [...roPaths].filter(p => !enPaths.has(p));
// Keys in en but not ro
const missingInRo = [...enPaths].filter(p => !roPaths.has(p));

// Empty strings in en where ro is non-empty
const emptyInEn = [...roPaths].filter(p => {
  const roVal = getValue(ro, p);
  const enVal = getValue(en, p);
  return enVal === '' && roVal !== '';
});

// Empty strings in ro where en is non-empty
const emptyInRo = [...roPaths].filter(p => {
  const roVal = getValue(ro, p);
  const enVal = getValue(en, p);
  return roVal === '' && enVal !== '';
});

let hasIssues = false;

console.log(`\nTotal leaf keys — RO: ${roPaths.size}, EN: ${enPaths.size}\n`);

if (missingInEn.length) {
  hasIssues = true;
  console.log(`--- KEYS MISSING IN en.json (${missingInEn.length}) ---`);
  missingInEn.forEach(p => console.log(`  ${p}`));
  console.log();
}

if (missingInRo.length) {
  hasIssues = true;
  console.log(`--- KEYS MISSING IN ro.json (${missingInRo.length}) ---`);
  missingInRo.forEach(p => console.log(`  ${p}`));
  console.log();
}

if (emptyInEn.length) {
  hasIssues = true;
  console.log(`--- EMPTY VALUES IN en.json (ro has content) (${emptyInEn.length}) ---`);
  emptyInEn.forEach(p => console.log(`  ${p} — ro: "${getValue(ro, p)}"`));
  console.log();
}

if (emptyInRo.length) {
  hasIssues = true;
  console.log(`--- EMPTY VALUES IN ro.json (en has content) (${emptyInRo.length}) ---`);
  emptyInRo.forEach(p => console.log(`  ${p} — en: "${getValue(en, p)}"`));
  console.log();
}

if (!hasIssues) {
  console.log('ALL CHECKS PASSED — no missing keys or empty translations found.');
}
