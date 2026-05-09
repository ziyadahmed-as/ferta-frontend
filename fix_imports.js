const fs = require('fs');
const filePath = 'C:\\Users\\Django\\Desktop\\project\\firstOffer\\fatra-frontend\\app\\admin\\dashboard\\page.tsx';
const file = fs.readFileSync(filePath, 'utf8');
const lines = file.split('\n');

const newLines = [
  ...lines.slice(0, 16),
  '  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,',
  '  ResponsiveContainer, Legend, BarChart, Bar, Cell',
  '} from "recharts";',
  ...lines.slice(17, 34),
  ...lines.slice(38)
];

fs.writeFileSync(filePath, newLines.join('\n'));
