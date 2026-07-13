// Extract medicine names from XLSX column B and output as JSON array
const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'MEDICINE PRODUCT NAME.xlsx');
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Column B = index 1, skip header row
const medicines = [];
for (let i = 1; i < data.length; i++) {
  const name = data[i]?.[1];
  if (name && typeof name === 'string' && name.trim()) {
    medicines.push(name.trim());
  }
}

// Remove duplicates
const unique = [...new Set(medicines)];

console.log(`Found ${unique.length} unique medicine names`);

// Write to a JS module
const output = `// Auto-generated medicine list from MEDICINE PRODUCT NAME.xlsx
// Total: ${unique.length} medicines
const MEDICINE_LIST = ${JSON.stringify(unique, null, 0)};
export default MEDICINE_LIST;
`;

require('fs').writeFileSync(path.join(__dirname, 'src', 'medicineList.js'), output, 'utf8');
console.log('Written to src/medicineList.js');
