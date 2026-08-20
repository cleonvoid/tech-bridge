import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, X, CheckCircle, Loader2 } from 'lucide-react';
import { auth, deleteUserOwnedOfferings, ensureAnonymousAuth } from '../lib/firebase';

interface ResetDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetComplete: (deletedUserId?: string) => void;
  userOfferingCount: number;
}

export const ResetDemoModal: React.FC<ResetDemoModalProps> = ({
  isOpen,
  onClose,
  onResetComplete,
  userOfferingCount,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleConfirmReset = async () => {
    setIsLoading(true);
    setStatusMessage(null);

    try {
      const user = await ensureAnonymousAuth();
      const currentUserId = user?.uid || auth?.currentUser?.uid;

      if (!currentUserId) {
        setStatusMessage({
          type: 'error',
          text: 'Không thể xác thực phiên làm việc để xóa dữ liệu trên Firestore. Vui lòng kiểm tra lại kết nối.',
        });
        setIsLoading(false);
        return;
      }

      const deletedCount = await deleteUserOwnedOfferings(currentUserId);

      setStatusMessage({
        type: 'success',
        text: `Đã khôi phục dữ liệu demo thành công. Đã xóa ${deletedCount} hồ sơ do bạn tạo trên Firestore và làm mới trạng thái tìm kiếm. 15 hồ sơ hạt giống gốc được bảo toàn.`,
      });

      setTimeout(() => {
        setIsLoading(false);
        onResetComplete(currentUserId);
        onClose();
        setStatusMessage(null);
      }, 1400);
    } catch (err) {
      console.error('Lỗi khi đặt lại demo:', err);
      setStatusMessage({
        type: 'error',
        text: 'Không thể xóa dữ liệu người dùng trên Firestore. Vui lòng kiểm tra lại quyền hoặc kết nối.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div
      id="reset-demo-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div
        id="reset-demo-modal-card"
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
      >
        <button
          id="btn-close-reset-modal"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="reset-modal-title" className="text-base font-bold text-slate-900">
              Khôi phục dữ liệu demo
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Xác nhận làm mới trạng thái thử nghiệm
            </p>
          </div>
        </div>

        <div className="text-sm text-slate-700 space-y-2.5 mb-6">
          <p>Hành động này sẽ thực hiện:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li>
              Xóa <strong>{userOfferingCount}</strong> hồ sơ giải pháp do phiên làm việc của bạn tạo trên Cloud Firestore.
            </li>
            <li>
              <strong>Bảo toàn 100%</strong> 15 hồ sơ giải pháp mẫu hạt giống gốc.
            </li>
            <li>Làm mới bài toán và kết quả đánh giá hiện tại trên giao diện.</li>
          </ul>
        </div>

        {statusMessage && (
          <div
            className={`p-3 rounded-lg text-xs font-medium mb-4 flex items-start gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5">
          <button
            id="btn-cancel-reset"
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            id="btn-confirm-reset"
            type="button"
            onClick={handleConfirmReset}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xác nhận khôi phục</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
