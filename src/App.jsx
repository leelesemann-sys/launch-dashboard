import { useState } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ComposedChart } from "recharts";

const MONTHLY = [
  {m:"2025-05",p:"CARD01",trx:450,trxP:440,gross:40275,net:31617,grossP:39380,netP:31310,docs:18},
  {m:"2025-06",p:"CARD01",trx:386,trxP:398,gross:34547,net:27591,grossP:35621,netP:28393,docs:24},
  {m:"2025-07",p:"CARD01",trx:559,trxP:578,gross:50030,net:39605,grossP:51731,netP:40992,docs:30},
  {m:"2025-08",p:"CARD01",trx:763,trxP:811,gross:68288,net:54646,grossP:72584,netP:57970,docs:36},
  {m:"2025-09",p:"CARD01",trx:1097,trxP:1090,gross:98182,net:77975,grossP:97555,netP:77630,docs:42},
  {m:"2025-10",p:"CARD01",trx:1388,trxP:1400,gross:124226,net:99298,grossP:125300,netP:99512,docs:48},
  {m:"2025-11",p:"CARD01",trx:1654,trxP:1710,gross:148033,net:116475,grossP:153045,netP:121000,docs:56},
  {m:"2025-12",p:"CARD01",trx:1938,trxP:1994,gross:173451,net:138373,grossP:178463,netP:141853,docs:65},
  {m:"2025-09",p:"NEUR01",trx:92,trxP:104,gross:22540,net:14211,grossP:25480,netP:21094,docs:28},
  {m:"2025-10",p:"NEUR01",trx:368,trxP:407,gross:90160,net:56845,grossP:99715,netP:82552,docs:60},
  {m:"2025-11",p:"NEUR01",trx:302,trxP:337,gross:73990,net:46650,grossP:82565,netP:68354,docs:30},
  {m:"2025-12",p:"NEUR01",trx:401,trxP:451,gross:98245,net:61942,grossP:110495,netP:91476,docs:30},
];

const FORECAST_CARD = [
  {m:"2025-05",base:380,up:456,down:296},{m:"2025-06",base:381,up:458,down:298},
  {m:"2025-07",base:538,up:645,down:419},{m:"2025-08",base:741,up:889,down:578},
  {m:"2025-09",base:992,up:1190,down:774},{m:"2025-10",base:1284,up:1541,down:1002},
  {m:"2025-11",base:1600,up:1920,down:1248},{m:"2025-12",base:1916,up:2299,down:1494},
  {m:"2026-01",base:2208,up:2650,down:1722},{m:"2026-02",base:2459,up:2951,down:1918},
  {m:"2026-03",base:2662,up:3195,down:2077},{m:"2026-04",base:2819,up:3382,down:2198},
];

const FORECAST_NEUR = [
  {m:"2025-09",base:105,up:124,down:84},{m:"2025-10",base:156,up:184,down:125},
  {m:"2025-11",base:318,up:375,down:254},{m:"2025-12",base:428,up:505,down:343},
  {m:"2026-01",base:550,up:649,down:440},{m:"2026-02",base:672,up:793,down:537},
  {m:"2026-03",base:782,up:923,down:626},{m:"2026-04",base:874,up:1031,down:699},
];

const REGIONS_CARD = [
  {r:"Bayern",trx:500,trxP:385,net:35570,netP:27389,docs:15,visits:20,ms:21.5},
  {r:"Nordrhein",trx:363,trxP:256,net:25813,netP:18212,docs:11,visits:12,ms:19.4},
  {r:"Baden-Württemberg",trx:249,trxP:290,net:17704,netP:20631,docs:8,visits:14,ms:12.3},
  {r:"Westfalen-Lippe",trx:165,trxP:220,net:11734,netP:15651,docs:5,visits:8,ms:10.5},
  {r:"Niedersachsen",trx:165,trxP:240,net:11734,netP:17074,docs:5,visits:7,ms:11.0},
  {r:"Berlin",trx:155,trxP:105,net:11023,netP:7470,docs:3,visits:4,ms:20.7},
  {r:"Hessen",trx:149,trxP:185,net:10596,netP:13161,docs:6,visits:8,ms:12.4},
  {r:"Sachsen",trx:82,trxP:170,net:5830,netP:12094,docs:4,visits:4,ms:9.9},
  {r:"Hamburg",trx:67,trxP:55,net:4764,netP:3913,docs:4,visits:10,ms:17.9},
  {r:"Schleswig-Holstein",trx:43,trxP:88,net:3058,netP:6260,docs:4,visits:8,ms:8.2},
];

const COMPETITORS_CARD = [
  {m:"2025-05",forxiga:42.7,jardiance:45.3,invokana:8.7,cardiozan:3.3},
  {m:"2025-06",forxiga:40.4,jardiance:48.2,invokana:8.5,cardiozan:2.9},
  {m:"2025-07",forxiga:41.6,jardiance:46.4,invokana:8.0,cardiozan:4.0},
  {m:"2025-08",forxiga:40.9,jardiance:46.0,invokana:7.3,cardiozan:5.8},
  {m:"2025-09",forxiga:39.6,jardiance:45.5,invokana:7.0,cardiozan:7.9},
  {m:"2025-10",forxiga:40.2,jardiance:43.4,invokana:6.4,cardiozan:10.0},
  {m:"2025-11",forxiga:37.4,jardiance:44.2,invokana:6.5,cardiozan:11.9},
  {m:"2025-12",forxiga:38.2,jardiance:42.0,invokana:6.0,cardiozan:13.8},
];

const MILESTONES = [
  {prod:"Cardiozan",ms:"EU-Zulassung (EMA)",plan:"15.03.2025",actual:"20.03.2025",status:"Abgeschlossen",code:"green"},
  {prod:"Cardiozan",ms:"G-BA Nutzenbewertung",plan:"15.09.2025",actual:"28.09.2025",status:"Abgeschlossen",code:"green"},
  {prod:"Cardiozan",ms:"Erstattungsbetrag-Verhandlung",plan:"15.03.2026",actual:"",status:"In Verhandlung",code:"yellow"},
  {prod:"Cardiozan",ms:"Rabattvertrag AOK-Verbund",plan:"01.06.2026",actual:"",status:"Vorbereitung",code:"yellow"},
  {prod:"Cardiozan",ms:"Leitlinien-Aufnahme DGK",plan:"01.04.2026",actual:"",status:"Eingereicht",code:"green"},
  {prod:"Cardiozan",ms:"Field Force volle Kapazität",plan:"01.06.2025",actual:"15.06.2025",status:"Abgeschlossen",code:"green"},
  {prod:"Neurolix",ms:"EU-Zulassung (EMA)",plan:"01.07.2025",actual:"10.07.2025",status:"Abgeschlossen",code:"green"},
  {prod:"Neurolix",ms:"G-BA Nutzenbewertung",plan:"15.01.2026",actual:"20.01.2026",status:"Geringer Zusatznutzen",code:"red"},
  {prod:"Neurolix",ms:"Erstattungsbetrag-Verhandlung",plan:"15.07.2026",actual:"",status:"Ausstehend",code:"yellow"},
  {prod:"Neurolix",ms:"Rabattvertrag vdek",plan:"01.09.2026",actual:"",status:"Nicht gestartet",code:"red"},
  {prod:"Neurolix",ms:"Medical Affairs Advisory Board",plan:"01.11.2025",actual:"15.11.2025",status:"Abgeschlossen",code:"green"},
  {prod:"Neurolix",ms:"RWE-Studie Rekrutierung",plan:"01.03.2026",actual:"",status:"Vorbereitung",code:"yellow"},
];

const COMP_EVENTS = [
  {date:"Apr 2025",area:"Kardio",type:"Zulassung",who:"AstraZeneca / Forxiga",desc:"Indikationserweiterung HFpEF durch EMA zugelassen"},
  {date:"Jun 2025",area:"Kardio",type:"Pricing",who:"BI / Jardiance",desc:"Erstattungsbetrag neu verhandelt, Preissenkung -8%"},
  {date:"Aug 2025",area:"Kardio",type:"Rabattvertrag",who:"AstraZeneca / Forxiga",desc:"AOK-Verbund Rabattvertrag, 24 Monate"},
  {date:"Nov 2025",area:"Kardio",type:"Leitlinie",who:"ESC / SGLT2i",desc:"ESC Update: SGLT2i First-Line in HFrEF bestätigt"},
  {date:"Jan 2026",area:"Kardio",type:"Pipeline",who:"Bayer / Kerendia",desc:"Kombi-Studie Finerenon + SGLT2i publiziert"},
  {date:"Okt 2025",area:"ZNS",type:"Zulassung",who:"Janssen / Spravato",desc:"Erweiterung: akute Suizidalität bei MDD"},
  {date:"Dez 2025",area:"ZNS",type:"Nutzenbewertung",who:"Janssen / Spravato",desc:"G-BA: beträchtlicher Zusatznutzen in neuer Indikation"},
  {date:"Jan 2026",area:"ZNS",type:"Pipeline",who:"Relmada / REL-1017",desc:"Phase III positiv, EMA-Zulassung erwartet 2027"},
];

// ============ MARKET UPTAKE DATA ============

