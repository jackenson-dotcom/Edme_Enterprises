// Original portfolio motion, with robust progress and accessible navigation.
const bar = document.getElementById('progress');
function updateProgress() { const range = document.documentElement.scrollHeight - window.innerHeight; if (bar) bar.style.width = `${range > 0 ? Math.min(100, Math.max(0, window.scrollY / range * 100)) : 0}%`; }
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress); updateProgress();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
[['heroTag',200],['n1',450],['n2',600],['heroMeta',900],['heroActions',1050]].forEach(([id,delay]) => { const el = document.getElementById(id); if(el) setTimeout(() => el.classList.add('visible'), reducedMotion ? 0 : delay); });
if ('IntersectionObserver' in window && !reducedMotion) { const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, { threshold: 0.1 }); document.querySelectorAll('.reveal').forEach(el => obs.observe(el)); } else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }
const menu = document.querySelector('.mobile-menu'); const links = document.querySelector('.nav-links');
function closeMenu() { if(menu && links) { links.classList.remove('menu-open'); menu.setAttribute('aria-expanded','false'); } }
if(menu && links) { menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); links.classList.toggle('menu-open',open); }); links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu)); document.addEventListener('keydown',e=>{if(e.key==='Escape') {closeMenu();menu.focus();}}); }
// Preserve old shared section URLs after relabeling them for the agency.
const legacy = { '#ventures':'#work', '#press':'#approach', '#expertise':'#capabilities' };
if(legacy[location.hash]) { const id = legacy[location.hash]; history.replaceState(null,'',id); requestAnimationFrame(()=>document.querySelector(id)?.scrollIntoView()); }
// A real email draft, never a fabricated delivery confirmation.
const form = document.getElementById('inquiry-form');
if(form) form.addEventListener('submit', e => { e.preventDefault(); if(!form.reportValidity()) return; const data = new FormData(form); const subject = `Agency inquiry — ${data.get('business') || data.get('name')}`; const message = [`Name: ${data.get('name')}`,`Email: ${data.get('email')}`,`Business: ${data.get('business') || 'Not provided'}`,`Website: ${data.get('website') || 'Not provided'}`,`Support: ${data.get('service')}`,`Timing: ${data.get('timing') || 'Still exploring'}`,'',data.get('message')].join('\n'); const href = `mailto:jackenson@edmehub.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`; document.getElementById('form-status').textContent = 'Your email draft is ready. Send it from your email app. If it did not open, use the email link on this page.'; window.location.href = href; });
