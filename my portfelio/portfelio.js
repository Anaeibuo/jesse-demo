addEventListener('load',()=>document.getElementById('loader').classList.add('off'));
setTimeout(()=>document.getElementById('loader').classList.add('off'),1500);
document.getElementById('yr').textContent=new Date().getFullYear();
const b=document.querySelector('.burger'),nl=document.getElementById('nl');
const tg=o=>{nl.classList.toggle('open',o);b.setAttribute('aria-expanded',o)};
b.onclick=()=>tg(!nl.classList.contains('open'));
nl.querySelectorAll('a').forEach(a=>a.onclick=()=>tg(false));
addEventListener('keydown',e=>{if(e.key==='Escape')tg(false)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(x=>io.observe(x));
const PG={home:'home',why:'home',about:'about',learning:'about',skills:'skills',projects:'projects',services:'services',contact:'contact'};
const secs=[...document.querySelectorAll('main section[id]')],ls=[...nl.querySelectorAll('a')];
const titles={home:'Home',about:'About',skills:'Skills',projects:'Projects',services:'Services',contact:'Contact'};
let curPage=null;const stk=[];
function route(h,isBack){
h=typeof h==='string'?h:location.hash.slice(1);const cur=PG[h]||'home';if(curPage&&cur!==curPage&&!isBack)stk.push(curPage);curPage=cur;document.querySelector('.backbtn').classList.toggle('show',stk.length>0);if(stk.length)document.getElementById('bbl').textContent='Back to '+titles[stk[stk.length-1]];
secs.forEach(x=>{const on=PG[x.id]===cur;x.classList.toggle('off',!on);if(on){x.classList.remove('pg');void x.offsetWidth;x.classList.add('pg')}});
const vs=secs.filter(x=>PG[x.id]===cur);secs.forEach(x=>x.classList.toggle('lead',x===vs[0]));ls.forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+cur));
document.title=(cur==='home'?'':titles[cur]+' | ')+'Anaeibuo Jesse Chidera | Front-End Web Developer';
scrollTo(0,0)}
addEventListener('hashchange',()=>route());
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.id==='resume')return;const id=a.getAttribute('href').slice(1);if(!id)return;
e.preventDefault();tg(false);try{history.replaceState(null,'','#'+id)}catch(_){}route(id)});
route();
document.querySelector('.backbtn').addEventListener('click',()=>{const p=stk.pop();if(!p)return;try{history.replaceState(null,'','#'+p)}catch(_){}route(p,true)});
document.querySelectorAll('.filters button').forEach(btn=>btn.onclick=()=>{
document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===btn));
const f=btn.dataset.f;document.querySelectorAll('.pj').forEach(p=>p.classList.toggle('hide',f!=='all'&&!p.dataset.c.split(' ').includes(f)))});
/* CONTACT FORM: Web3Forms -> paste your access key in key. Formspree -> set endpoint to your form link (https://formspree.io/f/xxxx) and leave key empty. */
const FORM={endpoint:'https://api.web3forms.com/submit',key:'24e87401-8b01-4629-949a-e55884915270'};
document.getElementById('cf').onsubmit=async e=>{e.preventDefault();const f=e.target,m=document.getElementById('msg'),btn=f.querySelector('button[type=submit]');
if(!f.n.value.trim()||!f.e.validity.valid||!f.s.value.trim()||!f.m.value.trim()){m.textContent='Please fill in every field with a valid email.';return}
const mailto=()=>{openLink('mailto:bossjesse588@gmail.com?subject='+encodeURIComponent(f.s.value)+'&body='+encodeURIComponent('From: '+f.n.value+' ('+f.e.value+')\n\n'+f.m.value));m.textContent='Opening your email app to send the message.'};
if(!FORM.endpoint||(FORM.endpoint.includes('web3forms')&&!FORM.key)){mailto();return}
btn.disabled=true;m.textContent='Sending...';
try{const r=await fetch(FORM.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:FORM.key,name:f.n.value,email:f.e.value,subject:f.s.value,message:f.m.value,from_name:'Portfolio website'})});
const j=await r.json();if(r.ok&&j.success!==false){m.textContent='Thank you! Your message has been sent.';f.reset()}else throw 0}
catch(_){m.textContent='Could not send directly. Opening your email app instead.';mailto()}
btn.disabled=false};
document.querySelectorAll('[data-demo]').forEach(d=>{const it=d.dataset.items.split('|'),t=d.querySelector('.dt'),av=d.querySelector('.av');let i=0;
const set=()=>{t.textContent=it[i];if(av)av.textContent=i+1};
d.querySelectorAll('.dn').forEach(b=>b.addEventListener('click',()=>{i=(i+Number(b.dataset.d)+it.length)%it.length;set()}));
d.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){i=(i+1)%it.length;set()}if(e.key==='ArrowLeft'){i=(i-1+it.length)%it.length;set()}});
const hb=d.querySelector('.hb2');if(hb)hb.addEventListener('click',()=>{const o=hb.getAttribute('aria-expanded')!=='true';hb.setAttribute('aria-expanded',o);d.querySelector('.hm2').classList.toggle('open',o)})});
function toast(t){const e=document.getElementById('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),3200)}
function openLink(u){let w=null;try{w=window.open(u,'_blank')}catch(_){}if(!w)location.href=u}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="mailto:"],a[href^="tel:"]');if(!a)return;e.preventDefault();
const h=a.getAttribute('href'),v=h.replace(/^(mailto|tel):/,'').split('?')[0],em=h.startsWith('mailto:');
openLink(h);let ok=false;try{navigator.clipboard.writeText(v).then(()=>toast((em?'Email':'Number')+' copied: '+v),()=>toast((em?'Email: ':'Call: ')+v));ok=true}catch(_){}if(!ok)toast((em?'Email: ':'Call: ')+v)});