// NRx = Neuverordnungen (neue Patienten), RRx = Wiederholungsverordnungen, TRx = Gesamt
// Verordner = unique anonymisierte Verordner-IDs (LRx, ~80% GKV-Abdeckung, hochgerechnet)
// Persistenz = Patienten mit MPR >= 80% nach 3 Monaten (LRx longitudinal)
const UPTAKE_CARD = [
  {m:"2025-05",nrx:450,nrxP:440,rrx:0,rrxP:0,verordner:60,verordnerP:55,persist:0},
  {m:"2025-06",nrx:312,nrxP:320,rrx:74,rrxP:78,verordner:78,verordnerP:80,persist:0},
  {m:"2025-07",nrx:348,nrxP:365,rrx:211,rrxP:213,verordner:102,verordnerP:110,persist:82.5},
  {m:"2025-08",nrx:385,nrxP:410,rrx:378,rrxP:401,verordner:128,verordnerP:138,persist:79.8},
  {m:"2025-09",nrx:432,nrxP:428,rrx:665,rrxP:662,verordner:158,verordnerP:160,persist:78.2},
  {m:"2025-10",nrx:398,nrxP:420,rrx:990,rrxP:980,verordner:185,verordnerP:195,persist:76.5},
  {m:"2025-11",nrx:421,nrxP:450,rrx:1233,rrxP:1260,verordner:210,verordnerP:225,persist:75.1},
  {m:"2025-12",nrx:445,nrxP:470,rrx:1493,rrxP:1524,verordner:232,verordnerP:250,persist:74.8},
];

const UPTAKE_NEUR = [
  {m:"2025-09",nrx:92,nrxP:104,rrx:0,rrxP:0,verordner:28,verordnerP:35,persist:0},
  {m:"2025-10",nrx:245,nrxP:260,rrx:123,rrxP:147,verordner:60,verordnerP:72,persist:68.5},
  {m:"2025-11",nrx:128,nrxP:155,rrx:174,rrxP:182,verordner:72,verordnerP:88,persist:65.2},
  {m:"2025-12",nrx:155,nrxP:185,rrx:246,rrxP:266,verordner:82,verordnerP:100,persist:62.8},
];

const COMPETITORS_NEUR = [
  {m:"2025-09",spravato:18.5,venlafaxin:32.1,duloxetin:28.4,neurolix:1.2,andere:19.8},
  {m:"2025-10",spravato:19.2,venlafaxin:31.0,duloxetin:27.8,neurolix:3.8,andere:18.2},
  {m:"2025-11",spravato:20.1,venlafaxin:30.2,duloxetin:27.5,neurolix:3.1,andere:19.1},
  {m:"2025-12",spravato:20.8,venlafaxin:29.5,duloxetin:27.0,neurolix:4.2,andere:18.5},
];

// Verordnerkonzentration nach AD-Gebiet (PharmaScope Sales Rep Regions, nicht Einzelarzt)
const CONC_CARD = [
  {seg:"Top 2 KV-Bezirke",trxShare:37.5,cumTrx:37.5},
  {seg:"KV-Bezirke 3\u20135",trxShare:28.2,cumTrx:65.7},
  {seg:"KV-Bezirke 6\u201310",trxShare:22.1,cumTrx:87.8},
  {seg:"KV-Bezirke 11\u201317",trxShare:12.2,cumTrx:100.0},
];

const CONC_NEUR = [
  {seg:"Top 2 KV-Bezirke",trxShare:32.8,cumTrx:32.8},
  {seg:"KV-Bezirke 3\u20135",trxShare:30.5,cumTrx:63.3},
  {seg:"KV-Bezirke 6\u201310",trxShare:23.7,cumTrx:87.0},
  {seg:"KV-Bezirke 11\u201317",trxShare:13.0,cumTrx:100.0},
];

// ============ LIGHT BUSINESS THEME ============

const T = {
  bg:"#f5f6f8",surface:"#ffffff",surface2:"#f0f2f5",border:"#e2e5ea",
  text:"#1a202c",textMuted:"#6b7280",textDim:"#9ca3af",
  accent1:"#2563eb",accent2:"#0891b2",
  green:"#059669",red:"#dc2626",yellow:"#d97706",
  cardiozan:"#2563eb",neurolix:"#7c3aed",
  forxiga:"#64748b",jardiance:"#78716c",invokana:"#94a3b8",
  grid:"#e5e7eb",
};

const mono="'JetBrains Mono',monospace";
const sans="'DM Sans',-apple-system,sans-serif";
const fmt=n=>n==null?"–":n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(0)+"k":n.toLocaleString("de-DE");
const fmtE=n=>"€"+fmt(n);
const pct=(a,b)=>b?((a/b)*100).toFixed(1)+"%":"–";
const dlt=(a,b)=>{if(!b)return{v:"–",c:T.textMuted};const d=((a-b)/b)*100;return{v:(d>=0?"+":"")+d.toFixed(1)+"%",c:d>=0?T.green:T.red};};
const sM=m=>{const[y,mo]=m.split("-");const n=["","Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];return n[parseInt(mo)]+" "+y.slice(2);};

// ============ REUSABLE COMPONENTS ============

const KPI=({label,value,sub,trend,alert})=>(
  <div style={{background:T.surface,border:"1px solid "+(alert==="red"?T.red+"55":T.border),borderRadius:8,padding:"14px 18px",flex:1,minWidth:155,boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
    <div style={{fontSize:10.5,color:T.textMuted,textTransform:"uppercase",letterSpacing:.8,marginBottom:5,fontFamily:mono}}>{label}</div>
    <div style={{fontSize:24,fontWeight:700,color:T.text,fontFamily:mono}}>{value}</div>
    <div style={{display:"flex",alignItems:"center",gap:8,marginTop:3}}>
      {trend&&<span style={{fontSize:12.5,fontWeight:600,color:trend.c,fontFamily:mono}}>{trend.v}</span>}
      {sub&&<span style={{fontSize:11.5,color:T.textMuted}}>{sub}</span>}
    </div>
  </div>
);

const Dot=({code})=><span style={{display:"inline-block",width:9,height:9,borderRadius:"50%",background:code==="green"?T.green:code==="red"?T.red:T.yellow,marginRight:8}}/>;

const Card=({children,title,sub,flex,style:ex})=>(
  <div style={{background:T.surface,border:"1px solid "+T.border,borderRadius:8,padding:18,flex:flex||1,boxShadow:"0 1px 3px rgba(0,0,0,.04)",...ex}}>
    {title&&<div style={{marginBottom:14}}><h2 style={{fontSize:15,fontWeight:600,color:T.text,margin:0,fontFamily:sans}}>{title}</h2>{sub&&<p style={{fontSize:11.5,color:T.textMuted,margin:"3px 0 0"}}>{sub}</p>}</div>}
    {children}
  </div>
);

const Tip=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return(<div style={{background:T.surface,border:"1px solid "+T.border,borderRadius:6,padding:"8px 12px",fontSize:12,color:T.text,boxShadow:"0 4px 12px rgba(0,0,0,.1)"}}>
    <div style={{fontWeight:600,marginBottom:4}}>{label}</div>
    {payload.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:5,marginBottom:1}}>
      <span style={{width:7,height:7,borderRadius:"50%",background:p.color,display:"inline-block"}}/>
      <span style={{color:T.textMuted}}>{p.name}:</span>
      <span style={{fontWeight:600,fontFamily:mono}}>{typeof p.value==="number"?p.value.toLocaleString("de-DE"):p.value}</span>
    </div>))}
  </div>);
};

const Alert=({color,children})=>(
  <div style={{background:color+"08",border:"1px solid "+color+"33",borderRadius:6,padding:"10px 14px",marginTop:14,fontSize:12.5,color:T.text,lineHeight:1.5}}>{children}</div>
);

const TH=({children})=><th style={{padding:"8px 12px",textAlign:"left",color:T.textMuted,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,fontFamily:mono}}>{children}</th>;
const TD=({children,m:isMono,color:c,bold:b})=><td style={{padding:"9px 12px",color:c||T.text,fontWeight:b?600:400,fontFamily:isMono?mono:sans}}>{children}</td>;

// ============ EXEC SUMMARY ============

