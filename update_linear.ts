import * as fs from 'fs';
let content = fs.readFileSync('src/components/details/LinearModelsDetail.tsx', 'utf8');

content = content.replace(/text-(amber|blue|pink|purple|emerald)-(300|400|500)/g, 'text-white');
content = content.replace(/bg-(amber|blue|pink|purple|emerald)-(300|400|500|600)\/([0-9]+)/g, 'bg-white/$2');
content = content.replace(/bg-(amber|blue|pink|purple|emerald)-(300|400|500|600)/g, 'bg-white/10');
content = content.replace(/stroke-(amber|blue|pink|purple|emerald)-(300|400|500|600)\/([0-9]+)/g, 'stroke-white/$2');
content = content.replace(/stroke-(amber|blue|pink|purple|emerald)-(300|400|500|600)/g, 'stroke-white');
content = content.replace(/fill-(amber|blue|pink|purple|emerald)-(300|400|500|600)\/([0-9]+)/g, 'fill-white/$2');
content = content.replace(/fill-(amber|blue|pink|purple|emerald)-(300|400|500|600)/g, 'fill-white');
content = content.replace(/border-(amber|blue|pink|purple|emerald)-(300|400|500|600)\/([0-9]+)/g, 'border-white/$2');
content = content.replace(/border-(amber|blue|pink|purple|emerald)-(300|400|500|600)/g, 'border-white/20');

// Les textes tout en blanc
content = content.replace(/text-slate-(400|500|300)/g, 'text-white/80');

fs.writeFileSync('src/components/details/LinearModelsDetail.tsx', content);
