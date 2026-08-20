import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, UserRole } from './components/Navbar';
import { BusinessView } from './components/BusinessView';
import { ProviderView } from './components/ProviderView';
import { OfferingDetailModal } from './components/OfferingDetailModal';
import { ResetDemoModal } from './components/ResetDemoModal';
import { FirebaseNotice } from './components/FirebaseNotice';
import { SEED_OFFERINGS } from './data/seedOfferings';
import { TechnologyOffering } from './types';
import {
  isFirebaseAvailable,
  fetchUserOfferingsFromFirestore,
  ensureAnonymousAuth,
} from './lib/firebase';
import { Cpu, Building2, Wrench, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('business');
  const [userOfferings, setUserOfferings] = useState<TechnologyOffering[]>([]);
  const [selectedOffering, setSelectedOffering] = useState<TechnologyOffering | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  // Initialize Firebase anonymous auth & fetch user-created offerings on mount
  useEffect(() => {
    let isMounted = true;

    async function initData() {
      const available = isFirebaseAvailable();
      setIsFirebaseReady(available);

      if (available) {
        try {
          await ensureAnonymousAuth();
          const remoteOfferings = await fetchUserOfferingsFromFirestore();
          if (isMounted) {
            setUserOfferings(remoteOfferings);
          }
        } catch (err) {
          console.warn('Lỗi khi tải dữ liệu từ Firestore lúc khởi tạo:', err);
        }
      }
    }

    initData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Combined catalog: Immutable seed + dynamic user offerings
  const fullCatalog = useMemo(() => {
    // Avoid duplicates if any ID overlaps
    const userIds = new Set(userOfferings.map((u) => u.id));
    const uniqueSeeds = SEED_OFFERINGS.filter((s) => !userIds.has(s.id));
    return [...userOfferings, ...uniqueSeeds];
  }, [userOfferings]);

  // Fast map lookup by ID
  const catalogMap = useMemo(() => {
    const map = new Map<string, TechnologyOffering>();
    for (const item of fullCatalog) {
      map.set(item.id, item);
    }
    return map;
  }, [fullCatalog]);

  const handleOfferingSaved = (newOffering: TechnologyOffering) => {
    setUserOfferings((prev) => [newOffering, ...prev.filter((o) => o.id !== newOffering.id)]);
  };

  const handleResetComplete = () => {
    setUserOfferings([]);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#2F6BFF] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        totalOfferingsCount={fullCatalog.length}
        userOfferingsCount={userOfferings.length}
        onOpenResetModal={() => setIsResetModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
        {/* Landing Hero & Orientation Banner */}
        <section
          id="landing-hero-card"
          className="bg-[#17213D] text-white rounded-2xl p-5 sm:p-7 shadow-sm border border-slate-800"
          aria-label="Giới thiệu nền tảng Cầu Nối Công Nghệ"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold text-[#FFB800] bg-[#FFB800]/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Google AI Powered Solution Discovery
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
              Từ bài toán thực tế đến giải pháp công nghệ phù hợp
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Nhập 1 câu mô tả tiếng Việt thông thường. Google AI tự động bóc tách vấn đề cốt lõi, đối soát kho giải pháp và thẩm định tối đa 3 phương án khả thi nhất kèm bảng so sánh đa chiều minh bạch.
            </p>
          </div>

          {/* 2 Role Quick Switch Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 pt-5 border-t border-slate-800">
            {/* Role Card: Business */}
            <button
              type="button"
              id="hero-select-business-role"
              onClick={() => setCurrentRole('business')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                currentRole === 'business'
                  ? 'bg-slate-800/90 border-[#2F6BFF] ring-2 ring-[#2F6BFF]/40 shadow-xs'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#2F6BFF] flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-[#2F6BFF]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Doanh nghiệp cần giải pháp</span>
                    <span className="text-[11px] text-slate-400">Tìm kiếm & Đối chiếu phương án</span>
                  </div>
                </div>
                {currentRole === 'business' && (
                  <span className="text-[10px] font-bold text-[#2F6BFF] bg-blue-500/20 px-2 py-0.5 rounded-full">
                    Đang chọn
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Nhập bài toán tiếng Việt → AI bóc tách nhu cầu → Nhận 3 giải pháp tối ưu & bảng so sánh.
              </p>
            </button>

            {/* Role Card: Provider */}
            <button
              type="button"
              id="hero-select-provider-role"
              onClick={() => setCurrentRole('provider')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                currentRole === 'provider'
                  ? 'bg-slate-800/90 border-[#2F6BFF] ring-2 ring-[#2F6BFF]/40 shadow-xs'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-[#FFB800] flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-[#FFB800]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Nhà cung cấp / Chuyên gia</span>
                    <span className="text-[11px] text-slate-400">Đăng ký & Chuẩn hóa hồ sơ</span>
                  </div>
                </div>
                {currentRole === 'provider' && (
                  <span className="text-[10px] font-bold text-[#FFB800] bg-amber-500/20 px-2 py-0.5 rounded-full">
                    Đang chọn
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Mô tả năng lực tự do → AI cấu trúc hóa & chỉ ra thiếu sót → Rà soát & Lưu vào kho dữ liệu.
              </p>
            </button>
          </div>
        </section>

        {/* Firebase / Connection Notice */}
        <FirebaseNotice
          isConfigured={isFirebaseReady}
          userOfferingCount={userOfferings.length}
        />

        {/* View Switcher based on Active Role */}
        {currentRole === 'business' ? (
          <BusinessView
            catalog={fullCatalog}
            catalogMap={catalogMap}
            onSelectOffering={(offering) => setSelectedOffering(offering)}
          />
        ) : (
          <ProviderView
            onOfferingSaved={handleOfferingSaved}
            onSwitchToBusiness={() => setCurrentRole('business')}
          />
        )}
      </main>

      {/* Offering Full Specs Detail Modal */}
      <OfferingDetailModal
        offering={selectedOffering}
        onClose={() => setSelectedOffering(null)}
      />

      {/* Reset Demo Modal */}
      <ResetDemoModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onResetComplete={handleResetComplete}
        userOfferingCount={userOfferings.length}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#2F6BFF]" />
            <span className="font-semibold text-slate-800">Cầu Nối Công Nghệ</span>
            <span>—</span>
            <span>Nguyên mẫu ứng dụng Google AI kết nối bài toán doanh nghiệp</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Phiên bản 1.0.0</span>
            <span>•</span>
            <span>Sự kiện Techport 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