function ExecSummary({product}){
  const isC=product==="CARD01";
  const data=MONTHLY.filter(d=>d.p===product);
  const last=data[data.length-1];
  const prev=data.length>1?data[data.length-2]:null;
  const cumNet=data.reduce((s,d)=>s+d.net,0);
  const cumNetP=data.reduce((s,d)=>s+d.netP,0);
  const cumTrx=data.reduce((s,d)=>s+d.trx,0);
  const cumTrxP=data.reduce((s,d)=>s+d.trxP,0);
  const pc=isC?T.cardiozan:T.neurolix;
  const fc=isC?FORECAST_CARD:FORECAST_NEUR;
  const cd=fc.map(f=>{const a=data.find(d=>d.m===f.m);return{name:sM(f.m),base:f.base,up:f.up,down:f.down,actual:a?.trx??null};});
  const ms=MILESTONES.filter(m=>m.prod===(isC?"Cardiozan":"Neurolix"));

  return(<div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18}}>
      <KPI label="Net Revenue kum." value={fmtE(cumNet)} sub={"Plan: "+fmtE(cumNetP)} trend={dlt(cumNet,cumNetP)} alert={cumNet<cumNetP*.85?"red":null}/>
      <KPI label="TRx kum." value={fmt(cumTrx)} sub={"Plan: "+fmt(cumTrxP)} trend={dlt(cumTrx,cumTrxP)}/>
      <KPI label="TRx letzter Monat" value={fmt(last?.trx)} sub={"Plan: "+fmt(last?.trxP)} trend={prev?dlt(last?.trx,prev?.trx):null}/>
      <KPI label="Verordnende Ärzte" value={fmt(last?.docs)} sub="letzter Monat"/>
    </div>
    {!isC&&<Alert color={T.red}><strong style={{color:T.red}}>{"⚠"} Preis-Gap:</strong> AMNOG-Ergebnis "geringer Zusatznutzen" (erwartet: beträchtlich). Erstattungsbetrag €168 statt €220 {"→"} Net Revenue/TRx 23,8% unter Plan. Volumen bei {pct(cumTrx,cumTrxP)} Plan, aber Revenue nur {pct(cumNet,cumNetP)}.</Alert>}
    <div style={{display:"flex",gap:14,marginTop:18,flexWrap:"wrap"}}>
      <Card title="TRx-Verlauf vs. Forecast-Korridor" sub="Actual vs. Base / Upside / Downside" flex={2}>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={cd} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}}/>
            <Tooltip content={<Tip/>}/>
            <Area type="monotone" dataKey="up" fill={pc+"08"} stroke="transparent"/>
            <Area type="monotone" dataKey="down" fill={pc+"08"} stroke="transparent"/>
            <Line type="monotone" dataKey="base" stroke={T.textDim} strokeDasharray="6 3" strokeWidth={1.5} dot={false} name="Base Forecast"/>
            <Line type="monotone" dataKey="up" stroke={T.green+"55"} strokeDasharray="4 4" strokeWidth={1} dot={false} name="Upside"/>
            <Line type="monotone" dataKey="down" stroke={T.red+"55"} strokeDasharray="4 4" strokeWidth={1} dot={false} name="Downside"/>
            <Line type="monotone" dataKey="actual" stroke={pc} strokeWidth={2.5} dot={{fill:pc,r:4,stroke:"#fff",strokeWidth:2}} name="Actual TRx" connectNulls={false}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Meilensteine" flex={1}>
        <div style={{maxHeight:280,overflow:"auto"}}>
          {ms.map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",padding:"7px 0",borderBottom:"1px solid "+T.border}}>
            <Dot code={m.code}/>
            <div style={{flex:1}}>
              <div style={{fontSize:12.5,fontWeight:500,color:T.text}}>{m.ms}</div>
              <div style={{fontSize:11,color:T.textMuted,marginTop:1}}>Plan: {m.plan}{m.actual?" · Ist: "+m.actual:""}</div>
              <div style={{fontSize:11,color:m.code==="red"?T.red:m.code==="yellow"?T.yellow:T.green,fontWeight:500,marginTop:1}}>{m.status}</div>
            </div>
          </div>))}
        </div>
      </Card>
    </div>
    <div style={{marginTop:14}}>
      <Card title="Net Revenue monatlich" sub="Actual vs. Plan">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.map(d=>({name:sM(d.m),Actual:d.net,Plan:d.netP}))} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} tickFormatter={v=>fmtE(v)}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="Plan" fill={T.textDim+"33"} radius={[4,4,0,0]} name="Plan"/>
            <Bar dataKey="Actual" fill={pc} radius={[4,4,0,0]} name="Actual"/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>);
}

// ============ MARKET UPTAKE & ADOPTION ============

