import fs from 'fs';
import path from 'path';

const dir = 'd:/Collage Lakshya Hidau/talentconnect/client/src/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix text colors
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(text-(?:slate|gray|zinc)-900)(?!.*?dark:text-)(.*?[\"\'\`\}])/g, '$1$2 dark:text-white$3');
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(text-(?:slate|gray|zinc)-800)(?!.*?dark:text-)(.*?[\"\'\`\}])/g, '$1$2 dark:text-slate-200$3');
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(text-(?:slate|gray|zinc)-700)(?!.*?dark:text-)(.*?[\"\'\`\}])/g, '$1$2 dark:text-slate-300$3');
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(text-(?:slate|gray|zinc)-600)(?!.*?dark:text-)(.*?[\"\'\`\}])/g, '$1$2 dark:text-slate-400$3');

  // Fix bg-white missing dark mode background
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(bg-white)(?!.*?dark:bg-)(.*?[\"\'\`\}])/g, '$1$2 dark:bg-card-dark$3');

  fs.writeFileSync(filePath, content, 'utf-8');
});
console.log('Processed files successfully.');
