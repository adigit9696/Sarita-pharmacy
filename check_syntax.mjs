import { readFileSync } from 'fs';

const code = readFileSync('./src/App.jsx', 'utf8');
const lines = code.split('\n');

// Track brace depth to find returns at depth 0
let depth = 0;
let inTemplateLiteral = false;
let inString = false;
let stringChar = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Simple check: skip lines inside the Styles template literal (between backticks)
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    const prev = j > 0 ? line[j-1] : '';
    
    if (inString) {
      if (ch === stringChar && prev !== '\\') inString = false;
      continue;
    }
    
    if (ch === '`') {
      inTemplateLiteral = !inTemplateLiteral;
      continue;
    }
    
    if (inTemplateLiteral) continue;
    
    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      continue;
    }
    
    if (ch === '/' && j + 1 < line.length && line[j+1] === '/') break; // line comment
    
    if (ch === '{') depth++;
    if (ch === '}') depth--;
  }
  
  // Check for return at depth 0
  const trimmed = line.trim();
  if (depth === 0 && trimmed.match(/^return[\s(]/)) {
    console.log(`❌ ORPHAN RETURN at line ${i + 1} (depth=${depth}): ${trimmed.substring(0, 100)}`);
  }
}

console.log(`\nFinal depth: ${depth}`);
console.log('Done.');
