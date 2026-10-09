const { chromium }=require('@playwright/test');
const {default:AxeBuilder}=require('@axe-core/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
const browser=await chromium.launch();const ctx=await browser.newContext({viewport:{width:1512,height:1050},permissions:['clipboard-read','clipboard-write']});const page=await ctx.newPage();
const base=process.env.BASE_URL||'http://127.0.0.1:4173',errors=[],audits=[];
page.on('pageerror',e=>errors.push(e.message));
async function audit(name){const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();audits.push({name,violations:a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});}
async function range(id,value){await page.locator(id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},value);}
fs.mkdirSync('.qa',{recursive:true});
await page.goto(base+'/#laboratoire',{waitUntil:'networkidle'});
assert.match(await page.locator('#metric-value').innerText(),/1.?650/);
await audit('Laboratoire : droite');
await range('#slope','10');assert.match(await page.locator('#equation').innerText(),/10,000/);
assert.doesNotMatch(await page.locator('#metric-value').innerText(),/1.?650/);
await page.locator('#fit-model').click();assert.match(await page.locator('#metric-value').innerText(),/145,47/);
await page.screenshot({path:'.qa/lab-desktop.png',fullPage:true});
await page.locator('.lab-tab[data-mode=residus]').click();assert.match(await page.locator('#metric-value').innerText(),/\+16,28/);
await page.locator('#home-select').selectOption('1');assert.match(await page.locator('#metric-value').innerText(),/-9,25/);
await audit('Laboratoire : résidus');
await page.locator('.lab-tab[data-mode=prediction]').click();assert.equal(await page.locator('#metric-name').innerText(),'Interpolation');
await range('#surface','200');assert.equal(await page.locator('#metric-name').innerText(),'Extrapolation');assert.match(await page.locator('#metric-value').innerText(),/1.?751,74/);
await audit('Laboratoire : extrapolation');
await page.locator('.lab-tab[data-mode=atypique]').click();assert.match(await page.locator('#metric-value').innerText(),/8,106/);
await range('#factor','3');assert.doesNotMatch(await page.locator('#metric-value').innerText(),/8,106/);
await page.locator('.sim-data summary').click();assert.equal(await page.locator('#sim-table tbody tr').count(),15);
assert.match(await page.locator('#sim-table tbody tr').last().innerText(),/3.?405/);
await audit('Laboratoire : valeur atypique et tableau');
await page.locator('#sim-reset').click();assert.match(await page.locator('#metric-value').innerText(),/8,106/);
await page.goto(base+'/#compte-rendu');
await page.locator('#source-view').click();assert.equal(await page.locator('#notebook-rendered').isVisible(),false);assert.equal(await page.locator('#notebook-source').isVisible(),true);
await page.locator('#copy-markdown').click();assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/## Q7/);
await audit('Markdown source');
await page.locator('#rendered-view').click();assert.equal(await page.locator('#notebook-source').isVisible(),false);
await page.screenshot({path:'.qa/notebook-desktop.png',fullPage:true});
await audit('Notebook rendu');
for(const id of [4,7,15,20]){
 await page.goto(base+'/#etape-'+id);
 await page.waitForFunction(n=>document.querySelector('.lesson-heading').textContent.includes('Étape '+String(n).padStart(2,'0')),id);
 assert.equal(await page.locator('.result-window').count(),1);
 if(id!==4)await page.waitForFunction(()=>{const e=document.querySelector('.figure-open img');return e && e.complete && e.naturalWidth>0;});
 if(id!==4)assert.equal(await page.locator('.figure-open img').evaluate(e=>e.complete&&e.naturalWidth>0),true);
 await audit('Sortie Q'+id);
}
await page.goto(base+'/#etape-7');await page.screenshot({path:'.qa/resultat-desktop.png',fullPage:true});
await page.goto(base+'/#compte-rendu');await page.locator('.notebook-workshop').screenshot({path:'.qa/notebook-exemple.png'});
await page.setViewportSize({width:390,height:844});
for(const hash of ['laboratoire','etape-7','compte-rendu','etape-22']){
 await page.goto(base+'/#'+hash);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'overflow '+hash);
 await audit('Mobile '+hash);
}
await page.goto(base+'/#laboratoire');await page.screenshot({path:'.qa/lab-mobile.png',fullPage:true});
await page.setViewportSize({width:320,height:780});await page.goto(base+'/#laboratoire');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
await page.locator('#slope').focus();let before=await page.locator('#slope').inputValue();await page.keyboard.press('ArrowRight');assert.notEqual(await page.locator('#slope').inputValue(),before);
assert.deepEqual(errors,[]);
fs.writeFileSync('.qa/lab-audit.json',JSON.stringify(audits,null,2));console.log(JSON.stringify({functional:'passed',audits},null,2));
await browser.close();assert.equal(audits.reduce((s,a)=>s+a.violations.length,0),0);
})().catch(e=>{console.error(e);process.exit(1);});