function AdoptionPage({product}){
  const isC=product==="CARD01";
  const pc=isC?T.cardiozan:T.neurolix;
  const name=isC?"Cardiozan":"Neurolix";
  const uptake=isC?UPTAKE_CARD:UPTAKE_NEUR;
  const conc=isC?CONC_CARD:CONC_NEUR;
  const compData=isC?COMPETITORS_CARD:COMPETITORS_NEUR;

  const last=uptake[uptake.length-1];
  const prev=uptake.length>1?uptake[uptake.length-2]:null;
  const cumNrx=uptake.reduce((s,d)=>s+d.nrx,0);
  const cumNrxP=uptake.reduce((s,d)=>s+d.nrxP,0);
  const cumTrx=uptake.reduce((s,d)=>s+d.nrx+d.rrx,0);
  const rrxRatio=last?(last.rrx/(last.nrx+last.rrx)*100).toFixed(0):0;

  const nrxChart=uptake.map(d=>({name:sM(d.m),"NRx Ist":d.nrx,"NRx Plan":d.nrxP,"RRx Ist":d.rrx,"RRx Plan":d.rrxP}));
  const verordnerChart=uptake.map(d=>({name:sM(d.m),"Verordner Ist":d.verordner,"Verordner Plan":d.verordnerP}));
  const persistChart=uptake.filter(d=>d.persist>0).map(d=>({name:sM(d.m),"MPR \u226580%":d.persist,benchmark:isC?78:70}));
  const mixChart=uptake.map(d=>{const t=d.nrx+d.rrx;return{name:sM(d.m),"NRx %":t>0?parseFloat((d.nrx/t*100).toFixed(1)):100,"RRx %":t>0?parseFloat((d.rrx/t*100).toFixed(1)):0};});

  const compKeys=isC
    ?[{k:"jardiance",n:"Jardiance",c:T.jardiance},{k:"forxiga",n:"Forxiga",c:T.forxiga},{k:"invokana",n:"Invokana",c:T.invokana},{k:"cardiozan",n:"Cardiozan",c:T.cardiozan}]
    :[{k:"spravato",n:"Spravato",c:"#64748b"},{k:"venlafaxin",n:"Venlafaxin",c:"#94a3b8"},{k:"duloxetin",n:"Duloxetin",c:"#a1a1aa"},{k:"neurolix",n:"Neurolix",c:T.neurolix},{k:"andere",n:"Andere",c:"#d1d5db"}];

  return(<div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18}}>
      <KPI label="Neuverordnungen (NRx) kum." value={fmt(cumNrx)} sub={"Plan: "+fmt(cumNrxP)} trend={dlt(cumNrx,cumNrxP)}/>
      <KPI label="NRx letzter Monat" value={fmt(last?.nrx)} sub={"Plan: "+fmt(last?.nrxP)} trend={prev?dlt(last?.nrx,prev?.nrx):null}/>
      <KPI label="Unique Verordner (LRx)" value={fmt(last?.verordner)} sub={"Plan: "+fmt(last?.verordnerP)} trend={dlt(last?.verordner,last?.verordnerP)} alert={last&&last.verordner<last.verordnerP*0.85?"red":null}/>
      <KPI label="Repeat-Anteil (RRx/TRx)" value={rrxRatio+"%"} sub={isC?"Ziel >75% ab M8":"Ziel >60% ab M4"}/>
    </div>

    {!isC&&<Alert color={T.red}><strong style={{color:T.red}}>{"\u26a0"} Verordner-Gap:</strong> Nur {last?.verordner} von {last?.verordnerP} geplanten unique Verordnern erreicht ({pct(last?.verordner,last?.verordnerP)}). AMNOG-Ergebnis {"\u201e"}geringer Zusatznutzen{"\u201c"} reduziert Bereitschaft zur Erstverordnung. Persistenz mit {last?.persist}% unter Benchmark ({isC?"78":"70"}%).</Alert>}

    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:14}}>
      <Card title="Verordnungsdynamik: NRx vs. RRx" sub={name+": Neue Patienten vs. Wiederholungsverordnungen (monatlich)"} flex={2}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={nrxChart} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} label={{value:"Verordnungen",angle:-90,position:"insideLeft",fill:T.textMuted,fontSize:10,dx:-10}}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="NRx Plan" fill={pc+"15"} radius={[4,4,0,0]} name="NRx Plan"/>
            <Bar dataKey="NRx Ist" fill={pc} radius={[4,4,0,0]} name="NRx Ist (Neuverordnungen)"/>
            <Line type="monotone" dataKey="RRx Plan" stroke={T.green+"55"} strokeDasharray="6 3" strokeWidth={1.5} dot={false} name="RRx Plan"/>
            <Line type="monotone" dataKey="RRx Ist" stroke={T.green} strokeWidth={2.5} dot={{fill:T.green,r:4,stroke:"#fff",strokeWidth:2}} name="RRx Ist (Wiederholungen)"/>
          </ComposedChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:18,marginTop:8,flexWrap:"wrap"}}>
          {[{l:"NRx (Neuverordnung)",c:pc,d:"Erstrezept f\u00fcr Wirkstoff"},{l:"RRx (Repeat)",c:T.green,d:"Folgeverordnung bestehender Patient"}].map((leg,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:11}}>
              <span style={{width:10,height:3,background:leg.c,borderRadius:2,display:"inline-block"}}/>
              <span style={{fontWeight:600,color:T.text}}>{leg.l}</span>
              <span style={{color:T.textMuted}}>{leg.d}</span>
            </div>
          ))}
        </div>
        {isC?<Alert color={T.green}>Gesunde Launch-Dynamik: NRx stabil bei ~420/M, RRx-Aufbau {"\u00fc"}berlinear. Repeat-Anteil {rrxRatio}% zeigt wachsende Patientenbasis mit Therapietreue.</Alert>
        :<Alert color={T.yellow}>NRx-Zufluss schwankend (Peak Okt durch Launch-Push, Normalisierung ab Nov). RRx-Aufbau unter Erwartung {"\u2013"} Persistenz-Problem oder Dosisfindungsabbrecher pr{"\u00fc"}fen.</Alert>}
      </Card>

      <Card title="NRx/RRx-Mix Entwicklung" sub="Reifung der Patientenbasis" flex={1}>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={mixChart} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} unit="%" domain={[0,100]}/>
            <Tooltip content={<Tip/>}/>
            <Area type="monotone" dataKey="RRx %" stackId="1" fill={T.green+"33"} stroke={T.green} name="RRx-Anteil"/>
            <Area type="monotone" dataKey="NRx %" stackId="1" fill={pc+"33"} stroke={pc} name="NRx-Anteil"/>
          </AreaChart>
        </ResponsiveContainer>
        <div style={{marginTop:10,padding:10,background:T.surface2,borderRadius:6}}>
          <div style={{fontSize:11,fontWeight:600,color:T.text,marginBottom:4}}>Launch-Reife Indikator</div>
          <div style={{fontSize:11,color:T.textMuted,lineHeight:1.6}}>
            RRx {"\u2265"} 70% des TRx-Mix = Patientenbasis tr{"\u00e4"}gt sich selbst.{" "}
            {name}: RRx-Anteil {rrxRatio}% nach {uptake.length} Monaten.{" "}
            {parseInt(rrxRatio)>=70?<span style={{color:T.green,fontWeight:500}}>Selbsttragende Basis erreicht.</span>
            :parseInt(rrxRatio)>=50?<span style={{color:T.yellow,fontWeight:500}}>Aufbauphase {"\u2013"} Plan-konform.</span>
            :<span style={{color:T.red,fontWeight:500}}>Fr{"\u00fc"}hphase {"\u2013"} NRx-Akquise kritisch.</span>}
          </div>
        </div>
      </Card>
    </div>

    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:14}}>
      <Card title="Unique Verordner (anonymisiert)" sub="Monatliche Entwicklung (anonymisiert)" flex={1}>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={verordnerChart} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="Verordner Plan" fill={T.textDim+"25"} radius={[4,4,0,0]} name="Plan"/>
            <Bar dataKey="Verordner Ist" fill={pc} radius={[4,4,0,0]} name="Ist"/>
          </ComposedChart>
        </ResponsiveContainer>
        <div style={{fontSize:11,color:T.textMuted,marginTop:6}}>
          Hinweis: Verordnerdaten anonymisiert, absolute Zahlen hochgerechnet.
        </div>
      </Card>

      <Card title={"Persistenz (MPR \u226580%)"} sub={"Patienten mit ausreichender Therapietreue nach 3 Monaten"} flex={1}>
        {persistChart.length>0?<ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={persistChart} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} unit="%" domain={[50,100]}/>
            <Tooltip content={<Tip/>}/>
            <Line type="monotone" dataKey="benchmark" stroke={T.textDim} strokeDasharray="6 3" strokeWidth={1.5} dot={false} name="Benchmark"/>
            <Line type="monotone" dataKey={"MPR \u226580%"} stroke={pc} strokeWidth={2.5} dot={{fill:pc,r:4,stroke:"#fff",strokeWidth:2}} name={"MPR \u226580%"}/>
          </ComposedChart>
        </ResponsiveContainer>
        :<div style={{height:220,display:"flex",alignItems:"center",justifyContent:"center",color:T.textMuted,fontSize:13}}>Persistenzdaten verf{"\u00fc"}gbar ab Monat 3 nach Launch</div>}
        <div style={{fontSize:11,color:T.textMuted,marginTop:6}}>
          MPR (Medication Possession Ratio): Anteil der Patienten, die innerhalb von 90 Tagen nach Erstverordnung {"\u2265"}80% der erwarteten Folgeverordnungen einl{"\u00f6"}sen.
        </div>
      </Card>
    </div>

    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:14}}>
      <Card title={"Marktanteile "+(isC?"Herzinsuffizienz (SGLT2i)":"TRD-Segment")} sub="Wem nehmen wir Anteile ab?" flex={1}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={compData} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="m" tickFormatter={sM} tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} unit="%" domain={[0,isC?55:110]}/>
            <Tooltip content={<Tip/>}/>
            {compKeys.map((ck,i)=>(
              <Area key={i} type="monotone" dataKey={ck.k} stackId="1" fill={ck.c+"33"} stroke={ck.c} strokeWidth={ck.k===(isC?"cardiozan":"neurolix")?2:1} name={ck.n}/>
            ))}
          </AreaChart>
        </ResponsiveContainer>
        {isC?<Alert color={T.accent2}>Cardiozan-Wachstum geht prim{"\u00e4"}r zu Lasten von Forxiga ({"\u2013"}4,5pp) und Jardiance ({"\u2013"}3,3pp). Invokana verliert {"\u2013"}2,7pp {"\u2013"} {"\u00fc"}berproportional zum Ausgangsanteil.</Alert>
        :<Alert color={T.yellow}>Neurolix gewinnt prim{"\u00e4"}r aus dem Venlafaxin/Duloxetin-Pool (Generika-Switch). Spravato w{"\u00e4"}chst parallel {"\u2013"} komplement{"\u00e4"}re Segmente (oral vs. intranasal).</Alert>}
      </Card>

      <Card title={"TRx-Konzentration nach KV-Bezirk"} sub="Verteilung des Volumens nach KV-Bezirk" flex={1}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={conc} margin={{top:5,right:30,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="seg" tick={{fill:T.textMuted,fontSize:10}}/>
            <YAxis yAxisId="left" tick={{fill:T.textMuted,fontSize:11}} unit="%" domain={[0,45]} label={{value:"TRx-Anteil %",angle:-90,position:"insideLeft",fill:T.textMuted,fontSize:10,dx:-8}}/>
            <YAxis yAxisId="right" orientation="right" tick={{fill:T.textMuted,fontSize:11}} domain={[0,100]} unit="%" label={{value:"Kumuliert %",angle:90,position:"insideRight",fill:T.textMuted,fontSize:10,dx:8}}/>
            <Tooltip content={<Tip/>}/>
            <Bar yAxisId="left" dataKey="trxShare" name="TRx-Anteil %" radius={[4,4,0,0]}>
              {conc.map((d,i)=><Cell key={i} fill={i<1?pc:i<2?pc+"aa":pc+"55"}/>)}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="cumTrx" stroke={T.yellow} strokeWidth={2} dot={{fill:T.yellow,r:3}} name="Kumuliert %"/>
          </ComposedChart>
        </ResponsiveContainer>
        <Alert color={T.yellow}><strong style={{color:T.yellow}}>Konzentrationsrisiko:</strong> Top 5 KV-Bezirke = {conc.length>=2?conc[1].cumTrx:0}% des Volumens. Regionale Verteilung gem. {"\u00a7"}300 SGB V auf KV-Ebene aggregiert {"\u2013"} Einzel-Arzt-Attribution regulatorisch nicht zul{"\u00e4"}ssig.</Alert>
      </Card>
    </div>

    <Card title={"Methodik & Datengrenzen"} sub="Transparenz \u00fcber Messbarkeit der Uptake-Metriken im deutschen Markt">
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        {[
          {icon:"\u2705",title:"Direkt messbar (Verordnungsdaten)",items:["NRx/RRx (Neuverordnungen vs. Repeats)","Unique Verordner (anonymisiert, kumuliert)","Persistenz / MPR / PDC (Therapietreue)","Marktanteile nach KV-Bezirk","Therapiesequenz & Ko-Medikation"]},
          {icon:"\u26a0\ufe0f",title:"Bedingt messbar (CRM + Korrelation)",items:["AD-Kontaktrate \u2192 Verordnung (nur auf Gebietsebene)","Verordner-Profil (Fachgruppe, nicht individuell)","Share of Voice vs. Marktanteil (Korrelation)","Ziel\u00e4rzte-Universum (nur CRM, nicht verifiziert)"]},
          {icon:"\u274c",title:"Nicht direkt messbar in DE",items:["Arzt-individuelles Rx-Tracking (regulat. verboten)","Named-Prescriber Marktanteil (\u2260 USA)","Patient-Arzt-Zuordnung (anonymisiert)","Diagnose-zu-Rx Verkn\u00fcpfung (keine ICD in Rx-Daten)"]},
        ].map((col,i)=>(
          <div key={i} style={{flex:1,minWidth:200,background:T.surface2,borderRadius:6,padding:14}}>
            <div style={{fontSize:13,fontWeight:600,color:T.text,marginBottom:8}}>{col.icon} {col.title}</div>
            {col.items.map((item,j)=>(
              <div key={j} style={{fontSize:11.5,color:T.textMuted,lineHeight:1.7,paddingLeft:4}}>{"\u2022"} {item}</div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  </div>);
}

// ============ REGIONAL ============

function RegionalPage(){
  const data=REGIONS_CARD.map(r=>({...r,ach:r.trxP>0?((r.trx/r.trxP)*100).toFixed(0):0})).sort((a,b)=>b.trx-a.trx);
  const tot=data.reduce((s,d)=>s+d.trx,0);
  let cum=0;
  const pareto=data.map(d=>{cum+=d.trx;return{...d,cumPct:parseFloat(((cum/tot)*100).toFixed(1))};});
  const scatter=data.map(d=>({name:d.r,x:d.visits,y:parseFloat(d.ms),trx:d.trx}));
  return(<div>
    <Card title="Regionale Performance – Cardiozan (Dez 2025)" sub="Wo müssen wir den Außendienst umsteuern?" style={{marginBottom:14}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{borderBottom:"2px solid "+T.border}}>
            {["Region","TRx Ist","TRx Plan","Erreichung","Net Rev.","Arzte","AD Besuche","MS%"].map(h=><TH key={h}>{h}</TH>)}
          </tr></thead>
          <tbody>{data.map((d,i)=>{const a=parseFloat(d.ach);return(
            <tr key={i} style={{borderBottom:"1px solid "+T.border,background:i%2===0?T.surface:T.surface2}}>
              <TD bold>{d.r}</TD><TD m>{d.trx}</TD><TD m color={T.textMuted}>{d.trxP}</TD>
              <TD m color={a>=100?T.green:a>=80?T.yellow:T.red} bold>{d.ach}%</TD>
              <TD m>{fmtE(d.net)}</TD><TD m>{d.docs}</TD><TD m>{d.visits}</TD>
              <TD m color={T.accent2} bold>{d.ms}%</TD>
            </tr>);})}</tbody>
        </table>
      </div>
      <Alert color={T.yellow}><strong style={{color:T.yellow}}>Konzentrationsrisiko:</strong> Bayern + Nordrhein + Berlin = 52,5% Volumen bei nur 30% der GKV-Versicherten. Sachsen und SH unter 50% Zielerreichung; Niedersachsen und Westfalen-Lippe unter 75%.</Alert>
    </Card>
    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
      <Card title="TRx-Pareto nach Region" sub="Kumulierte Verteilung" flex={1}>
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={pareto} margin={{top:5,right:30,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="r" tick={{fill:T.textMuted,fontSize:9.5}} angle={-20} textAnchor="end" height={55}/>
            <YAxis yAxisId="left" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis yAxisId="right" orientation="right" tick={{fill:T.textMuted,fontSize:11}} domain={[0,100]} unit="%"/>
            <Tooltip content={<Tip/>}/>
            <Bar yAxisId="left" dataKey="trx" name="TRx" radius={[4,4,0,0]}>
              {pareto.map((d,i)=><Cell key={i} fill={parseFloat(d.ach)>=100?T.green:parseFloat(d.ach)>=80?T.cardiozan:T.red+"aa"}/>)}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="cumPct" stroke={T.yellow} strokeWidth={2} dot={{fill:T.yellow,r:3}} name="Kumuliert %"/>
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
      <Card title="AD-Kontakte vs. Marktanteil" sub="Zusammenhang Besuchsfrequenz und MS" flex={1}>
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart margin={{top:10,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis type="number" dataKey="x" name="Besuche" tick={{fill:T.textMuted,fontSize:11}} label={{value:"AD Besuche/Monat",position:"bottom",fill:T.textMuted,fontSize:10,offset:-2}}/>
            <YAxis type="number" dataKey="y" name="MS%" tick={{fill:T.textMuted,fontSize:11}} label={{value:"MS%",angle:-90,position:"insideLeft",fill:T.textMuted,fontSize:10}}/>
            <Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const d=payload[0]?.payload;return(<div style={{background:T.surface,border:"1px solid "+T.border,borderRadius:6,padding:"8px 12px",fontSize:12,boxShadow:"0 4px 12px rgba(0,0,0,.1)"}}><div style={{fontWeight:600}}>{d?.name}</div><div style={{color:T.textMuted}}>Besuche: {d?.x} · MS: {d?.y}% · TRx: {d?.trx}</div></div>);}}/>
            <Scatter data={scatter} fill={T.cardiozan}>{scatter.map((d,i)=><Cell key={i} fill={T.cardiozan} r={Math.max(5,d.trx/35)}/>)}</Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div style={{fontSize:11,color:T.textMuted,marginTop:6}}>Berlin: hoher MS (20,7%) bei nur 4 Besuchen {"→"} KOL-Effekt (Charité). SH/HH: viele Besuche, niedriger MS {"→"} Zugangsbarriere?</div>
      </Card>
    </div>
  </div>);
}

// ============ FINANCIAL DEEP DIVE (product-aware) ============

function FinancialPage({product}){
  const isC=product==="CARD01";
  const data=MONTHLY.filter(d=>d.p===product);
  const last=data[data.length-1];
  const pc=isC?T.cardiozan:T.neurolix;
  const name=isC?"Cardiozan":"Neurolix";

  const wf=isC?[
    {name:"Listenpreis",val:89.50},{name:"§130a (7%)",val:83.24},
    {name:"§130 Apotheke",val:81.47},{name:"Erstattungsbetrag",val:78.40},
    {name:"Netto/Pack",val:71.14},
  ]:[
    {name:"Listenpreis",val:245.00},{name:"§130a (7%)",val:227.85},
    {name:"§130 Apotheke",val:226.08},{name:"AMNOG-Abschlag",val:168.00},
    {name:"Netto/Pack",val:154.47},
  ];

  const planNpt=last?(last.netP/last.trxP):71.14;
  const actNpt=last?(last.net/last.trx):71.14;
  const bridge=isC?[
    {name:"Net Rev. Plan",val:last?.netP||0},
    {name:"Volumen-Effekt",val:-Math.round((last?.trxP-last?.trx)*planNpt)},
    {name:"Preis/Mix",val:Math.round((actNpt-planNpt)*last?.trx)},
    {name:"Net Rev. Ist",val:last?.net||0},
  ]:[
    {name:"Net Rev. Plan",val:last?.netP||0},
    {name:"TRx-Delta",val:-Math.round((last?.trxP-last?.trx)*202.83)},
    {name:"Preis-Gap (AMNOG)",val:-Math.round((202.83-154.47)*last?.trx)},
    {name:"Net Rev. Ist",val:last?.net||0},
  ];

  const gtn=data.map(d=>({name:sM(d.m),Netto:d.net,"Rabatte":d.gross-d.net}));
  const margin=data.map(d=>({name:sM(d.m),"Ist %":parseFloat(((d.net/d.gross)*100).toFixed(1)),"Plan %":parseFloat(((d.netP/d.grossP)*100).toFixed(1))}));

  const sc=isC?[
    {s:"Base",peak:"3.200/M",be:"Monat 14",npv:"€1,12M"},
    {s:"Upside",peak:"3.840/M",be:"Monat 11",npv:"€1,38M"},
    {s:"Downside",peak:"2.500/M",be:"Monat 18",npv:"€0,87M"},
  ]:[
    {s:"Original Base",peak:"1.100/M",be:"Monat 16",npv:"€2,22M"},
    {s:"Revised Base (post-AMNOG)",peak:"1.100/M",be:"Monat 21",npv:"€1,69M",hl:true},
    {s:"Revised Downside",peak:"900/M",be:"Monat 24+",npv:"€1,28M",hl:true},
  ];

  return(<div>
    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:14}}>
      <Card title={name+": Preis-Wasserfall je Packung"} sub={isC?"Listenpreis → Netto nach gesetzl. Abschlägen":"Listenpreis → Netto nach AMNOG"} flex={1}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={wf} margin={{top:5,right:10,left:10,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:10}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} domain={[0,isC?100:280]} tickFormatter={v=>"€"+v}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="val" name="€/Packung" radius={[4,4,0,0]}>
              {wf.map((d,i)=><Cell key={i} fill={i===0?T.textDim+"66":i===wf.length-1?pc:i===wf.length-2?pc+"88":T.red+"66"}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {isC?<Alert color={T.green}>Brutto-Netto-Spread €18,36/Pack (20,5%). Erstattungsbetrag-Verhandlung läuft {"–"} aktuell freie Preisbildung.</Alert>
        :<Alert color={T.red}><strong style={{color:T.red}}>{"⚠"}</strong> AMNOG-Abschlag €77/Pack (31,4%) statt erwartet €25 (10,2%). Net Rev/TRx 23,8% unter Plan.</Alert>}
      </Card>
      <Card title={name+": Revenue-Bridge ("+sM(last?.m||"2025-12")+")"} sub="Dekomposition Plan → Ist" flex={1}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={bridge} margin={{top:5,right:10,left:10,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:10}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} tickFormatter={v=>fmtE(Math.abs(v))}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="val" name="€" radius={[4,4,0,0]}>
              {bridge.map((d,i)=><Cell key={i} fill={i===0?T.textDim+"55":i===bridge.length-1?pc:d.val<0?T.red+"88":T.green+"88"}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {isC?<div style={{fontSize:12,color:T.textMuted,marginTop:6}}>TRx-Rückstand (-{last?.trxP-last?.trx} TRx) treibt Volumen-Effekt. Preis/Mix-Effekt marginal {"→"} Preisstruktur stabil.</div>
        :<div style={{fontSize:12,color:T.textMuted,marginTop:6}}>Preis-Effekt dominiert Volumen-Effekt {"→"} Preis ist Haupttreiber des Revenue-Gaps.</div>}
      </Card>
    </div>
    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:14}}>
      <Card title="Brutto → Netto Entwicklung" sub="Monatlicher Gross-to-Net Spread" flex={1}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={gtn} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} tickFormatter={v=>fmtE(v)}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="Netto" stackId="a" fill={pc} name="Net Revenue"/>
            <Bar dataKey="Rabatte" stackId="a" fill={T.red+"44"} radius={[4,4,0,0]} name="Rabatte & Abschläge"/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Net-to-Gross Ratio" sub="Netto als % vom Brutto" flex={1}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={margin} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} domain={isC?[77,82]:[55,90]} unit="%"/>
            <Tooltip content={<Tip/>}/>
            <Line type="monotone" dataKey="Ist %" stroke={pc} strokeWidth={2} dot={{fill:pc,r:3,stroke:"#fff",strokeWidth:2}} name="Ist %"/>
            <Line type="monotone" dataKey="Plan %" stroke={T.textDim} strokeDasharray="6 3" strokeWidth={1.5} dot={false} name="Plan %"/>
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card title="Szenario-Vergleich" sub={name+" – Key Financial Metrics"}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{borderBottom:"2px solid "+T.border}}>
          {["Szenario","Peak TRx","Break-Even","NPV (12M)"].map(h=><TH key={h}>{h}</TH>)}
        </tr></thead>
        <tbody>{sc.map((s,i)=>(
          <tr key={i} style={{borderBottom:"1px solid "+T.border,background:s.hl?T.red+"06":i%2===0?T.surface:T.surface2}}>
            <TD bold><span style={{color:pc}}>{"●"}</span> {s.s}</TD>
            <TD m>{s.peak}</TD><TD m color={s.be.includes("24+")?T.red:T.text}>{s.be}</TD><TD m bold>{s.npv}</TD>
          </tr>))}</tbody>
      </table>
    </Card>
  </div>);
}

// ============ COMPETITIVE ============

function CompetitivePage({product}){
  const isC=product==="CARD01";
  const evts=COMP_EVENTS.filter(e=>isC?e.area==="Kardio":e.area==="ZNS");
  const pc=isC?T.cardiozan:T.neurolix;

  return(<div>
    {isC&&<div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:14}}>
      <Card title="SGLT2-Marktanteile Herzinsuffizienz" sub="Cardiozan vs. etablierte Wettbewerber" flex={2}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={COMPETITORS_CARD} margin={{top:5,right:10,left:0,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.grid}/>
            <XAxis dataKey="m" tickFormatter={sM} tick={{fill:T.textMuted,fontSize:11}}/>
            <YAxis tick={{fill:T.textMuted,fontSize:11}} unit="%" domain={[0,55]}/>
            <Tooltip content={<Tip/>}/>
            <Area type="monotone" dataKey="jardiance" fill={T.jardiance+"22"} stroke={T.jardiance} name="Jardiance"/>
            <Area type="monotone" dataKey="forxiga" fill={T.forxiga+"22"} stroke={T.forxiga} name="Forxiga"/>
            <Area type="monotone" dataKey="invokana" fill={T.invokana+"22"} stroke={T.invokana} name="Invokana"/>
            <Area type="monotone" dataKey="cardiozan" fill={T.cardiozan+"33"} stroke={T.cardiozan} strokeWidth={2} name="Cardiozan"/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Head-to-Head" sub="SGLT2-Inhibitoren in HFrEF" flex={1}>
        {[{n:"Cardiozan",p:"€2,37",a:"Beträchtl. ZN",rv:"—",c:T.cardiozan},
          {n:"Forxiga",p:"€2,18",a:"Beträchtl. ZN",rv:"AOK ✓",c:T.forxiga},
          {n:"Jardiance",p:"€2,25",a:"Beträchtl. ZN",rv:"—",c:T.jardiance},
          {n:"Invokana",p:"€2,05",a:"Gering. ZN",rv:"—",c:T.invokana},
        ].map((comp,i)=>(<div key={i} style={{padding:"9px 0",borderBottom:"1px solid "+T.border,display:"flex",gap:10,alignItems:"center"}}>
          <span style={{width:9,height:9,borderRadius:"50%",background:comp.c,flexShrink:0}}/>
          <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:T.text}}>{comp.n}</div>
          <div style={{color:T.textMuted,fontSize:11.5,marginTop:1}}>DDD: {comp.p} · {comp.a} · RV: {comp.rv}</div></div>
        </div>))}
        <Alert color={T.yellow}>Cardiozan: DDD-Preis €2,37 (leichtes Premium vs. Ø€2,16). Marktzugang über Rabattvertrag entscheidend für Formularlisten-Position.</Alert>
      </Card>
    </div>}

    {!isC&&<Card title="ZNS-Wettbewerbsumfeld" sub="Neurolix im Kontext therapieresistenter Depression" style={{marginBottom:14}}>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        {[{n:"Neurolix (Brivanexin)",p:"€8,75",a:"Geringer ZN ⚠",s:"TRD oral",c:T.neurolix},
          {n:"Spravato (Esketamin)",p:"€28,50",a:"Beträchtl. ZN",s:"TRD intranasal",c:"#64748b"},
          {n:"Venlafaxin retard",p:"€0,45",a:"Generikum",s:"MDD/TRD oral",c:"#94a3b8"},
          {n:"Duloxetin",p:"€0,85",a:"Generikum",s:"MDD/TRD oral",c:"#a1a1aa"},
        ].map((comp,i)=>(<div key={i} style={{flex:1,minWidth:170,background:T.surface2,borderRadius:6,padding:12}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:comp.c}}/>
            <span style={{fontWeight:600,fontSize:13,color:T.text}}>{comp.n}</span>
          </div>
          <div style={{fontSize:11.5,color:T.textMuted,lineHeight:1.6}}>DDD: {comp.p}<br/>AMNOG: {comp.a}<br/>Segment: {comp.s}</div>
        </div>))}
      </div>
      <Alert color={T.red}>Spravato: beträchtlicher ZN in neuer Indikation. Neurolix-Differenzierung über orale Gabe und niedrigere DDD-Kosten (€8,75 vs. €28,50).</Alert>
    </Card>}

    <Card title="Wettbewerber-Events" sub={(isC?"Kardiologie":"ZNS")+" – Regulatorische & kommerzielle Aktivitäten"}>
      {evts.map((e,i)=>(<div key={i} style={{display:"flex",gap:14,padding:"10px 0",borderBottom:"1px solid "+T.border,alignItems:"flex-start"}}>
        <div style={{width:65,flexShrink:0,fontSize:11,color:T.textMuted,fontFamily:mono,paddingTop:2}}>{e.date}</div>
        <div style={{width:10,height:10,borderRadius:"50%",flexShrink:0,marginTop:4,background:pc}}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:T.surface2,color:T.textMuted,textTransform:"uppercase",letterSpacing:.5,fontFamily:mono}}>{e.type}</span>
            <span style={{fontSize:13,fontWeight:500,color:T.text}}>{e.who}</span>
          </div>
          <div style={{fontSize:12,color:T.textMuted,marginTop:3}}>{e.desc}</div>
        </div>
      </div>))}
    </Card>
  </div>);
}

