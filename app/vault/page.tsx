'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    ShieldCheck,
    LogOut,
    Eye,
    Download,
    Plus,
    Trash2,
    FileDigit,
    Fingerprint,
    ExternalLink,
    ChevronRight,
    ShieldAlert,
    Search,
    Terminal,
    Cpu,
    Activity,
    Database,
    X
} from 'lucide-react';

interface PrivateFile {
    id: string;
    name: string;
    fileName: string; // The physical name in vault-data/
    type: string;
    size: string;
    date: string;
    category: string;
}

// User-specific document list based on request
const vaultDocuments: PrivateFile[] = [
    { id: '1', name: 'CNIC Front', fileName: 'cnic_front.jpg', type: 'image', size: '128 KB', date: '2023-10-15', category: 'Identity' },
    { id: '2', name: 'CNIC Back', fileName: 'cnic_back.jpg', type: 'image', size: '80 KB', date: '2023-10-15', category: 'Identity' },
    { id: '10', name: 'Domicile', fileName: 'domicile.jpg', type: 'image', size: '130 KB', date: '2023-10-15', category: 'Identity' },
    { id: '3', name: 'Matric Marksheet', fileName: 'matric_marksheet.jpg', type: 'image', size: '201 KB', date: '2023-11-20', category: 'Matric' },
    { id: '4', name: 'Matric Degree', fileName: 'matric_degree.jpg', type: 'image', size: '123 KB', date: '2023-11-20', category: 'Matric' },
    { id: '11', name: 'APS Character Certificate', fileName: 'APScharacterCertificate.jpg', type: 'image', size: '157 KB', date: '2023-11-20', category: 'Matric' },
    { id: '5', name: 'FSc Marksheet', fileName: 'fsc_marksheet.jpg', type: 'image', size: '163 KB', date: '2023-12-05', category: 'FSc' },
    { id: '6', name: 'FSc Degree', fileName: 'fsc_degree.jpg', type: 'image', size: '128 KB', date: '2023-12-05', category: 'FSc' },
    { id: '7', name: 'ADCS Degree', fileName: 'adcs_degree.jpg', type: 'image', size: '142 KB', date: '2024-01-10', category: 'ADCS' },
    { id: '12', name: 'KIU Admission Fee Slip', fileName: 'kiuAdmissionFeeSlip.jpg', type: 'image', size: '184 KB', date: '2024-01-20', category: 'ADCS' },
    { id: '13', name: 'KIU Admission Slip Chalan', fileName: 'kiuAdmissionSlipChalan.jpg', type: 'image', size: '183 KB', date: '2024-01-20', category: 'ADCS' },
    { id: '14', name: '70ty Bike Doc', fileName: '70tyBikeDoc.jpg', type: 'image', size: '120 KB', date: '2024-02-15', category: 'Other' },
];

