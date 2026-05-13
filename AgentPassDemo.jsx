import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icons (Inline SVGs to ensure portability) ---
const IconShield = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const IconCheck = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const IconX = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const IconAlert = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

const IconClock = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const IconBot = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
);

const IconBadgeCheck = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
);

// --- Live Threat Map Component ---
const LiveThreatMap = () => {
    const [unauthorized, setUnauthorized] = useState(100000);
    const [fastLane, setFastLane] = useState(1000);
    const [dots, setDots] = useState([]);
    const [feed, setFeed] = useState([]);

    const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

    const origins = [
        { name: "New York", coords: [-74, 40.7] },
        { name: "London", coords: [-0.1, 51.5] },
        { name: "Frankfurt", coords: [8.7, 50.1] },
        { name: "Milan", coords: [9.2, 45.5] },
        { name: "Singapore", coords: [103.8, 1.3] },
        { name: "Tokyo", coords: [139.7, 35.7] },
        { name: "São Paulo", coords: [-46.6, -23.5] }
    ];

    const endpoints = [
        { name: "EuroBank Frankfurt", coords: [8.8, 50.0] },
        { name: "HealthDB London", coords: [-0.2, 51.4] },
        { name: "Payment Gateway Zurich", coords: [8.5, 47.4] },
        { name: "Credit API Singapore", coords: [103.9, 1.2] }
    ];

    const orgs = ["Unknown Org", "FinanceBot Ltd", "Acme SpA", "LogiCorp", "MedAgent", "ProcureAI", "TradeBot", "DataHarvest Inc"];

    useEffect(() => {
        const dotInterval = setInterval(() => {
            const isRed = Math.random() < 0.85; 
            const origin = origins[Math.floor(Math.random() * origins.length)];
            const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
            const id = Math.random().toString(36).substring(7);
            const org = orgs[Math.floor(Math.random() * orgs.length)];
            const api = endpoint.name;
            
            const newConn = { id, type: isRed ? 'red' : 'green', origin, endpoint };
            setDots(prev => [...prev, newConn].slice(-15));
            
            const timestamp = new Date().toTimeString().split(' ')[0];
            const hex = Math.floor(Math.random()*16777215).toString(16).padStart(4, '0');
            const agentId = `ag_${hex}`;
            
            const newRow = {
                id, timestamp, agentId, org, api, type: newConn.type
            };
            
            setFeed(prev => [newRow, ...prev].slice(0, 8));

        }, 700);

        return () => clearInterval(dotInterval);
    }, []);

    useEffect(() => {
        const counterInterval = setInterval(() => {
            setUnauthorized(prev => prev + Math.floor(Math.random() * 4) + 2); // 2-5
        }, 1000);

        const fastLaneInterval = setInterval(() => {
            setFastLane(prev => prev + 1);
        }, 5000); 

        return () => {
            clearInterval(counterInterval);
            clearInterval(fastLaneInterval);
        };
    }, []);

    const slowLane = unauthorized - fastLane;

    return (
        <div className="h-[260px] border-t border-[#1f2937] bg-[#05080f] flex flex-col shrink-0">
            <div className="flex-1 flex overflow-hidden">
                {/* LEFT COLUMN (65%) */}
                <div className="w-[65%] relative overflow-hidden flex items-center justify-center bg-[#0a0f1a] border-r border-[#1f2937]">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4" style={{ width: "100%", height: "260px" }}>
                        <style dangerouslySetInnerHTML={{__html: `
                            @keyframes drawLine {
                                from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
                                to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
                            }
                            .draw-line-red {
                                animation: drawLine 0.5s ease-out forwards;
                            }
                            .draw-line-green {
                                animation: drawLine 1s ease-out forwards;
                            }
                        `}} />
                        <ComposableMap width={800} height={260} projection="geoMercator" projectionConfig={{ scale: 160, center: [15, 20] }} style={{ width: "100%", height: "100%" }}>
                            <Geographies geography={GEO_URL}>
                                {({ geographies }) =>
                                    geographies.map(geo => (
                                        <Geography 
                                            key={geo.rsmKey} 
                                            geography={geo} 
                                            fill="#1e293b" 
                                            stroke="#0f172a" 
                                            strokeWidth={0.5} 
                                            style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                                        />
                                    ))
                                }
                            </Geographies>
                            
                            {origins.map((o, i) => (
                                <Annotation
                                    key={`ol-${i}`}
                                    subject={o.coords}
                                    dx={0}
                                    dy={-10}
                                    connectorProps={{ stroke: "none" }}
                                >
                                    <text x="0" y="0" textAnchor="middle" alignmentBaseline="middle" fill="#9ca3af" fontSize="10" fontFamily="Inter">
                                        {o.name}
                                    </text>
                                </Annotation>
                            ))}
                            
                            <AnimatePresence>
                                {dots.map(conn => {
                                    const { origin, endpoint, type } = conn;
                                    const isRed = type === 'red';
                                    
                                    const destCoords = isRed 
                                        ? [
                                            origin.coords[0] + (endpoint.coords[0] - origin.coords[0]) * 0.65,
                                            origin.coords[1] + (endpoint.coords[1] - origin.coords[1]) * 0.65
                                        ]
                                        : endpoint.coords;

                                    return (
                                        <motion.g key={conn.id}
                                            initial={{ opacity: 1 }}
                                            animate={{ opacity: 0 }}
                                            transition={{ delay: isRed ? 1 : 2, duration: 0.5 }}
                                            onAnimationComplete={() => setDots(prev => prev.filter(d => d.id !== conn.id))}
                                        >
                                            <Line
                                                from={origin.coords}
                                                to={destCoords}
                                                stroke={isRed ? '#ef4444' : '#22c55e'}
                                                strokeWidth={1}
                                                strokeDasharray={1000}
                                                className={isRed ? 'draw-line-red' : 'draw-line-green'}
                                                style={{ opacity: isRed ? 0.7 : 0.9 }}
                                            />
                                            <Marker coordinates={destCoords}>
                                                {isRed ? (
                                                    <motion.g
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.5, duration: 0.2 }}
                                                    >
                                                        <circle r="4" fill="#ef4444" opacity="0.8" />
                                                        <path d="M-2,-2 L2,2 M-2,2 L2,-2" stroke="white" strokeWidth="1"/>
                                                    </motion.g>
                                                ) : (
                                                    <motion.circle 
                                                        r="3" 
                                                        fill="#22c55e"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
                                                        transition={{ delay: 1, duration: 0.5 }}
                                                    />
                                                )}
                                            </Marker>
                                        </motion.g>
                                    );
                                })}
                            </AnimatePresence>
                        </ComposableMap>
                    </div>
                </div>
                
                {/* RIGHT COLUMN (35%) */}
                <div className="w-[35%] bg-[#0a0f1a] overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-hidden p-3 font-mono text-[10px] space-y-1 relative">
                        <AnimatePresence>
                            {feed.map((row, i) => (
                                <motion.div
                                    key={row.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1 - (i * 0.12), x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`flex items-center gap-2 py-1 px-2 bg-[#111827] rounded border border-[#1f2937] ${row.type === 'green' ? 'border-l-2 border-l-[#22c55e]' : ''}`}
                                >
                                    <span className="text-gray-500 whitespace-nowrap">[{row.timestamp}]</span>
                                    <span className="text-gray-400 font-bold w-16">{row.agentId}</span>
                                    <span className="text-gray-300 w-20 truncate">{row.org}</span>
                                    <span className="text-gray-500 w-24 truncate hidden xl:block">{row.api}</span>
                                    {row.type === 'red' ? (
                                        <>
                                            <span className="text-[#ef4444] w-16">NO TOKEN</span>
                                            <span className="text-[#f59e0b] ml-auto font-bold">SLOW LANE 🔴</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-[#22c55e] w-16">VERIFIED</span>
                                            <span className="text-[#22c55e] ml-auto font-bold">FAST LANE 🟢</span>
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="h-[40px] border-t border-[#1f2937] bg-[#111827] flex items-center px-6 justify-between shrink-0">
                <div className="flex gap-12 font-mono">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-sans tracking-widest">UNAUTHORIZED ATTEMPTS</span>
                        <span className="text-sm text-[#ef4444] font-bold">{unauthorized.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-sans tracking-widest">FAST LANE (verified)</span>
                        <span className="text-sm text-[#22c55e] font-bold">{fastLane.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-sans tracking-widest">SLOW LANE (penalized)</span>
                        <span className="text-sm text-[#f59e0b] font-bold">{slowLane.toLocaleString()}</span>
                    </div>
                </div>
                <div className="text-[10px] text-[#4b5563] uppercase tracking-wider font-sans">
                    Live agentic traffic — simulated
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
export default function AgentPassDemo() {
  const [activeScenario, setActiveScenario] = useState(null); // 'A', 'B', 'C'
  const [status, setStatus] = useState('IDLE'); // 'IDLE', 'RUNNING', 'COMPLETE'
  const [logs, setLogs] = useState([]);
  const [time, setTime] = useState(0); // simulation time in ms
  const [issuedAt, setIssuedAt] = useState(Math.floor(Date.now() / 1000) - 252); // issued 4m 12s ago

  // Scenario specific state
  const [scenarioStep, setScenarioStep] = useState(0);
  const [countdownA, setCountdownA] = useState(30);
  const [tokenExpiry, setTokenExpiry] = useState(348); // 5m 48s remaining

  const logsEndRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (type, message, msDelay = 0) => {
    setTime(prev => prev + msDelay);
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      timeOffset: time + msDelay,
      type,
      message
    }]);
  };

  const formatTimeOffset = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const msRem = ms % 1000;
    const sRem = s % 60;
    return `[${m.toString().padStart(2, '0')}:${sRem.toString().padStart(2, '0')}:${msRem.toString().padStart(3, '0')}]`;
  };

  const resetSimulation = () => {
    setStatus('IDLE');
    setLogs([]);
    setTime(0);
    setScenarioStep(0);
    setCountdownA(30);
    setTokenExpiry(348);
    setIssuedAt(Math.floor(Date.now() / 1000) - 252);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const runScenarioA = () => {
    setActiveScenario('A');
    resetSimulation();
    setStatus('RUNNING');
    
    addLog('INFO', 'Agent ag_9f2b3c4d → EuroBank API v2 — Authentication attempt', 0);
    addLog('INFO', 'Legacy OAuth 2.0 flow initiated — Redirecting to authorization server', 120);
    setScenarioStep(1); // Showing OAuth Popup
    
    let currentCountdown = 30;
    timerRef.current = setInterval(() => {
      currentCountdown -= 1;
      setCountdownA(currentCountdown);
      if (currentCountdown <= 0) {
        clearInterval(timerRef.current);
        addLog('FAIL', 'AUTH_FAILURE: No human response. OAuth flow timeout.', 30000);
        setScenarioStep(2); // Timeout Failure
        setStatus('COMPLETE');
      }
    }, 1000);
  };

  const skipOAuthTimeout = () => {
    if (activeScenario === 'A' && status === 'RUNNING') {
      clearInterval(timerRef.current);
      setCountdownA(0);
      addLog('FAIL', 'AUTH_FAILURE: No human response. OAuth flow timeout.', 30000);
      setScenarioStep(2);
      setStatus('COMPLETE');
    }
  };

  const runScenarioB = () => {
    setActiveScenario('B');
    resetSimulation();
    setStatus('RUNNING');
    
    addLog('INFO', 'Agent ag_9f2b3c4d → EuroBank API v2 — Authentication attempt', 0);
    addLog('PASS', 'API Key identity check: sk-live-4f8a...c2d1 (Valid)', 45);
    setScenarioStep(1); // Reveal Q1
    
    setTimeout(() => {
      setScenarioStep(2); // Reveal Q2
    }, 600);
    
    setTimeout(() => {
      setScenarioStep(3); // Reveal Q3
    }, 1200);

    setTimeout(() => {
      setScenarioStep(4); // Reveal Forced Choice
      addLog('FAIL', 'SECURITY_GAP: Identity confirmed. Authorization unknown. Mandate unknown. Action blocked by policy.', 1500);
      setStatus('COMPLETE');
    }, 2000);
  };

  const runScenarioC = () => {
    setActiveScenario('C');
    resetSimulation();
    setStatus('RUNNING');
    
    addLog('INFO', 'Agent ag_9f2b3c4d → EuroBank API v2 — Authentication attempt', 0);
    
    const steps = [
      { step: 1, delay: 150, logType: 'PASS', logMsg: 'Signature verified (ES256) — 0.31ms' },
      { step: 2, delay: 120, logType: 'PASS', logMsg: 'Token expiry check — 5m 48s remaining' },
      { step: 3, delay: 130, logType: 'PASS', logMsg: 'Scope check — purchase ∈ authorized scope' },
      { step: 4, delay: 90, logType: 'PASS', logMsg: 'Spend check — €3,200 ≤ €5,000 mandate' },
      { step: 5, delay: 110, logType: 'PASS', logMsg: 'JTI check — Unique token, first use confirmed' },
      { step: 6, delay: 100, logType: 'PASS', logMsg: 'Org check — Acme SpA identity confirmed' },
      { step: 7, delay: 100, logType: 'GRANT', logMsg: 'ACCESS GRANTED — Fast lane routing active' },
      { step: 8, delay: 150, logType: 'EXEC', logMsg: 'Payment authorization executed — €3,200 — EuroBank API v2' },
    ];

    let currentTimeout = 0;
    steps.forEach((s) => {
      currentTimeout += s.delay;
      setTimeout(() => {
        setScenarioStep(s.step);
        addLog(s.logType, s.logMsg, s.delay);
        
        if (s.step === 8) {
          // Fast forward to minute 8 for renewal
          setTimeout(() => {
            setScenarioStep(9); // Renewal initiated
            addLog('INFO', 'Renewal window — Behavioral verification initiated', 8 * 60 * 1000);
            
            setTimeout(() => {
              addLog('PASS', 'Behavioral check — Action volume nominal — Scope consistent', 44);
              
              setTimeout(() => {
                setScenarioStep(10); // RENEWED
                addLog('RENEW', 'New token issued — ag_9f2b3c4d — Next expiry: +10m', 45);
                setTokenExpiry(600);
                setIssuedAt(Math.floor(Date.now() / 1000));
                setStatus('COMPLETE');
              }, 45);
            }, 44);
          }, 1500);
        }
      }, currentTimeout);
    });
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'INFO': return 'text-gray-400';
      case 'PASS': return 'text-green-400';
      case 'GRANT': return 'text-green-500 font-bold';
      case 'EXEC': return 'text-blue-400';
      case 'RENEW': return 'text-cyan-400';
      case 'WARN': return 'text-amber-500';
      case 'FAIL': return 'text-red-500';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-[#f9fafb] font-sans selection:bg-[#3b82f6] selection:text-white flex flex-col">
      {/* HEADER */}
      <header className="border-b border-[#1f2937] bg-[#111827]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <IconShield className="w-6 h-6 text-[#3b82f6]" />
          <h1 className="text-xl font-semibold tracking-tight">AgentPass Protocol</h1>
          <span className="px-2 py-1 text-xs font-medium bg-[#1f2937] text-gray-400 rounded-md border border-gray-700">v0.1 Draft RFC</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'RUNNING' ? 'bg-[#3b82f6] animate-pulse' : status === 'COMPLETE' ? 'bg-[#22c55e]' : 'bg-gray-500'}`}></div>
          <span className="text-sm font-mono text-gray-400 uppercase">{status}</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="px-2 py-1 text-xs bg-[#1f2937]/50 text-gray-400 rounded border border-[#1f2937]">Protocol: Open Standard</span>
          <span className="px-2 py-1 text-xs bg-[#1f2937]/50 text-gray-400 rounded border border-[#1f2937]">Governance: Foundation</span>
          <span className="px-2 py-1 text-xs bg-[#1f2937]/50 text-gray-400 rounded border border-[#1f2937]">EU AI Act compliant</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        
        {/* LEFT PANEL: Scenario Selector */}
        <div className="lg:col-span-3 space-y-4 flex flex-col">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Simulations</h2>
          
          {/* Card A */}
          <div className={`p-4 rounded-xl border bg-[#111827] transition-colors ${activeScenario === 'A' ? 'border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-[#1f2937] hover:border-gray-600'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">Scenario A</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-[#ef4444]/10 text-[#ef4444] rounded border border-[#ef4444]/20">FAIL — Incompatible</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Legacy Auth: OAuth 2.0</p>
            <button onClick={runScenarioA} disabled={status === 'RUNNING'} className="w-full py-2 bg-[#1f2937] hover:bg-[#374151] text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
              Run Simulation
            </button>
          </div>

          {/* Card B */}
          <div className={`p-4 rounded-xl border bg-[#111827] transition-colors ${activeScenario === 'B' ? 'border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-[#1f2937] hover:border-gray-600'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">Scenario B</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-[#f59e0b]/10 text-[#f59e0b] rounded border border-[#f59e0b]/20">FAIL — No Context</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Static Credentials: API Key</p>
            <button onClick={runScenarioB} disabled={status === 'RUNNING'} className="w-full py-2 bg-[#1f2937] hover:bg-[#374151] text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
              Run Simulation
            </button>
          </div>

          {/* Card C */}
          <div className={`p-4 rounded-xl border bg-[#111827] transition-colors ${activeScenario === 'C' ? 'border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'border-[#1f2937] hover:border-gray-600'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">Scenario C</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-[#22c55e]/10 text-[#22c55e] rounded border border-[#22c55e]/20">PASS — Verified</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">AgentPass Token</p>
            <button onClick={runScenarioC} disabled={status === 'RUNNING'} className="w-full py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
              Run Simulation
            </button>
          </div>

          <div className="mt-auto pt-6">
            <div className="p-4 rounded-lg bg-[#111827]/50 border border-[#1f2937]">
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Protocol Reference</h4>
              <ul className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                <li>Who are you?</li>
                <li>Who authorized you?</li>
                <li>What are you permitted to do?</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">Only AgentPass answers all three.</p>
            </div>
          </div>
        </div>

        {/* CENTER PANEL: Live Simulation */}
        <div className="lg:col-span-9 bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden flex flex-col relative">
          <div className="px-4 py-3 border-b border-[#1f2937] flex justify-between items-center bg-[#0a0f1a]/50">
            <span className="text-sm font-medium text-gray-300">Live Simulation</span>
            {status !== 'IDLE' && (
              <button onClick={resetSimulation} className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-[#1f2937] transition">Reset</button>
            )}
          </div>
          
          <div className="flex-1 p-8 flex items-center justify-center relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {status === 'IDLE' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-gray-500 max-w-md">
                  <IconBot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a scenario from the left to visualize the authentication sequence between an autonomous agent and a regulated API.</p>
                </motion.div>
              )}

              {/* SCENARIO A VISUALIZATION */}
              {activeScenario === 'A' && status !== 'IDLE' && (
                <motion.div key="scenarioA" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-lg">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-8 mb-8">
                      <div className="flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${scenarioStep === 2 ? 'bg-[#ef4444]/20 text-[#ef4444]' : 'bg-[#1f2937] text-gray-300 animate-pulse'}`}>
                          <IconBot className="w-8 h-8" />
                        </div>
                        <span className="mt-2 text-xs font-mono text-gray-400">ag_9f2b3c4d</span>
                      </div>
                      <div className="h-0.5 w-24 bg-gradient-to-r from-gray-700 to-gray-700 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2 border-gray-500"></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#1f2937] text-gray-300 flex items-center justify-center">
                          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </div>
                        <span className="mt-2 text-xs font-mono text-gray-400">EuroBank API</span>
                      </div>
                    </div>

                    <div className={`w-full p-6 rounded-xl border ${scenarioStep === 2 ? 'border-[#ef4444] bg-[#ef4444]/10' : 'border-gray-700 bg-[#1f2937]/50'}`}>
                      <h4 className="text-center font-medium mb-4">OAuth 2.0 Authorization Flow</h4>
                      
                      {scenarioStep === 1 && (
                        <div className="text-center space-y-4">
                          <div className="w-full h-32 bg-white/5 rounded flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
                            <IconClock className="w-8 h-8 text-gray-400 mb-2 animate-spin-slow" />
                            <p className="text-sm text-gray-300">Waiting for human approval...</p>
                            <div className="mt-2 text-2xl font-mono text-white">{countdownA}s</div>
                          </div>
                          <button onClick={skipOAuthTimeout} className="text-xs text-gray-500 hover:text-white transition">[Skip ×10]</button>
                        </div>
                      )}

                      {scenarioStep === 2 && (
                        <div className="text-center text-[#ef4444]">
                          <IconX className="w-12 h-12 mx-auto mb-2" />
                          <p className="font-bold">ACCESS DENIED</p>
                          <p className="text-sm mt-1 opacity-80">No human response. Timeout reached.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SCENARIO B VISUALIZATION */}
              {activeScenario === 'B' && status !== 'IDLE' && (
                <motion.div key="scenarioB" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-xl">
                  <div className="bg-[#1f2937]/50 rounded-xl border border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                      <div>
                        <div className="text-xs text-gray-400">Identity Check</div>
                        <div className="font-mono text-sm text-green-400">sk-live-4f8a...c2d1 ✓</div>
                      </div>
                      <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">Valid Key</div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Who authorized this agent?</span>
                        {scenarioStep >= 1 ? <span className="font-mono text-[#ef4444] animate-pulse">??? Unknown</span> : <span className="w-20"></span>}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">What is this agent permitted to do?</span>
                        {scenarioStep >= 2 ? <span className="font-mono text-[#ef4444] animate-pulse">??? Unbounded</span> : <span className="w-20"></span>}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">What is the spending limit?</span>
                        {scenarioStep >= 3 ? <span className="font-mono text-[#ef4444] animate-pulse">??? None encoded</span> : <span className="w-20"></span>}
                      </div>
                    </div>

                    {scenarioStep >= 4 && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 border border-[#ef4444] bg-[#ef4444]/10 rounded-lg">
                        <p className="text-center text-sm font-semibold text-[#ef4444] mb-4">FORCED BINARY CHOICE</p>
                        <div className="grid grid-cols-2 gap-4">
                          <button disabled className="py-3 px-2 bg-red-900/40 border border-red-500/50 text-red-300 rounded text-xs text-center opacity-70">
                            Trust blindly<br/><span className="opacity-60">(Accept fraud risk)</span>
                          </button>
                          <button disabled className="py-3 px-2 bg-red-900/40 border border-red-500/50 text-red-300 rounded text-xs text-center opacity-70">
                            Block all traffic<br/><span className="opacity-60">(Forfeit efficiency)</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* SCENARIO C VISUALIZATION */}
              {activeScenario === 'C' && status !== 'IDLE' && (
                <motion.div key="scenarioC" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-2xl">
                  <div className="grid grid-cols-1 gap-6">
                    
                    <div className="bg-[#0a0f1a] border border-[#1f2937] rounded-xl p-6 font-mono text-sm shadow-xl relative overflow-hidden">
                      {scenarioStep >= 10 && (
                         <div className="absolute inset-0 bg-[#3b82f6]/10 animate-pulse pointer-events-none"></div>
                      )}
                      
                      <div className="space-y-3">
                        <VerificationRow show={scenarioStep >= 1} text="Signature verified" detail="ES256 / P-256 / SHA-256" time="0.31ms" />
                        <VerificationRow show={scenarioStep >= 2} text="Token not expired" detail="Issued 4m 12s ago, 5m 48s rem" time="0.08ms" />
                        <VerificationRow show={scenarioStep >= 3} text="Scope authorized" detail="purchase ∈ {purchase, ...}" time="0.12ms" />
                        <VerificationRow show={scenarioStep >= 4} text="Spend within mandate" detail="€3,200 < max_spend €5,000" time="0.06ms" />
                        <VerificationRow show={scenarioStep >= 5} text="JTI not replayed" detail="Unique token, first use" time="0.09ms" />
                        <VerificationRow show={scenarioStep >= 6} text="org_verified: true" detail="Acme SpA identity confirmed" time="0.04ms" />
                      </div>

                      {scenarioStep >= 7 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-gray-700 border-dashed">
                          <div className="flex justify-between items-center text-gray-400 mb-2">
                            <span>Total verification time:</span>
                            <span className="text-white">0.70ms</span>
                          </div>
                          <div className="flex justify-between items-center bg-[#22c55e]/10 border border-[#22c55e]/30 p-3 rounded-lg">
                            <span className="text-gray-300">Decision:</span>
                            <div className="flex items-center gap-2 text-[#22c55e] font-bold tracking-wide">
                              <IconCheck className="w-5 h-5" />
                              ACCESS GRANTED — FAST LANE
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Agent-Gate Visualization */}
                    {scenarioStep >= 7 && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="w-full flex justify-center py-4">
                         <div className="flex items-center text-xs font-mono text-gray-500 w-full max-w-lg">
                            <div className="flex flex-col items-center mr-4">
                               <div className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center border border-gray-600 z-10"><IconBot className="w-4 h-4 text-white" /></div>
                               <span className="mt-1">Traffic</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-[#1f2937] relative">
                               <motion.div 
                                 initial={{ left: 0 }}
                                 animate={{ left: '100%' }}
                                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                 className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]"
                               ></motion.div>
                            </div>
                            <div className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] font-bold border border-[#22c55e] rounded mx-2 shadow-[0_0_10px_rgba(34,197,94,0.2)]">FAST LANE</div>
                            <div className="flex-1 h-0.5 bg-[#1f2937] relative"></div>
                            <div className="ml-4 px-3 py-2 border border-gray-700 rounded bg-[#111827]">API</div>
                         </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* LIVE THREAT MAP */}
      <LiveThreatMap />

      {/* BOTTOM PANEL */}
      <div className="min-h-[450px] shrink-0 border-t border-[#1f2937] grid grid-cols-1 lg:grid-cols-2 bg-[#0a0f1a]">
        
        {/* EVENT LOG */}
        <div className="border-r border-[#1f2937] flex flex-col p-4 overflow-hidden bg-[#05080f]">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 shrink-0">Event Log</h3>
          <div className="flex-1 overflow-y-auto font-mono text-[11px] lg:text-xs space-y-1.5 pr-2 custom-scrollbar">
            {logs.map((log) => (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={log.id} className="flex gap-3">
                <span className="text-gray-600 whitespace-nowrap">{formatTimeOffset(log.timeOffset)}</span>
                <span className={`w-12 font-bold ${getLogColor(log.type)}`}>{log.type}</span>
                <span className="text-gray-300">{log.message}</span>
              </motion.div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* TOKEN INSPECTOR (Only visible in C) */}
        <div className="p-4 flex flex-col overflow-hidden relative">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 shrink-0">Token Inspector</h3>
          
          {activeScenario === 'C' ? (
            <div className="flex-1 bg-[#111827] border border-[#1f2937] rounded-lg p-4 font-mono text-xs overflow-y-auto custom-scrollbar relative">
              <pre className="text-gray-300 leading-relaxed">
{`{
  `}<TokenLine k="alg" v='"ES256"' tooltip="Cryptographic signing algorithm" />{`,
  `}<TokenLine k="typ" v='"JWT"' tooltip="Token type" />{`,
  `}<TokenLine k="agent_id" v='"ag_9f2b3c4d"' tooltip="Unique identifier for this agent across the entire AgentPass network" />{`,
  `}<TokenLine k="org" v='"Acme SpA"' tooltip="Deploying organization" />{`,
  `}<TokenLine k="org_verified" v="true" type="bool" icon={<IconBadgeCheck className="w-3 h-3 inline ml-1 text-[#3b82f6]" />} tooltip="Organization has completed AgentPass identity verification. Tokens with org_verified: false are rejected by Agent-Gate." />{`,
  `}<TokenLine k="scope" v='["purchase", "read_catalog"]' type="array" tooltip="Exact set of actions this agent is authorized to perform. Receiving systems enforce scope — this agent cannot execute actions outside this list." />{`,
  `}<TokenLine k="max_spend" v="5000" type="number" tooltip="Spending limit encoded directly in the token. Cannot be exceeded — the receiving system has cryptographic evidence of the mandate." />{`,
  `}<TokenLine k="currency" v='"EUR"' />{`,
  `}<TokenLine k="issued_at" v={issuedAt} type="number" />{`,
  `}<span className="group relative cursor-help">
    <span className="text-[#9ca3af]">"expires_in"</span>: <span className="text-[#f97316]">{tokenExpiry}</span>
    <span className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-800 text-white text-[10px] rounded border border-gray-600 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">Token lifetime in seconds. 600 seconds (10 minutes) — the optimal tradeoff between security and network overhead.</span>
  </span>{`,
  `}<TokenLine k="jti" v='"a7f3c2d1-9b4e-4f8a-b2c6-1d3e5f7a9b0c"' tooltip="Globally unique token ID. Receiving systems cache used JTI values to reject replay attacks." />{`
}`}
              </pre>
              
              {/* Renewal Progress bar visualizer */}
              <div className="absolute bottom-4 right-4 left-4 h-1 bg-gray-800 rounded overflow-hidden">
                <motion.div 
                   className={`h-full ${scenarioStep >= 10 ? 'bg-[#3b82f6]' : 'bg-[#22c55e]'}`}
                   initial={{ width: '42%' }} // Starts at 4m12s / 10m
                   animate={{ width: scenarioStep >= 10 ? '100%' : '10%' }}
                   transition={{ duration: scenarioStep >= 9 ? 0.5 : 0 }}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600 border border-dashed border-[#1f2937] rounded-lg">
              <IconShield className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-xs">Token data unavailable</p>
              <p className="text-[10px] mt-1">Run Scenario C to inspect AgentPass Token</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-3 px-6 border-t border-[#1f2937] bg-[#0a0f1a] flex justify-between items-center text-xs text-gray-500">
        <span>AgentPass Protocol — Draft RFC v0.1 — March 2026 — Marco Rauseo — Open for feedback</span>
        <a href="https://github.com/marco-rauseo/agentpass-protocol" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors flex items-center gap-1">
          GitHub Reference
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        </a>
      </footer>

    </div>
  );
}

// Helper components for Token Inspector
const TokenLine = ({ k, v, type = "string", tooltip, icon }) => {
  const valueColor = type === 'string' ? 'text-[#34d399]' : type === 'number' ? 'text-[#f97316]' : type === 'bool' ? 'text-[#60a5fa]' : 'text-[#a78bfa]';
  
  return (
    <span className="group relative cursor-help">
      <span className="text-[#9ca3af]">"{k}"</span>: <span className={valueColor}>{v}</span>{icon}
      {tooltip && (
        <span className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-800 text-white text-[10px] rounded border border-gray-600 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl whitespace-normal">
          {tooltip}
        </span>
      )}
    </span>
  );
};

const VerificationRow = ({ show, text, detail, time }) => {
  if (!show) return null;
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between text-gray-300">
      <div className="flex items-center gap-3">
        <IconCheck className="w-4 h-4 text-[#22c55e]" />
        <span className="w-48">{text}</span>
        <span className="text-gray-500 hidden sm:inline">— {detail}</span>
      </div>
      <span className="text-gray-400">[{time}]</span>
    </motion.div>
  );
};
