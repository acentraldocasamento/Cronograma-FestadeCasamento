import React, { useState, useEffect, useRef, useCallback } from "react";

// ════════════════════════════════════════════
//  CSS
// ════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --ivory:#FAF7F2;--cream:#F5EFE6;
  --gold:#C9A84C;--gold-lt:#E8D5A3;
  --wine:#7B2D3E;--wine-dk:#4A1E2B;
  --text:#2C1A1A;--text-s:#6B5050;
  --border:#E8D9C8;
  --sh:0 4px 24px rgba(44,26,26,.08);
  --sh-lg:0 12px 48px rgba(44,26,26,.15);
}
html,body{min-height:100vh;background:var(--ivory);color:var(--text);font-family:'Jost',sans-serif;font-size:15px;line-height:1.6}
h1,h2,h3,h4{font-family:'Playfair Display',serif}

.wrap{max-width:1080px;margin:0 auto;padding:0 20px}
.pg{min-height:100vh}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:580px){.row2{grid-template-columns:1fr}}

.nav{background:var(--wine-dk);padding:13px 0;position:sticky;top:0;z-index:50;box-shadow:0 2px 12px rgba(0,0,0,.3)}
.nav-i{display:flex;align-items:center;justify-content:space-between;gap:10px}
.brand{font-family:'Playfair Display',serif;color:var(--gold-lt);font-size:1.15rem;line-height:1;cursor:pointer}
.brand small{display:block;font-family:'Jost',sans-serif;font-size:.64rem;color:rgba(255,255,255,.38);font-weight:300;letter-spacing:.13em;text-transform:uppercase;margin-top:2px}
.nav-r{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.nav-info{color:rgba(255,255,255,.55);font-size:.78rem;text-align:right;line-height:1.4}

.btn{padding:9px 20px;border:none;cursor:pointer;font-family:'Jost',sans-serif;font-size:.84rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;transition:all .2s;border-radius:2px;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
.btn:disabled{opacity:.42;cursor:not-allowed;transform:none!important;box-shadow:none!important}
.b-gold{background:var(--gold);color:#fff}
.b-gold:hover:not(:disabled){background:#b8963f;transform:translateY(-1px);box-shadow:0 4px 14px rgba(201,168,76,.4)}
.b-wine{background:var(--wine);color:#fff}
.b-wine:hover:not(:disabled){background:var(--wine-dk);transform:translateY(-1px)}
.b-out{background:transparent;border:1.5px solid var(--gold);color:var(--gold)}
.b-out:hover:not(:disabled){background:var(--gold);color:#fff}
.b-ghost{background:transparent;border:1.5px solid rgba(255,255,255,.28);color:#fff;font-size:.78rem;padding:7px 12px}
.b-ghost:hover:not(:disabled){background:rgba(255,255,255,.1)}
.b-muted{background:transparent;border:1.5px solid var(--border);color:var(--text-s);font-size:.78rem;padding:7px 12px}
.b-muted:hover:not(:disabled){border-color:var(--text-s);color:var(--text)}
.b-red{background:#c0392b;color:#fff}
.b-red:hover:not(:disabled){background:#a93226}
.b-sm{padding:6px 12px;font-size:.75rem}
.b-lg{padding:13px 28px;font-size:.92rem}
.b-full{width:100%;justify-content:center}

.fg{margin-bottom:16px}
.fg label{display:block;font-size:.74rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--text-s);margin-bottom:4px}
.fg label.req::after{content:' *';color:var(--wine)}
.fg input,.fg textarea,.fg select{width:100%;padding:9px 12px;border:1.5px solid var(--border);background:var(--ivory);font-family:'Jost',sans-serif;font-size:.9rem;color:var(--text);border-radius:2px;transition:border .2s;outline:none;line-height:1.5}
.fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--gold);background:#fff}
.fg textarea{min-height:70px;resize:vertical}
.fg select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 5 5-5' fill='none' stroke='%236B5050' stroke-width='1.5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;padding-right:30px}
.hint{font-size:.74rem;color:var(--text-s);margin-top:3px;font-style:italic}
.err-t{font-size:.74rem;color:#c0392b;margin-top:3px}

.yn{display:flex;gap:6px;margin-top:5px;flex-wrap:wrap}
.yn-o{padding:7px 16px;border:1.5px solid var(--border);border-radius:2px;cursor:pointer;font-size:.84rem;transition:all .15s;user-select:none;font-weight:500}
.yn-o.sel{border-color:var(--wine);background:var(--cream);color:var(--wine);font-weight:600}

.pills{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.pill{padding:5px 14px;border:1.5px solid var(--border);border-radius:20px;cursor:pointer;font-size:.82rem;transition:all .15s;user-select:none}
.pill.sel{border-color:var(--wine);background:var(--wine);color:#fff}

.sec{margin-bottom:20px}
.sec-h{background:var(--wine-dk);color:#fff;padding:10px 16px;border-radius:3px 3px 0 0;display:flex;align-items:center;gap:8px}
.sec-h h3{font-size:.92rem;font-family:'Playfair Display',serif;font-weight:600}
.sec-h small{font-size:.7rem;color:rgba(255,255,255,.45);font-family:'Jost',sans-serif;margin-left:auto}
.sec-b{border:1px solid var(--border);border-top:none;padding:18px;border-radius:0 0 3px 3px;background:#fff}

.card{background:#fff;border:1px solid var(--border);border-radius:4px;box-shadow:var(--sh)}
.cp{padding:24px}
.cps{padding:16px}

.al{padding:10px 14px;border-radius:2px;font-size:.86rem;margin-bottom:12px;line-height:1.5}
.al-e{background:#fff5f5;border:1px solid #feb2b2;color:#742a2a}
.al-s{background:#f0fff4;border:1px solid #9ae6b4;color:#1a472a}
.al-i{background:#fffbeb;border:1px solid var(--gold-lt);color:var(--wine-dk)}
.al-w{background:#fff8e1;border:1px solid #ffe082;color:#6d4c00}

.wz-steps{display:flex;align-items:flex-start;overflow-x:auto;padding:0 2px 6px;margin-bottom:22px;scrollbar-width:none}
.wz-steps::-webkit-scrollbar{display:none}
.wz-s{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;min-width:52px;cursor:pointer;opacity:.52;transition:opacity .2s}
.wz-s.done,.wz-s.act{opacity:1}
.wz-dot{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;flex-shrink:0;transition:all .2s}
.dot-p{background:var(--border);color:var(--text-s)}
.dot-d{background:var(--wine);color:#fff}
.dot-a{background:var(--gold);color:#fff;box-shadow:0 0 0 4px rgba(201,168,76,.22)}
.wz-lbl{font-size:.63rem;text-align:center;color:var(--text-s);max-width:60px;line-height:1.2}
.wz-lbl.act{color:var(--wine);font-weight:600}
.wz-con{flex:1;height:2px;background:var(--border);margin-top:12px;min-width:6px;flex-shrink:0}
.wz-con.done{background:var(--wine)}

.tabs{display:flex;border-bottom:2px solid var(--border);margin-bottom:20px;overflow-x:auto;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{padding:9px 16px;cursor:pointer;font-size:.84rem;font-weight:500;color:var(--text-s);border-bottom:2px solid transparent;margin-bottom:-2px;white-space:nowrap;transition:all .2s}
.tab.act{color:var(--wine);border-bottom-color:var(--wine);font-weight:600}
.tab:hover:not(.act){color:var(--text)}

.sc-out{font-family:'Cormorant Garamond',serif;font-size:1.05rem;line-height:1.9;color:var(--text)}
.sc-out h2{font-family:'Playfair Display',serif;font-size:1.15rem;color:var(--wine);margin:22px 0 6px;text-transform:uppercase;letter-spacing:.06em;padding-bottom:4px;border-bottom:1px solid var(--border)}
.sc-out h3{font-family:'Playfair Display',serif;font-size:1rem;color:var(--wine-dk);margin:14px 0 4px}
.sc-out strong{color:var(--wine-dk);font-weight:700}
.sc-out .cb{display:inline-block;width:13px;height:13px;border:1.5px solid var(--wine);border-radius:2px;margin-right:5px;vertical-align:middle;flex-shrink:0}

.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px}
@media(max-width:580px){.stats{grid-template-columns:1fr}}
.stat{text-align:center;padding:18px 12px}
.st-n{font-family:'Playfair Display',serif;font-size:2.1rem;color:var(--wine);line-height:1}
.st-l{font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;color:var(--text-s);margin-top:4px}
.st-s{font-size:.76rem;color:var(--text-s);margin-top:3px}

.ev{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border:1px solid var(--border);border-radius:3px;background:#fff;margin-bottom:7px;gap:10px;flex-wrap:wrap;transition:border-color .2s}
.ev:hover{border-color:var(--gold-lt)}
.ev-n{font-family:'Playfair Display',serif;font-size:1rem}
.ev-m{font-size:.77rem;color:var(--text-s);margin-top:2px}
.ev-a{display:flex;gap:5px;flex-wrap:wrap}

.pg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
@media(max-width:780px){.pg-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:430px){.pg-grid{grid-template-columns:1fr}}
.pc{border:1.5px solid var(--border);padding:22px 14px;text-align:center;cursor:pointer;transition:all .2s;border-radius:4px;position:relative;background:#fff}
.pc:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:var(--sh)}
.pc.sel{border-color:var(--wine);background:var(--cream)}
.pc.feat{border-color:var(--gold)}
.pc-badge{position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:var(--gold);color:#fff;font-size:.63rem;padding:2px 9px;letter-spacing:.1em;text-transform:uppercase;border-radius:10px;white-space:nowrap;font-weight:600}
.pc-name{font-family:'Playfair Display',serif;font-size:.92rem;color:var(--wine-dk);margin-bottom:7px}
.pc-price{font-family:'Playfair Display',serif;font-size:1.65rem;color:var(--wine)}
.pc-per{font-size:.7rem;color:var(--text-s);margin-top:2px}
.pc-disc{font-size:.68rem;color:#4a7c59;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-top:3px}
.pc-sc{font-size:.76rem;color:var(--text-s);margin-top:7px}

.hero{background:linear-gradient(155deg,var(--wine-dk) 0%,var(--wine) 65%,#8B3A4A 100%);padding:70px 0 56px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 15% 50%,rgba(201,168,76,.07) 0%,transparent 55%),radial-gradient(circle at 85% 20%,rgba(201,168,76,.05) 0%,transparent 45%)}
.h-orn{font-family:'Cormorant Garamond',serif;font-size:.95rem;color:var(--gold-lt);letter-spacing:.5em;opacity:.6;margin-bottom:10px;font-style:italic}
.h-t{font-family:'Playfair Display',serif;font-size:clamp(2rem,5.5vw,3.5rem);color:#fff;line-height:1.1;margin-bottom:7px}
.h-t span{color:var(--gold)}
.h-s{font-family:'Cormorant Garamond',serif;font-size:1.15rem;color:var(--gold-lt);font-style:italic;margin-bottom:16px;opacity:.88}
.h-by{font-size:.73rem;color:rgba(255,255,255,.38);letter-spacing:.18em;text-transform:uppercase;margin-bottom:28px}
.h-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}

.feats{padding:50px 0;background:var(--cream)}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:640px){.feat-grid{grid-template-columns:1fr}}
.feat{text-align:center;padding:22px 16px}
.feat-ic{font-size:1.7rem;margin-bottom:9px}
.feat-t{font-family:'Playfair Display',serif;font-size:1rem;color:var(--wine-dk);margin-bottom:6px}
.feat-d{font-size:.84rem;color:var(--text-s);line-height:1.7}

.spin{width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--wine);border-radius:50%;animation:sp .7s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.load-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:52px;text-align:center}
.load-t{font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--text-s);font-style:italic;max-width:280px;line-height:1.6}

.prog-bar{height:4px;background:var(--border);border-radius:2px;overflow:hidden;margin-bottom:14px}
.prog-fill{height:100%;background:linear-gradient(90deg,var(--wine),var(--gold));transition:width .4s;border-radius:2px}

.bdg{display:inline-block;padding:2px 9px;font-size:.68rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;border-radius:2px}
.bdg-g{background:var(--gold-lt);color:var(--wine-dk)}
.bdg-w{background:var(--wine);color:#fff}
.bdg-gr{background:#d4edda;color:#155724}
.bdg-r{background:#f8d7da;color:#721c24}

.footer{background:var(--wine-dk);padding:20px 0;text-align:center}
.foot-t{font-size:.72rem;color:rgba(255,255,255,.32);letter-spacing:.1em}

.ph{margin-bottom:22px}
.ph h2{font-family:'Playfair Display',serif;font-size:1.55rem;color:var(--wine-dk)}
.ph p{font-size:.84rem;color:var(--text-s);margin-top:3px}

.ent-blk{border:1px solid var(--border);border-radius:3px;padding:13px;margin-bottom:11px;background:#fff;transition:border-color .2s}
.ent-blk:has(.sel){border-color:var(--gold-lt)}
.ent-title{font-weight:600;font-size:.86rem;color:var(--wine-dk);font-family:'Playfair Display',serif}

@media print{.nav,.wz-steps,.ev-a,.btn,.tabs,.footer,.al,.ph p{display:none!important}.cp{padding:0}.sc-out{font-size:.95rem}}
`;

// ════════════════════════════════════════════
//  CONSTANTS
// ════════════════════════════════════════════
const PLANS = [
  { id:'single', name:'1 Roteiro', scripts:1, days:30, price:29.90, disc:0, desc:'Ideal para um evento único' },
  { id:'trio',   name:'Até 3 Roteiros', scripts:3, days:30, price:29.90, disc:0.05, desc:'Até 3 eventos em 30 dias', feat:false },
  { id:'quint',  name:'Até 5 Roteiros', scripts:5, days:30, price:29.90, disc:0.10, desc:'Até 5 eventos em 30 dias', feat:true },
  { id:'anual',  name:'Plano Anual', scripts:60, days:365, price:29.90, disc:0.20, desc:'Até 60 roteiros por ano', feat:false },
];
const planTotal = p => p.price * p.scripts * (1 - p.disc);
const fmt  = n => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const fmtD = d => d ? new Date(d+'T12:00:00').toLocaleDateString('pt-BR') : '—';

const ADMIN = {
  id:'adm001', username:'silvana', password:'Sorriso@2024',
  name:'Silvana Santana', email:'silvana@cerimonial.sorriso.com',
  isAdmin:true, planId:'admin', planLabel:'Administradora Vitalícia',
  expiresAt:null, scriptsAllowed:999999, scriptsUsed:0,
  createdAt: new Date().toISOString(),
};

const INIT_FORM = {
  noivaNome:'', noivaTel:'', noivoNome:'', noivoTel:'',
  dataCas:'', horario:'', local:'', localRec:'',
  dataSignif:'nao', dataSignifDesc:'',
  noivaNasc:'', noivoNasc:'', noivaCid:'', noivoCid:'', cidAtual:'',
  temFilhos:false, filhosList:'', filhosHist:'',
  nPaiNome:'', nMaeNome:'', nPaisObs:'',
  vPaiNome:'', vMaeNome:'', vPaisObs:'',
  noiva_irm:'', noivo_irm:'',
  relPais:'',
  padNoiva:'', padNoivo:'', padEntrada:'casal', posAltar:'pDireita',
  pajens:'',
  temRel:false, relNome:'', tipoCer:'simbolico',
  celebNome:'', celebTel:'',
  entBib:  { sim:false, nome:'', mus:'' },
  entCel:  { sim:false, nome:'', mus:'' },
  entPais: { sim:false, quem:'', acomp:'', mus:'' },
  entPad:  { sim:true,  obs:'', mus:'' },
  entCri:  { sim:false, nomes:'', mus:'' },
  entNoivo:{ cond:'', sig:'', mus:'' },
  entNoiva:{ cond:'', sig:'', mus:'' },
  entAli:  { sim:false, quem:'', mus:'' },
  votos:false,
  bencao:{ sim:false, tipo:'pais' },
  efeito:'bolhas', efeitoOut:'',
  musLouv:'', musFotos:'', musSaida:'',
  comoConhec:'', quemApresen:'', primImpres:'',
  pedNam:'', pedCas:'',
  momDif:'', comoSuper:'', momFeliz:'',
  vSobreN:'', nSobreV:'',
  vFrase:'', nFrase:'',
  homen:false, homenQuem:'',
  filhosPartic:'',
  naoMenc:'',
  msgFinal:'',
};

const WIZ = [
  { id:1, lbl:'Casal',    icon:'💍', title:'Informações Básicas' },
  { id:2, lbl:'Família',  icon:'👪', title:'Família' },
  { id:3, lbl:'Padrinhos',icon:'🌸', title:'Padrinhos & Crianças' },
  { id:4, lbl:'Cerimônia',icon:'⛪', title:'Religião & Cerimônia' },
  { id:5, lbl:'Entradas', icon:'🚶', title:'Entradas — 1ª Parte' },
  { id:6, lbl:'Músicas',  icon:'🎵', title:'Entradas — 2ª Parte' },
  { id:7, lbl:'História', icon:'💛', title:'História do Casal' },
  { id:8, lbl:'Final',    icon:'✨', title:'Personalidades & Final' },
];

// ════════════════════════════════════════════
//  STORAGE DB  (window.storage API)
// ════════════════════════════════════════════
let _inited = false;
const db = {
  async init() {
    if (_inited) return; _inited = true;
    try { await window.storage.get('u:silvana'); }
    catch { try { await window.storage.set('u:silvana', JSON.stringify(ADMIN)); } catch {} }
  },
  async getUser(un) {
    try { const r = await window.storage.get('u:'+un); return r ? JSON.parse(r.value) : null; }
    catch { return null; }
  },
  async saveUser(u) {
    try { await window.storage.set('u:'+u.username, JSON.stringify(u)); } catch {}
  },
  async getAllUsers() {
    try {
      const ks = await window.storage.list('u:');
      if (!ks?.keys?.length) return [];
      const arr = await Promise.all(ks.keys.map(async k => {
        try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; } catch { return null; }
      }));
      return arr.filter(Boolean);
    } catch { return []; }
  },
  async getEvents(uid) {
    try {
      const ks = await window.storage.list('ev:'+uid+':');
      if (!ks?.keys?.length) return [];
      const arr = await Promise.all(ks.keys.map(async k => {
        try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; } catch { return null; }
      }));
      return arr.filter(Boolean).sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt));
    } catch { return []; }
  },
  async saveEvent(ev) {
    try { await window.storage.set(`ev:${ev.userId}:${ev.id}`, JSON.stringify(ev)); } catch {}
  },
  async deleteEvent(uid, eid) {
    try { await window.storage.delete(`ev:${uid}:${eid}`); } catch {}
  },
};

// ════════════════════════════════════════════
//  PROMPT  &  SCRIPT GENERATION
// ════════════════════════════════════════════
function buildPrompt(d) {
  const N = d.noivaNome || 'Noiva', V = d.noivoNome || 'Noivo';
  const couple = `${N} & ${V}`;
  const L = v => v && String(v).trim() !== '' ? v : null;
  const lines = [
    `NOIVA: ${N}${L(d.noivaTel) ? ' | Tel: '+d.noivaTel : ''}`,
    `NOIVO: ${V}${L(d.noivoTel) ? ' | Tel: '+d.noivoTel : ''}`,
    L(d.dataCas) && `DATA: ${d.dataCas}${L(d.horario) ? ' às '+d.horario : ''}`,
    L(d.local) && `LOCAL DA CERIMÔNIA: ${d.local}`,
    L(d.localRec) && `LOCAL DA RECEPÇÃO: ${d.localRec}`,
    d.dataSignif==='sim' && L(d.dataSignifDesc) && `SIGNIFICADO DA DATA: ${d.dataSignifDesc}`,
    L(d.cidAtual) && `CIDADE: ${d.cidAtual}`,
    d.temFilhos && L(d.filhosList) && `FILHOS: ${d.filhosList}`,
    d.temFilhos && L(d.filhosHist) && `HISTÓRIA COM FILHOS: ${d.filhosHist}`,
    L(d.nPaiNome) && `PAI DA NOIVA: ${d.nPaiNome}`,
    L(d.nMaeNome) && `MÃE DA NOIVA: ${d.nMaeNome}`,
    L(d.nPaisObs) && `OBS. FAMÍLIA NOIVA: ${d.nPaisObs}`,
    L(d.vPaiNome) && `PAI DO NOIVO: ${d.vPaiNome}`,
    L(d.vMaeNome) && `MÃE DO NOIVO: ${d.vMaeNome}`,
    L(d.vPaisObs) && `OBS. FAMÍLIA NOIVO: ${d.vPaisObs}`,
    L(d.relPais) && `RELAÇÃO COM OS PAIS: ${d.relPais}`,
    L(d.padNoiva) && `PADRINHOS/MADRINHAS DA NOIVA: ${d.padNoiva}`,
    L(d.padNoivo) && `PADRINHOS/MADRINHAS DO NOIVO: ${d.padNoivo}`,
    L(d.pajens) && `PAJENS E DAMINHAS: ${d.pajens}`,
    `TIPO DE CERIMÔNIA: ${d.tipoCer||'simbólica'}`,
    d.temRel && L(d.relNome) && `RELIGIÃO: ${d.relNome}`,
    L(d.celebNome) && `CELEBRANTE: ${d.celebNome}`,
    d.votos && `VOTOS: personalizados pelo casal`,
    d.bencao.sim && `BÊNÇÃO: ${d.bencao.tipo==='pais'?'apenas dos pais':d.bencao.tipo==='pf'?'dos pais e familiares':'de todos os convidados'}`,
    d.efeito && d.efeito!=='nenhum' && `EFEITO DE SAÍDA: ${d.efeito==='outro'?d.efeitoOut:d.efeito}`,
    '',
    '--- ENTRADAS EM ORDEM ---',
    d.entBib.sim  && `• Bíblia: ${d.entBib.nome}${d.entBib.mus?' | Música: '+d.entBib.mus:''}`,
    d.entCel.sim  && `• Celebrante: ${d.entCel.nome}${d.entCel.mus?' | Música: '+d.entCel.mus:''}`,
    d.entPais.sim && `• Pais: ${d.entPais.quem}${d.entPais.acomp?' ('+d.entPais.acomp+')':''}${d.entPais.mus?' | Música: '+d.entPais.mus:''}`,
    d.entPad.sim  && `• Padrinhos/Madrinhas${d.entPad.mus?' | Música: '+d.entPad.mus:''}${d.entPad.obs?' | Obs: '+d.entPad.obs:''}`,
    d.entCri.sim  && `• Crianças: ${d.entCri.nomes}${d.entCri.mus?' | Música: '+d.entCri.mus:''}`,
    `• Noivo: conduzido por ${d.entNoivo.cond||'não informado'}${d.entNoivo.sig?' ('+d.entNoivo.sig+')':''}${d.entNoivo.mus?' | Música: '+d.entNoivo.mus:''}`,
    `• Noiva: conduzida por ${d.entNoiva.cond||'não informado'}${d.entNoiva.sig?' ('+d.entNoiva.sig+')':''}${d.entNoiva.mus?' | Música: '+d.entNoiva.mus:''}`,
    d.entAli.sim  && `• Alianças: ${d.entAli.quem}${d.entAli.mus?' | Música: '+d.entAli.mus:''}`,
    '',
    L(d.musLouv)  && `MÚSICA PÓS-PREGAÇÃO/LOUVOR: ${d.musLouv}`,
    L(d.musFotos) && `MÚSICA FOTOS PROTOCOLARES: ${d.musFotos}`,
    L(d.musSaida) && `MÚSICA SAÍDA DO CASAL: ${d.musSaida}`,
    '',
    '--- HISTÓRIA DO CASAL ---',
    L(d.comoConhec)  && `Como se conheceram: ${d.comoConhec}`,
    L(d.quemApresen) && `Primeiro encontro: ${d.quemApresen}`,
    L(d.primImpres)  && `Primeira impressão mútua: ${d.primImpres}`,
    L(d.pedNam)      && `Pedido de namoro: ${d.pedNam}`,
    L(d.pedCas)      && `Pedido de casamento: ${d.pedCas}`,
    L(d.momDif)      && `Momento difícil: ${d.momDif}`,
    L(d.comoSuper)   && `Como superaram: ${d.comoSuper}`,
    L(d.momFeliz)    && `Momento mais marcante: ${d.momFeliz}`,
    L(d.vSobreN)     && `Noivo sobre a noiva: ${d.vSobreN}`,
    L(d.nSobreV)     && `Noiva sobre o noivo: ${d.nSobreV}`,
    L(d.vFrase)      && `Noivo: "Minha vida mudou quando você ${d.vFrase}"`,
    L(d.nFrase)      && `Noiva: "Minha vida mudou quando você ${d.nFrase}"`,
    d.homen && L(d.homenQuem)    && `Homenagem a: ${d.homenQuem}`,
    L(d.filhosPartic) && `Participação dos filhos: ${d.filhosPartic}`,
    L(d.msgFinal)     && `Tom/valores da cerimônia: ${d.msgFinal}`,
    L(d.naoMenc)      && `NÃO MENCIONAR: ${d.naoMenc}`,
  ].filter(Boolean).join('\n');

  return `Você é especialista em cerimoniais de casamento com 20 anos de atuação. Com base nos dados abaixo, crie três documentos distintos e profissionais para a cerimônia de ${couple}.

REGRA FUNDAMENTAL — PROIBIDO usar estas expressões clichês: "dois corações", "alma gêmea", "se completam", "para sempre" de forma vaga, "eternamente", "príncipe/princesa encantado(a)", "felizes para sempre", "construir um lar", "novo capítulo", "jornada juntos", "metade de mim", "amor verdadeiro" no sentido genérico. Use linguagem precisa, genuína e baseada na história REAL deste casal específico.

DADOS:
${lines}

---
Gere os três documentos a seguir. Inicie CADA UM pelo marcador exato (três sinais de igual, o código, três sinais de igual), sem texto antes do primeiro marcador.

===DOC1===
Título: ROTEIRO BÁSICO — ${couple.toUpperCase()}${d.dataCas ? ' — ' + d.dataCas.toUpperCase() : ''}
Destinatários: Fotógrafo e Videomaker

Liste de forma objetiva, numerada e em ordem cronológica todos os momentos da cerimônia. Para cada item indique: número, nome do momento, nome(s) completo(s) da(s) pessoa(s), estimativa de duração e a música que será tocada. Use **negrito** para nomes e títulos de músicas.

===DOC2===
Título: ROTEIRO COMPLETO DA CERIMÔNIA — ${couple}${d.dataCas ? ' — ' + d.dataCas : ''}
Destinatários: Mestre de Cerimônias e Equipe de Cerimonialistas

Inclua: orientações de posicionamento antes do início; cada momento com o texto narrativo que o MC pode usar (marcado como VOZ MC:); narrativa da história do casal integrada nos momentos adequados; votos (se personalizados, indique [VOTOS PERSONALIZADOS DO CASAL]); troca de alianças; bênção; pronunciamento oficial; orientações de saída e pós-cerimônia. Use ## para cada seção principal. Baseie a narrativa nas histórias reais informadas.

===DOC3===
Título: CHECKLIST DE ENTRADAS — ${couple}${d.dataCas ? ' — ' + d.dataCas : ''}
Verificação no dia da cerimônia

Liste numerada e em ordem cronológica TODAS as pessoas que entram:
N. [ ] NOME COMPLETO — Função / Relação — 🎵 "Título da música"`;
}

function parseScripts(txt) {
  const get = (m1, m2) => {
    const i1 = txt.indexOf(m1); if (i1<0) return '';
    const i2 = m2 ? txt.indexOf(m2) : txt.length;
    return txt.slice(i1+m1.length, i2>0?i2:txt.length).trim();
  };
  return {
    basic:     get('===DOC1===','===DOC2==='),
    complete:  get('===DOC2===','===DOC3==='),
    checklist: get('===DOC3===', null),
    generatedAt: new Date().toISOString(),
  };
}

async function callClaude(prompt) {
  const r = await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:4000, messages:[{role:'user',content:prompt}] }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error?.message||'Erro na API');
  return data.content.map(c=>c.text||'').join('');
}

function renderMd(txt) {
  if (!txt) return '';
  return txt
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/^## (.+)$/gm,'<h2>$1</h2>')
    .replace(/^### (.+)$/gm,'<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\[ \]/g,'<span class="cb"></span>')
    .replace(/\n/g,'<br>');
}

// ════════════════════════════════════════════
//  UI PRIMITIVES
// ════════════════════════════════════════════
const F = ({label,hint,req,children,err}) => (
  <div className="fg">
    {label && <label className={req?'req':''}>{label}</label>}
    {children}
    {hint && <div className="hint">{hint}</div>}
    {err  && <div className="err-t">{err}</div>}
  </div>
);
const In = ({value,onChange,placeholder,type='text',...p}) => (
  <input type={type} value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder} {...p}/>
);
const Ta = ({value,onChange,placeholder,rows=3}) => (
  <textarea value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}/>
);
const YN = ({value,onChange,opts=[{v:true,l:'Sim'},{v:false,l:'Não'}]}) => (
  <div className="yn">
    {opts.map(o=>(
      <div key={String(o.v)} className={`yn-o${value===o.v?' sel':''}`} onClick={()=>onChange(o.v)}>{o.l}</div>
    ))}
  </div>
);
const Pills = ({value,onChange,options}) => (
  <div className="pills">
    {options.map(o=>(
      <div key={o.v} className={`pill${value===o.v?' sel':''}`} onClick={()=>onChange(o.v)}>{o.l}</div>
    ))}
  </div>
);
const Al = ({type='i',children}) => <div className={`al al-${type}`}>{children}</div>;
const Sec = ({title,sub,children}) => (
  <div className="sec">
    <div className="sec-h"><h3>{title}</h3>{sub&&<small>{sub}</small>}</div>
    <div className="sec-b">{children}</div>
  </div>
);

// ════════════════════════════════════════════
//  LANDING PAGE
// ════════════════════════════════════════════
function LandingPage({onGo}) {
  return (
    <div>
      <div className="hero">
        <div className="wrap">
          <div className="h-orn">✦ Cerimônia Personalizada ✦</div>
          <h1 className="h-t">Festa de <span>Casamento</span></h1>
          <div className="h-s">Construa a cerimônia que conta a história de vocês</div>
          <div className="h-by">Silvana Santana — Cerimonial Sorriso</div>
          <div className="h-btns">
            <button className="btn b-gold b-lg" onClick={()=>onGo('register')}>Começar Agora</button>
            <button className="btn b-ghost" onClick={()=>onGo('login')}>Entrar</button>
          </div>
        </div>
      </div>

      <div className="feats">
        <div className="wrap">
          <div style={{textAlign:'center',marginBottom:30}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.65rem',color:'var(--wine-dk)'}}>Três documentos essenciais</h2>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.05rem',fontStyle:'italic',color:'var(--text-s)',marginTop:5}}>
              Gerados com base na história real de cada casal — sem clichês
            </div>
          </div>
          <div className="feat-grid">
            {[
              {ic:'📋',t:'Roteiro Básico',d:'Para fotógrafo e videomaker. Lista objetiva de cada entrada, nomes e músicas na ordem cronológica.'},
              {ic:'🎤',t:'Roteiro Completo',d:'Para o mestre de cerimônias e a equipe. Com textos narrativos, orientações de voz e toda a sequência.'},
              {ic:'✅',t:'Checklist de Entradas',d:'Nome de cada pessoa, função e música na ordem exata. Para conferência no dia da cerimônia.'},
            ].map(f=>(
              <div key={f.t} className="feat card cp">
                <div className="feat-ic">{f.ic}</div>
                <div className="feat-t">{f.t}</div>
                <div className="feat-d">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:'#fff',padding:'50px 0'}}>
        <div className="wrap">
          <div style={{textAlign:'center',marginBottom:26}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.65rem',color:'var(--wine-dk)'}}>Planos e Valores</h2>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.05rem',fontStyle:'italic',color:'var(--text-s)',marginTop:5}}>
              Escolha o plano ideal para seu volume de eventos
            </div>
          </div>
          <div className="pg-grid">
            {PLANS.map(p=>(
              <div key={p.id} className={`pc${p.feat?' feat':''}`} onClick={()=>onGo('register',p.id)}>
                {p.feat && <div className="pc-badge">Mais popular</div>}
                <div className="pc-name">{p.name}</div>
                <div className="pc-price">{fmt(planTotal(p))}</div>
                <div className="pc-per">{p.days===365?'por ano':'por 30 dias'}</div>
                {p.disc>0 && <div className="pc-disc">{p.disc*100}% de desconto</div>}
                <div className="pc-sc">{p.scripts===60?'Até 60 roteiros/ano':`${p.scripts} roteiro${p.scripts>1?'s':''}`}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:10,fontSize:'.77rem',color:'var(--text-s)'}}>
            Roteiros não utilizados não são acumulativos para o período seguinte. Pagamento via Systeme.io.
          </div>
          <div style={{textAlign:'center',marginTop:20}}>
            <button className="btn b-wine b-lg" onClick={()=>onGo('register')}>Criar Conta</button>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="foot-t">© {new Date().getFullYear()} Festa de Casamento · Silvana Santana – Cerimonial Sorriso</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
//  AUTH PAGE  (login + register)
// ════════════════════════════════════════════
function AuthPage({onLogin, onGo, defaultPlan}) {
  const [mode, setMode]  = useState('login');
  const [form, setForm]  = useState({username:'',password:'',name:'',email:'',planId:defaultPlan||'single',confirmPass:''});
  const [err,  setErr]   = useState('');
  const [busy, setBusy]  = useState(false);

  const set = k => v => setForm(f=>({...f,[k]:v}));

  async function doLogin() {
    setErr(''); setBusy(true);
    try {
      await db.init();
      const user = await db.getUser(form.username.trim().toLowerCase());
      if (!user || user.password !== form.password) { setErr('Usuário ou senha incorretos.'); setBusy(false); return; }
      if (!user.isAdmin && user.expiresAt && new Date() > new Date(user.expiresAt)) {
        setErr('Acesso expirado. Entre em contato com o administrador para renovar.'); setBusy(false); return;
      }
      onLogin(user);
    } catch { setErr('Erro ao conectar. Tente novamente.'); }
    setBusy(false);
  }

  async function doRegister() {
    setErr('');
    if (!form.username||!form.password||!form.name) { setErr('Preencha todos os campos obrigatórios.'); return; }
    if (form.password !== form.confirmPass) { setErr('As senhas não conferem.'); return; }
    if (form.password.length < 6) { setErr('A senha deve ter pelo menos 6 caracteres.'); return; }
    const unClean = form.username.trim().toLowerCase().replace(/\s/g,'');
    if (!unClean) { setErr('Nome de usuário inválido.'); return; }
    setBusy(true);
    try {
      await db.init();
      const existing = await db.getUser(unClean);
      if (existing) { setErr('Este nome de usuário já está em uso.'); setBusy(false); return; }
      const plan = PLANS.find(p=>p.id===form.planId)||PLANS[0];
      const now  = new Date();
      const exp  = new Date(now.getTime() + plan.days*24*60*60*1000);
      const user = {
        id: 'u'+Date.now(), username: unClean, password: form.password,
        name: form.name.trim(), email: form.email.trim(),
        planId: plan.id, planLabel: plan.name,
        expiresAt: exp.toISOString(), scriptsAllowed: plan.scripts, scriptsUsed: 0,
        isAdmin: false, createdAt: now.toISOString(),
      };
      await db.saveUser(user);
      onLogin(user);
    } catch { setErr('Erro ao criar conta. Tente novamente.'); }
    setBusy(false);
  }

  const plan = PLANS.find(p=>p.id===form.planId)||PLANS[0];

  return (
    <div style={{minHeight:'100vh',background:'var(--cream)',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'36px 20px'}}>
      <div style={{width:'100%',maxWidth:490}}>
        <div style={{textAlign:'center',marginBottom:26}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:.9+'rem',color:'var(--gold)',letterSpacing:'.4em',opacity:.65,marginBottom:4}}>✦ ✦ ✦</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.85rem',color:'var(--wine-dk)'}}>Festa de Casamento</h1>
          <div style={{fontSize:'.72rem',color:'var(--text-s)',marginTop:3,letterSpacing:'.1em',textTransform:'uppercase'}}>Cerimonial Sorriso</div>
        </div>

        <div className="card cp">
          <div style={{display:'flex',gap:0,marginBottom:20,borderBottom:'2px solid var(--border)'}}>
            {['login','register'].map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:'8px',background:'none',border:'none',cursor:'pointer',fontFamily:"'Jost',sans-serif",fontSize:'.84rem',fontWeight:mode===m?600:400,color:mode===m?'var(--wine)':'var(--text-s)',borderBottom:mode===m?'2px solid var(--wine)':'2px solid transparent',marginBottom:'-2px',textTransform:'uppercase',letterSpacing:'.06em',transition:'all .2s'}}>
                {m==='login'?'Entrar':'Nova Conta'}
              </button>
            ))}
          </div>

          {err && <Al type="e">{err}</Al>}

          {mode==='login' ? (
            <>
              <F label="Usuário" req><In value={form.username} onChange={set('username')} placeholder="seu usuário"/></F>
              <F label="Senha" req>
                <In type="password" value={form.password} onChange={set('password')} placeholder="sua senha"
                    onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
              </F>
              <button className="btn b-wine b-full" onClick={doLogin} disabled={busy}>{busy?'Entrando...':'Entrar'}</button>
              <div style={{marginTop:14,padding:'10px 12px',background:'var(--cream)',borderRadius:2,fontSize:'.78rem',color:'var(--text-s)'}}>
                <strong>Acesso admin:</strong> usuário <code>silvana</code> / senha <code>Sorriso@2024</code>
              </div>
            </>
          ) : (
            <>
              <F label="Nome completo" req><In value={form.name} onChange={set('name')} placeholder="Seu nome completo"/></F>
              <F label="E-mail"><In type="email" value={form.email} onChange={set('email')} placeholder="seu@email.com"/></F>
              <div className="row2">
                <F label="Usuário" req><In value={form.username} onChange={set('username')} placeholder="sem espaços"/></F>
                <F label="Senha" req><In type="password" value={form.password} onChange={set('password')} placeholder="min. 6 chars"/></F>
              </div>
              <F label="Confirmar senha" req>
                <In type="password" value={form.confirmPass} onChange={set('confirmPass')} placeholder="repita a senha"/>
              </F>

              <div style={{marginBottom:14}}>
                <div style={{fontSize:'.72rem',fontWeight:600,letterSpacing:'.09em',textTransform:'uppercase',color:'var(--text-s)',marginBottom:8}}>Plano</div>
                <div className="pg-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
                  {PLANS.map(p=>(
                    <div key={p.id} className={`pc${form.planId===p.id?' sel':''}`} onClick={()=>set('planId')(p.id)} style={{padding:'13px 10px'}}>
                      {p.feat && <div className="pc-badge">Popular</div>}
                      <div className="pc-name" style={{fontSize:'.84rem'}}>{p.name}</div>
                      <div className="pc-price" style={{fontSize:'1.3rem'}}>{fmt(planTotal(p))}</div>
                      <div className="pc-per">{p.days===365?'/ano':'/30 dias'}</div>
                      {p.disc>0 && <div className="pc-disc">{p.disc*100}% off</div>}
                    </div>
                  ))}
                </div>
                <div style={{marginTop:9,padding:'9px 12px',background:'var(--cream)',borderRadius:2,border:'1px solid var(--border)',fontSize:'.8rem',color:'var(--wine-dk)',lineHeight:1.5}}>
                  <strong>{plan.name}:</strong> {plan.scripts===60?'Até 60 roteiros':`${plan.scripts} roteiro${plan.scripts>1?'s':''}`} em {plan.days===365?'12 meses':'30 dias'} — <strong>{fmt(planTotal(plan))}</strong>
                  {plan.disc>0 && ` (${plan.disc*100}% de desconto)`}
                </div>
                <div style={{fontSize:'.72rem',color:'var(--text-s)',marginTop:5,fontStyle:'italic'}}>
                  ⚠️ Pagamento via Systeme.io — acesso liberado após confirmação pelo administrador.
                </div>
              </div>

              <button className="btn b-gold b-full" onClick={doRegister} disabled={busy}>{busy?'Criando conta...':'Criar Conta'}</button>
            </>
          )}
        </div>

        <div style={{textAlign:'center',marginTop:14}}>
          <button onClick={()=>onGo('landing')} className="btn b-muted">← Voltar ao início</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
//  NAV
// ════════════════════════════════════════════
function Nav({user, onLogout, onNavigate}) {
  const rem = user.isAdmin ? '∞' : Math.max(0, user.scriptsAllowed - user.scriptsUsed);
  return (
    <nav className="nav">
      <div className="wrap nav-i">
        <div className="brand" onClick={()=>onNavigate('dashboard')}>
          Festa de Casamento
          <small>Cerimonial Sorriso</small>
        </div>
        <div className="nav-r">
          {user.isAdmin ? (
            <div className="nav-info"><div style={{color:'var(--gold-lt)',fontSize:'.82rem'}}>Admin Vitalício ✦</div></div>
          ) : (
            <div className="nav-info">
              <div><strong style={{color:rem===0?'#ff8f8f':'var(--gold-lt)'}}>{rem}</strong> roteiro{rem!==1?'s':''} disponível{rem!==1?'is':''}</div>
              <div style={{fontSize:'.68rem',opacity:.65}}>Expira: {fmtD(user.expiresAt)}</div>
            </div>
          )}
          {user.isAdmin && <button className="btn b-ghost" onClick={()=>onNavigate('admin')}>Painel Admin</button>}
          <button className="btn b-ghost" onClick={onLogout}>Sair</button>
        </div>
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════
//  DASHBOARD
// ════════════════════════════════════════════
function Dashboard({user, onNavigate, onNewEvent, onViewEvent, onEditEvent}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    db.getEvents(user.id).then(evs=>{ setEvents(evs); setLoading(false); });
  },[user.id]);

  const rem       = user.isAdmin ? Infinity : Math.max(0, user.scriptsAllowed - user.scriptsUsed);
  const isExpired = !user.isAdmin && user.expiresAt && new Date() > new Date(user.expiresAt);
  const canCreate = !isExpired && (user.isAdmin || rem > 0);

  const handleDelete = async ev => {
    if (!window.confirm(`Excluir o roteiro de "${ev.brideNome||'Noiva'} & ${ev.groomNome||'Noivo'}"?`)) return;
    await db.deleteEvent(user.id, ev.id);
    setEvents(es=>es.filter(e=>e.id!==ev.id));
  };

  return (
    <div className="wrap" style={{paddingTop:30,paddingBottom:50}}>
      <div className="ph">
        <h2>Olá, {user.name.split(' ')[0]}</h2>
        <p>Gerencie seus roteiros de cerimônia personalizados</p>
      </div>

      {isExpired && <Al type="e">Sua assinatura expirou em {fmtD(user.expiresAt)}. Entre em contato com o administrador para renovar.</Al>}
      {!user.isAdmin && rem===0 && !isExpired && <Al type="w">Você atingiu o limite de roteiros do seu plano. Renove para continuar gerando.</Al>}

      {/* Stats */}
      <div className="stats">
        <div className="card stat">
          <div className="st-n">{user.isAdmin?'∞':user.scriptsUsed}</div>
          <div className="st-l">Roteiros gerados</div>
        </div>
        <div className="card stat">
          <div className="st-n" style={{color:rem===0&&!user.isAdmin?'#c0392b':undefined}}>{user.isAdmin?'∞':rem}</div>
          <div className="st-l">Disponíveis</div>
          {!user.isAdmin && <div className="st-s">{user.planLabel}</div>}
        </div>
        <div className="card stat">
          <div className="st-n" style={{fontSize:'1.1rem',paddingTop:8}}>
            {user.isAdmin ? 'Vitalício' : fmtD(user.expiresAt)}
          </div>
          <div className="st-l">{user.isAdmin ? 'Plano' : 'Válido até'}</div>
        </div>
      </div>

      {!user.isAdmin && (
        <div className="prog-bar">
          <div className="prog-fill" style={{width:`${Math.min(100,(user.scriptsUsed/user.scriptsAllowed)*100)}%`}}/>
        </div>
      )}

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,flexWrap:'wrap',gap:8}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.15rem',color:'var(--wine-dk)'}}>Eventos</h3>
        <button className="btn b-gold" onClick={onNewEvent} disabled={!canCreate}>+ Novo Roteiro</button>
      </div>

      {loading ? (
        <div className="load-wrap"><div className="spin"/><div className="load-t">Carregando...</div></div>
      ) : events.length===0 ? (
        <div className="card cp" style={{textAlign:'center',padding:'36px 24px'}}>
          <div style={{fontSize:'2rem',marginBottom:10}}>💍</div>
          <h3 style={{fontFamily:"'Playfair Display',serif",color:'var(--wine-dk)',marginBottom:6}}>Nenhum roteiro ainda</h3>
          <div style={{fontSize:'.86rem',color:'var(--text-s)',marginBottom:18}}>Crie seu primeiro roteiro de cerimônia personalizado</div>
          <button className="btn b-gold" onClick={onNewEvent} disabled={!canCreate}>Criar Primeiro Roteiro</button>
        </div>
      ) : (
        events.map(ev=>(
          <div key={ev.id} className="ev">
            <div style={{flex:1,minWidth:0}}>
              <div className="ev-n">{ev.brideNome||'Noiva'} & {ev.groomNome||'Noivo'}</div>
              <div className="ev-m">
                {ev.dataCas?`📅 ${ev.dataCas}`:''}{ev.local?` · 📍 ${ev.local}`:''}
                {' · '}<span className={`bdg ${ev.scripts?'bdg-gr':'bdg-g'}`}>{ev.scripts?'Roteiro gerado':'Rascunho'}</span>
              </div>
            </div>
            <div className="ev-a">
              {ev.scripts && <button className="btn b-out b-sm" onClick={()=>onViewEvent(ev)}>Ver Roteiro</button>}
              <button className="btn b-wine b-sm" onClick={()=>onEditEvent(ev)}>Editar</button>
              <button className="btn b-red b-sm" onClick={()=>handleDelete(ev)}>Excluir</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ════════════════════════════════════════════
//  SCRIPT VIEWER
// ════════════════════════════════════════════
function ScriptViewer({event, onBack, onRegenerate}) {
  const [tab, setTab] = useState('basic');
  const scripts = event.scripts || {};

  const TABS = [
    {id:'basic',    label:'Roteiro Básico',    sub:'Fotógrafo & Videomaker'},
    {id:'complete', label:'Roteiro Completo',  sub:'Mestre de Cerimônias'},
    {id:'checklist',label:'Checklist',         sub:'Entradas no dia'},
  ];

  const copyText = () => {
    const txt = scripts[tab]||'';
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(()=>alert('Texto copiado!'));
  };

  return (
    <div className="wrap" style={{paddingTop:26,paddingBottom:50}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14,flexWrap:'wrap'}}>
        <button className="btn b-muted" onClick={onBack}>← Voltar</button>
        <div style={{flex:1}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.35rem',color:'var(--wine-dk)'}}>
            {event.brideNome} & {event.groomNome}
          </h2>
          {event.dataCas && <div style={{fontSize:'.8rem',color:'var(--text-s)'}}>{event.dataCas}{event.local?' · '+event.local:''}</div>}
        </div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          <button className="btn b-muted b-sm" onClick={copyText}>📋 Copiar</button>
          <button className="btn b-muted b-sm" onClick={()=>window.print()}>🖨️ Imprimir</button>
          {onRegenerate && <button className="btn b-out b-sm" onClick={onRegenerate}>↻ Regenerar</button>}
        </div>
      </div>

      {scripts.generatedAt && (
        <div style={{fontSize:'.72rem',color:'var(--text-s)',marginBottom:10}}>
          Gerado em {new Date(scripts.generatedAt).toLocaleString('pt-BR')}
        </div>
      )}

      <div className="card">
        <div className="tabs" style={{padding:'0 20px'}}>
          {TABS.map(t=>(
            <div key={t.id} className={`tab${tab===t.id?' act':''}`} onClick={()=>setTab(t.id)}>
              {t.label} <span style={{fontSize:'.68rem',opacity:.6}}>— {t.sub}</span>
            </div>
          ))}
        </div>
        <div className="cp">
          {scripts[tab] ? (
            <div className="sc-out" dangerouslySetInnerHTML={{__html:renderMd(scripts[tab])}}/>
          ) : (
            <div style={{textAlign:'center',color:'var(--text-s)',padding:'30px',fontStyle:'italic',fontFamily:"'Cormorant Garamond',serif"}}>
              Documento não disponível. Regenere o roteiro para obtê-lo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
//  ADMIN PANEL
// ════════════════════════════════════════════
function AdminPanel({user, onNavigate}) {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({name:'',username:'',password:'',planId:'single',email:''});
  const [newErr, setNewErr]   = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(()=>{
    db.getAllUsers().then(us=>{ setUsers(us.filter(u=>!u.isAdmin)); setLoading(false); });
  },[]);

  const revokeUser = async u => {
    if (!window.confirm(`Revogar acesso de "${u.name}"?`)) return;
    const up = {...u, expiresAt: new Date().toISOString()};
    await db.saveUser(up);
    setUsers(us=>us.map(x=>x.id===u.id?up:x));
  };

  const createUser = async () => {
    setNewErr('');
    if (!newUser.username||!newUser.password||!newUser.name) { setNewErr('Preencha nome, usuário e senha.'); return; }
    const plan = PLANS.find(p=>p.id===newUser.planId)||PLANS[0];
    const exists = await db.getUser(newUser.username.trim().toLowerCase());
    if (exists) { setNewErr('Usuário já existe.'); return; }
    const now = new Date();
    const u = {
      id:'u'+Date.now(), username:newUser.username.trim().toLowerCase(), password:newUser.password,
      name:newUser.name, email:newUser.email, planId:plan.id, planLabel:plan.name,
      expiresAt: new Date(now.getTime()+plan.days*24*60*60*1000).toISOString(),
      scriptsAllowed:plan.scripts, scriptsUsed:0, isAdmin:false, createdAt:now.toISOString(),
    };
    await db.saveUser(u);
    setUsers(us=>[...us,u]);
    setNewUser({name:'',username:'',password:'',planId:'single',email:''});
    setShowForm(false);
  };

  return (
    <div className="wrap" style={{paddingTop:28,paddingBottom:50}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
        <button className="btn b-muted b-sm" onClick={()=>onNavigate('dashboard')}>← Dashboard</button>
        <div className="ph" style={{marginBottom:0}}>
          <h2>Painel Administrativo</h2>
          <p>Gerenciar usuários e assinaturas</p>
        </div>
      </div>

      <Al type="i">
        💳 <strong>Integração de pagamentos:</strong> Configure sua conta no Systeme.io para receber pagamentos. Após a confirmação do pagamento, crie o acesso do usuário manualmente pelo formulário abaixo.
      </Al>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,flexWrap:'wrap',gap:8}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.1rem',color:'var(--wine-dk)'}}>
          Usuários Cadastrados ({users.length})
        </h3>
        <button className="btn b-gold b-sm" onClick={()=>setShowForm(v=>!v)}>
          {showForm?'Cancelar':'+ Criar Usuário'}
        </button>
      </div>

      {showForm && (
        <div className="card cps" style={{marginBottom:16}}>
          <h4 style={{fontFamily:"'Playfair Display',serif",color:'var(--wine-dk)',marginBottom:14}}>Novo Usuário</h4>
          {newErr && <Al type="e">{newErr}</Al>}
          <div className="row2">
            <F label="Nome completo"><In value={newUser.name} onChange={v=>setNewUser(u=>({...u,name:v}))} placeholder="Nome"/></F>
            <F label="E-mail"><In value={newUser.email} onChange={v=>setNewUser(u=>({...u,email:v}))} placeholder="email"/></F>
          </div>
          <div className="row2">
            <F label="Usuário"><In value={newUser.username} onChange={v=>setNewUser(u=>({...u,username:v}))} placeholder="sem espaços"/></F>
            <F label="Senha"><In type="password" value={newUser.password} onChange={v=>setNewUser(u=>({...u,password:v}))} placeholder="senha inicial"/></F>
          </div>
          <F label="Plano">
            <select value={newUser.planId} onChange={e=>setNewUser(u=>({...u,planId:e.target.value}))}>
              {PLANS.map(p=><option key={p.id} value={p.id}>{p.name} — {fmt(planTotal(p))} ({p.days===365?'anual':'30 dias'})</option>)}
            </select>
          </F>
          <button className="btn b-gold" onClick={createUser}>Criar Acesso</button>
        </div>
      )}

      {loading ? (
        <div className="load-wrap"><div className="spin"/></div>
      ) : users.length===0 ? (
        <div className="card cps" style={{textAlign:'center',color:'var(--text-s)',fontStyle:'italic'}}>
          Nenhum usuário além da administração.
        </div>
      ) : (
        users.map(u=>{
          const expired = u.expiresAt && new Date()>new Date(u.expiresAt);
          return (
            <div key={u.id} className="ev">
              <div style={{flex:1,minWidth:0}}>
                <div className="ev-n">
                  {u.name} <span className="bdg bdg-g" style={{marginLeft:4}}>{u.username}</span>
                  {' '}<span className={`bdg ${expired?'bdg-r':'bdg-gr'}`}>{expired?'Expirado':'Ativo'}</span>
                </div>
                <div className="ev-m">
                  Plano: {u.planLabel} · {u.scriptsUsed}/{u.scriptsAllowed} roteiros usados
                  {u.expiresAt && ` · Expira: ${fmtD(u.expiresAt)}`}
                  {u.email && ` · ${u.email}`}
                </div>
              </div>
              <div className="ev-a">
                {!expired && <button className="btn b-red b-sm" onClick={()=>revokeUser(u)}>Revogar</button>}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

// ════════════════════════════════════════════
//  QUESTIONNAIRE WIZARD — STEP COMPONENTS
// ════════════════════════════════════════════
function Step1({form,set}) {
  return (
    <>
      <Sec title="1. Informações Básicas do Casal">
        <div className="row2">
          <F label="Nome completo da Noiva" req><In value={form.noivaNome} onChange={v=>set('noivaNome',v)} placeholder="Nome completo"/></F>
          <F label="Telefone da Noiva"><In value={form.noivaTel} onChange={v=>set('noivaTel',v)} placeholder="(00) 00000-0000"/></F>
        </div>
        <div className="row2">
          <F label="Nome completo do Noivo" req><In value={form.noivoNome} onChange={v=>set('noivoNome',v)} placeholder="Nome completo"/></F>
          <F label="Telefone do Noivo"><In value={form.noivoTel} onChange={v=>set('noivoTel',v)} placeholder="(00) 00000-0000"/></F>
        </div>
        <div className="row2">
          <F label="Data do casamento"><In type="date" value={form.dataCas} onChange={v=>set('dataCas',v)}/></F>
          <F label="Horário da cerimônia"><In type="time" value={form.horario} onChange={v=>set('horario',v)}/></F>
        </div>
        <F label="Local da cerimônia"><In value={form.local} onChange={v=>set('local',v)} placeholder="Nome do local e endereço"/></F>
        <F label="Local da recepção/festa" hint="Deixar em branco se for o mesmo local">
          <In value={form.localRec} onChange={v=>set('localRec',v)} placeholder="Nome do local (se diferente da cerimônia)"/>
        </F>
      </Sec>

      <Sec title="2. Significado da Data" sub="Opcional — enriquece a cerimônia">
        <F label="A data tem algum significado especial?">
          <YN value={form.dataSignif==='sim'} onChange={v=>set('dataSignif',v?'sim':'nao')} opts={[{v:true,l:'Sim'},{v:false,l:'Não'}]}/>
        </F>
        {form.dataSignif==='sim' && (
          <F label="Qual o motivo da escolha desta data?">
            <Ta value={form.dataSignifDesc} onChange={v=>set('dataSignifDesc',v)} placeholder="Aniversário de namoro, data especial da família, promessa..."/>
          </F>
        )}
      </Sec>

      <Sec title="3. Dados Pessoais" sub="Para personalização dos textos">
        <div className="row2">
          <F label="Data de nasc. da Noiva"><In type="date" value={form.noivaNasc} onChange={v=>set('noivaNasc',v)}/></F>
          <F label="Data de nasc. do Noivo"><In type="date" value={form.noivoNasc} onChange={v=>set('noivoNasc',v)}/></F>
        </div>
        <div className="row2">
          <F label="Cidade natal da Noiva"><In value={form.noivaCid} onChange={v=>set('noivaCid',v)} placeholder="Cidade — Estado"/></F>
          <F label="Cidade natal do Noivo"><In value={form.noivoCid} onChange={v=>set('noivoCid',v)} placeholder="Cidade — Estado"/></F>
        </div>
        <F label="Cidade onde moram atualmente"><In value={form.cidAtual} onChange={v=>set('cidAtual',v)} placeholder="Cidade — Estado"/></F>
      </Sec>
    </>
  );
}

function Step2({form,set}) {
  return (
    <>
      <Sec title="4. Filhos">
        <F label="O casal tem filhos?"><YN value={form.temFilhos} onChange={v=>set('temFilhos',v)}/></F>
        {form.temFilhos && (
          <>
            <F label="Nome, idade e participação na cerimônia" hint="Ex: Ana (8 anos, florista), Pedro (5 anos, pajem)">
              <Ta value={form.filhosList} onChange={v=>set('filhosList',v)} placeholder="Liste os filhos com nome, idade e função (se participarem)"/>
            </F>
            <F label="Como a chegada dos filhos mudou a vida e o relacionamento de vocês?">
              <Ta value={form.filhosHist} onChange={v=>set('filhosHist',v)} placeholder="Conte com detalhes..." rows={4}/>
            </F>
          </>
        )}
      </Sec>

      <Sec title="5. Família da Noiva">
        <div className="row2">
          <F label="Nome do pai da Noiva"><In value={form.nPaiNome} onChange={v=>set('nPaiNome',v)} placeholder="Nome completo"/></F>
          <F label="Nome da mãe da Noiva"><In value={form.nMaeNome} onChange={v=>set('nMaeNome',v)} placeholder="Nome completo"/></F>
        </div>
        <F label="Observações sobre os pais da Noiva" hint="Se falecidos, separados ou outras situações relevantes">
          <In value={form.nPaisObs} onChange={v=>set('nPaisObs',v)} placeholder="Ex: pai falecido em 2015, pais divorciados..."/>
        </F>
        <F label="Irmãos da Noiva" hint="Se algum for falecido, informe">
          <In value={form.noiva_irm} onChange={v=>set('noiva_irm',v)} placeholder="Ex: Carlos, Mariana (falecida 2020)"/>
        </F>
      </Sec>

      <Sec title="5. Família do Noivo">
        <div className="row2">
          <F label="Nome do pai do Noivo"><In value={form.vPaiNome} onChange={v=>set('vPaiNome',v)} placeholder="Nome completo"/></F>
          <F label="Nome da mãe do Noivo"><In value={form.vMaeNome} onChange={v=>set('vMaeNome',v)} placeholder="Nome completo"/></F>
        </div>
        <F label="Observações sobre os pais do Noivo">
          <In value={form.vPaisObs} onChange={v=>set('vPaisObs',v)} placeholder="Ex: pais recasados, pai não presente..."/>
        </F>
        <F label="Irmãos do Noivo">
          <In value={form.noivo_irm} onChange={v=>set('noivo_irm',v)} placeholder="Ex: Ricardo, Beatriz"/>
        </F>
      </Sec>

      <Sec title="6. Relação com os Pais" sub="Textos mais emocionantes quando há contexto">
        <F label="Conte sobre a relação de vocês com seus pais" hint="O que eles representam, lembranças especiais, características admiradas">
          <Ta value={form.relPais} onChange={v=>set('relPais',v)} placeholder="Detalhes sobre a relação com os pais dos dois lados..." rows={5}/>
        </F>
      </Sec>
    </>
  );
}

function Step3({form,set,setN}) {
  return (
    <>
      <Sec title="7. Padrinhos e Madrinhas">
        <F label="Padrinhos e madrinhas da Noiva" hint="Nome de cada um e observações">
          <Ta value={form.padNoiva} onChange={v=>set('padNoiva',v)} placeholder="Ex: João Silva (padrinho), Maria Santos (madrinha), Carlos e Ana Lima (casal)..."/>
        </F>
        <F label="Padrinhos e madrinhas do Noivo">
          <Ta value={form.padNoivo} onChange={v=>set('padNoivo',v)} placeholder="Ex: Pedro Souza (padrinho), Juliana Costa (madrinha)..."/>
        </F>
        <F label="Os padrinhos entrarão:">
          <Pills value={form.padEntrada} onChange={v=>set('padEntrada',v)}
            options={[{v:'casal',l:'Como casais'},{v:'individual',l:'Individualmente'},{v:'amigos',l:'Como amigos (sem par)'}]}/>
        </F>
        <F label="Posição no altar:">
          <Pills value={form.posAltar} onChange={v=>set('posAltar',v)}
            options={[{v:'pDireita',l:'Padrinhos à direita | Madrinhas à esquerda'},{v:'pSeparados',l:'Padrinhos/Madrinhas da noiva juntos | do noivo juntos'}]}/>
        </F>
      </Sec>

      <Sec title="8. Crianças na Cerimônia" sub="Pajens, daminhas, floristas, plaquinhas">
        <F label="Nome, idade e função de cada criança">
          <Ta value={form.pajens} onChange={v=>set('pajens',v)} placeholder="Ex: Luiza (6 anos, florista), Mateus (7 anos, pajem com as alianças), Sofia (5 anos, plaquinha)..."/>
        </F>
      </Sec>
    </>
  );
}

function Step4({form,set,setN}) {
  return (
    <>
      <Sec title="9. Religião e Tipo de Cerimônia">
        <F label="O casal possui religião?"><YN value={form.temRel} onChange={v=>set('temRel',v)}/></F>
        {form.temRel && <F label="Qual religião?"><In value={form.relNome} onChange={v=>set('relNome',v)} placeholder="Ex: Católica, Evangélica, Espírita..."/></F>}
        <F label="A cerimônia terá caráter:">
          <Pills value={form.tipoCer} onChange={v=>set('tipoCer',v)}
            options={[{v:'civil',l:'Civil'},{v:'religioso',l:'Religioso'},{v:'ecumenico',l:'Ecumênico'},{v:'simbolico',l:'Simbólico'}]}/>
        </F>
        <div className="row2">
          <F label="Nome do celebrante/pastor/padre"><In value={form.celebNome} onChange={v=>set('celebNome',v)} placeholder="Nome completo"/></F>
          <F label="Telefone do celebrante"><In value={form.celebTel} onChange={v=>set('celebTel',v)} placeholder="(00) 00000-0000"/></F>
        </div>
      </Sec>

      <Sec title="10. Votos, Bênção e Efeito de Saída">
        <F label="O casal escreverá votos personalizados?"><YN value={form.votos} onChange={v=>set('votos',v)}/></F>
        <F label="Haverá momento de bênção sobre o casal?">
          <YN value={form.bencao.sim} onChange={v=>setN('bencao',{sim:v})}/>
        </F>
        {form.bencao.sim && (
          <F label="A bênção será de:">
            <Pills value={form.bencao.tipo} onChange={v=>setN('bencao',{tipo:v})}
              options={[{v:'pais',l:'Apenas dos pais'},{v:'pf',l:'Pais e familiares'},{v:'todos',l:'Todos os convidados'}]}/>
          </F>
        )}
        <F label="Efeito para a saída dos noivos:">
          <Pills value={form.efeito} onChange={v=>set('efeito',v)}
            options={[{v:'bolhas',l:'Bolhas de sabão'},{v:'sparkles',l:'Sparkles'},{v:'petalas',l:'Pétalas'},{v:'baloes',l:'Balões'},{v:'outro',l:'Outro'},{v:'nenhum',l:'Nenhum'}]}/>
        </F>
        {form.efeito==='outro' && (
          <F label="Qual efeito?"><In value={form.efeitoOut} onChange={v=>set('efeitoOut',v)} placeholder="Descreva o efeito"/></F>
        )}
      </Sec>
    </>
  );
}

function Step5({form,set,setN}) {
  const EntBlk = ({label,field,children,showNome=true,showQuem=false}) => {
    const v = form[field];
    return (
      <div className="ent-blk">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:v.sim?12:0}}>
          <div className="ent-title">{label}</div>
          <YN value={v.sim} onChange={b=>setN(field,{sim:b})}/>
        </div>
        {v.sim && (
          <div style={{paddingTop:10,borderTop:'1px solid var(--border)'}}>
            {showNome && <F label="Nome(s)"><In value={v.nome||''} onChange={b=>setN(field,{nome:b})} placeholder="Nome completo"/></F>}
            {showQuem && <F label="Quem entrará?"><In value={v.quem||''} onChange={b=>setN(field,{quem:b})} placeholder="Nome(s) das pessoas"/></F>}
            {children}
            <F label="Música"><In value={v.mus||''} onChange={b=>setN(field,{mus:b})} placeholder="Título da música e artista"/></F>
          </div>
        )}
      </div>
    );
  };

  return (
    <Sec title="10. Entradas — 1ª Parte" sub="Marque os momentos que acontecerão na cerimônia">
      <EntBlk label="Entrada da Bíblia" field="entBib"/>
      <EntBlk label="Entrada do Celebrante / Pastor / Padre" field="entCel"/>
      <EntBlk label="Entrada Especial dos Pais" field="entPais" showNome={false} showQuem>
        <F label="Entrarão sozinhos ou acompanhados?">
          <In value={form.entPais.acomp||''} onChange={v=>setN('entPais',{acomp:v})} placeholder="Ex: pais da noiva entram juntos, pai do noivo entra sozinho..."/>
        </F>
      </EntBlk>

      <div className="ent-blk">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:form.entPad.sim?12:0}}>
          <div className="ent-title">Entrada dos Padrinhos e Madrinhas</div>
          <YN value={form.entPad.sim} onChange={v=>setN('entPad',{sim:v})}/>
        </div>
        {form.entPad.sim && (
          <div style={{paddingTop:10,borderTop:'1px solid var(--border)'}}>
            <F label="Observações especiais"><In value={form.entPad.obs} onChange={v=>setN('entPad',{obs:v})} placeholder="Alguma observação"/></F>
            <F label="Música"><In value={form.entPad.mus} onChange={v=>setN('entPad',{mus:v})} placeholder="Título e artista"/></F>
          </div>
        )}
      </div>

      <div className="ent-blk">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:form.entCri.sim?12:0}}>
          <div className="ent-title">Entrada das Crianças (floristas / plaquinhas)</div>
          <YN value={form.entCri.sim} onChange={v=>setN('entCri',{sim:v})}/>
        </div>
        {form.entCri.sim && (
          <div style={{paddingTop:10,borderTop:'1px solid var(--border)'}}>
            <F label="Nome e função de cada criança">
              <In value={form.entCri.nomes||''} onChange={v=>setN('entCri',{nomes:v})} placeholder="Ex: Luiza (florista), Mateus (aliança)"/>
            </F>
            <F label="Música"><In value={form.entCri.mus||''} onChange={v=>setN('entCri',{mus:v})} placeholder="Título e artista"/></F>
          </div>
        )}
      </div>
    </Sec>
  );
}

function Step6({form,set,setN}) {
  return (
    <>
      <Sec title="10. Entradas — 2ª Parte" sub="Entradas principais">
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:600,fontSize:'.95rem',color:'var(--wine-dk)',marginBottom:10}}>Entrada do Noivo</div>
        <div className="ent-blk">
          <F label="Quem conduzirá o Noivo ao altar?" req>
            <In value={form.entNoivo.cond} onChange={v=>setN('entNoivo',{cond:v})} placeholder="Nome e relação com o noivo"/>
          </F>
          <F label="O que essa pessoa representa para o Noivo?">
            <Ta value={form.entNoivo.sig} onChange={v=>setN('entNoivo',{sig:v})} placeholder="Conte brevemente a história e a importância..."/>
          </F>
          <F label="Música" req><In value={form.entNoivo.mus} onChange={v=>setN('entNoivo',{mus:v})} placeholder="Título e artista"/></F>
        </div>

        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:600,fontSize:'.95rem',color:'var(--wine-dk)',margin:'18px 0 10px'}}>Entrada da Noiva</div>
        <div className="ent-blk">
          <F label="Quem conduzirá a Noiva ao altar?" req>
            <In value={form.entNoiva.cond} onChange={v=>setN('entNoiva',{cond:v})} placeholder="Nome e relação com a noiva"/>
          </F>
          <F label="O que essa pessoa representa para a Noiva?">
            <Ta value={form.entNoiva.sig} onChange={v=>setN('entNoiva',{sig:v})} placeholder="Conte brevemente..."/>
          </F>
          <F label="Música" req><In value={form.entNoiva.mus} onChange={v=>setN('entNoiva',{mus:v})} placeholder="Título e artista"/></F>
        </div>

        <div className="ent-blk">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:form.entAli.sim?12:0}}>
            <div className="ent-title">Entrada das Alianças</div>
            <YN value={form.entAli.sim} onChange={v=>setN('entAli',{sim:v})}/>
          </div>
          {form.entAli.sim && (
            <div style={{paddingTop:10,borderTop:'1px solid var(--border)'}}>
              <F label="Quem levará as alianças?"><In value={form.entAli.quem} onChange={v=>setN('entAli',{quem:v})} placeholder="Nome e idade se criança"/></F>
              <F label="Música"><In value={form.entAli.mus} onChange={v=>setN('entAli',{mus:v})} placeholder="Título e artista"/></F>
            </div>
          )}
        </div>
      </Sec>

      <Sec title="Músicas Adicionais" sub="Outros momentos musicais da cerimônia">
        <F label="Louvor / Música pós-pregação"><In value={form.musLouv} onChange={v=>set('musLouv',v)} placeholder="Título e artista"/></F>
        <F label="Música para fotos protocolares"><In value={form.musFotos} onChange={v=>set('musFotos',v)} placeholder="Título e artista"/></F>
        <F label="Música de saída do casal"><In value={form.musSaida} onChange={v=>set('musSaida',v)} placeholder="Título e artista"/></F>
      </Sec>
    </>
  );
}

function Step7({form,set}) {
  return (
    <>
      <Sec title="11. História do Casal" sub="Quanto mais detalhes, mais personalizada será a cerimônia">
        <F label="Quando e onde se conheceram?" hint="Mês, ano e local — seja específico">
          <Ta value={form.comoConhec} onChange={v=>set('comoConhec',v)} placeholder="Ex: Em março de 2019, numa festa de aniversário de um amigo em comum em Sorriso-MT. Ela estava com um grupo de amigas quando ele chegou..."/>
        </F>
        <F label="Quem os apresentou ou como aconteceu o primeiro encontro?">
          <Ta value={form.quemApresen} onChange={v=>set('quemApresen',v)} placeholder="Conte a história com detalhes — o que cada um pensou, o que foi dito..." rows={4}/>
        </F>
        <F label="Qual foi a primeira impressão que tiveram um do outro?">
          <Ta value={form.primImpres} onChange={v=>set('primImpres',v)} placeholder="A impressão inicial de cada um ao ver e conhecer o outro..."/>
        </F>
        <F label="Quando e como aconteceu o pedido de namoro?">
          <Ta value={form.pedNam} onChange={v=>set('pedNam',v)} placeholder="A história do pedido de namoro com detalhes..." rows={4}/>
        </F>
        <F label="Quando e como aconteceu o pedido de casamento?">
          <Ta value={form.pedCas} onChange={v=>set('pedCas',v)} placeholder="A história do pedido de casamento com detalhes..." rows={4}/>
        </F>
      </Sec>

      <Sec title="12. Momentos Marcantes">
        <F label="Qual foi o momento mais difícil que já enfrentaram juntos?">
          <Ta value={form.momDif} onChange={v=>set('momDif',v)} placeholder="Descreva o momento com honestidade..."/>
        </F>
        <F label="Como superaram esse momento?">
          <Ta value={form.comoSuper} onChange={v=>set('comoSuper',v)} placeholder="O que cada um fez, o que isso revelou sobre vocês dois..."/>
        </F>
        <F label="Qual foi o momento mais feliz ou mais marcante da história de vocês?">
          <Ta value={form.momFeliz} onChange={v=>set('momFeliz',v)} placeholder="O momento que melhor representa quem vocês são juntos..."/>
        </F>
      </Sec>
    </>
  );
}

function Step8({form,set}) {
  return (
    <>
      <Sec title="13. Sobre Cada Um">
        <F label='Noivo — 3 qualidades que admira na Noiva'>
          <Ta value={form.vSobreN} onChange={v=>set('vSobreN',v)} placeholder="Ex: a determinação dela diante dos obstáculos; o jeito como acolhe as pessoas; a coragem de recomeçar quando necessário..."/>
        </F>
        <F label='Noiva — 3 qualidades que admira no Noivo'>
          <Ta value={form.nSobreV} onChange={v=>set('nSobreV',v)} placeholder="Ex: a paciência que ele tem; o comprometimento com o trabalho e com a família; a forma como me escuta..."/>
        </F>
      </Sec>

      <Sec title="14. Frases para a Cerimônia">
        <F label='Noivo — "Minha vida mudou quando você..."'>
          <Ta value={form.vFrase} onChange={v=>set('vFrase',v)} placeholder="Complete do ponto de vista do noivo — um momento concreto, uma ação específica dela..."/>
        </F>
        <F label='Noiva — "Minha vida mudou quando você..."'>
          <Ta value={form.nFrase} onChange={v=>set('nFrase',v)} placeholder="Complete do ponto de vista da noiva — um momento concreto, uma ação específica dele..."/>
        </F>
      </Sec>

      <Sec title="15 — 17. Homenagens e Observações">
        <F label="Gostariam de homenagear alguém especial?"><YN value={form.homen} onChange={v=>set('homen',v)}/></F>
        {form.homen && (
          <F label="Quem? (nome e relação)">
            <Ta value={form.homenQuem} onChange={v=>set('homenQuem',v)} placeholder="Nome, relação e por que essa pessoa foi importante na história de vocês..."/>
          </F>
        )}
        {form.temFilhos && (
          <F label="Os filhos participarão de algum momento especial?">
            <Ta value={form.filhosPartic} onChange={v=>set('filhosPartic',v)} placeholder="Descreva como os filhos farão parte da cerimônia..."/>
          </F>
        )}
        <F label="Existe algum assunto que NÃO deve ser mencionado?" hint="Histórias, pessoas ou situações sensíveis">
          <In value={form.naoMenc} onChange={v=>set('naoMenc',v)} placeholder="Deixar em branco se não houver"/>
        </F>
      </Sec>

      <Sec title="18. Mensagem Final">
        <F label="Que sentimento ou valor vocês querem que a cerimônia transmita?" hint="Orienta o tom geral de toda a cerimônia">
          <Ta value={form.msgFinal} onChange={v=>set('msgFinal',v)} placeholder="Ex: emoção contida e profunda; leveza e alegria; fé e gratidão; superação; a força de uma história construída com trabalho..." rows={4}/>
        </F>
        <Al type="i">
          ✨ Tudo preenchido? Clique em <strong>Gerar Roteiro</strong> para criar os três documentos personalizados com base na história de vocês.
        </Al>
      </Sec>
    </>
  );
}

// ════════════════════════════════════════════
//  QUESTIONNAIRE WIZARD
// ════════════════════════════════════════════
function QuestionnaireWizard({user, existingEvent, onDone, onCancel}) {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState(existingEvent?.form ? {...INIT_FORM,...existingEvent.form} : {...INIT_FORM});
  const [generating, setGen] = useState(false);
  const [error, setError]   = useState('');
  const [savedMsg, setSaved] = useState('');
  const total = WIZ.length;

  const evRef = useRef(existingEvent || {
    id: 'ev'+Date.now(), userId: user.id,
    brideNome:'', groomNome:'', dataCas:'', local:'',
    scripts:null, createdAt: new Date().toISOString(),
  });

  const set  = useCallback((k,v) => setForm(f=>({...f,[k]:v})), []);
  const setN = useCallback((parent, updates) => setForm(f=>({...f,[parent]:{...f[parent],...updates}})), []);

  const saveDraft = async () => {
    const ev = {
      ...evRef.current,
      brideNome: form.noivaNome, groomNome: form.noivoNome,
      dataCas: form.dataCas, local: form.local,
      form, updatedAt: new Date().toISOString(),
    };
    evRef.current = ev;
    await db.saveEvent(ev);
    setSaved('Rascunho salvo!');
    setTimeout(()=>setSaved(''),2200);
  };

  const handleGenerate = async () => {
    setError(''); setGen(true);
    try {
      const prompt = buildPrompt(form);
      const text   = await callClaude(prompt);
      const scripts = parseScripts(text);
      const ev = {
        ...evRef.current,
        brideNome: form.noivaNome, groomNome: form.noivoNome,
        dataCas: form.dataCas, local: form.local,
        form, scripts, updatedAt: new Date().toISOString(),
      };
      evRef.current = ev;
      await db.saveEvent(ev);
      // Increment counter only for new generation (not re-gen of same event)
      const isNewScript = !existingEvent?.scripts;
      const updUser = isNewScript ? {...user, scriptsUsed: user.scriptsUsed+1} : user;
      if (isNewScript) await db.saveUser(updUser);
      onDone(ev, updUser);
    } catch(e) {
      setError('Erro ao gerar roteiro: '+e.message+'. Verifique sua conexão e tente novamente.');
    }
    setGen(false);
  };

  return (
    <div className="wrap" style={{paddingTop:22,paddingBottom:50}}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14,flexWrap:'wrap'}}>
        <button className="btn b-muted b-sm" onClick={onCancel}>← Sair</button>
        <div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.25rem',color:'var(--wine-dk)'}}>
            Questionário da Cerimônia
          </h2>
          <div style={{fontSize:'.78rem',color:'var(--text-s)'}}>
            Passo {step} de {total}: <strong>{WIZ[step-1]?.title}</strong>
          </div>
        </div>
        {savedMsg && <div style={{marginLeft:'auto',fontSize:'.8rem',color:'#4a7c59',fontStyle:'italic'}}>{savedMsg}</div>}
      </div>

      {/* Step indicator */}
      <div className="wz-steps">
        {WIZ.map((s,i) => (
          <React.Fragment key={s.id}>
            <div className={`wz-s${step===s.id?' act':step>s.id?' done':''}`} onClick={()=>setStep(s.id)}>
              <div className={`wz-dot ${step>s.id?'dot-d':step===s.id?'dot-a':'dot-p'}`}>
                {step>s.id ? '✓' : s.icon}
              </div>
              <div className={`wz-lbl${step===s.id?' act':''}`}>{s.lbl}</div>
            </div>
            {i < WIZ.length-1 && <div className={`wz-con${step>s.id?' done':''}`}/>}
          </React.Fragment>
        ))}
      </div>

      {error && <Al type="e">{error}</Al>}

      {generating ? (
        <div className="load-wrap">
          <div className="spin"/>
          <div className="load-t">
            Gerando seu roteiro personalizado com base na história de {form.noivaNome||'Noiva'} & {form.noivoNome||'Noivo'}...
            <br/>Isso pode levar até 30 segundos.
          </div>
        </div>
      ) : (
        <>
          {step===1 && <Step1 form={form} set={set}/>}
          {step===2 && <Step2 form={form} set={set}/>}
          {step===3 && <Step3 form={form} set={set} setN={setN}/>}
          {step===4 && <Step4 form={form} set={set} setN={setN}/>}
          {step===5 && <Step5 form={form} set={set} setN={setN}/>}
          {step===6 && <Step6 form={form} set={set} setN={setN}/>}
          {step===7 && <Step7 form={form} set={set}/>}
          {step===8 && <Step8 form={form} set={set}/>}

          {/* Navigation */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:22,gap:8,flexWrap:'wrap',borderTop:'1px solid var(--border)',paddingTop:18}}>
            <div style={{display:'flex',gap:6}}>
              {step>1 && (
                <button className="btn b-out b-sm" onClick={()=>setStep(s=>Math.max(s-1,1))}>← Anterior</button>
              )}
              <button className="btn b-muted b-sm" onClick={saveDraft}>Salvar Rascunho</button>
            </div>
            <div style={{display:'flex',gap:6}}>
              {step<total && (
                <button className="btn b-wine" onClick={()=>setStep(s=>Math.min(s+1,total))}>Próximo →</button>
              )}
              {step===total && (
                <button className="btn b-gold b-lg" onClick={handleGenerate}>✨ Gerar Roteiro</button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════
//  MAIN APP
// ════════════════════════════════════════════
export default function App() {
  const [view, setView]           = useState('landing');
  const [user, setUser]           = useState(null);
  const [viewEvent, setViewEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [defaultPlan, setDPlan]   = useState(null);
  const [ready, setReady]         = useState(false);

  useEffect(()=>{
    // Inject CSS
    if (!document.getElementById('wc-css')) {
      const el = document.createElement('style');
      el.id = 'wc-css';
      el.textContent = CSS;
      document.head.appendChild(el);
    }
    db.init().then(()=>setReady(true));
  },[]);

  const login    = u => { setUser(u); setView('dashboard'); };
  const logout   = () => { setUser(null); setView('landing'); setViewEvent(null); setEditEvent(null); };
  const navigate = (v,data) => {
    if (v==='register') { setDPlan(data||null); setView('auth'); return; }
    if (v==='login')    { setView('auth'); return; }
    setView(v);
  };

  const handleQDone = (ev, updUser) => {
    setUser(updUser);
    setViewEvent(ev);
    setView('scripts');
  };

  if (!ready) return (
    <div className="load-wrap" style={{minHeight:'100vh',display:'flex'}}>
      <div className="spin"/>
      <div className="load-t">A carregar...</div>
    </div>
  );

  return (
    <div>
      {user && (
        <Nav user={user} onLogout={logout} onNavigate={navigate}/>
      )}

      {view==='landing' && (
        <LandingPage onGo={navigate}/>
      )}

      {view==='auth' && (
        <AuthPage onLogin={login} onGo={navigate} defaultPlan={defaultPlan}/>
      )}

      {view==='dashboard' && user && (
        <Dashboard
          user={user}
          onNavigate={navigate}
          onNewEvent={()=>{ setEditEvent(null); setView('questionnaire'); }}
          onViewEvent={ev=>{ setViewEvent(ev); setView('scripts'); }}
          onEditEvent={ev=>{ setEditEvent(ev); setView('questionnaire'); }}
        />
      )}

      {view==='questionnaire' && user && (
        <QuestionnaireWizard
          user={user}
          existingEvent={editEvent}
          onDone={handleQDone}
          onCancel={()=>setView('dashboard')}
        />
      )}

      {view==='scripts' && viewEvent && (
        <ScriptViewer
          event={viewEvent}
          onBack={()=>setView('dashboard')}
          onRegenerate={viewEvent.form ? ()=>{ setEditEvent(viewEvent); setView('questionnaire'); } : null}
        />
      )}

      {view==='admin' && user?.isAdmin && (
        <AdminPanel user={user} onNavigate={navigate}/>
      )}
    </div>
  );
}
