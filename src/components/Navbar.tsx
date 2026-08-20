import React from 'react';
import { RotateCcw, Cpu, Layers } from 'lucide-react';

export type UserRole = 'business' | 'provider';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  totalOfferingsCount: number;
  userOfferingsCount: number;
  onOpenResetModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  totalOfferingsCount,
  userOfferingsCount,
  onOpenResetModal,
}) => {
  return (
    <header id="main-header" className="bg-[#17213D] text-white border-b border-slate-700/80 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3.5">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2F6BFF] flex items-center justify-center text-white shadow-xs font-bold text-lg">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-lg sm:text-xl tracking-tight text-white">
                    Cầu Nối Công Nghệ
                  </h1>
                  <span className="text-[11px] font-medium bg-[#FFB800] text-slate-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Prototype
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-normal">
                  Từ bài toán đến giải pháp phù hợp trong vài phút
                </p>
              </div>
            </div>
          </div>

          {/* Center / Right controls: Role switch & Catalog stats & Demo reset */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5 sm:gap-3">
            {/* Catalog counter */}
            <div
              id="catalog-counter-badge"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-slate-200"
              title="Danh mục giải pháp công nghệ khả dụng"
            >
              <Layers className="w-3.5 h-3.5 text-[#2F6BFF]" />
              <span>Kho giải pháp:</span>
              <strong className="text-white font-semibold">{totalOfferingsCount}</strong>
              {userOfferingsCount > 0 && (
                <span className="text-[11px] text-[#FFB800] bg-[#FFB800]/10 px-1.5 py-0.2 rounded">
                  +{userOfferingsCount} mới
                </span>
              )}
            </div>

            {/* Role Switch */}
            <div
              id="role-switch-container"
              className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex items-center shadow-inner"
              role="tablist"
              aria-label="Chọn vai trò người dùng"
            >
              <button
                id="role-btn-business"
                role="tab"
                aria-selected={currentRole === 'business'}
                onClick={() => onSelectRole('business')}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentRole === 'business'
                    ? 'bg-[#2F6BFF] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>Tôi cần công nghệ</span>
                <span className="text-[10px] opacity-75 font-normal hidden sm:inline">(Doanh nghiệp)</span>
              </button>

              <button
                id="role-btn-provider"
                role="tab"
                aria-selected={currentRole === 'provider'}
                onClick={() => onSelectRole('provider')}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentRole === 'provider'
                    ? 'bg-[#2F6BFF] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>Tôi cung cấp giải pháp</span>
                <span className="text-[10px] opacity-75 font-normal hidden sm:inline">(Nhà cung cấp)</span>
              </button>
            </div>

            {/* Reset Demo button */}
            <button
              id="btn-open-reset-demo"
              onClick={onOpenResetModal}
              title="Khôi phục dữ liệu demo"
              className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Khôi phục dữ liệu demo</span>
              <span className="sm:hidden">Đặt lại</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
