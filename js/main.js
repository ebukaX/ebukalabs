
var ST=['Concept','In development','Available'];
var MOCKS={notes:'<svg viewBox="0 0 220 464" preserveAspectRatio="xMidYMid slice"><rect width="220" height="464" fill="#F2F1EB"/><rect x="82" y="10" width="56" height="14" rx="7" fill="#10110F"/><text x="16" y="62" font-family="Space Grotesk,sans-serif" font-weight="700" font-size="26" fill="#10110F">Today</text><text x="16" y="80" font-family="DM Sans,sans-serif" font-size="11" fill="#5f6058">3 notes, 1 reminder</text><rect x="14" y="96" width="192" height="76" rx="14" fill="#D9FA38"/><text x="28" y="122" font-family="DM Sans,sans-serif" font-weight="700" font-size="14" fill="#10110F">Call Mum back</text><rect x="28" y="136" width="64" height="20" rx="10" fill="#10110F"/><text x="60" y="150" text-anchor="middle" font-family="DM Mono,monospace" font-size="10" fill="#F2F1EB">6:00 pm</text><rect x="14" y="184" width="192" height="76" rx="14" fill="#fff" stroke="#10110F" stroke-width="1.5"/><text x="28" y="210" font-family="DM Sans,sans-serif" font-weight="700" font-size="14" fill="#10110F">Gift idea for Ada</text><text x="28" y="228" font-family="DM Sans,sans-serif" font-size="11" fill="#5f6058">Something she can use daily</text><rect x="14" y="272" width="192" height="76" rx="14" fill="#27C5E9"/><text x="28" y="298" font-family="DM Sans,sans-serif" font-weight="700" font-size="14" fill="#10110F">Book the dentist</text><rect x="28" y="312" width="74" height="20" rx="10" fill="#F22D68"/><text x="65" y="326" text-anchor="middle" font-family="DM Mono,monospace" font-size="10" fill="#fff">Tomorrow</text><rect x="14" y="372" width="148" height="44" rx="22" fill="none" stroke="#10110F" stroke-width="1.5" stroke-dasharray="4 4"/><text x="30" y="399" font-family="DM Sans,sans-serif" font-size="12" fill="#5f6058">Write it down...</text><circle cx="184" cy="394" r="22" fill="#10110F"/><path d="M184 384v20M174 394h20" stroke="#D9FA38" stroke-width="3" stroke-linecap="round"/></svg>',
kyber:'<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice"><rect width="320" height="200" fill="#10110F"/><rect x="20" y="14" width="40" height="6" rx="3" fill="#5f6058"/><rect x="240" y="14" width="60" height="6" rx="3" fill="#5f6058"/><circle cx="244" cy="84" r="28" fill="#27C5E9"/><g fill="none" stroke="#D9FA38" stroke-width="1.5"><path d="M0 120Q40 100 80 120T160 120T240 120T320 120"/><path d="M0 136Q40 116 80 136T160 136T240 136T320 136" opacity=".65"/><path d="M0 152Q40 132 80 152T160 152T240 152T320 152" opacity=".4"/><path d="M0 168Q40 148 80 168T160 168T240 168T320 168" opacity=".22"/></g><text x="20" y="72" font-family="Space Grotesk,sans-serif" font-weight="700" font-size="36" letter-spacing="-1.5" fill="#F2F1EB">Kyber</text><text x="20" y="102" font-family="Space Grotesk,sans-serif" font-weight="700" font-size="36" letter-spacing="-1.5" fill="#D9FA38">dive</text></svg>',
think:'<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice"><rect width="320" height="200" fill="#F2F1EB"/><text x="20" y="32" font-family="Space Grotesk,sans-serif" font-weight="700" font-size="16" fill="#10110F">Spot the weak argument</text><rect x="20" y="44" width="280" height="54" rx="10" fill="#10110F"/><text x="34" y="67" font-family="DM Sans,sans-serif" font-size="12" fill="#F2F1EB">Everyone says it works,</text><text x="34" y="85" font-family="DM Sans,sans-serif" font-size="12" fill="#F2F1EB">so it must be true.</text><rect x="20" y="108" width="136" height="30" rx="15" fill="none" stroke="#10110F" stroke-width="1.5"/><text x="88" y="127" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" fill="#10110F">Strong evidence</text><rect x="164" y="108" width="136" height="30" rx="15" fill="#F22D68"/><text x="232" y="127" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" font-weight="700" fill="#fff">Popular, not proven</text><rect x="20" y="146" width="136" height="30" rx="15" fill="none" stroke="#10110F" stroke-width="1.5"/><text x="88" y="165" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" fill="#10110F">Personal attack</text><circle cx="250" cy="184" r="4" fill="#10110F"/><circle cx="264" cy="184" r="4" fill="#10110F"/><circle cx="278" cy="184" r="4" fill="none" stroke="#10110F" stroke-width="1.5"/><circle cx="292" cy="184" r="4" fill="none" stroke="#10110F" stroke-width="1.5"/></svg>'};
var $=function(s){return document.querySelector(s)};
/* safety helpers: escape text before it goes into the page, and refuse script-style links */
var esc=function(t){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var safe=function(u){return /^\s*(javascript|data|vbscript):/i.test(u||'')?'':(u||'')};
var ml=$('#mail');if(ml){ml.href='mailto:'+EMAIL;ml.textContent=EMAIL}
var stack=$('#stack'),sh='';
WORK.forEach(function(w,i){
var steps='';for(var k=0;k<3;k++){steps+=(k?'<u></u>':'')+'<i class="'+(k<w.status?'on':k==w.status?'now':'')+'"></i>'}
var href=safe(w.url)||'#top',ext=w.url?' target="_blank" rel="noopener noreferrer"':'';
var vid=/\.(mp4|webm|mov|m4v)$/i.test(w.media);
var stage=w.media?(vid?'<video src="'+esc(w.media)+'" autoplay muted loop playsinline aria-label="'+esc(w.name)+' preview"></video>':'<img class="m" src="'+esc(w.media)+'" alt="'+esc(w.name)+' preview">'):'<div class="frame '+w.kind+'"><div class="sk">'+(MOCKS[w.mock]||'')+'</div></div>';
sh+='<article class="panel" id="p'+i+'" data-c="'+i%3+'" style="--i:'+i+'"><div class="txt"><div class="top m"><span>'+esc(w.cat)+'</span><span>EL-0'+(i+1)+'</span></div><div><h3>'+esc(w.name)+'</h3><p>'+esc(w.desc)+'</p></div><div><div class="steps m">'+steps+'<span>'+ST[w.status]+'</span></div><a class="btn p" href="'+esc(href)+'"'+ext+'>Visit landing page <span>&#8599;</span></a></div></div><div class="vis"><a class="inner" href="'+esc(href)+'"'+ext+' tabindex="-1" aria-hidden="true"><div class="stage'+(w.media?' md':'')+'">'+stage+'</div></a></div></article>'});
stack.innerHTML=sh;
/* scrolling strips */
function fill(id,list,n){$(id).innerHTML=list.map(function(w){return '<span>'+w+'</span>'}).join('').repeat(n)}
fill('#s1',['Discover','Define','Understand','Design','Validate','Deliver'],4);
fill('#s2',['Product design','Prototyping','Web design','User research','UI/UX design','Social media'],6);

/* about photo: set PHOTO to an image path such as images/ebuka.jpg */
if(PHOTO){$('#ph img').src=PHOTO;$('#ph').classList.add('has')}


/* crosshair */
var hero=$('#hero'),ch=$('#ch'),cv=$('#cv'),cl=$('#cl');
function off(){ch.style.top=cv.style.left='-9px';cl.style.left='-200px'}off();
hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;ch.style.top=y+'px';cv.style.left=x+'px';cl.style.left=x+'px';cl.style.top=y+'px';cl.textContent='x'+Math.round(x)+' y'+Math.round(y)});
hero.addEventListener('pointerleave',off);
/* theme + menu */
var root=document.documentElement;
$('#theme').onclick=function(){var dark=getComputedStyle(root).getPropertyValue('--bg').trim().toLowerCase()==='#10110f';root.setAttribute('data-theme',dark?'light':'dark')};
var bu=$('#burger'),mn=$('#menu');bu.onclick=function(){bu.setAttribute('aria-expanded',mn.classList.toggle('open'))};
mn.addEventListener('click',function(e){if(e.target.tagName==='A'){mn.classList.remove('open');bu.setAttribute('aria-expanded',false)}});
/* form */
$('#form').addEventListener('submit',function(e){e.preventDefault();var f=e.target;$('#msg').textContent='Opening your email app...';location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent(f.r.value+' from '+f.n.value)+'&body='+encodeURIComponent(f.m.value)});
document.querySelectorAll('[data-l]').forEach(function(a){var u=LINKS[a.dataset.l];if(safe(u)){a.href=safe(u)}else{a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.title='Link coming soon'}});
var n=0,c=['#F22D68','#27C5E9','#10110F'];$('#egg').onclick=function(){this.style.color=c[n++%3]};
