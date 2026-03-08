
        /* ════════════════════════════════════════
           PRELOADER
        ════════════════════════════════════════ */
        (() => {
            const bar = document.getElementById('pre-bar');
            const pct = document.getElementById('pre-pct');
            const msgs = ['// LOADING ASSETS', '// COMPILING SKILLS', '// BOOTING SYSTEMS', '// READY'];
            let p = 0;
            const txt = document.querySelector('.pre-txt');
            const iv = setInterval(() => {
                p = Math.min(100, p + (2 + Math.random() * 4));
                bar.style.width = p + '%';
                pct.textContent = Math.floor(p) + '%';
                txt.textContent = msgs[Math.floor(p / 26)] || msgs[3];
                if (p >= 100) {
                    clearInterval(iv);
                    setTimeout(() => {
                        document.getElementById('preloader').classList.add('done');
                        document.body.style.overflow = '';
                    }, 400);
                }
            }, 40);
            document.body.style.overflow = 'hidden';
        })();

        /* ════════════════════════════════════════
           SMOOTH SCROLL (Lenis-style via CSS + JS momentum)
        ════════════════════════════════════════ */
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const t = document.querySelector(a.getAttribute('href'));
                if (!t) return;
                // page transition flash
                const flash = document.getElementById('pg-flash');
                flash.style.animation = 'none';
                flash.offsetHeight;
                flash.style.animation = 'pgFlash .5s ease forwards';
                setTimeout(() => {
                    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 80);
            });
        });

        /* ════════════════════════════════════════
           CURSOR
        ════════════════════════════════════════ */
        const cur = document.getElementById('cur'), ring = document.getElementById('cur-ring');
        document.addEventListener('mousemove', e => {
            cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
            ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a,button,input,textarea,select,.s-orb,.tool-badge,.tool-card,.testi-card').forEach(el => {
            el.addEventListener('mouseenter', () => { cur.style.width = '18px'; cur.style.height = '18px'; ring.style.width = '52px'; ring.style.height = '52px'; ring.style.opacity = '1'; });
            el.addEventListener('mouseleave', () => { cur.style.width = '10px'; cur.style.height = '10px'; ring.style.width = '32px'; ring.style.height = '32px'; ring.style.opacity = '.5'; });
        });

        /* ════════════════════════════════════════
           SCROLL PROGRESS
        ════════════════════════════════════════ */
        window.addEventListener('scroll', () => {
            document.getElementById('prog').style.transform = `scaleX(${window.scrollY / (document.body.scrollHeight - window.innerHeight)})`;
        });

        /* ════════════════════════════════════════
           CLICK EXPLOSION
        ════════════════════════════════════════ */
        const eColors = ['#00ff88', '#ff0055', '#00cfff', '#ffd700', '#ff6600', '#cc00ff'];
        document.addEventListener('click', e => {
            const wrap = document.createElement('div'); wrap.className = 'explosion';
            wrap.style.left = e.clientX + 'px'; wrap.style.top = e.clientY + 'px';
            for (let i = 0; i < 14; i++) {
                const p = document.createElement('div'); p.className = 'exp-p';
                const a = (i / 14) * Math.PI * 2, dist = 50 + Math.random() * 80, col = eColors[i % eColors.length], sz = 3 + Math.random() * 5;
                p.style.cssText = `--tx:${Math.cos(a) * dist}px;--ty:${Math.sin(a) * dist}px;--d:${.35 + Math.random() * .4}s;background:${col};box-shadow:0 0 5px ${col};width:${sz}px;height:${sz}px;`;
                wrap.appendChild(p);
            }
            document.body.appendChild(wrap);
            setTimeout(() => wrap.remove(), 800);
        });

        /* ════════════════════════════════════════
           RANDOM GLITCH
        ════════════════════════════════════════ */
        function doGlitch() {
            const els = [...document.querySelectorAll('.glitch-wrap')];
            const el = els[Math.floor(Math.random() * els.length)];
            el.classList.add('glitching');
            setTimeout(() => el.classList.remove('glitching'), 260);
            setTimeout(doGlitch, 2800 + Math.random() * 4500);
        }
        doGlitch();

        /* ════════════════════════════════════════
           HERO PARTICLES
        ════════════════════════════════════════ */
        (() => {
            const c = document.getElementById('ptc'), ctx = c.getContext('2d');
            const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
            resize(); window.addEventListener('resize', resize);
            const pts = Array.from({ length: 55 }, () => ({ x: Math.random() * 2000, y: Math.random() * 900, vx: (Math.random() - .5) * .28, vy: -(0.08 + Math.random() * .35), r: Math.random() * 1.4 + .4, col: Math.random() > .78 ? '#ff0055' : Math.random() > .62 ? '#00cfff' : '#00ff88', a: Math.random() * .55 + .1 }));
            const draw = () => {
                ctx.clearRect(0, 0, c.width, c.height);
                pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.y < -10) { p.y = c.height + 10; p.x = Math.random() * c.width; } if (p.x < 0 || p.x > c.width) p.vx *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.col; ctx.globalAlpha = p.a; ctx.fill(); });
                ctx.globalAlpha = 1; requestAnimationFrame(draw);
            }; draw();
        })();

        /* ════════════════════════════════════════
           COUNTDOWN
        ════════════════════════════════════════ */
        const cdT = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        const updCD = () => {
            const d = cdT - Date.now(); if (d <= 0) return;
            document.getElementById('cd-d').textContent = String(Math.floor(d / 864e5)).padStart(2, '0');
            document.getElementById('cd-h').textContent = String(Math.floor((d % 864e5) / 36e5)).padStart(2, '0');
            document.getElementById('cd-m').textContent = String(Math.floor((d % 36e5) / 6e4)).padStart(2, '0');
            document.getElementById('cd-s').textContent = String(Math.floor((d % 6e4) / 1e3)).padStart(2, '0');
        };
        updCD(); setInterval(updCD, 1000);

        /* ════════════════════════════════════════
           LIVE STATS TICKER
        ════════════════════════════════════════ */
        (() => {
            const stats = [
                { icon: '📈', val: '74%', lbl: 'FOREX WIN RATE' },
                { icon: '💰', val: '3+', lbl: 'FUNDED ACCOUNTS' },
                { icon: '💻', val: '847', lbl: 'COMMITS THIS YEAR' },
                { icon: '🎨', val: '230+', lbl: 'DESIGNS SHIPPED' },
                { icon: '🔓', val: '94', lbl: 'VULNS PATCHED' },
                { icon: '🎵', val: '61', lbl: 'TRACKS PRODUCED' },
                { icon: '🌐', val: '47', lbl: 'SITES DEPLOYED' },
                { icon: '🛡️', val: '12', lbl: 'FIREWALLS BUILT' },
                { icon: '✍️', val: '180K', lbl: 'WORDS WRITTEN' },
                { icon: '⭐', val: '4.9', lbl: 'AVG CLIENT RATING' },
                { icon: '🎬', val: '38', lbl: 'VIDEOS EDITED' },
                { icon: '⚡', val: '99%', lbl: 'UPTIME RECORD' },
            ];
            const ticker = document.getElementById('ticker');
            // Double the stats for seamless loop
            [...stats, ...stats].forEach((s, i) => {
                const item = document.createElement('div'); item.className = 'stat-item';
                item.innerHTML = `<span class="stat-item-icon">${s.icon}</span><span class="stat-item-val">${s.val}</span><span class="stat-item-lbl">${s.lbl}</span>`;
                ticker.appendChild(item);
                if (i < stats.length * 2 - 1) { const sep = document.createElement('span'); sep.className = 'stat-sep'; sep.textContent = '·'; ticker.appendChild(sep); }
            });
        })();

        /* ════════════════════════════════════════
           CINEMATIC REVEAL (Intersection Observer)
        ════════════════════════════════════════ */
        const revObs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
        }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => revObs.observe(el));

        /* ════════════════════════════════════════
           MAGNETIC BUTTONS
        ════════════════════════════════════════ */
        document.querySelectorAll('.mag-btn').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const r = btn.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * .25;
                const y = (e.clientY - r.top - r.height / 2) * .25;
                btn.style.transform = `translate(${x}px,${y}px)`;
            });
            btn.addEventListener('mouseleave', () => btn.style.transform = '');
        });

        /* ════════════════════════════════════════
           HAMBURGER / DRAWER
        ════════════════════════════════════════ */
        const ham = document.getElementById('ham');
        const drawer = document.getElementById('mobile-drawer');
        ham.addEventListener('click', e => {
            e.stopPropagation();
            const open = drawer.classList.toggle('open');
            ham.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
        drawer.addEventListener('click', e => {
            if (e.target === drawer) { drawer.classList.remove('open'); ham.classList.remove('open'); document.body.style.overflow = ''; }
        });
        document.querySelectorAll('.mob-link').forEach(a => {
            a.addEventListener('click', () => { drawer.classList.remove('open'); ham.classList.remove('open'); document.body.style.overflow = ''; });
        });
        const skillSlugMap = {
            'Logo Design': 'logo-design',
            'Content Writing': 'content-writing',
            'Programming': 'programming',
            'Ethical Hacking': 'ethical-hacking',
            'Music Prod.': 'music-production',
            'Video Prod.': 'video-production',
            'Photo Editing': 'photo-editing',
            'Graphic Design': 'graphic-design',
            'Firewall Dev': 'firewall-development',
            'Web Dev': 'web-development',
            'Full Stack': 'full-stack',
            'Forex / Funds': 'forex-funds',
            'Writing': 'content-writing',
            'Hacking': 'ethical-hacking',
            'Music': 'music-production',
            'Video': 'video-production',
            'Photo': 'photo-editing',
            'Graphic': 'graphic-design',
            'Firewall': 'firewall-development',
            'Forex': 'forex-funds'
        };
        function openSkillPage(skillName) {
            const slug = skillSlugMap[skillName] || String(skillName).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            window.location.href = 'skills/' + slug + '.html';
        }
        /* ════════════════════════════════════════
           3D GLOBE
        ════════════════════════════════════════ */
        (() => {
            const skills = [
                { label: 'Logo Design', icon: '🎨', color: '#00ff88', lat: 30, lon: 0 },
                { label: 'Content Writing', icon: '✍️', color: '#00cfff', lat: -20, lon: 60 },
                { label: 'Programming', icon: '💻', color: '#ffd700', lat: 50, lon: 120 },
                { label: 'Ethical Hacking', icon: '🔓', color: '#ff0055', lat: -40, lon: 180 },
                { label: 'Music Prod.', icon: '🎵', color: '#cc00ff', lat: 10, lon: -60 },
                { label: 'Video Prod.', icon: '🎬', color: '#ff6600', lat: -55, lon: -120 },
                { label: 'Photo Editing', icon: '🖼️', color: '#00ffcc', lat: 65, lon: 60 },
                { label: 'Graphic Design', icon: '🖌️', color: '#ff3399', lat: -10, lon: -30 },
                { label: 'Firewall Dev', icon: '🛡️', color: '#ff2222', lat: 20, lon: 150 },
                { label: 'Web Dev', icon: '🌐', color: '#0099ff', lat: -30, lon: 90 },
                { label: 'Full Stack', icon: '⚡', color: '#00ff88', lat: 40, lon: -150 },
                { label: 'Forex / Funds', icon: '📈', color: '#ffd700', lat: -15, lon: 30 },
            ];
            const c = document.getElementById('globe-c'), ctx = c.getContext('2d');
            const setSize = () => { const s = Math.min(500, window.innerWidth - 40); c.width = s; c.height = s; };
            setSize(); window.addEventListener('resize', setSize);
            const W = () => c.width, H = () => c.height, R = () => c.width * .42;
            let rY = 0, rX = .28, drag = false, lx = 0, ly = 0, spin = true;
            const leg = document.getElementById('g-leg');
            skills.forEach(s => { const d = document.createElement('div'); d.className = 'g-li'; d.innerHTML = `<div class="g-dot" style="background:${s.color};box-shadow:0 0 5px ${s.color}"></div>${s.label}`; d.style.cursor = 'pointer'; d.title = `View ${s.label} services`; d.addEventListener('click', () => openSkillPage(s.label)); leg.appendChild(d); });
            const proj = (lat, lon) => {
                const la = lat * Math.PI / 180, lo = lon * Math.PI / 180;
                let x = Math.cos(la) * Math.sin(lo), y = Math.sin(la), z = Math.cos(la) * Math.cos(lo);
                const x1 = x * Math.cos(rY) + z * Math.sin(rY), z1 = -x * Math.sin(rY) + z * Math.cos(rY);
                const y2 = y * Math.cos(rX) - z1 * Math.sin(rX), z2 = y * Math.sin(rX) + z1 * Math.cos(rX);
                return { sx: W() / 2 + x1 * R(), sy: H() / 2 - y2 * R(), z: z2 };
            };
            const draw = () => {
                const cw = W(), ch = H(), cr = R(); ctx.clearRect(0, 0, cw, ch);
                const g = ctx.createRadialGradient(cw / 2, ch / 2, cr * .2, cw / 2, ch / 2, cr * 1.1);
                g.addColorStop(0, 'rgba(0,255,136,.035)'); g.addColorStop(1, 'transparent');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cw / 2, ch / 2, cr * 1.1, 0, Math.PI * 2); ctx.fill();
                for (let la = -75; la <= 75; la += 15) { ctx.beginPath(); for (let lo = 0; lo <= 360; lo += 5) { const p = proj(la, lo); const a = Math.max(0, (p.z + .5) * .3); if (lo === 0) ctx.moveTo(p.sx, p.sy); else { ctx.strokeStyle = `rgba(0,255,136,${a})`; ctx.lineWidth = .35; ctx.lineTo(p.sx, p.sy); } } ctx.stroke(); }
                for (let lo = 0; lo < 360; lo += 20) { ctx.beginPath(); for (let la = -90; la <= 90; la += 5) { const p = proj(la, lo); const a = Math.max(0, (p.z + .5) * .22); ctx.strokeStyle = `rgba(0,207,255,${a})`; ctx.lineWidth = .28; if (la === -90) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy); } ctx.stroke(); }
                const sorted = skills.map(s => { const p = proj(s.lat, s.lon); return { ...s, ...p }; }).sort((a, b) => a.z - b.z);
                sorted.forEach(s => {
                    if (s.z < -.12) return;
                    const al = Math.max(0, (s.z + .3) * .9), sc = .55 + s.z * .55, r = 9 * sc * (cr / 210);
                    const grd = ctx.createRadialGradient(s.sx, s.sy, 0, s.sx, s.sy, r * 2.8);
                    grd.addColorStop(0, s.color + '44'); grd.addColorStop(1, 'transparent');
                    ctx.fillStyle = grd; ctx.globalAlpha = al; ctx.beginPath(); ctx.arc(s.sx, s.sy, r * 2.8, 0, Math.PI * 2); ctx.fill();
                    ctx.globalAlpha = al; ctx.beginPath(); ctx.arc(s.sx, s.sy, r, 0, Math.PI * 2); ctx.fillStyle = s.color; ctx.fill();
                    ctx.font = `${16 * sc * (cr / 210)}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s.icon, s.sx, s.sy);
                    if (s.z > .28 && cw > 300) { ctx.font = `bold ${9 * sc * (cr / 210)}px 'Rajdhani',sans-serif`; ctx.fillStyle = '#fff'; ctx.globalAlpha = al * .85; ctx.fillText(s.label, s.sx, s.sy + r + 9 * sc * (cr / 210)); }
                    ctx.globalAlpha = 1;
                });
                ctx.beginPath(); ctx.arc(cw / 2, ch / 2, cr, 0, Math.PI * 2);
                const rim = ctx.createRadialGradient(cw / 2, ch / 2, cr * .88, cw / 2, ch / 2, cr);
                rim.addColorStop(0, 'transparent'); rim.addColorStop(1, 'rgba(0,255,136,.1)');
                ctx.strokeStyle = rim; ctx.lineWidth = 2; ctx.stroke();
            };
            const loop = () => { if (spin && !drag) rY += .0035; draw(); requestAnimationFrame(loop); }; loop();
            c.addEventListener('mousedown', e => { drag = true; spin = false; lx = e.clientX; ly = e.clientY; });
            window.addEventListener('mouseup', () => { drag = false; setTimeout(() => spin = true, 1800); });
            window.addEventListener('mousemove', e => { if (!drag) return; rY += (e.clientX - lx) * .005; rX += (e.clientY - ly) * .004; rX = Math.max(-.75, Math.min(.75, rX)); lx = e.clientX; ly = e.clientY; });
            c.addEventListener('touchstart', e => { drag = true; spin = false; lx = e.touches[0].clientX; ly = e.touches[0].clientY; }, { passive: true });
            window.addEventListener('touchend', () => { drag = false; setTimeout(() => spin = true, 1800); });
            window.addEventListener('touchmove', e => { if (!drag) return; rY += (e.touches[0].clientX - lx) * .006; rX += (e.touches[0].clientY - ly) * .005; rX = Math.max(-.75, Math.min(.75, rX)); lx = e.touches[0].clientX; ly = e.touches[0].clientY; }, { passive: true });
        })();

        /* ════════════════════════════════════════
           DRAGGABLE ORBS
        ════════════════════════════════════════ */
        (() => {
            const data = [{ lb: 'Logo Design', ic: '🎨', col: '#00ff88', sz: 88 }, { lb: 'Writing', ic: '✍️', col: '#00cfff', sz: 78 }, { lb: 'Programming', ic: '💻', col: '#ffd700', sz: 94 }, { lb: 'Hacking', ic: '🔓', col: '#ff0055', sz: 86 }, { lb: 'Music', ic: '🎵', col: '#cc00ff', sz: 80 }, { lb: 'Video', ic: '🎬', col: '#ff6600', sz: 83 }, { lb: 'Photo', ic: '🖼️', col: '#00ffcc', sz: 76 }, { lb: 'Graphic', ic: '🖌️', col: '#ff3399', sz: 82 }, { lb: 'Firewall', ic: '🛡️', col: '#ff2222', sz: 85 }, { lb: 'Web Dev', ic: '🌐', col: '#0099ff', sz: 88 }, { lb: 'Full Stack', ic: '⚡', col: '#00ff88', sz: 90 }, { lb: 'Forex', ic: '📈', col: '#ffd700', sz: 92 }];
            const arena = document.getElementById('orbs-arena');
            const orbs = []; const AW = () => arena.offsetWidth, AH = () => arena.offsetHeight;
            data.forEach(d => {
                const x = d.sz / 2 + Math.random() * (AW() - d.sz), y = d.sz / 2 + Math.random() * (AH() - d.sz);
                const el = document.createElement('div'); el.className = 's-orb';
                el.style.cssText = `width:${d.sz}px;height:${d.sz}px;left:${x - d.sz / 2}px;top:${y - d.sz / 2}px;background:radial-gradient(circle at 35% 35%,${d.col}20,${d.col}07 65%,transparent);border:1.5px solid ${d.col}40;box-shadow:0 0 16px ${d.col}1a,inset 0 0 8px ${d.col}0d;`;
                el.innerHTML = `<span class="orb-ic">${d.ic}</span><span class="orb-lb">${d.lb}</span>`;
                arena.appendChild(el);
                const orb = { el, x: x - d.sz / 2, y: y - d.sz / 2, vx: (Math.random() - .5) * 1.6, vy: (Math.random() - .5) * 1.6, r: d.sz / 2, col: d.col, dragging: false, pvx: 0, pvy: 0 };
                orbs.push(orb);
                const startDrag = (cx, cy) => { orb.dragging = true; orb.ox = cx - orb.x; orb.oy = cy - orb.y; orb.pvx = 0; orb.pvy = 0; el.style.boxShadow = `0 0 35px ${d.col}55,0 0 70px ${d.col}28`; };
                el.addEventListener('mousedown', e => { startDrag(e.clientX, e.clientY); e.preventDefault(); e.stopPropagation(); });
                el.addEventListener('touchstart', e => { startDrag(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }, { passive: false });
            });
            const moveDrag = (cx, cy) => { orbs.forEach(o => { if (!o.dragging) return; const rect = arena.getBoundingClientRect(); const nx = cx - rect.left, ny = cy - rect.top; o.pvx = nx - o.r - o.x; o.pvy = ny - o.r - o.y; o.x = nx - o.r; o.y = ny - o.r; o.el.style.left = o.x + 'px'; o.el.style.top = o.y + 'px'; }); };
            window.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
            window.addEventListener('touchmove', e => { moveDrag(e.touches[0].clientX, e.touches[0].clientY); if (orbs.some(o => o.dragging)) e.preventDefault(); }, { passive: false });
            const release = () => orbs.forEach(o => { if (o.dragging) { o.vx = Math.max(-8, Math.min(8, o.pvx * .18)); o.vy = Math.max(-8, Math.min(8, o.pvy * .18)); o.dragging = false; o.el.style.boxShadow = `0 0 16px ${o.col}1a,inset 0 0 8px ${o.col}0d`; } });
            window.addEventListener('mouseup', release); window.addEventListener('touchend', release);
            const loop = () => {
                const W = AW(), H = AH();
                orbs.forEach(o => {
                    if (o.dragging) return; o.x += o.vx; o.y += o.vy; o.vx *= .992; o.vy *= .992;
                    if (o.x < 0) { o.x = 0; o.vx = Math.abs(o.vx) * .8; } if (o.x > W - o.r * 2) { o.x = W - o.r * 2; o.vx = -Math.abs(o.vx) * .8; }
                    if (o.y < 0) { o.y = 0; o.vy = Math.abs(o.vy) * .8; } if (o.y > H - o.r * 2) { o.y = H - o.r * 2; o.vy = -Math.abs(o.vy) * .8; }
                    orbs.forEach(o2 => { if (o === o2) return; const dx = o2.x + o2.r - (o.x + o.r), dy = o2.y + o2.r - (o.y + o.r), dist = Math.sqrt(dx * dx + dy * dy), minD = o.r + o2.r; if (dist < minD && dist > .1) { const nx = dx / dist, ny = dy / dist, ov = (minD - dist) / 2; o.x -= nx * ov; o.y -= ny * ov; o2.x += nx * ov; o2.y += ny * ov; const rv = (o.vx - o2.vx) * nx + (o.vy - o2.vy) * ny; if (rv > 0) return; o.vx -= rv * nx * .65; o.vy -= rv * ny * .65; o2.vx += rv * nx * .65; o2.vy += rv * ny * .65; } });
                    o.el.style.left = o.x + 'px'; o.el.style.top = o.y + 'px';
                }); requestAnimationFrame(loop);
            }; loop();
        })();

        /* ════════════════════════════════════════
           TOOLS & CERTIFICATIONS
        ════════════════════════════════════════ */
        (() => {
            const tools = [
                { icon: 'PY', name: 'Python' },
                { icon: 'RE', name: 'React' },
                { icon: 'JS', name: 'JavaScript' },
                { icon: 'RS', name: 'Rust' },
                { icon: 'FG', name: 'Figma' },
                { icon: 'PS', name: 'Photoshop' },
                { icon: 'AI', name: 'Illustrator' },
                { icon: 'PP', name: 'Premiere Pro' },
                { icon: 'KL', name: 'Kali Linux' },
                { icon: 'WS', name: 'Wireshark' },
                { icon: 'ND', name: 'Node.js' },
                { icon: 'DB', name: 'PostgreSQL' },
                { icon: 'AWS', name: 'AWS' },
                { icon: 'DK', name: 'Docker' },
                { icon: 'AB', name: 'Ableton' },
                { icon: 'DV', name: 'DaVinci Resolve' },
                { icon: 'TV', name: 'TradingView' },
                { icon: 'MT5', name: 'MetaTrader 5' },
                { icon: 'CT', name: 'cTrader' },
                { icon: 'FT', name: 'FTMO / Prop Firms' },
                { icon: 'VS', name: 'VS Code' },
                { icon: 'AG', name: 'Antigravity' },
                { icon: 'XL', name: 'Excel' },
                { icon: 'WD', name: 'Word' },
                { icon: 'GH', name: 'GitHub' },
                { icon: 'FB', name: 'Firebase' },
                { icon: 'NF', name: 'Netlify' },
            ];
            const track = document.getElementById('tools-track');
            // Double for seamless scroll loop
            [...tools, ...tools].forEach(t => {
                const b = document.createElement('div'); b.className = 'tool-badge';
                b.innerHTML = `<span class="tool-icon">${t.icon}</span><span class="tool-name">${t.name}</span>`;
                track.appendChild(b);
            }); const toolsInUse = [
                { icon: 'PY', name: 'Python', use: 'AUTOMATION � BACKEND' },
                { icon: 'RE', name: 'React', use: 'FRONTEND APPS' },
                { icon: 'JS', name: 'JavaScript', use: 'CLIENT LOGIC' },
                { icon: 'RS', name: 'Rust', use: 'HIGH-PERF MODULES' },
                { icon: 'FG', name: 'Figma', use: 'UI SYSTEMS' },
                { icon: 'PS', name: 'Photoshop', use: 'IMAGE EDITING' },
                { icon: 'AI', name: 'Illustrator', use: 'VECTOR DESIGN' },
                { icon: 'PP', name: 'Premiere Pro', use: 'VIDEO EDITING' },
                { icon: 'KL', name: 'Kali Linux', use: 'SECURITY TESTING' },
                { icon: 'WS', name: 'Wireshark', use: 'NETWORK ANALYSIS' },
                { icon: 'ND', name: 'Node.js', use: 'API SERVICES' },
                { icon: 'DB', name: 'PostgreSQL', use: 'DATA LAYER' },
                { icon: 'AWS', name: 'AWS', use: 'CLOUD DEPLOYMENT' },
                { icon: 'DK', name: 'Docker', use: 'CONTAINERS' },
                { icon: 'AB', name: 'Ableton', use: 'AUDIO PRODUCTION' },
                { icon: 'DV', name: 'DaVinci Resolve', use: 'POST PRODUCTION' },
                { icon: 'TV', name: 'TradingView', use: 'MARKET ANALYSIS' },
                { icon: 'MT5', name: 'MetaTrader 5', use: 'TRADE EXECUTION' },
                { icon: 'CT', name: 'cTrader', use: 'TRADE EXECUTION' },
                { icon: 'FT', name: 'FTMO / Prop Firms', use: 'FUNDED ACCOUNTS' },
                { icon: 'VS', name: 'VS Code', use: 'DEVELOPMENT' },
                { icon: 'AG', name: 'Antigravity', use: 'WORKFLOW TOOLING' },
                { icon: 'XL', name: 'Excel', use: 'DATA SHEETS' },
                { icon: 'WD', name: 'Word', use: 'DOCUMENTATION' },
                { icon: 'GH', name: 'GitHub', use: 'VERSION CONTROL' },
                { icon: 'FB', name: 'Firebase', use: 'BACKEND SERVICES' },
                { icon: 'NF', name: 'Netlify', use: 'DEPLOYMENT' },
            ];
            const tGrid = document.getElementById('tools-grid');
            toolsInUse.forEach(t => {
                const card = document.createElement('div'); card.className = 'tool-card';
                card.innerHTML = `<span class="tool-card-icon">${t.icon}</span><div class="tool-card-info"><span class="tool-card-name">${t.name}</span><span class="tool-card-use">${t.use}</span></div>`;
                tGrid.appendChild(card);
            });
        })();

        /* ════════════════════════════════════════
           TESTIMONIALS
        ════════════════════════════════════════ */
        (() => {
            const testimonials = [
                { text: "Working with NEXORA was organized and dependable. Communication stayed clear, and the final delivery matched expectations after a few rounds of refinement.", stars: 4 },
                { text: "The team handled both creative and technical parts with a practical approach. Timelines were realistic and outcomes were solid enough to recommend.", stars: 5 },
                { text: "Execution quality was consistent, and handover documentation made implementation easier. A reliable choice for multi-skill projects.", stars: 5 },
            ];
            const grid = document.getElementById('testi-grid');
            testimonials.forEach((t, i) => {
                const card = document.createElement('div'); card.className = 'testi-card reveal';
                card.style.transitionDelay = `${i * 0.15}s`;
                card.innerHTML = `<div class="testi-quote-mark">"</div><div class="testi-stars">${'★'.repeat(t.stars)}</div><p class="testi-text">"${t.text}"</p>`;
                grid.appendChild(card);
                revObs.observe(card);
            });
        })();

        /* ════════════════════════════════════════
           TERMINAL
        ════════════════════════════════════════ */
        const tLines = [
            { type: 'cmd', t: 'whoami' }, { type: 'out', t: '<span class="tg">NEXORA</span> — digital polymath, creative technologist' },
            { type: 'cmd', t: 'ls skills/ | wc -l' }, { type: 'out', t: '<span class="tg">12</span> disciplines across design, tech, security, media &amp; markets' },
            { type: 'cmd', t: 'nmap -sV --script=vuln 192.168.1.1' }, { type: 'out', t: '<span class="tr">[SCAN]</span> Ports 22,80,443 · <span class="tg">Firewall active</span> · <span class="tg">0 vulnerabilities found</span>' },
            { type: 'cmd', t: 'forex --account funded --pair XAUUSD --analyze' }, { type: 'out', t: '<span class="tg">[TRADE]</span> Win rate: 74% · Drawdown: &lt;4% · Funded accounts managed: active · <span class="tg">P&L: +ve</span>' },
            { type: 'cmd', t: 'git push origin main && deploy --prod' }, { type: 'out', t: '<span class="tg">[DEPLOYED]</span> 847 commits · 0 bugs · 100% test pass · live in 3.2s' },
            { type: 'cmd', t: './run_portfolio.sh' }, { type: 'out', t: '<span class="tg">[READY]</span> All systems operational <span class="c-blink"></span>' },
        ];
        let li = 0; const tb = document.getElementById('t-body');
        const typeNext = () => { if (li >= tLines.length) return; const l = tLines[li]; const div = document.createElement('div'); if (l.type === 'cmd') { div.className = 't-ln'; div.innerHTML = `<span class="t-pr">$</span><span class="t-cm"></span>`; tb.appendChild(div); const tc = div.querySelector('.t-cm'); let ci = 0; const t = setInterval(() => { tc.textContent = l.t.substring(0, ci++); if (ci > l.t.length) { clearInterval(t); li++; setTimeout(typeNext, 160); } }, 32); } else { div.className = 't-ot'; div.innerHTML = l.t; tb.appendChild(div); li++; setTimeout(typeNext, 75); } };
        new IntersectionObserver(e => { if (e[0].isIntersecting) typeNext(); }, { threshold: .3 }).observe(document.getElementById('term-sec'));

        /* ════════════════════════════════════════
           TIMELINE REVEAL
        ════════════════════════════════════════ */
        document.querySelectorAll('.tl-it').forEach(el => { new IntersectionObserver(e => { if (e[0].isIntersecting) e[0].target.classList.add('vis'); }, { threshold: .2 }).observe(el); });

        /* ════════════════════════════════════════
           COUNTERS
        ════════════════════════════════════════ */
        document.querySelectorAll('.st-n[data-target]').forEach(el => { new IntersectionObserver(e => { if (e[0].isIntersecting) { const tgt = parseInt(el.dataset.target); let cur = 0; const step = tgt / 50; const t = setInterval(() => { cur += step; if (cur >= tgt) { cur = tgt; clearInterval(t); } el.textContent = Math.floor(cur) + (tgt === 100 ? '%' : ''); }, 22); } }, { threshold: .5 }).observe(el); });

        /* ════════════════════════════════════════
           CONTACT FORM — auto greeting
        ════════════════════════════════════════ */
        const greetings = ['Hey {name}, let\'s build something legendary.', 'Welcome {name} — ready when you are.', 'Glad you\'re here, {name}. Let\'s NEXORA something.', 'Hi {name} 👋 — drop your brief below.'];
        document.getElementById('cf-name').addEventListener('input', function () {
            const name = this.value.trim();
            const el = document.getElementById('cf-greeting');
            if (name.length > 1) {
                el.textContent = greetings[Math.floor(Date.now() / 1000) % greetings.length].replace('{name}', name);
                el.classList.add('show');
            } else { el.classList.remove('show'); }
        });
        async function handleSub(e) {
    e.preventDefault();
    const form = document.getElementById('cf');
    const ok = document.getElementById('cOk');
    const err = document.getElementById('cf-error');
    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('span');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (err) err.style.display = 'none';
    const prevText = btnText.textContent;
    btn.disabled = true;
    btnText.textContent = 'SENDING...';

    try {
        const body = new URLSearchParams(new FormData(form)).toString();
        const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body
        });

        if (!res.ok) {
            throw new Error('submit_failed');
        }

        form.style.display = 'none';
        ok.classList.add('show');
        form.reset();
        const greet = document.getElementById('cf-greeting');
        if (greet) greet.classList.remove('show');
    } catch (error) {
        if (err) err.style.display = 'block';
    } finally {
        btn.disabled = false;
        btnText.textContent = prevText;
    }
}

        /* ════════════════════════════════════════
           EASTER EGG
        ════════════════════════════════════════ */
        let ebuf = '';
        document.addEventListener('keydown', ev => {
            ebuf += ev.key.toUpperCase(); if (ebuf.length > 9) ebuf = ebuf.slice(-9);
            if (ebuf === 'NEXORA') {
                document.body.style.transition = 'filter .25s';
                [['invert(1) hue-rotate(180deg)', 0], ['none', 380], ['brightness(4)', 580], ['none', 700]].forEach(([f, ms]) => setTimeout(() => document.body.style.filter = f, ms));
                const msg = document.createElement('div');
                msg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;font-family:\'Black Ops One\',sans-serif;font-size:clamp(2.5rem,7vw,6rem);color:var(--acid);text-shadow:0 0 55px var(--acid);text-align:center;pointer-events:none;animation:hRev .5s ease forwards;';
                msg.innerHTML = 'SYSTEM<br><span style="color:#fff">UNLOCKED</span>';
                document.body.appendChild(msg);
                for (let i = 0; i < 6; i++)setTimeout(() => document.dispatchEvent(new MouseEvent('click', { clientX: window.innerWidth / 2 + Math.random() * 200 - 100, clientY: window.innerHeight / 2 + Math.random() * 200 - 100 })), i * 130);
                setTimeout(() => msg.remove(), 2800); ebuf = '';
            }
        });
        setTimeout(() => { const h = document.getElementById('egg-hint'); h.style.opacity = '.32'; setTimeout(() => h.style.opacity = '0', 3200); }, 8000);
    


