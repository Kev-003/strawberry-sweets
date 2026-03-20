const fs = require('fs');
const content = fs.readFileSync('c:/Users/User\'s/Desktop/Kevern/StrawberrySweets/strawberry-sweets/resources/js/components/app-logo-icon.tsx', 'utf8');
// Find all d="..." strings
const matches = content.match(/d="([^"]+)"/g);
if (!matches) {
    console.log('No paths found');
    process.exit(1);
}

let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
matches.forEach(m => {
    const d = m.slice(3, -1);
    // Find all numbers in the path
    const nums = d.match(/-?\d+(\.\d+)?/g);
    if (nums) {
        nums.forEach((n, i) => {
            const val = parseFloat(n);
            if (i % 2 === 0) {
                if (val < minX) minX = val;
                if (val > maxX) maxX = val;
            } else {
                if (val < minY) minY = val;
                if (val > maxY) maxY = val;
            }
        });
    }
});

console.log(JSON.stringify({minX, maxX, minY, maxY}, null, 2));
