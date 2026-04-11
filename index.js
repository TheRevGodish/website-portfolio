 document.querySelectorAll('.skt').forEach(function(skt, index) {
  function update() {
    var barPct = parseFloat(skt.querySelector('.skf').style.width) / 100;
    var px = skt.offsetWidth * barPct;
    skt.style.setProperty('--bar-width', px + 'px');
  }
  update();
  window.addEventListener('resize', update);

  var delay = index * 0.31 + Math.random() * 0.2;
  skt.querySelector('.skball').style.animationDelay = '-' + delay + 's';
});
(function(){
  var el=document.getElementById('lapTimer'),s=Date.now();
  function tick(){var ms=Date.now()-s,min=Math.floor(ms/60000),sec=Math.floor((ms%60000)/1000),cs=Math.floor((ms%1000)/10);el.textContent=min+':'+(sec<10?'0':'')+sec+'.'+(cs<10?'0':'')+cs;requestAnimationFrame(tick);}
  tick();
})();
(function(){
  document.body.classList.add('js-ready');
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('on');
      } else {
        e.target.classList.remove('on');
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.rev').forEach(function(el){ obs.observe(el); });
})();
(function(){
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.querySelectorAll('.skf').forEach(function(f){var w=f.style.width;f.style.width='0';setTimeout(function(){f.style.width=w;},80);});obs.unobserve(e.target);}});},{threshold:0.1});
  var b=document.querySelector('.tboard');if(b)obs.observe(b);
})();
function typeLines(elId, lines, speed) {
  var el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = '';
  var lineIndex = 0;
  var charIndex = 0;
  var currentDiv = null;

  function nextChar() {
    if (lineIndex >= lines.length) {
      el.innerHTML += '<span class="radio-cursor"></span>';
      return;
    }
    if (charIndex === 0) {
      currentDiv = document.createElement('div');
      currentDiv.className = 'radio-line';
      el.appendChild(currentDiv);
    }
    currentDiv.textContent += lines[lineIndex][charIndex];
    charIndex++;
    if (charIndex >= lines[lineIndex].length) {
      lineIndex++;
      charIndex = 0;
      setTimeout(nextChar, speed * 3);
    } else {
      setTimeout(nextChar, speed);
    }
  }
  nextChar();
}

var obs2 = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      typeLines('radioProfile', [
        '// engineer profile — 2026',
        '{',
        '\u00A0\u00A0\u00A0"name": "Thomas Sajus",',
        '\u00A0\u00A0\u00A0"role": "Software Engineer",',
        '\u00A0\u00A0\u00A0"constructor": "CGI France",',
        '\u00A0\u00A0\u00A0"academy": "ENSEIRB-MATMECA",',
        '\u00A0\u00A0\u00A0"focus": "actively seeking a 3-month international mobility opportunity",',
        '\u00A0\u00A0\u00A0"championships": 2,',
        '}'
      ], 28);
      obs2.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

var obs3 = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      typeLines('radioContact', [
        '// race engineer comms',
        '{',
        '\u00A0\u00A0\u00A0"status": "actively seeking a 3-month international mobility opportunity",',
        '\u00A0\u00A0\u00A0"desired secteur": "motor sports",',
        '\u00A0\u00A0\u00A0"stack": "software / networks / data",',
        '\u00A0\u00A0\u00A0"strategy": "data engeineering",',
        '\u00A0\u00A0\u00A0"pit_stop": "< 48h",',
        '\u00A0\u00A0\u00A0"available": true',
        '}'
      ], 28);
      obs3.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

var rp = document.getElementById('radioProfile');
var rc = document.getElementById('radioContact');
if (rp) obs2.observe(rp);
if (rc) obs3.observe(rc);
(function(){
  var grid=document.getElementById('projGrid');
  var user='TheRevGodish';
  var LC={JavaScript:'#f1e05a',Python:'#3572A5',C:'#aaa','C++':'#f34b7d',Java:'#b07219',HTML:'#e34c26',CSS:'#563d7c',Shell:'#89e051',TypeScript:'#2b7489',Go:'#00ADD8',Rust:'#dea584',PHP:'#4F5D95'};
  fetch('https://api.github.com/users/'+user+'/repos?sort=updated&per_page=6',{headers:{Accept:'application/vnd.github.v3+json'}})
  .then(function(r){if(!r.ok)throw r.status;return r.json();})
  .then(function(repos){
    var list=repos.filter(function(r){return!r.fork;}).slice(0,6);
    if(!list.length)throw 'empty';
    grid.innerHTML=list.map(function(r){
      var lc=LC[r.language]||'#888';
      var d=new Date(r.updated_at).toLocaleDateString('fr-FR',{month:'short',year:'numeric'});
      var lng=r.language?'<div class="plng" style="color:'+lc+'"><div class="plng-dot" style="background:'+lc+'"></div>'+r.language+'</div>':'';
      var stars=r.stargazers_count>0?'&#9733; '+r.stargazers_count+' ':'';
      var forks=r.forks_count>0?'&#10522; '+r.forks_count+' ':'';
      return '<a href="'+r.html_url+'" target="_blank" rel="noopener" class="pc">'
        +'<div class="pimg"><img src="https://opengraph.githubassets.com/2/'+user+'/'+r.name+'" alt="'+r.name+'" loading="lazy" onerror="this.style.display=\'none\'">'
        +'<div class="pph">// '+r.name+'</div>'+lng+'</div>'
        +'<div class="pbody"><div class="pname">'+r.name+'</div>'
        +'<div class="pdesc">'+(r.description||'// no description')+'</div>'
        +'<div class="pfoot"><span>'+stars+forks+'&#8635; '+d+'</span><div class="parr">&#8599;</div></div>'
        +'</div></a>';
    }).join('');
  })
  .catch(function(){
    grid.innerHTML='<div class="pload"><a href="https://github.com/'+user+'" target="_blank" style="color:var(--r);text-decoration:none">github.com/'+user+'</a></div>';
  });
})();