// ============ WHAT-IF ============

function WhatIfPage({product}){
  const isC=product==="CARD01";
  const pc=isC?T.cardiozan:T.neurolix;
  const [pen,setPen]=useState(isC?15:10);
  const [price,setPrice]=useState(isC?71:154);
  const [comp,setComp]=useState(isC?75:70);
  const [mkt,setMkt]=useState(isC?15000:5000);

  const annTrx=Math.round(mkt*(pen/100)*12);
  const annRev=annTrx*price;
  const compTrx=Math.round(annTrx*(comp/100));
  const effRev=compTrx*price;

  const sens=[
    {p:"Marktpenetration +5pp",i:Math.round(mkt*0.05*12*price)},
    {p:"Net Price +€"+(isC?"10":"20"),i:annTrx*(isC?10:20)},
    {p:"Compliance +10pp",i:Math.round(annTrx*0.10*price)},
    {p:"Marktgröße +"+(isC?"2000":"1000")+" TRx",i:Math.round((isC?2000:1000)*(pen/100)*12*price)},
  ].sort((a,b)=>b.i-a.i);
  const maxI=Math.max(...sens.map(s=>s.i));

  const SliderRow=({label,value,onChange,min,max,step,unit})=>(
    <div style={{marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:13,color:T.text}}>{label}</span>
        <span style={{fontSize:14,fontWeight:700,color:pc,fontFamily:mono}}>{unit==="€"?"€":""}{value.toLocaleString("de-DE")}{unit==="%"?"%":""}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} style={{width:"100%",accentColor:pc,height:5,cursor:"pointer"}}/>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:T.textDim}}>
        <span>{unit==="€"?"€":""}{min.toLocaleString("de-DE")}{unit==="%"?"%":""}</span>
        <span>{unit==="€"?"€":""}{max.toLocaleString("de-DE")}{unit==="%"?"%":""}</span>
      </div>
    </div>
  );

  return(<div>
    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
      <Card title="Parameter" sub={(isC?"Cardiozan":"Neurolix")+" – Szenario-Simulation"} flex={1}>
        <SliderRow label="Marktpenetration" value={pen} onChange={e=>setPen(Number(e.target.value))} min={3} max={30} step={1} unit="%"/>
        <SliderRow label="Net Price / TRx" value={price} onChange={e=>setPrice(Number(e.target.value))} min={isC?40:80} max={isC?120:220} step={1} unit="€"/>
        <SliderRow label="Compliance-Rate" value={comp} onChange={e=>setComp(Number(e.target.value))} min={50} max={95} step={1} unit="%"/>
        <SliderRow label="Marktgröße (TRx/M)" value={mkt} onChange={e=>setMkt(Number(e.target.value))} min={isC?8000:2000} max={isC?25000:10000} step={1000} unit=""/>
      </Card>
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <KPI label="Jahres-TRx (brutto)" value={fmt(annTrx)} sub={mkt.toLocaleString("de-DE")+" × "+pen+"% × 12"}/>
          <KPI label="Jahres-Revenue (brutto)" value={fmtE(annRev)} sub={fmt(annTrx)+" × €"+price}/>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <KPI label="Compliance-adj. TRx" value={fmt(compTrx)} sub={comp+"% Compliance"}/>
          <KPI label="Eff. Net Revenue p.a." value={fmtE(effRev)} sub="nach Compliance-Abzug"/>
        </div>
        <Card title="Sensitivitätsanalyse" sub="Welcher Parameter hat den größten Hebel?">
          {sens.map((s,i)=>(<div key={i} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
              <span style={{color:T.text}}>{s.p}</span>
              <span style={{color:T.green,fontWeight:600,fontFamily:mono}}>+{fmtE(s.i)}</span>
            </div>
            <div style={{width:"100%",height:7,background:T.surface2,borderRadius:4}}>
              <div style={{width:(s.i/maxI*100)+"%",height:"100%",background:"linear-gradient(90deg,"+pc+"88,"+T.green+")",borderRadius:4,transition:"width .3s"}}/>
            </div>
          </div>))}
        </Card>
      </div>
    </div>
  </div>);
}

