'use strict';
function resultPreview(id) {
 const o=OUTPUTS[String(id)];
 return '<section class="result-window" aria-label="Résultat attendu dans Jupyter"><div class="window-bar"><span class="window-dots" aria-hidden="true">● ● ●</span><strong>Résultat dans Jupyter</strong><span class="result-badge">SORTIE VÉRIFIÉE</span></div><div class="output-cell"><span class="cell-prompt">Out ['+id+']</span><div class="output-content">'+
 o.tables.map(t=>'<div class="result-scroll" tabindex="0" aria-label="Tableau de sortie défilant">'+t+'</div>').join('')+
 (o.stdout?'<pre class="stdout" tabindex="0">'+escapeHTML(o.stdout)+'</pre>':'')+
 o.figures.map(src=>'<a class="figure-open" href="'+src+'" target="_blank" rel="noopener" aria-label="Agrandir le graphique attendu, nouvelle fenêtre"><img src="'+src+'" alt="'+({7:'Nuage des 20 logements fictifs : la surface en m² et le prix en kDH augmentent ensemble.',15:'15 points d’apprentissage et droite ajustée de pente 8,106 et constante 130,54.',20:'Résidus selon la surface : les cinq points de test ont un résidu positif.'}[id]||'Graphique attendu')+'"><span>Agrandir ↗</span></a>').join('')+
 '</div></div><div class="output-caption">'+(id===1||id===24?'Les numéros de version peuvent différer sur votre ordinateur.':id===23?'Données de départ uniquement. À vous de produire les résultats du défi.':'Sortie obtenue en exécutant le code fourni. Le style peut varier selon votre version de Jupyter.')+'</div></section>';
}
const notebookMarkdown = '## Q7 — Relation entre surface et prix\n\n**Objectif :** observer la relation entre les deux variables.\n\n- Variable explicative : surface (m²).\n- Variable cible : prix (kDH).\n\n### Interprétation\nLe nuage de points montre une tendance croissante presque linéaire.\nUn logement plus grand tend à être plus cher dans cet échantillon fictif.\nCette association ne démontre pas une causalité.\n\n**Limite :** la localisation et l’état des logements ne sont pas pris en compte.';
function upgradeReport() {
 main.querySelector('.page-intro h1').innerHTML='À vous de rédiger<br><span>un vrai notebook.</span>';
 main.querySelector('.page-intro p').textContent='L’enseignant fournit l’énoncé, le code et les corrections. Vous construisez le compte rendu dans Jupyter : Markdown, code exécuté, résultats, interprétation.';
 const panel=document.createElement('section');
 panel.className='notebook-workshop';
 panel.innerHTML='<div class="section-top"><div><span class="mini-kicker">LE BON FORMAT</span><h2>Une question. Trois types de cellules.</h2></div><span class="format-badge">Exemple de mise en forme · Q7</span></div><div class="cell-pattern"><span><b>01</b> Markdown : annoncer</span><i>→</i><span><b>02</b> Code : produire</span><i>→</i><span><b>03</b> Markdown : interpréter</span></div><div class="notebook-example"><div class="notebook-toolbar"><span aria-hidden="true">◉</span><strong>Nom_Prenom_TP1.ipynb</strong><span class="notebook-kernel">Python 3</span></div><div class="workshop-controls"><div role="group" aria-label="Affichage de l’exemple"><button class="view-toggle active" id="rendered-view" aria-pressed="true">Rendu notebook</button><button class="view-toggle" id="source-view" aria-pressed="false">Source Markdown</button></div><button class="copy-light" id="copy-markdown">Copier le Markdown</button></div><div id="notebook-rendered"><div class="demo-cell markdown-cell"><span class="demo-cell-type">MARKDOWN</span><div><h3>Q7 — Relation entre surface et prix</h3><p><strong>Objectif :</strong> observer la relation entre les deux variables.</p><ul><li>Variable explicative : surface (m²).</li><li>Variable cible : prix (kDH).</li></ul></div></div><div class="demo-cell"><span class="cell-prompt">In [7]</span><pre tabindex="0" aria-label="Exemple de code Python"><code>'+highlight(LESSONS[6].code)+'</code></pre></div><div class="demo-cell"><span class="cell-prompt">Out [7]</span><img src="figures/q07.svg" alt="Exemple de sortie graphique du nuage surface-prix, axes avec unités."></div><div class="demo-cell markdown-cell"><span class="demo-cell-type">MARKDOWN</span><div><h3>Interprétation</h3><p>Le nuage de points montre une <strong>tendance croissante presque linéaire</strong>. Un logement plus grand tend à être plus cher dans cet échantillon fictif. Cette association ne démontre pas une causalité.</p><p><strong>Limite :</strong> la localisation et l’état des logements ne sont pas pris en compte.</p></div></div></div><div id="notebook-source" hidden><div class="source-note">Deux cellules Markdown, placées avant et après votre cellule de code. Ce texte est un exemple ; rédigez vos propres analyses.</div><pre tabindex="0"><code>'+escapeHTML(notebookMarkdown)+'</code></pre><div class="markdown-cheats"><span><code>##</code> Titre</span><span><code>**texte**</code> Gras</span><span><code>-</code> Liste</span><span><code>$…$</code> Formule LaTeX</span></div></div></div><p class="workshop-footnote">À reproduire pour chaque question. Ne remplacez pas vos sorties par des captures du site.</p></section>';
 main.querySelector('.tabs').after(panel);
 document.querySelector('#source-view').onclick=()=>switchNotebookView(false);
 document.querySelector('#rendered-view').onclick=()=>switchNotebookView(true);
 document.querySelector('#copy-markdown').onclick=async()=>{
  try{await navigator.clipboard.writeText(notebookMarkdown);toast('Markdown copié. Collez-le dans une cellule Markdown de Jupyter.');}
  catch{switchNotebookView(false);const range=document.createRange();range.selectNodeContents(document.querySelector('#notebook-source code'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);toast('Sélectionnez et copiez le Markdown avec Ctrl+C ou Cmd+C.');}
 };
}
function switchNotebookView(rendered) {
 document.querySelector('#notebook-rendered').hidden=!rendered;
 document.querySelector('#notebook-source').hidden=rendered;
 for(const [id,active] of [['rendered-view',rendered],['source-view',!rendered]]){const el=document.getElementById(id);el.classList.toggle('active',active);el.setAttribute('aria-pressed',active);}
}
const labModes=[
 ['droite','01','La droite','Déplacez a et b. Observez la droite et l’erreur.'],
 ['residus','02','Les résidus','Choisissez un logement. Mesurez l’écart observé − prédit.'],
 ['prediction','03','La prédiction','Faites varier la surface. Repérez l’extrapolation.'],
 ['atypique','04','La valeur atypique','Modifiez un seul prix. Observez l’influence sur le modèle.']
];
function simulatorHTML(mode='droite',compact=false) {
 return '<section class="simulator '+(compact?'compact-simulator':'')+'" data-mode="'+mode+'"><div class="lab-heading"><div><span class="mini-kicker">MANIPULER POUR COMPRENDRE</span><h2>Le laboratoire visuel</h2></div><span class="format-badge">Illustration interactive · aucun Python exécuté</span></div><div class="lab-tabs" role="group" aria-label="Figure à explorer">'+labModes.map(([key,n,title])=>'<button class="lab-tab '+(key===mode?'active':'')+'" data-mode="'+key+'" aria-pressed="'+(key===mode)+'"><span>'+n+'</span> '+title+'</button>').join('')+'</div><div class="sim-body"><div class="sim-visual"><div class="sim-plot-title"><strong id="plot-label">Surface et prix</strong><span id="equation">ŷ = ax + b</span></div><div id="sim-chart"></div><div class="sim-legend"><span><i class="legend-dot"></i> Apprentissage (15)</span><span id="secondary-legend"></span></div></div><div class="sim-controls"><h3 id="control-title">À vous de régler</h3><p id="control-instruction"></p><div id="control-inputs"></div><div class="metric-display" aria-live="polite" aria-atomic="true"><span id="metric-name">MSE d’apprentissage</span><strong id="metric-value"></strong><span id="metric-explain"></span></div><button class="button secondary" id="sim-reset">Réinitialiser la figure</button></div></div><div class="sim-takeaway" id="sim-takeaway"></div><details class="sim-data"><summary>Voir les données et le calcul</summary><p id="sim-method"></p><div id="sim-table" class="result-scroll" tabindex="0" aria-label="Données de la figure"></div></details></section>';
}
function initSimulator(startMode='droite'){
 if(!document.querySelector('.simulator'))return;
 const rows=Array.from({length:20},(_,i)=>({x:30+i*5,y:[390,405,475,480,555,565,640,645,710,735,805,810,875,895,970,975,1040,1065,1125,1135][i],test:[2,6,10,14,18].includes(i)}));
 const train=rows.filter(r=>!r.test);
 const mean=a=>a.reduce((s,n)=>s+n,0)/a.length;
 const fit=data=>{const xm=mean(data.map(r=>r.x)),ym=mean(data.map(r=>r.y));const a=data.reduce((s,r)=>s+(r.x-xm)*(r.y-ym),0)/data.reduce((s,r)=>s+(r.x-xm)**2,0);return {a,b:ym-a*xm};};
 const original=fit(train);
 let mode=startMode,state={a:8,b:100,index:0,surface:82,factor:1};
 const fmt=(n,d=2)=>n.toLocaleString('fr-FR',{maximumFractionDigits:d,minimumFractionDigits:d});
 const slider=(id,label,min,max,step,value,unit)=>'<label class="slider-label" for="'+id+'"><span>'+label+'</span><output id="'+id+'-value" for="'+id+'">'+fmt(value)+' '+unit+'</output></label><input id="'+id+'" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+value+'">';
 function setup(){
  document.querySelector('.simulator').dataset.mode=mode;
  document.querySelectorAll('.lab-tab').forEach(b=>{b.classList.toggle('active',b.dataset.mode===mode);b.setAttribute('aria-pressed',b.dataset.mode===mode);});
  document.querySelector('#control-instruction').textContent=labModes.find(m=>m[0]===mode)[3];
  document.querySelector('#control-title').textContent={droite:'Une pente, une constante',residus:'Un écart vertical',prediction:'Dans le domaine… ou au-delà',atypique:'Un prix peut tout changer'}[mode];
  const controls=document.querySelector('#control-inputs');
  if(mode==='droite'){
   controls.innerHTML=slider('slope','Pente a',4,12,.05,state.a,'kDH/m²')+slider('intercept','Constante b',0,300,1,state.b,'kDH')+'<button class="fit-button" id="fit-model">Afficher la droite ajustée ↗</button>';
   document.querySelector('#fit-model').onclick=()=>{state.a=original.a;state.b=original.b;document.querySelector('#slope').value=state.a;document.querySelector('#intercept').value=state.b;draw();};
   document.querySelector('#slope').oninput=e=>{state.a=Number(e.target.value);draw();};
   document.querySelector('#intercept').oninput=e=>{state.b=Number(e.target.value);draw();};
  }else if(mode==='residus'){
   controls.innerHTML='<label class="slider-label" for="home-select">Logement d’apprentissage</label><select id="home-select">'+train.map((r,i)=>'<option value="'+i+'">'+r.x+' m² · '+r.y+' kDH</option>').join('')+'</select><div class="residual-formula">e = y − ŷ</div>';
   document.querySelector('#home-select').value=state.index;
   document.querySelector('#home-select').onchange=e=>{state.index=Number(e.target.value);draw();};
  }else if(mode==='prediction'){
   controls.innerHTML=slider('surface','Surface du logement',10,220,1,state.surface,'m²')+'<span class="domain-note">Domaine d’apprentissage : 30 à 125 m²</span>';
   document.querySelector('#surface').oninput=e=>{state.surface=Number(e.target.value);draw();};
  }else{
   controls.innerHTML=slider('factor','Prix du logement de 125 m²',1,3,.1,state.factor,'×')+'<span class="domain-note">Prix initial : 1 135 kDH. Les 14 autres logements sont inchangés.</span>';
   document.querySelector('#factor').oninput=e=>{state.factor=Number(e.target.value);draw();};
  }
  draw();
 }
 function draw(){
  let model=mode==='droite'?{a:state.a,b:state.b}:original;
  const current=train.map(r=>({...r}));
  if(mode==='atypique'){current[current.length-1].y*=state.factor;model=fit(current);}
  const xMax=mode==='prediction'?230:135,yMax=mode==='atypique'?4000:mode==='prediction'?2200:mode==='droite'?2000:1400;
  const W=640,H=390,L=65,T=25,R=20,B=52,px=x=>L+x/xMax*(W-L-R),py=y=>H-B-y/yMax*(H-T-B);
  let svg='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-labelledby="sim-title sim-description"><title id="sim-title">'+labModes.find(m=>m[0]===mode)[2]+' : surface et prix</title><desc id="sim-description">Points d’apprentissage, droite et illustration de '+mode+'. Les valeurs et données sont disponibles sous la figure.</desc><defs><clipPath id="plot-clip"><rect x="'+L+'" y="'+T+'" width="'+(W-L-R)+'" height="'+(H-T-B)+'"/></clipPath></defs>';
  const yStep=yMax===1400?350:yMax/4;
  for(let y=0;y<=yMax;y+=yStep)svg+='<path d="M'+L+' '+py(y)+'H'+(W-R)+'" stroke="#e5e8ef"/><text x="'+(L-12)+'" y="'+(py(y)+4)+'" text-anchor="end">'+fmt(y,0)+'</text>';
  for(const x of (mode==='prediction'?[0,50,100,150,200]:[0,30,60,90,120]))svg+='<text x="'+px(x)+'" y="'+(H-B+24)+'" text-anchor="middle">'+x+'</text>';
  svg+='<text x="'+L+'" y="13" class="axis-title">Prix (kDH)</text><text x="'+(W-R)+'" y="'+(H-8)+'" text-anchor="end" class="axis-title">Surface (m²)</text><g clip-path="url(#plot-clip)">';
  if(mode==='prediction')svg+='<rect x="'+px(30)+'" y="'+T+'" width="'+(px(125)-px(30))+'" height="'+(H-T-B)+'" fill="#eef4f0"/><path d="M'+px(30)+' '+py(original.a*30+original.b)+'L'+px(125)+' '+py(original.a*125+original.b)+'" stroke="#167b62" stroke-width="4"/>';
  if(mode==='droite')for(const r of current)svg+='<path d="M'+px(r.x)+' '+py(r.y)+'V'+py(model.a*r.x+model.b)+'" stroke="#aba0d3" stroke-width="1.2" stroke-dasharray="3 4"/>';
  if(mode==='atypique')svg+='<path d="M'+px(0)+' '+py(original.b)+'L'+px(xMax)+' '+py(original.a*xMax+original.b)+'" stroke="#718095" stroke-width="2" stroke-dasharray="6 5"/>';
  svg+='<path d="M'+px(0)+' '+py(model.b)+'L'+px(xMax)+' '+py(model.a*xMax+model.b)+'" stroke="#6852bd" stroke-width="2.5" '+(mode==='prediction'?'stroke-dasharray="6 5"':'')+'/>';
  for(const [i,r]of current.entries())svg+='<circle cx="'+px(r.x)+'" cy="'+py(r.y)+'" r="'+(mode==='residus'&&i===state.index?7:4.5)+'" fill="'+(mode==='atypique'&&i===current.length-1?'#af4b21':'#6852bd')+'" stroke="white" stroke-width="1.5"/>';
  let value,name,explain,takeaway,method;
  if(mode==='droite'){
   const mse=mean(current.map(r=>(r.y-model.a*r.x-model.b)**2));
   value=fmt(mse)+' kDH²';name='MSE d’apprentissage';explain='Plus les segments sont longs, plus l’erreur augmente.';
   takeaway='À observer : changer a incline la droite ; changer b la déplace verticalement.';
   method='MSE = moyenne de (prix observé − prix prédit)² sur les 15 logements d’apprentissage. Le test reste exclu de l’ajustement.';
   document.querySelector('#slope-value').textContent=fmt(model.a,3)+' kDH/m²';document.querySelector('#intercept-value').textContent=fmt(model.b)+' kDH';
  }else if(mode==='residus'){
   const r=current[state.index],pred=model.a*r.x+model.b,e=r.y-pred;
   svg+='<path d="M'+px(r.x)+' '+py(r.y)+'V'+py(pred)+'" stroke="#ae481c" stroke-width="4"/><rect x="'+(px(r.x)-5)+'" y="'+(py(pred)-5)+'" width="10" height="10" fill="white" stroke="#ae481c" stroke-width="2"/>';
   value=(e>=0?'+':'')+fmt(e)+' kDH';name='Résidu : observé − prédit';explain=fmt(r.y)+' − '+fmt(pred)+' = '+fmt(e);
   takeaway=e>=0?'Résidu positif : la droite sous-estime le prix de ce logement.':'Résidu négatif : la droite surestime le prix de ce logement.';
   method='Le cercle représente le prix observé ; le carré représente le prix prédit. Le segment vertical est le résidu signé e = y − ŷ.';
  }else if(mode==='prediction'){
   const pred=model.a*state.surface+model.b,inside=state.surface>=30&&state.surface<=125;
   svg+='<path d="M'+px(state.surface)+' '+py(0)+'V'+py(pred)+'H'+L+'" stroke="#ae481c" stroke-dasharray="4 4"/><rect x="'+(px(state.surface)-6)+'" y="'+(py(pred)-6)+'" width="12" height="12" fill="#ae481c"/>';
   value=fmt(pred)+' kDH';name=inside?'Interpolation':'Extrapolation';explain=inside?'Surface dans le domaine observé.':'Surface hors du domaine observé : prudence.';
   takeaway='Le nombre affiché est une prédiction du modèle, pas un prix garanti. La zone verte indique le domaine observé.';
   method='Prédiction = 8,1059602649 × surface + 130,5430463576. La zone verte couvre 30–125 m². Hors de cette zone, la droite prolonge la relation sans observation locale.';
   document.querySelector('#surface-value').textContent=state.surface+' m²';
  }else{
   value=fmt(model.a,3)+' kDH/m²';name='Pente après modification';explain='Pente initiale : '+fmt(original.a,3)+' kDH/m²';
   takeaway='La droite est recalculée sur la copie modifiée de l’apprentissage. Aucun changement n’est appliqué à votre notebook.';
   method='Le prix du logement de 125 m² est multiplié par le facteur choisi. Les moindres carrés sont recalculés sur ces 15 observations. La droite grise en pointillés est le modèle initial.';
   document.querySelector('#factor-value').textContent=fmt(state.factor,1)+' × ('+fmt(current[current.length-1].y,0)+' kDH)';
  }
  svg+='</g></svg>';
  document.querySelector('#sim-chart').innerHTML=svg;
  document.querySelector('#equation').textContent='ŷ = '+fmt(model.a,3)+'x + '+fmt(model.b);
  document.querySelector('#metric-name').textContent=name;document.querySelector('#metric-value').textContent=value;document.querySelector('#metric-explain').textContent=explain;
  document.querySelector('#sim-takeaway').textContent=takeaway;
  document.querySelector('#sim-method').textContent=method;
  document.querySelector('#secondary-legend').textContent={droite:'┄ Écarts au modèle',residus:'□ Prix prédit',prediction:'□ Prédiction · zone verte : domaine observé',atypique:'┄ Modèle initial · ● prix modifié'}[mode];
  document.querySelector('#sim-table').innerHTML='<table><caption>15 logements d’apprentissage · valeurs de la figure</caption><thead><tr><th scope="col">Surface (m²)</th><th scope="col">Prix (kDH)</th><th scope="col">Prédit (kDH)</th><th scope="col">Résidu (kDH)</th></tr></thead><tbody>'+current.map(r=>'<tr><td>'+r.x+'</td><td>'+fmt(r.y)+'</td><td>'+fmt(model.a*r.x+model.b)+'</td><td>'+fmt(r.y-model.a*r.x-model.b)+'</td></tr>').join('')+'</tbody></table>';
 }
 document.querySelectorAll('.lab-tab').forEach(button=>button.onclick=()=>{mode=button.dataset.mode;setup();});
 document.querySelector('#sim-reset').onclick=()=>{state={a:8,b:100,index:0,surface:82,factor:1};setup();toast('Figure réinitialisée.');};
 setup();
}
function laboratory(){
 main.innerHTML='<div class="page-intro"><div class="eyebrow">EXPLORER · OBSERVER · COMPRENDRE</div><h1>Une intuition avant le calcul.</h1><p>Quatre figures à manipuler. Les calculs Python et le compte rendu restent dans votre notebook.</p></div>'+tabs(4)+simulatorHTML()+'<div class="lab-links"><a class="button secondary" href="#etape-11">Revenir à l’équation de la droite →</a><a class="button secondary" href="#etape-20">Étudier les résidus →</a></div>';
 initSimulator();
}
