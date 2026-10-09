const fs=require('node:fs'),path=require('node:path');
const names=['index.html','styles.css','app.js','data.js','favicon.svg','logements.csv','TP1_Regression_Lineaire.ipynb'];
fs.mkdirSync('dist',{recursive:true});
for(const name of names)fs.copyFileSync(name,path.join('dist',name));
console.log('Static site built: '+names.length+' files.');