export default function VaultDashboard() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [previewFile, setPreviewFile] = useState<PrivateFile | null>(null);
    const [booting, setBooting] = useState(true);
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [systemLogs, setSystemLogs] = useState<string[]>([]);
    const [cpuUsage, setCpuUsage] = useState(0);
    const [ramUsage, setRamUsage] = useState(0);
    const [networkSpeed, setNetworkSpeed] = useState(0);

    // Boot Sequence Effect
    useEffect(() => {
        const sequence = [
            "INITIALIZING_KERNEL...",
            "BYPASSING_FIREWALL_V4...",
            "Handshake: [ESTABLISHED]",
            "Decrypting_User_Node...",
            "LOADING_MODULES: [========--] 80%",
            "ACCESS_GRANTED_LEVEL_5",
            "WELCOME_USER_ADMIN"
        ];

        let delay = 0;
        sequence.forEach((line, i) => {
            setTimeout(() => {
                setBootLines(prev => [...prev, line]);
                if (i === sequence.length - 1) {
                    setTimeout(() => setBooting(false), 800);
                }
            }, delay);
            delay += Math.random() * 300 + 100;
        });
    }, []);

    // Live System Logs
    useEffect(() => {
        if (booting) return;

        const logMessages = [
            "[AUTH] Session validated: USER_ADMIN",
            "[NET] Packet received: 192.168.1.1",
            "[SYS] Memory allocation: 2048MB",
            "[SEC] Firewall status: ACTIVE",
            "[DB] Query executed: SELECT * FROM vault",
            "[NET] Bandwidth: 10Gbps",
            "[SYS] CPU temperature: 42°C",
            "[AUTH] Token refresh: SUCCESS"
        ];

        const interval = setInterval(() => {
            const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
            const timestamp = new Date().toLocaleTimeString();
            setSystemLogs(prev => [...prev.slice(-4), `[${timestamp}] ${randomLog}`]);
        }, 3000);

        return () => clearInterval(interval);
    }, [booting]);

    // Live Stats Animation
    useEffect(() => {
        if (booting) return;

        const interval = setInterval(() => {
            setCpuUsage(Math.floor(Math.random() * 40) + 30);
            setRamUsage(Math.floor(Math.random() * 30) + 50);
            setNetworkSpeed(Math.floor(Math.random() * 500) + 500);
        }, 2000);

        return () => clearInterval(interval);
    }, [booting]);

    const handleLogout = async () => {
        await fetch('/api/vault/auth', { method: 'DELETE' });
        router.push('/vault/login');
    };

    const handleDownload = (fileName: string) => {
        const link = document.createElement('a');
        link.href = `/api/vault/files/${fileName}?download=true&t=${Date.now()}`;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePreview = (file: PrivateFile) => {
        setPreviewFile(file);
    };

    const categories = ['All', 'Identity', 'Matric', 'FSc', 'ADCS', 'Other', 'Passwords'];

    const filteredFiles = vaultDocuments.filter(f => {
        const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (booting) {
        return (
            <div className="min-h-screen bg-black text-[#00ff41] font-mono p-8 flex flex-col justify-end pb-20">
                <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                {bootLines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm md:text-base font-bold tracking-wider mb-1"
                    >
                        <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                        {`> ${line}`}
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-3 h-5 bg-[#00ff41] mt-2"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black cursor-crosshair overflow-x-hidden">
            {/* CRT Scanline Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

            {/* Matrix Background Effect */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            {/* Navbar with red security accent */}
            {/* Header / Command Bar */}
            <header className="border-b-2 border-[#00ff41]/20 bg-black/90 sticky top-0 z-40 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Terminal size={24} className="text-[#00ff41] animate-pulse" />
                        <span className="text-xl font-black tracking-[0.2em] uppercase glitch-text">ROOT@SYSTEM:~#</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black transition-all text-xs font-black tracking-widest uppercase"
                    >
                        <LogOut size={14} />
                        [TERMINATE_SESSION]
                    </button>
                </div>
            </header>

            <main className="max-w-full px-4 py-6">
                {/* Top Status Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                    <div className="border border-[#00ff41]/30 bg-black/80 p-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] opacity-50">SYSTEM_STATUS</span>
                            <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-xl font-black">ONLINE</div>
                    </div>
                    <div className="border border-[#00ff41]/30 bg-black/80 p-3">
                        <div className="text-[9px] opacity-50 mb-2">ACTIVE_FILES</div>
                        <div className="text-xl font-black">{filteredFiles.length}/{vaultDocuments.length}</div>
                    </div>
                    <div className="border border-[#00ff41]/30 bg-black/80 p-3">
                        <div className="text-[9px] opacity-50 mb-2">ENCRYPTION</div>
                        <div className="text-xl font-black">AES-256</div>
                    </div>
                    <div className="border border-[#00ff41]/30 bg-black/80 p-3">
                        <div className="text-[9px] opacity-50 mb-2">THREAT_LEVEL</div>
                        <div className="text-xl font-black text-[#00ff41]">NULL</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* Left Sidebar */}
                    <aside className="lg:col-span-3 space-y-4 relative z-10 font-mono">
                        {/* Search Node */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-[#00ff41] opacity-20 group-focus-within:opacity-50 blur-md transition-all"></div>
                            <div className="relative flex items-center bg-black border border-[#00ff41]">
                                <span className="pl-3 text-[#00ff41] opacity-50">$</span>
                                <input
                                    type="text"
                                    placeholder="grep search_query..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-none py-3 px-2 text-sm focus:ring-0 text-[#00ff41] placeholder:text-[#00ff41]/30 font-mono focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-black text-[#00ff41] opacity-50 mb-4 border-b border-[#00ff41]/30 pb-1">
                                [MOUNTED_DRIVES]

                            </h3>
                            <nav className="space-y-1">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-none transition-all border-l-2 ${activeCategory === cat
                                            ? 'bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41] shadow-[inset_4px_0_10px_rgba(0,255,65,0.1)]'
                                            : 'text-[#00ff41]/40 border-transparent hover:bg-[#00ff41]/5 hover:text-[#00ff41]/70'
                                            }`}
                                    >
                                        <span>/{cat.toUpperCase()}</span>
                                        {activeCategory === cat && <span className="animate-pulse">_</span>}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Fake Stats */}
                        <div className="p-4 border border-[#00ff41]/20 bg-[#00ff41]/5 text-[10px] space-y-2 opacity-80">
                            <div className="flex justify-between">
                                <span>NET_SPEED:</span>
                                <span className="animate-pulse">10Gbps</span>
                            </div>
                            <div className="flex justify-between">
                                <span>PACKETS:</span>
                                <span>{Math.floor(Math.random() * 99999)}</span>
                            </div>
                            <div className="w-full bg-[#00ff41]/20 h-1 mt-2">
                                <motion.div
                                    className="bg-[#00ff41] h-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: ["10%", "50%", "30%", "90%"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </div>
                        {/* Live System Logs */}
                        <div className="border border-[#00ff41]/30 bg-black/90 p-3">
                            <div className="flex items-center gap-2 mb-3 border-b border-[#00ff41]/20 pb-2">
                                <Activity size={12} className="text-[#00ff41]" />
                                <span className="text-[9px] font-black">LIVE_SYSTEM_LOGS</span>
                            </div>
                            <div className="space-y-1 text-[9px] font-mono h-32 overflow-hidden">
                                {systemLogs.map((log: any, i: any) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-[#00ff41]/70"
                                    >
                                        {log}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-6">
                        <div className="flex items-center justify-between mb-4 border-b border-[#00ff41]/20 pb-2">
                            <h3 className="text-xs font-black text-[#00ff41] uppercase tracking-[0.2em] flex items-center gap-2">
                                <Database size={14} />
                                VAULT_ENTRIES: {filteredFiles.length}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {filteredFiles.map((file, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={file.id}
                                    className="group relative p-4 border border-[#00ff41]/20 bg-black hover:bg-[#00ff41]/5 hover:border-[#00ff41] transition-all duration-200"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-[#00ff41]/30 text-[#00ff41] group-hover:scale-110 transition-transform">
                                            {file.type === 'pdf' ? <Database size={20} /> : <Eye size={20} />}
                                        </div>

                                        <div className="flex-1 min-w-0 font-mono">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[9px] bg-[#00ff41] text-black px-1 font-bold">
                                                    HEX: 0x{file.id.padStart(4, '0')}
                                                </span>
                                                <span className="text-[9px] text-[#00ff41]/50 uppercase">
                                                    PERM: rwx-r-x
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-bold text-[#00ff41] truncate tracking-wider">
                                                {file.name.toUpperCase()}
                                            </h4>
                                            <p className="text-[10px] text-[#00ff41]/60 mt-0.5">
                                                {file.fileName} :: {file.size}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 shrink-0">
                                            <button
                                                onClick={() => handlePreview(file)}
                                                className="hidden md:flex items-center gap-2 text-[10px] font-bold text-[#00ff41] hover:bg-[#00ff41] hover:text-black px-3 py-1 border border-[#00ff41] transition-colors uppercase tracking-widest"
                                            >
                                                [ EXECUTE ]
                                            </button>
                                            <button
                                                onClick={() => handleDownload(file.fileName)}
                                                className="flex items-center gap-2 text-[10px] font-bold text-[#00ff41] hover:bg-[#00ff41] hover:text-black px-3 py-1 border border-[#00ff41] transition-colors uppercase tracking-widest"
                                            >
                                                <Download size={12} />
                                                <span className="hidden sm:inline">[ EXTRACT ]</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Scanline on Hover */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00ff41] opacity-0 group-hover:opacity-50 group-hover:animate-scan-fast pointer-events-none"></div>
                                </motion.div>
                            ))}
                        </div>

                        {filteredFiles.length === 0 && (
                            <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[40px] bg-white/[0.01]">
                                <Plus className="mx-auto text-gray-800 mb-4 animate-pulse" size={60} />
                                <p className="text-gray-500 font-medium italic">No matches found in your vault.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - System Monitor */}
                    <aside className="lg:col-span-3 space-y-4">
                        {/* CPU Monitor */}
                        <div className="border border-[#00ff41]/30 bg-black/90 p-4">
                            <div className="text-[9px] opacity-50 mb-2 uppercase tracking-wider">CPU_USAGE</div>
                            <div className="text-3xl font-black mb-3">{cpuUsage}%</div>
                            <div className="w-full bg-[#00ff41]/20 h-2 rounded-sm overflow-hidden">
                                <motion.div
                                    className="bg-[#00ff41] h-full"
                                    animate={{ width: `${cpuUsage}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="mt-2 text-[8px] opacity-40">CORES: 8 | THREADS: 16</div>
                        </div>

                        {/* RAM Monitor */}
                        <div className="border border-[#00ff41]/30 bg-black/90 p-4">
                            <div className="text-[9px] opacity-50 mb-2 uppercase tracking-wider">RAM_USAGE</div>
                            <div className="text-3xl font-black mb-3">{ramUsage}%</div>
                            <div className="w-full bg-[#00ff41]/20 h-2 rounded-sm overflow-hidden">
                                <motion.div
                                    className="bg-[#00ff41] h-full"
                                    animate={{ width: `${ramUsage}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="mt-2 text-[8px] opacity-40">TOTAL: 64GB | AVAILABLE: {Math.floor(64 * (100 - ramUsage) / 100)}GB</div>
                        </div>

                        {/* Network Activity Graph */}
                        <div className="border border-[#00ff41]/30 bg-black/90 p-4">
                            <div className="text-[9px] opacity-50 mb-2 uppercase tracking-wider">NETWORK_SPEED</div>
                            <div className="text-3xl font-black mb-3">{networkSpeed}<span className="text-sm ml-1">Mbps</span></div>
                            <div className="space-y-1">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex gap-[2px] h-4">
                                        {[...Array(30)].map((_, j) => (
                                            <div
                                                key={j}
                                                className="flex-1 bg-[#00ff41]/20 transition-all duration-300"
                                                style={{
                                                    height: `${Math.random() * 100}%`,
                                                    opacity: Math.random() * 0.5 + 0.3
                                                }}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Connection Info */}
                        <div className="border border-[#00ff41]/30 bg-black/90 p-4">
                            <div className="text-[9px] opacity-50 mb-3 uppercase tracking-wider">CONNECTION_INFO</div>
                            <div className="space-y-2 text-[10px] font-mono">
                                <div className="flex justify-between">
                                    <span className="opacity-50">LOCAL_IP:</span>
                                    <span className="text-[#00ff41]">192.168.1.{Math.floor(Math.random() * 255)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-50">PORT:</span>
                                    <span>8443</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-50">PROTOCOL:</span>
                                    <span>HTTPS/2</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-50">LATENCY:</span>
                                    <span className="text-[#00ff41]">{Math.floor(Math.random() * 20 + 10)}ms</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-50">PACKETS:</span>
                                    <span>{Math.floor(Math.random() * 10000 + 50000)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Status */}
                        <div className="border border-[#00ff41]/30 bg-black/90 p-4">
                            <div className="text-[9px] opacity-50 mb-3 uppercase tracking-wider">SEC_STATUS</div>
                            <div className="space-y-2 text-[10px]">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></div>
                                    <span>FIREWALL: ACTIVE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></div>
                                    <span>VPN: CONNECTED</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></div>
                                    <span>ENCRYPTION: AES-256</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span className="text-red-500">INTRUSION: NONE</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* In-Page Preview Portal (Hacker Overlay) */}
            <AnimatePresence>
                {previewFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
                    >
                        {/* Digital Noise Background for Preview */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl max-h-[90vh] bg-black border-2 border-[#00ff41] shadow-[0_0_100px_rgba(0,255,65,0.2)] flex flex-col"
                        >
                            {/* Preview Header */}
                            <div className="flex items-center justify-between p-4 border-b border-[#00ff41]/30 bg-[#00ff41]/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
                                    <h3 className="text-sm font-black uppercase tracking-widest">
                                        PREVIEWING: {previewFile.name}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setPreviewFile(null)}
                                    className="p-2 hover:bg-[#00ff41] hover:text-black transition-all border border-[#00ff41]/30"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-auto bg-black p-4 flex items-center justify-center relative">
                                {/* Grid Background behind content */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#00ff41_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                                {previewFile.type === 'pdf' ? (
                                    <iframe
                                        src={`/api/vault/files/${previewFile.fileName}`}
                                        className="w-full h-full min-h-[70vh] border border-[#00ff41]/30"
                                        title="PDF Preview"
                                    />
                                ) : (
                                    <img
                                        src={`/api/vault/files/${previewFile.fileName}`}
                                        alt={previewFile.name}
                                        className="max-w-full max-h-[75vh] object-contain border border-[#00ff41]/20 shadow-[0_0_30px_rgba(0,255,65,0.1)]"
                                    />
                                )}
                            </div>

                            {/* Footer Info */}
                            <div className="p-2 border-t border-[#00ff41]/30 bg-black text-[10px] text-[#00ff41]/60 flex justify-between font-mono">
                                <span>STATUS: DECRYPTED</span>
                                <span>SIZE: UNCOMPRESSED</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Frame */}
            <div className="fixed inset-0 pointer-events-none border border-[#00ff41]/20 z-[999]"></div>
        </div>
    );
}