// ============ STORY ============

function StoryPage({product}){
  const isC=product==="CARD01";
  const pc=isC?T.cardiozan:T.neurolix;
  const name=isC?"Cardiozan":"Neurolix";

  const Section=({title,children})=>(
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{width:4,height:22,borderRadius:2,background:pc}}/>
        <h3 style={{fontSize:15,fontWeight:700,color:T.text,margin:0,fontFamily:sans}}>{title}</h3>
      </div>
      <div style={{fontSize:13.5,color:T.text,lineHeight:1.85,paddingLeft:14}}>{children}</div>
    </div>
  );

  const Tag=({color,children})=>(
    <span style={{display:"inline-block",fontSize:10.5,fontWeight:600,padding:"2px 8px",borderRadius:4,background:color+"15",color:color,fontFamily:mono,marginRight:6}}>{children}</span>
  );

  const Fact=({label,value,color})=>(
    <div style={{display:"inline-flex",alignItems:"baseline",gap:5,marginRight:18,marginBottom:4}}>
      <span style={{fontSize:11,color:T.textMuted}}>{label}:</span>
      <span style={{fontSize:13,fontWeight:700,color:color||T.text,fontFamily:mono}}>{value}</span>
    </div>
  );

  return(<div>
    <Card title={name+" – Launch-Szenario"} sub="Fiktives Produkt · Alle Daten simuliert · Reale Marktmechanismen" style={{marginBottom:16}}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",padding:"8px 0 12px",borderBottom:"1px solid "+T.border,marginBottom:16}}>
        <Tag color={pc}>{isC?"Kardiologie · SGLT2i":"ZNS · Antidepressivum"}</Tag>
        <Tag color={isC?T.green:T.red}>{isC?"Beträchtlicher Zusatznutzen":"Geringer Zusatznutzen"}</Tag>
        <Tag color={T.textMuted}>{isC?"Launch: Mai 2025":"Launch: September 2025"}</Tag>
        <Tag color={isC?T.green:T.yellow}>{isC?"On Track":"Revenue unter Plan"}</Tag>
      </div>

      {isC ? (<>
        <Section title="Produkt & Indikation">
          <strong>Cardiozan</strong> ist ein fiktiver SGLT2-Inhibitor (Sodium-Glucose Co-Transporter 2) zur Behandlung der <strong>Herzinsuffizienz mit reduzierter Ejektionsfraktion (HFrEF)</strong>. Das Produkt tritt in einen etablierten, hochkompetitiven Markt ein, der von Jardiance (Boehringer Ingelheim / Empagliflozin) und Forxiga (AstraZeneca / Dapagliflozin) dominiert wird. Invokana (Janssen / Canagliflozin) spielt eine Nebenrolle.
          <br/><br/>
          Die SGLT2i-Klasse ist seit dem ESC-Update November 2025 als First-Line-Therapie bei HFrEF best{"ä"}tigt. Der Gesamtmarkt w{"ä"}chst, was einem Late Entrant wie Cardiozan eine zus{"ä"}tzliche Nachfragequelle neben der reinen Verdr{"ä"}ngung bietet.
        </Section>

        <Section title="Regulatorischer Verlauf">
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            <Fact label="EMA-Zulassung" value="20.03.2025" color={T.green}/>
            <Fact label="G-BA Nutzenbewertung" value="28.09.2025" color={T.green}/>
            <Fact label="Ergebnis" value={"Beträchtlicher Zusatznutzen"} color={T.green}/>
          </div>
          {"Das G-BA-Ergebnis „beträchtlicher Zusatznutzen“ ist das bestmögliche realistische Szenario für einen SGLT2i-Markteintritt. Es ermöglicht eine stabile Preispositionierung während der laufenden "}
          <strong>Erstattungsbetrag-Verhandlung</strong>{" (geplant: März 2026). Aktuell gilt freie Preisbildung gem. AMNOG-Regelung."}
          <br/><br/>
          {"Nächste kritische Meilensteine: Erstattungsbetrag-Verhandlung und angestrebter "}
          <strong>AOK-Verbund-Rabattvertrag</strong>{" (geplant: Juni 2026). Eine Aufnahme in die DGK-Leitlinien wurde eingereicht."}
        </Section>

        <Section title={"Kommerzieller Verlauf (Mai 2025 – Dezember 2025)"}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            <Fact label="TRx kumuliert" value="8.235" color={T.text}/>
            <Fact label="Plan" value="8.421"/>
            <Fact label="Zielerreichung" value="97,8%" color={T.green}/>
            <Fact label="Net Revenue kum." value={"€586k"} color={T.text}/>
          </div>
          {"Cardiozan zeigt eine "}<strong>modellhafte Launch-Kurve</strong>{": leichter Dip in Monat 2 (typisches Post-Launch-Tal nach dem initialen Sampling-Push), dann kontinuierlicher Aufbau. Der Actual-TRx-Verlauf bewegt sich stabil innerhalb des Forecast-Korridors, leicht unter Base Case aber klar über Downside."}
          <br/><br/>
          {"Die Marktanteilsgewinne gehen primär zu Lasten von Forxiga (–4,5pp) und Jardiance (–3,3pp). Invokana verliert –2,7pp – überproportional zu ihrem Ausgangsanteil, konsistent mit deren schwächerem Zusatznutzen-Rating."}
        </Section>

        <Section title="Preisstruktur">
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            <Fact label="Listenpreis" value={"€89,50/Pack"}/>
            <Fact label="Netto/Pack" value={"€71,14"}/>
            <Fact label="Spread" value="20,5%"/>
            <Fact label="DDD-Preis" value={"€2,37"}/>
          </div>
          {"Der Brutto-Netto-Spread von 20,5% reflektiert die gesetzlichen Abschläge (§130a mit 7%, §130 Apothekenabschlag) ohne zusätzliche Rabattverträge. Der DDD-Preis von €2,37 liegt leicht über dem Wettbewerb (Forxiga: €2,18, Jardiance: €2,25) – ein moderates Premium, das durch den beträchtlichen Zusatznutzen gerechtfertigt ist. Entscheidend für die langfristige Marktposition ist weniger der Preisabstand als der Marktzugang über Rabattverträge und Formularlisten."}
        </Section>

        <Section title="Regionale Dynamik">
          {"Bayern und Nordrhein treiben über 44% des Volumens bei nur ca. 30% der GKV-Versicherten. Berlin zeigt einen auffälligen KOL-Effekt: 20,7% regionaler SGLT2i-Marktanteil bei nur 4 AD-Besuchen/Monat und 3 Verordnern (Charité-Netzwerk). Dagegen Schleswig-Holstein und Hamburg: hohe Besuchsfrequenz, niedriger Marktanteil – mögliche Zugangsbarrieren oder falsche Zielgruppenauswahl."}
        </Section>

        <Section title="Strategische Einordnung">
          {"Cardiozan repräsentiert den "}<strong>{"„Best Case“-Launch"}</strong>{" im Portfolio: regulatorischer Rückenwind, stabiles Volumenwachstum, beherrschbare Preisproblematik. Die Hauptaufgabe des Portfolio Managers ist hier "}<strong>Skalierung</strong>{" – den Erfolg in die Breite tragen (unterperformende Regionen), den Rabattvertrag vorbereiten und die Leitlinien-Aufnahme als nächsten Wachstumstreiber nutzen."}
        </Section>
      </>) : (<>
        <Section title="Produkt & Indikation">
          <strong>Neurolix</strong>{" (Wirkstoff: Brivanexin) ist ein fiktives "}<strong>orales Antidepressivum f{"ü"}r therapieresistente Depression (TRD)</strong>{". TRD betrifft ca. 30% der MDD-Patienten und ist ein Segment mit hohem unmet medical need. Der Markt wird dominiert von Generika (Venlafaxin retard, Duloxetin) als Basistherapie und Spravato (Janssen / Esketamin, intranasal) als einzigem patentgeschützten Innovator."}
          <br/><br/>
          {"Neurolix positioniert sich als "}<strong>orale Alternative zu Spravato</strong>{" – niedrigere DDD-Kosten (€8,75 vs. €28,50), keine Applikation in Praxis erforderlich, breitere Einsetzbarkeit im ambulanten Setting."}
        </Section>

        <Section title={"Regulatorischer Verlauf – der Wendepunkt"}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            <Fact label="EMA-Zulassung" value="10.07.2025" color={T.green}/>
            <Fact label="G-BA Nutzenbewertung" value="20.01.2026" color={T.red}/>
            <Fact label="Ergebnis" value="Geringer Zusatznutzen" color={T.red}/>
            <Fact label="Erwartet" value={"Beträchtlich"} color={T.yellow}/>
          </div>
          {"Das G-BA-Ergebnis ist der "}<strong>zentrale Bruch im Launch-Szenario</strong>{". Erwartet wurde „beträchtlicher Zusatznutzen“ (analog zu Spravato in dessen Erstbewertung), tatsächlich vergab der G-BA nur „geringen Zusatznutzen“. Die Konsequenz ist ein wesentlich niedrigerer AMNOG-Erstattungsbetrag:"}
          <br/><br/>
          <div style={{background:T.red+"08",border:"1px solid "+T.red+"25",borderRadius:6,padding:"10px 14px",margin:"6px 0"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              <Fact label="Erwarteter Erstattungsbetrag" value={"€220/Pack"} color={T.textMuted}/>
              <Fact label={"Tatsächlicher Erstattungsbetrag"} value={"€168/Pack"} color={T.red}/>
              <Fact label="Net/Pack" value={"€154,47"} color={T.red}/>
              <Fact label="Delta je TRx" value={"−23,8%"} color={T.red}/>
            </div>
          </div>
          <br/>
          {"Dies illustriert die "}<strong>{"binäre Natur des AMNOG-Systems"}</strong>{": Die G-BA-Bewertung ist kein Spektrum, sondern ein Stufensprung. Der Unterschied zwischen „beträchtlich“ und „gering“ betrifft nicht nur den Preis, sondern auch die Signalwirkung an Verordner („lohnt sich der Wechsel von Generika?“)."}
        </Section>

        <Section title={"Kommerzieller Verlauf (Sep 2025 – Dez 2025)"}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            <Fact label="TRx kumuliert" value="1.163" color={T.text}/>
            <Fact label="Plan" value="1.299"/>
            <Fact label="Vol.-Erreichung" value="89,5%" color={T.yellow}/>
            <Fact label="Net Revenue kum." value={"€180k"} color={T.text}/>
            <Fact label="Rev. Plan" value={"€263k"}/>
            <Fact label="Rev.-Erreichung" value="68,3%" color={T.red}/>
          </div>
          {"Die Volumenseite (89,5%) ist moderat unter Plan – vertretbar für einen Specialty-Launch im ZNS-Segment. Das eigentliche Problem ist die "}<strong>massive Revenue-Abweichung</strong>{": nur 68,3% des Plans, obwohl das Volumen bei fast 90% liegt. Der Preis-Effekt dominiert den Volumen-Effekt – das AMNOG-Ergebnis hat den Revenue pro TRx strukturell um knapp ein Viertel gesenkt."}
          <br/><br/>
          {"Gleichzeitig verschlechtert sich die Wettbewerbsposition: Spravato erhielt im Dezember 2025 einen "}<strong>{"beträchtlichen Zusatznutzen"}</strong>{" in einer neuen Indikation (akute Suizidalität bei MDD). Neurolix’ Differenzierung über orale Gabe und niedrigere DDD-Kosten bleibt intakt, aber die Kosten-Nutzen-Argumentation gegenüber einem Wettbewerber mit höherem Evidenzlevel wird schwieriger."}
        </Section>

        <Section title="Preisstruktur & Revenue Bridge">
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            <Fact label="Listenpreis" value={"€245/Pack"}/>
            <Fact label="AMNOG-Abschlag" value={"€77 (31,4%)"} color={T.red}/>
            <Fact label="Netto/Pack" value={"€154,47"}/>
            <Fact label="Erwartet" value={"€202,83"}/>
          </div>
          {"Der AMNOG-Abschlag von €77/Pack (31,4%) statt erwartet €25/Pack (10,2%) ist der Haupttreiber des Revenue-Gaps. In der Revenue Bridge für Dezember 2025 dominiert der "}<strong>Preis-Effekt den Volumen-Effekt</strong>{" mit Faktor ~2:1. Das verändert die gesamte Unit Economics des Launches."}
        </Section>

        <Section title="Forecast-Revision & Szenarien">
          {"Das G-BA-Ergebnis erzwingt eine "}<strong>{"vollständige Forecast-Revision"}</strong>{":"}
          <div style={{background:T.surface2,borderRadius:6,padding:"10px 14px",margin:"8px 0"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              <Fact label="Orig. Break-Even" value="Monat 16"/>
              <Fact label="Revised Break-Even" value="Monat 21" color={T.red}/>
              <Fact label="Orig. NPV (12M)" value={"€2,22M"}/>
              <Fact label="Revised NPV (12M)" value={"€1,69M"} color={T.red}/>
              <Fact label="NPV-Delta" value={"−24%"} color={T.red}/>
            </div>
          </div>
        </Section>

        <Section title="Strategische Einordnung">
          {"Neurolix repräsentiert den "}<strong>{"„AMNOG-Schock“-Launch"}</strong>{" im Portfolio – den Moment, in dem ein einziges regulatorisches Event die gesamte kommerzielle Kalkulation kippt. Die Aufgabe des Portfolio Managers ist hier fundamental anders als bei Cardiozan: nicht Skalierung, sondern "}<strong>Schadensbegrenzung und Pivot</strong>.
          <br/><br/>
          {"Konkret: RWE-Studie (Real World Evidence) zur Unterstützung einer Neubewertung, Medical Affairs Advisory Board zur Verordner-Sicherung, Prüfung ob Persistenz-Programme den Revenue pro Patient kompensieren können. Der Rabattvertrag (vdek, geplant September 2026) muss völlig neu kalkuliert werden."}
        </Section>
      </>)}
    </Card>

    <Card title="Warum dieses Dual-Szenario?" sub="Design-Rationale des Work Samples">
      <div style={{fontSize:13.5,color:T.text,lineHeight:1.85,padding:"4px 0"}}>
        {"Ein Strategic Portfolio Manager bei Viatris muss "}<strong>beide Situationen gleichzeitig</strong>{" managen können: den Gewinner skalieren und den Problemfall retten. Dieses Dashboard bildet deshalb bewusst zwei kontrastierende Launch-Szenarien ab:"}
        <div style={{display:"flex",gap:14,marginTop:14,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:250,background:T.cardiozan+"08",border:"1px solid "+T.cardiozan+"22",borderRadius:8,padding:14}}>
            <div style={{fontWeight:700,color:T.cardiozan,marginBottom:6}}>Cardiozan = Skalierungsaufgabe</div>
            <div style={{fontSize:12.5,color:T.textMuted,lineHeight:1.7}}>
              {"Regulatorischer Rückenwind nutzen, unterperformende Regionen aktivieren, Rabattvertrag vorbereiten, Leitlinien-Aufnahme als Wachstumshebel. Typische Fragen: „Wie holen wir Sachsen und SH auf Bayern-Niveau?“"}
            </div>
          </div>
          <div style={{flex:1,minWidth:250,background:T.neurolix+"08",border:"1px solid "+T.neurolix+"22",borderRadius:8,padding:14}}>
            <div style={{fontWeight:700,color:T.neurolix,marginBottom:6}}>Neurolix = Krisenmanagement</div>
            <div style={{fontSize:12.5,color:T.textMuted,lineHeight:1.7}}>
              {"AMNOG-Schock absorbieren, Forecast revidieren, RWE-Strategie für Neubewertung, Verordner trotz schlechtem G-BA-Signal halten. Typische Fragen: „Erreichen wir Break-Even überhaupt noch in 24 Monaten?“"}
            </div>
          </div>
        </div>
        <div style={{marginTop:14,fontSize:12.5,color:T.textMuted}}>
          {"Die Märkte (Kardiologie/SGLT2i und ZNS/TRD) wurden gewählt, weil sie strukturell unterschiedlich funktionieren: Kardio ist Massenmarkt mit Leitlinien-getriebener Verordnung und Rabattvertragsdominanz. ZNS ist Specialty mit hoher Arzt-Abhängigkeit, individueller Therapieentscheidung und geringerem Generika-Druck auf den Innovator. Beide sind für Viatris’ Transformation vom „Generic Giant“ zur „Specialty Powerhouse“ strategisch relevant."}
        </div>
      </div>
    </Card>
  </div>);
}

// ============ MAIN ============

const PAGES=[
  {id:"story",label:"Szenario-Story",icon:"📖"},
  {id:"exec",label:"Executive Summary",icon:"📊"},
  {id:"adoption",label:"Markt-Uptake & Verordner",icon:"📈"},
  {id:"regional",label:"Regionale Performance",icon:"🗺"},
  {id:"financial",label:"Financial Deep Dive",icon:"💰"},
  {id:"competitive",label:"Wettbewerb",icon:"⚔"},
  {id:"whatif",label:"Szenario-Engine",icon:"🎛"},
];

export default function App(){
  const [page,setPage]=useState("story");
  const [product,setProduct]=useState("CARD01");
  const pc=product==="CARD01"?T.cardiozan:T.neurolix;

  return(<div style={{background:T.bg,minHeight:"100vh",color:T.text,fontFamily:sans}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet"/>
    <div style={{background:T.surface,borderBottom:"1px solid "+T.border,padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <div>
        <h1 style={{fontSize:17,fontWeight:700,margin:0,color:T.text,letterSpacing:-.3}}>Launch Tracking Dashboard – Prototyp Demo</h1>
        <p style={{fontSize:11,color:T.textMuted,margin:0}}>Portfolio Launch Analytics · Stand: Januar 2026</p>
      </div>
      <div style={{display:"flex",gap:3,background:T.surface2,borderRadius:7,padding:3}}>
        {[{id:"CARD01",label:"Cardiozan",c:T.cardiozan},{id:"NEUR01",label:"Neurolix",c:T.neurolix}].map(p=>(
          <button key={p.id} onClick={()=>setProduct(p.id)} style={{
            padding:"5px 16px",borderRadius:5,border:product===p.id?"1.5px solid "+p.c+"44":"1.5px solid transparent",
            cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:sans,
            background:product===p.id?p.c+"10":"transparent",color:product===p.id?p.c:T.textMuted,transition:"all .15s"
          }}>{p.label}</button>
        ))}
      </div>
    </div>
    <div style={{display:"flex",gap:1,padding:"6px 24px",background:T.surface,borderBottom:"1px solid "+T.border,overflowX:"auto"}}>
      {PAGES.map(p=>(
        <button key={p.id} onClick={()=>setPage(p.id)} style={{
          padding:"7px 14px",borderRadius:5,border:"none",cursor:"pointer",fontSize:13,fontFamily:sans,
          background:page===p.id?pc+"10":"transparent",color:page===p.id?pc:T.textMuted,
          fontWeight:page===p.id?600:400,whiteSpace:"nowrap",transition:"all .15s"
        }}><span style={{marginRight:5}}>{p.icon}</span>{p.label}</button>
      ))}
    </div>
    <div style={{padding:"16px 24px",maxWidth:1200,margin:"0 auto"}}>
      {page==="story"&&<StoryPage product={product}/>}
      {page==="exec"&&<ExecSummary product={product}/>}
      {page==="adoption"&&<AdoptionPage product={product}/>}
      {page==="regional"&&<RegionalPage/>}
      {page==="financial"&&<FinancialPage product={product}/>}
      {page==="competitive"&&<CompetitivePage product={product}/>}
      {page==="whatif"&&<WhatIfPage key={product} product={product}/>}
    </div>
    <div style={{padding:"14px 24px",textAlign:"center",fontSize:10.5,color:T.textDim,borderTop:"1px solid "+T.border}}>
      Fiktive Daten – Work Sample für Strategic Portfolio Manager Position · Lesemann Consulting © 2026
    </div>
  </div>);
}
