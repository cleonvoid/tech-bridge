import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface FirebaseNoticeProps {
  isConfigured: boolean;
  userOfferingCount: number;
}

export const FirebaseNotice: React.FC<FirebaseNoticeProps> = ({
  isConfigured,
  userOfferingCount,
}) => {
  return (
    <div id="firebase-status-banner" className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 mb-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {isConfigured ? (
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100 shrink-0" />
          )}
          <div>
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <span>Trạng thái kết nối dữ liệu:</span>
              <span className={isConfigured ? 'text-emerald-700' : 'text-amber-700'}>
                {isConfigured ? 'Đã kết nối Cloud Firestore' : 'Chế độ Trải nghiệm Cục bộ & Hạt giống'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {isConfigured
                ? `Xác thực ẩn danh tự động đang hoạt động. Có ${userOfferingCount} hồ sơ giải pháp người dùng đã lưu trên đám mây.`
                : '15 hồ sơ giải pháp mẫu và công cụ gợi ý Google AI hoạt động đầy đủ. Cấu hình biến môi trường Firebase để lưu trữ đám mây vĩnh viễn.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-[#2F6BFF] shrink-0" />
          <span>Dữ liệu thực nghiệm sự kiện Techport</span>
        </div>
      </div>
    </div>
  );
};
