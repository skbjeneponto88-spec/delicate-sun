import React, { useEffect, useState } from "react";
const logoAjappai = "/logo-ajappai-transparent.png";

const DATA_ATS_URL = "https://ats-tes2-1.vercel.app/";

type PKBM = {
  nama: string;
  urlSiswa?: string;
  urlGuru?: string;
};

const DAFTAR_PKBM: PKBM[] = [
  { nama: "SKB JENEPONTO" },
  { nama: "PKBM HARAPAN BUNDA" },
  {
    nama: "PKBM BUNGUNG SALAPANG",
    urlSiswa: "https://app-siswa-pkbm3.vercel.app/",
  },
  { nama: "PKBM MAPPAKASUNGGU" },
  { nama: "PKBM RESKI ABADI" },
  { nama: "PKBM BUKIT CEMARA" },
  { nama: "PKBM BAJI PAMAE" },
  { nama: "PKBM ARHAM" },
  { nama: "PKBM JULU ATIA" },
  { nama: "PKBM AR RAHMAN" },
  { nama: "PKBM BINABORI" },
  { nama: "PKBM BIRTARIA" },
  { nama: "PKBM AL MAIDAH" },
];

type Halaman = "splash" | "home" | "pkbm" | "pkbm-detail";

export default function App() {
  const [halaman, setHalaman] = useState<Halaman>("splash");
  const [splashKeluar, setSplashKeluar] = useState(false);
  const [pkbmDipilih, setPkbmDipilih] = useState<PKBM | null>(null);

  useEffect(() => {
    const timerKeluar = setTimeout(() => setSplashKeluar(true), 3100);
    const timerPindah = setTimeout(() => setHalaman("home"), 3600);
    return () => {
      clearTimeout(timerKeluar);
      clearTimeout(timerPindah);
    };
  }, []);

  const bukaDataATS = () => {
    // Navigasi di tab yang sama, bukan tab baru
    window.location.href = DATA_ATS_URL;
  };

  const pilihPkbm = (pkbm: PKBM) => {
    setPkbmDipilih(pkbm);
    setHalaman("pkbm-detail");
  };

  const bukaSiswa = () => {
    if (pkbmDipilih?.urlSiswa) {
      window.location.href = pkbmDipilih.urlSiswa;
    } else {
      alert("Link siswa untuk PKBM ini belum tersedia.");
    }
  };

  const bukaGuru = () => {
    if (pkbmDipilih?.urlGuru) {
      window.location.href = pkbmDipilih.urlGuru;
    } else {
      alert("Link guru untuk PKBM ini belum tersedia.");
    }
  };

  return (
    <div className="app-shell">
      <style>{CSS}</style>

      {halaman === "splash" && (
        <div className={`splash ${splashKeluar ? "splash--keluar" : ""}`}>
          <div className="splash-glow" />

          <img
            src={logoAjappai}
            alt="Ajappai - PAUD & PNF"
            className="splash-logo-img"
          />

          <div className="splash-loading">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      )}

      {halaman === "home" && (
        <div className="page fade-in">
          <div className="hero">
            <h1 className="hero-title">Selamat Datang</h1>
            <p className="hero-subtitle">Silakan pilih menu di bawah ini</p>
          </div>

          <div className="menu-grid">
            <button className="menu-card menu-card--blue" onClick={bukaDataATS}>
              <span className="menu-icon">📊</span>
              <span className="menu-card-title">DATA ATS</span>
              <span className="menu-card-desc">
                Validasi Anak Tidak Sekolah
              </span>
              <span className="menu-arrow">→</span>
            </button>

            <button
              className="menu-card menu-card--orange"
              onClick={() => setHalaman("pkbm")}
            >
              <span className="menu-icon">🏫</span>
              <span className="menu-card-title">PKBM</span>
              <span className="menu-card-desc">Daftar Satuan Pendidikan</span>
              <span className="menu-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      {halaman === "pkbm" && (
        <div className="page fade-in">
          <div className="page-header">
            <button className="back-button" onClick={() => setHalaman("home")}>
              ← Kembali
            </button>
            <h1 className="page-title">Daftar PKBM</h1>
            <p className="page-subtitle">
              {DAFTAR_PKBM.length} satuan pendidikan
            </p>
          </div>

          <div className="pkbm-list">
            {DAFTAR_PKBM.map((pkbm, idx) => (
              <button
                className="pkbm-item"
                key={idx}
                style={{ animationDelay: `${idx * 0.04}s` }}
                onClick={() => pilihPkbm(pkbm)}
              >
                <span className="pkbm-number">{idx + 1}</span>
                <span className="pkbm-name">{pkbm.nama}</span>
                <span className="pkbm-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {halaman === "pkbm-detail" && pkbmDipilih && (
        <div className="page fade-in">
          <div className="page-header">
            <button className="back-button" onClick={() => setHalaman("pkbm")}>
              ← Kembali
            </button>
            <h1 className="page-title">{pkbmDipilih.nama}</h1>
            <p className="page-subtitle">Pilih menu di bawah ini</p>
          </div>

          <div className="menu-grid">
            <button className="menu-card menu-card--blue" onClick={bukaGuru}>
              <span className="menu-icon">👩‍🏫</span>
              <span className="menu-card-title">GURU</span>
              <span className="menu-card-desc">
                Data guru {pkbmDipilih.nama}
              </span>
              <span className="menu-arrow">→</span>
            </button>

            <button className="menu-card menu-card--orange" onClick={bukaSiswa}>
              <span className="menu-icon">🎓</span>
              <span className="menu-card-title">SISWA</span>
              <span className="menu-card-desc">
                Data siswa {pkbmDipilih.nama}
              </span>
              <span className="menu-arrow">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const CSS = `
  * { box-sizing: border-box; }

  .app-shell {
    min-height: 100vh;
    width: 100%;
    font-family: \'Segoe UI\', Roboto, Arial, sans-serif;
    background: linear-gradient(135deg, #4f7cff 0%, #6a5cff 45%, #8b5cf6 100%);
    display: flex;
    justify-content: center;
    padding: 32px 16px;
    position: relative;
    overflow: hidden;
  }

  /* ---------- SPLASH / OPENING ---------- */
  .splash {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: radial-gradient(circle at 50% 38%, #8b1a1a 0%, #6e1414 55%, #4a0d0d 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 24px;
    text-align: center;
    animation: splashMasuk 0.4s ease both;
  }

  .splash--keluar {
    animation: splashKeluar 0.5s ease both;
  }

  @keyframes splashMasuk {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes splashKeluar {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(1.08); }
  }

  .splash-glow {
    position: absolute;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,214,0,0.30) 0%, rgba(255,214,0,0) 70%);
    animation: glowPulse 2.2s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% { transform: scale(0.9); opacity: 0.6; }
    50% { transform: scale(1.12); opacity: 1; }
  }

  .splash-logo-img {
    position: relative;
    z-index: 1;
    width: clamp(260px, 70vw, 420px);
    height: auto;
    opacity: 0;
    clip-path: inset(0 100% 0 0);
    animation:
      logoTerungkap 1.1s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards,
      logoMengambang 2.6s ease-in-out 1.4s infinite;
  }

  @keyframes logoTerungkap {
    0% { opacity: 1; clip-path: inset(0 100% 0 0); }
    100% { opacity: 1; clip-path: inset(0 0 0 0); }
  }

  

  .splash-tagline {
    position: relative;
    z-index: 1;
    color: #ffe9c7;
    font-size: clamp(11px, 3.2vw, 14px);
    font-weight: 600;
    max-width: 320px;
    margin: 6px 0 2px;
    opacity: 0;
    animation: taglineFade 0.6s ease 0.9s both;
  }

  @keyframes taglineFade {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .tag-hi {
    color: #ffd600;
    font-weight: 800;
  }

  .splash-loading {
    display: flex;
    gap: 8px;
    position: relative;
    z-index: 1;
    margin-top: 0px;
    opacity: 0;
    animation: taglineFade 0.5s ease 0.6s both;
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #ffd600;
    animation: dotBounce 1s ease-in-out infinite;
  }

  .dot:nth-child(2) { animation-delay: 0.15s; }
  .dot:nth-child(3) { animation-delay: 0.3s; }

  @keyframes dotBounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
    40% { transform: translateY(-8px); opacity: 1; }
  }

  /* ---------- PAGES ---------- */
  .page {
    width: 100%;
    max-width: 480px;
  }

  .fade-in {
    animation: fadeIn 0.45s ease both;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hero {
    text-align: center;
    color: #fff;
    margin: 8px 0 32px;
  }

  .hero-title {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 6px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.15);
  }

  .hero-subtitle {
    font-size: 15px;
    opacity: 0.9;
    margin: 0;
  }

  .menu-grid {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .menu-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    border: none;
    border-radius: 18px;
    padding: 24px 22px;
    cursor: pointer;
    color: #fff;
    box-shadow: 0 10px 25px rgba(0,0,0,0.18);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .menu-card:hover {
    transform: translateY(-4px) scale(1.015);
    box-shadow: 0 16px 32px rgba(0,0,0,0.25);
  }

  .menu-card:active {
    transform: translateY(-1px) scale(0.99);
  }

  .menu-card--blue {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
  }

  .menu-card--orange {
    background: linear-gradient(135deg, #f97316, #ea580c);
  }

  .menu-icon {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .menu-card-title {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.01em;
  }

  .menu-card-desc {
    font-size: 13px;
    opacity: 0.9;
    margin-top: 4px;
  }

  .menu-arrow {
    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 22px;
    opacity: 0.8;
  }

  .page-header {
    color: #fff;
    margin-bottom: 20px;
  }

  .back-button {
    background: rgba(255,255,255,0.16);
    border: 1px solid rgba(255,255,255,0.35);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    margin-bottom: 14px;
    transition: background 0.15s ease;
  }

  .back-button:hover {
    background: rgba(255,255,255,0.28);
  }

  .page-title {
    font-size: 24px;
    font-weight: 800;
    margin: 0 0 4px;
  }

  .page-subtitle {
    font-size: 13px;
    opacity: 0.85;
    margin: 0;
  }

  .pkbm-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pkbm-item {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #ffffff;
    border: none;
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    animation: slideIn 0.35s ease both;
    transition: transform 0.15s ease;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    position: relative;
  }

  .pkbm-item:hover {
    transform: translateX(4px);
  }

  .pkbm-arrow {
    margin-left: auto;
    color: #f97316;
    font-size: 18px;
    opacity: 0.7;
  }

  .pkbm-arrow {
    margin-left: auto;
    color: #f97316;
    font-size: 18px;
    opacity: 0.7;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .pkbm-number {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pkbm-name {
    font-size: 15px;
    font-weight: 600;
    color: #1f2937;
  }

  /* ---------- TABLET (>= 700px) ---------- */
  @media (min-width: 700px) {
    .page { max-width: 640px; }
    .hero-title { font-size: 34px; }
    .hero-subtitle { font-size: 17px; }
    .menu-grid { flex-direction: row; }
    .menu-card { flex: 1; }
    .pkbm-list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  }
`;
