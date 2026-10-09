'use strict';
const phases = [
 {title:'Prendre ses repères',desc:'Votre environnement, les bases de Python et vos premières données.',icon:'01',range:'01 — 04',start:1,end:4},
 {title:'Explorer les données',desc:'Contrôler, résumer et visualiser les prix des logements.',icon:'02',range:'05 — 08',start:5,end:8},
 {title:'Comprendre le modèle',desc:'Une référence, une droite et une façon de mesurer ses erreurs.',icon:'03',range:'09 — 12',start:9,end:12},
 {title:'Apprendre la régression',desc:'Calculez les paramètres et construisez votre première régression.',icon:'04',range:'13 — 16',start:13,end:16},
 {title:'Évaluer et interpréter',desc:'Confrontez les prédictions à des logements jamais vus.',icon:'05',range:'17 — 20',start:17,end:20},
 {title:'Passer à l’autonomie',desc:'Explorez les limites, relevez le défi et finalisez votre notebook.',icon:'06',range:'21 — 24',start:21,end:24}
];
const main = document.querySelector('#main');
const storageKey = 'python-lab-tp1-v1';
let done = new Set(), storageAvailable = true, lastStep = 1;
try {
 const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
 done = new Set((Array.isArray(saved.done) ? saved.done : []).filter(n=>Number.isInteger(n)&&n>=1&&n<=24));
 lastStep = Number.isInteger(saved.lastStep) && saved.lastStep>=1 && saved.lastStep<=24 ? saved.lastStep : 1;
} catch { storageAvailable=false; }
const escapeHTML = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save() {
 try { localStorage.setItem(storageKey, JSON.stringify({done:[...done],lastStep})); }
 catch { storageAvailable=false; toast('Stockage indisponible : la progression reste dans cette session.'); }
 updateProgress();
}
function toast(message) {
 const el = document.querySelector('#toast'); el.textContent=message; el.classList.add('visible');
 clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('visible'),3500);
}
function updateProgress() {
 document.querySelector('#progress-count').textContent=done.size+' / 24';
 document.querySelector('#progress').value=done.size;
 document.querySelector('.sidebar-bottom small').textContent=storageAvailable?'Enregistrée sur cet appareil':'Progression limitée à cette session';
 document.querySelectorAll('.nav-step').forEach(a=>{
  const id=Number(a.dataset.step); a.classList.toggle('done',done.has(id));
  a.querySelector('.step-no').textContent=done.has(id)?'✓':String(id).padStart(2,'0');
  a.setAttribute('aria-label','Étape '+id+' : '+LESSONS[id-1].title+(done.has(id)?' — terminée':''));
 });
}
function renderNav(active=0) {
 const priorOpen = [...document.querySelectorAll('.nav-group[open]')].map(d=>Number(d.dataset.phase));
 document.querySelector('#step-nav').innerHTML=phases.map((p,i)=>'<details class="nav-group" data-phase="'+i+'" '+((active>=p.start&&active<=p.end)||(!active&&i===0)||priorOpen.includes(i)?'open':'')+'><summary><span class="phase-no">'+p.icon+'</span>'+p.title+'</summary>'+LESSONS.filter(l=>l.phase===i).map(l=>'<a class="nav-step '+(l.id===active?'active':'')+'" data-step="'+l.id+'" href="#etape-'+l.id+'" '+(l.id===active?'aria-current="step"':'')+'><span class="step-no">'+l.id+'</span><span>'+escapeHTML(l.title)+'</span></a>').join('')+'</details>').join('');
 updateProgress();
}
function tabs(active) {
 return '<nav class="tabs" aria-label="Sections du TP">'+[
 ['accueil','Vue d’ensemble'],['etape-'+lastStep,'Le parcours <small>24</small>'],['compte-rendu','Compte rendu'],['ressources','Ressources'],['laboratoire','Laboratoire visuel']
 ].map(([href,label],i)=>'<a class="tab" href="#'+href+'" '+(i===active?'aria-current="page"':'')+'>'+label+'</a>').join('')+'</nav>';
}
function chart() {
 return '<div class="hero-chart"><div class="chart-top"><strong>Des données à la prédiction</strong><span class="chart-dots" aria-hidden="true">•••</span></div><svg viewBox="0 0 380 245" role="img" aria-labelledby="chart-title chart-desc"><title id="chart-title">La surface et le prix des logements</title><desc id="chart-desc">Illustration : un nuage de points croissant et une droite de régression. Le prix augmente avec la surface.</desc><g stroke="#e0dce9" stroke-dasharray="3 4"><path d="M45 45H355 M45 90H355 M45 135H355 M45 180H355"/><path d="M100 30V205 M165 30V205 M230 30V205 M295 30V205"/></g><g stroke="#c9c5d5"><path d="M45 25V205H355" fill="none"/></g><path d="M55 193L341 43L341 70L55 216Z" fill="#a48ad8" opacity=".12"/><path d="M55 203L341 55" stroke="#8c6bd1" stroke-width="2.5" fill="none"/><g fill="#6d55b8" stroke="#fff" stroke-width="2"><circle cx="65" cy="193" r="5"/><circle cx="90" cy="192" r="5"/><circle cx="106" cy="171" r="5"/><circle cx="121" cy="175" r="5"/><circle cx="137" cy="151" r="5"/><circle cx="155" cy="157" r="5"/><circle cx="175" cy="132" r="5"/><circle cx="190" cy="138" r="5"/><circle cx="209" cy="116" r="5"/><circle cx="225" cy="123" r="5"/><circle cx="243" cy="104" r="5"/><circle cx="265" cy="99" r="5"/><circle cx="283" cy="79" r="5"/><circle cx="308" cy="76" r="5"/><circle cx="332" cy="54" r="5"/></g><g font-family="sans-serif" font-size="9" fill="#787088"><text x="10" y="20">Prix (kDH)</text><text x="22" y="185">400</text><text x="22" y="140">600</text><text x="22" y="95">800</text><text x="16" y="50">1 000</text><text x="87" y="222">40</text><text x="153" y="222">60</text><text x="219" y="222">80</text><text x="280" y="222">100</text><text x="278" y="241">Surface (m²)</text></g></svg><div class="chart-tag">Un premier modèle, pas à pas.</div><div class="chart-bottom"><span>● Illustration pédagogique</span><strong>ŷ = ax + b</strong></div></div>';
}
function notice() {
 return '<div class="notice"><span class="notice-icon" aria-hidden="true">⌘</span><p><strong>L’énoncé ici. Votre compte rendu dans Jupyter.</strong><br>Travaillez avec Anaconda : cellules Markdown, code exécuté, graphiques et interprétations personnelles.</p></div>';
}
function home() {
 main.innerHTML='<section class="hero"><div><div class="eyebrow">TP 01 · DE ZÉRO À L’AUTONOMIE</div><h1>La régression linéaire.<br><span>Zero to Hero.</span></h1><p class="hero-description">24 questions pour prédire le prix d’un logement. Le code et les corrections sont fournis ; à vous d’exécuter, d’observer et de rédiger.</p><div class="badge-row"><span class="badge">◷ 3 à 4 heures · indicatif</span><span class="badge">24 étapes guidées</span><span class="badge green">Niveau débutant</span></div><div class="hero-actions"><a class="button primary" href="#etape-'+lastStep+'">'+(done.size?'Reprendre le parcours':'Commencer le TP')+' <span aria-hidden="true">→</span></a><a class="button secondary" href="TP1_Regression_Lineaire.ipynb" download>↓ Le notebook de départ</a></div></div>'+chart()+'</section>'+notice()+tabs(0)+'<div class="section-top"><h2>Votre feuille de route</h2><span>6 chapitres pour comprendre et pratiquer</span></div><div class="phase-grid">'+phases.map(p=>'<a class="phase-card" href="#etape-'+p.start+'"><span class="phase-icon">'+p.icon+'</span><span class="card-count">ÉTAPES '+p.range+'</span><h3>'+p.title+'</h3><p>'+p.desc+'</p><div class="card-footer"><span>'+Array.from(done).filter(n=>n>=p.start&&n<=p.end).length+' / 4 étapes terminées</span><span aria-hidden="true">↗</span></div></a>').join('')+'</div><div class="start-strip"><div><h3>Comprendre la droite en la manipulant.</h3><p>Faites varier la pente, observez un résidu et explorez les limites du modèle.</p></div><a class="button secondary" href="#laboratoire">Ouvrir le laboratoire <span aria-hidden="true">→</span></a></div>';
}
function highlight(code) {
 const regex=/(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:import|from|as|def|return|for|in|if|else|assert|True|False|and|or|not)\b|\b\d+(?:\.\d+)?\b)/g;
 let out='',position=0;
 for(const match of code.matchAll(regex)) {
  out+=escapeHTML(code.slice(position,match.index));
  const val=match[0],cls=val.startsWith('#')?'comment':/^["']/.test(val)?'string':/^\d/.test(val)?'number':'keyword';
  out+='<span class="token-'+cls+'">'+escapeHTML(val)+'</span>';position=match.index+val.length;
 }
 return out+escapeHTML(code.slice(position));
}
function lesson(id) {
 const l=LESSONS[id-1]; lastStep=id; save();
 const interactive = {11:'droite',12:'residus',15:'droite',18:'residus',20:'residus',21:'prediction',22:'atypique'}[id];
 main.innerHTML=tabs(1)+'<div class="lesson-heading"><span class="lesson-label">CHAPITRE '+(l.phase+1)+' · '+phases[l.phase].title.toLocaleUpperCase('fr')+'</span><span>Étape '+String(id).padStart(2,'0')+' / 24</span></div><h1 class="lesson-title">'+escapeHTML(l.title)+'</h1><p class="lesson-lead">'+escapeHTML(l.goal)+'</p><div class="exercise-brief"><span class="brief-number">Q'+String(id).padStart(2,'0')+'</span><div><strong>À faire dans votre notebook</strong><p>'+escapeHTML(l.task)+'</p></div></div><div class="exercise-workspace"><section class="code-workspace"><div class="workspace-label"><span>01</span> Le code <small>Copier → Jupyter → Maj + Entrée</small></div><div class="code-block"><div class="code-header"><span>PYTHON</span><button class="copy" id="copy-code">Copier le code</button></div><pre tabindex="0" aria-label="Code Python à copier"><code>'+highlight(l.code)+'</code></pre></div><div class="compact-help"><details class="mentor"><summary>Un indice</summary><p>'+escapeHTML(l.hint)+'</p></details><details class="error-hint"><summary>Erreur fréquente</summary><p>'+escapeHTML(l.error)+'</p></details></div></section><aside class="result-workspace"><div class="workspace-label"><span>02</span> Le résultat <small>À comparer avec votre sortie</small></div>'+resultPreview(id)+'<p class="result-summary">'+escapeHTML(l.expected)+'</p></aside></div>'+(interactive?simulatorHTML(interactive,true):'')+'<section class="analysis-panel submission-prompt"><span class="submission-icon" aria-hidden="true">✎</span><div><span class="mini-kicker">03 · À RÉDIGER PAR VOUS</span><h2>Votre interprétation</h2><p>'+escapeHTML(l.analysis)+'</p><a href="#compte-rendu">Comment présenter ma réponse en Markdown ? ↗</a></div></section><div class="answer-row"><details class="correction"><summary>'+(id===23?'Critères d’autoévaluation':'Correction expliquée')+'</summary><p>'+escapeHTML(l.solution)+'</p></details><details class="concept-note"><summary>Le repère à retenir</summary><p>'+escapeHTML(l.intro)+'</p></details></div>'+([8,16,24].includes(id)?'<section class="checkpoint"><h3>Checkpoint</h3><label><input type="checkbox" id="checkpoint-check"> '+(id===24?'J’ai redémarré le noyau, exécuté toutes les cellules et enregistré mon notebook.':'Mes sorties sont vérifiées et mon interprétation est rédigée.')+'</label></section>':'')+'<div class="complete-row"><button class="button complete-button" id="complete" aria-pressed="'+done.has(id)+'">'+(done.has(id)?'✓ Étape terminée':'Valider cette étape')+'</button><div class="lesson-navigation">'+(id>1?'<a class="button secondary" href="#etape-'+(id-1)+'">← Précédente</a>':'')+'<a class="button primary" href="#'+(id<24?'etape-'+(id+1):'compte-rendu')+'">'+(id<24?'Suivante →':'Préparer la remise →')+'</a></div></div>';
 if(interactive) initSimulator(interactive);
 document.querySelector('#copy-code').addEventListener('click',async()=>{
  try {
   if(!navigator.clipboard) throw new Error('unavailable');
   await navigator.clipboard.writeText(l.code);
   document.querySelector('#copy-code').textContent='✓ Code copié';
   toast('Code copié. Collez-le dans une cellule Jupyter.');
  } catch {
   const range=document.createRange();range.selectNodeContents(document.querySelector('pre code'));
   const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
   toast('Copie automatique indisponible : code sélectionné, utilisez Ctrl+C ou Cmd+C.');
  }
 });
 const checkpoint=document.querySelector('#checkpoint-check');
 if(checkpoint) checkpoint.checked=done.has(id);
 document.querySelector('#complete').addEventListener('click',()=>{
  if(!done.has(id)&&checkpoint&&!checkpoint.checked) { toast('Vérifiez le checkpoint et cochez la case avant de valider.'); checkpoint.focus();return; }
  if(done.has(id)) done.delete(id);else done.add(id);save();
  const button=document.querySelector('#complete');button.setAttribute('aria-pressed',done.has(id));button.textContent=done.has(id)?'✓ Étape terminée':'Valider cette étape';
  toast(done.has(id)?(done.size===24?'24 étapes terminées ! Vérifiez votre notebook avant de le remettre.':'Étape enregistrée. Continuez à votre rythme.'):'Étape marquée comme à reprendre.');
 });
}
function report() {
 main.innerHTML='<div class="page-intro"><div class="eyebrow">LE LIVRABLE DU TP</div><h1>Un notebook qui raconte<br>votre raisonnement.</h1><p>Du code exécuté, des résultats vérifiables et une interprétation personnelle : c’est l’ensemble de la démarche qui est évalué.</p></div>'+tabs(2)+'<div class="notice"><span class="notice-icon" aria-hidden="true">↓</span><p><strong>À remettre : Nom_Prenom_TP1.ipynb</strong><br>Conservez les sorties et les graphiques dans le fichier. Le lieu et la date de dépôt sont communiqués par votre enseignant.</p></div><div class="report-grid"><section class="panel"><h2>La structure attendue</h2><ol class="report-list"><li>Identification & objectifs<small>Nom, prénom, groupe, date ; problème étudié et variable cible.</small></li><li>Environnement & données · Q1–Q8<small>Versions, description du jeu fictif, unités, contrôles et nuage de points commenté.</small></li><li>Protocole & référence · Q9–Q12<small>Séparation des données, baseline, équation et calcul des erreurs.</small></li><li>Construction du modèle · Q13–Q16<small>Formules, paramètres calculés avec NumPy et graphique de la droite.</small></li><li>Évaluation & interprétation · Q17–Q20<small>Tableau observé/prédit, MAE, RMSE, R², comparaison et résidus.</small></li><li>Limites & défi autonome · Q21–Q23<small>Extrapolation, sensibilité et analyse complète du nouveau jeu.</small></li><li>Conclusion personnelle · Q24<small>150 à 250 mots : apprentissages, résultats et trois limites argumentées.</small></li></ol><a class="button primary" href="TP1_Regression_Lineaire.ipynb" download>↓ Télécharger la trame .ipynb</a></section><div><section class="panel"><h2>Grille d’évaluation</h2><div class="table-wrap"><table><caption style="text-align:left;color:var(--muted);font-size:12px;margin-bottom:12px">Barème pédagogique proposé · 20 points</caption><thead><tr><th scope="col">Critère</th><th scope="col">Points</th></tr></thead><tbody><tr><td>Notebook structuré et reproductible</td><td>3</td></tr><tr><td>Exploration et qualité des graphiques</td><td>3</td></tr><tr><td>Calcul du modèle, sans fuite de données</td><td>4</td></tr><tr><td>Métriques et comparaison à la référence</td><td>4</td></tr><tr><td>Interprétations personnelles et limites</td><td>3</td></tr><tr><td>Défi autonome complet et argumenté</td><td>3</td></tr><tr><th scope="row">Total</th><td><strong>20</strong></td></tr></tbody></table></div></section><section class="panel"><h3>Avant de déposer votre fichier</h3><div class="faq">'+[
 'Mon identité et mon groupe sont renseignés.',
 'J’ai répondu personnellement aux questions d’analyse.',
 'Les axes et les unités de tous les graphiques sont indiqués.',
 'J’ai redémarré le noyau puis exécuté toutes les cellules dans l’ordre.',
 'Aucune cellule ne contient d’erreur ; les sorties sont enregistrées.',
 'Le défi et ma conclusion personnelle sont présents.'
 ].map(t=>'<label style="display:flex;align-items:flex-start;gap:10px;margin:13px 0;font-size:12px"><input type="checkbox" style="margin-top:5px;accent-color:var(--purple)">'+t+'</label>').join('')+'</div><p style="font-size:10px;color:var(--muted);margin-top:15px">Cette liste de relecture n’est pas enregistrée. Cochez-la lors de votre vérification finale.</p></section></div></div>';
}
function resources() {
 main.innerHTML='<div class="page-intro"><div class="eyebrow">VOTRE BOÎTE À OUTILS</div><h1>Tout pour pratiquer sereinement.</h1><p>Les fichiers, les repères et les réponses utiles pour travailler exclusivement dans Anaconda et Jupyter Notebook.</p></div>'+tabs(3)+'<div class="resource-grid"><section class="panel"><h3>01 · Le notebook de départ</h3><p>Une trame de compte rendu avec les 24 questions et des cellules vierges pour vos calculs et interprétations. Il ne contient pas de corrections exécutées.</p><a class="button secondary" href="TP1_Regression_Lineaire.ipynb" download>↓ Télécharger le notebook</a></section><section class="panel"><h3>02 · Le jeu de logements</h3><p>20 logements fictifs, surface en m² et prix en kDH. L’étape 4 crée directement ce même jeu ; le CSV est fourni pour conserver les données.</p><a class="button secondary" href="logements.csv" download>↓ Télécharger les données CSV</a></section><section class="panel"><h3>03 · Documentation officielle</h3><p>À consulter pour approfondir un concept ou retrouver une fonction.</p><ul><li><a href="https://www.anaconda.com/docs/getting-started/anaconda/main" target="_blank" rel="noopener noreferrer">Anaconda : prise en main ↗</a></li><li><a href="https://jupyter-notebook.readthedocs.io/en/stable/notebook.html" target="_blank" rel="noopener noreferrer">Jupyter Notebook : les bases ↗</a></li><li><a href="https://numpy.org/doc/stable/user/absolute_beginners.html" target="_blank" rel="noopener noreferrer">NumPy pour débuter ↗</a></li><li><a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/" target="_blank" rel="noopener noreferrer">Pandas : tutoriels introductifs ↗</a></li><li><a href="https://matplotlib.org/stable/tutorials/pyplot.html" target="_blank" rel="noopener noreferrer">Matplotlib : tracer avec pyplot ↗</a></li></ul></section><section class="panel"><h3>04 · Trois raccourcis utiles</h3><dl class="glossary"><dt>Maj + Entrée</dt><dd>Exécuter une cellule et passer à la suivante.</dd><dt>Échap, puis M</dt><dd>Transformer une cellule sélectionnée en Markdown.</dd><dt>Échap, puis Y</dt><dd>Transformer une cellule sélectionnée en code.</dd></dl><p style="font-size:11px;color:var(--muted)">Dans Jupyter, le mode commande s’active avec Échap. Les menus restent disponibles si les raccourcis diffèrent dans votre version.</p></section></div><section class="panel" style="margin-top:22px"><h2>Les mots à connaître</h2><dl class="glossary"><dt>Variable cible</dt><dd>La quantité que l’on souhaite prédire : ici, le prix en kDH.</dd><dt>Apprentissage</dt><dd>Les observations utilisées pour calculer les paramètres a et b.</dd><dt>Test</dt><dd>Les observations réservées pour évaluer des prédictions sur des données non utilisées pour l’ajustement.</dd><dt>Résidu</dt><dd>La différence entre la valeur observée et la prédiction : y − ŷ.</dd><dt>MAE / RMSE</dt><dd>Deux mesures d’erreur, exprimées dans la même unité que la cible.</dd><dt>R²</dt><dd>Un score relatif basé sur les sommes de carrés, sans unité ; il peut être négatif.</dd><dt>Extrapolation</dt><dd>Une prédiction hors du domaine des surfaces observées.</dd></dl></section><section class="panel faq"><h2>Un obstacle dans votre notebook ?</h2><details><summary>NameError : une variable n’existe pas</summary><p>Réexécutez les cellules précédentes dans l’ordre. Après un redémarrage du noyau, toutes les variables doivent être recréées.</p></details><details><summary>ModuleNotFoundError : une bibliothèque manque</summary><p>Vérifiez dans Anaconda Navigator que le bon environnement est sélectionné. Installez numpy, pandas et matplotlib dans cet environnement via l’onglet Environments, puis relancez Jupyter avec ce même environnement.</p></details><details><summary>Les résultats ont changé sans modifier la cellule</summary><p>Une cellule exécutée ailleurs a peut-être modifié vos variables. Redémarrez le noyau et exécutez tout dans l’ordre. Pour les expériences, utilisez de nouveaux noms et .copy().</p></details><details><summary>Où mon travail est-il enregistré ?</summary><p>Votre code et vos réponses sont enregistrés dans le fichier .ipynb sur votre ordinateur. Le site conserve uniquement les étapes validées et la dernière étape consultée dans le stockage local du navigateur. Aucun compte étudiant ni envoi de notebook n’est prévu sur ce site.</p></details></section>';
}
function route(focus=true) {
 const hash=location.hash.slice(1)||'accueil', match=/^etape-(\d+)$/.exec(hash);
 const id=match?Number(match[1]):0;
 if(id>=1&&id<=24) {renderNav(id);lesson(id);document.title='Étape '+id+' · '+LESSONS[id-1].title+' — Python Lab';}
 else if(hash==='compte-rendu'){renderNav();report();upgradeReport();document.title='Compte rendu et évaluation — Python Lab';}
 else if(hash==='laboratoire'){renderNav();laboratory();document.title='Laboratoire visuel — Python Lab';}
 else if(hash==='ressources'){renderNav();resources();document.title='Ressources — Python Lab';}
 else {renderNav();home();document.title='TP 1 · Régression linéaire — IA avec Python';}
 document.querySelector('.sidebar').classList.remove('open');document.querySelector('#menu').setAttribute('aria-expanded','false');
 if(focus){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
}
document.querySelector('#menu').addEventListener('click',()=>{
 const open=document.querySelector('.sidebar').classList.toggle('open');document.querySelector('#menu').setAttribute('aria-expanded',open);
});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&document.querySelector('.sidebar').classList.contains('open')){
  document.querySelector('.sidebar').classList.remove('open');document.querySelector('#menu').setAttribute('aria-expanded','false');document.querySelector('#menu').focus();
 }
});
const resetDialog=document.querySelector('#reset-dialog');
document.querySelector('#reset').addEventListener('click',()=>resetDialog.showModal());
document.querySelector('#cancel-reset').addEventListener('click',()=>resetDialog.close());
document.querySelector('#confirm-reset').addEventListener('click',()=>{
 done.clear();lastStep=1;save();resetDialog.close();if(location.hash==='#accueil'||!location.hash)route();else location.hash='accueil';toast('Votre progression a été réinitialisée.');
});
window.addEventListener('hashchange',()=>route());
route(false);
