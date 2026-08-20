import React from 'react';
import { X, Building2, CheckCircle2, Shield, Calendar, DollarSign, MapPin, Tag, Mail, User } from 'lucide-react';
import { TechnologyOffering } from '../types';

interface OfferingDetailModalProps {
  offering: TechnologyOffering | null;
  onClose: () => void;
}

export const OfferingDetailModal: React.FC<OfferingDetailModalProps> = ({ offering, onClose }) => {
  if (!offering) return null;

  const getReadinessLabel = (level: string) => {
    switch (level) {
      case 'commercial':
        return 'Thương mại hóa diện rộng';
      case 'deployment-ready':
        return 'Sẵn sàng triển khai';
      case 'pilot-ready':
        return 'Sẵn sàng chạy thử nghiệm (Pilot)';
      case 'prototype':
        return 'Nguyên mẫu thử nghiệm';
      default:
        return level;
    }
  };

  const getDeploymentLabel = (model: string) => {
    switch (model) {
      case 'on-premise':
        return 'Cài đặt tại chỗ (On-Premise)';
      case 'cloud':
        return 'Đám mây (Cloud SaaS)';
      case 'hybrid':
        return 'Mô hình lai (Hybrid)';
      case 'consulting':
        return 'Tư vấn & Chuyển giao';
      default:
        return model;
    }
  };

  return (
    <div
      id="offering-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offering-detail-title"
    >
      <div
        id="offering-detail-modal-card"
        className="bg-white rounded-xl max-w-2xl w-full my-8 p-5 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="pr-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  offering.source === 'seed'
                    ? 'bg-blue-50 text-[#2F6BFF] border border-blue-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {offering.source === 'seed' ? 'Dữ liệu Hạt giống Demo' : 'Hồ sơ Người dùng Mới'}
              </span>
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {getReadinessLabel(offering.readinessLevel)}
              </span>
            </div>
            <h2 id="offering-detail-title" className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {offering.solutionName}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600 flex items-center gap-1.5 mt-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{offering.organizationName}</span>
            </p>
          </div>

          <button
            id="btn-close-offering-detail"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="overflow-y-auto py-4 space-y-5 text-slate-700 pr-1">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Tóm tắt giải pháp
            </h3>
            <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {offering.summary}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3.5 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 flex items-center gap-1 mb-0.5">
                <DollarSign className="w-3.5 h-3.5 text-[#2F6BFF]" />
                Ngân sách dự kiến
              </span>
              <p className="font-semibold text-slate-900">
                {offering.budgetMinMillionVND || offering.budgetMaxMillionVND
                  ? `${offering.budgetMinMillionVND ?? '...'} - ${offering.budgetMaxMillionVND ?? '...'} triệu VNĐ`
                  : 'Chưa cung cấp'}
              </p>
            </div>

            <div>
              <span className="text-slate-500 flex items-center gap-1 mb-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#2F6BFF]" />
                Thời gian triển khai
              </span>
              <p className="font-semibold text-slate-900">
                {offering.implementationWeeksMin || offering.implementationWeeksMax
                  ? `${offering.implementationWeeksMin ?? '...'} - ${offering.implementationWeeksMax ?? '...'} tuần`
                  : 'Chưa cung cấp'}
              </p>
            </div>

            <div>
              <span className="text-slate-500 flex items-center gap-1 mb-0.5">
                <Shield className="w-3.5 h-3.5 text-[#2F6BFF]" />
                Mô hình triển khai
              </span>
              <p className="font-semibold text-slate-900">{getDeploymentLabel(offering.deploymentModel)}</p>
            </div>

            <div>
              <span className="text-slate-500 flex items-center gap-1 mb-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#2F6BFF]" />
                Địa bàn hoạt động
              </span>
              <p className="font-semibold text-slate-900">
                {offering.locations.length > 0 ? offering.locations.join(', ') : 'Toàn quốc'}
              </p>
            </div>
          </div>

          {/* Categories & Industries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Danh mục công nghệ
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {offering.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Building2 className="w-3 h-3" /> Ngành nghề áp dụng
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {offering.industries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Capabilities */}
          {offering.capabilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Năng lực kỹ thuật cốt lõi
              </h3>
              <ul className="space-y-1.5">
                {offering.capabilities.map((cap, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6BFF] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Problems Solved */}
          {offering.problemsSolved.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Bài toán giải quyết cụ thể
              </h3>
              <ul className="space-y-1.5">
                {offering.problemsSolved.map((prob, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Evidence */}
          {offering.evidence.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Bằng chứng kiểm chứng & Dự án thực tế
              </h3>
              <div className="space-y-1.5 bg-blue-50/40 p-3 rounded-lg border border-blue-100">
                {offering.evidence.map((evi, idx) => (
                  <div key={idx} className="text-xs text-slate-800 flex items-start gap-2">
                    <span className="font-bold text-[#2F6BFF]">✓</span>
                    <span>{evi}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div id="contact-info-section" className="bg-[#17213D] text-white p-4 rounded-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFB800] mb-2">
              Thông tin liên hệ kết nối
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-300" />
                <span>
                  Đại diện: <strong>{offering.contactName || 'Chưa cung cấp'}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-300" />
                <span>
                  Email: <strong>{offering.contactEmail || 'Chưa cung cấp'}</strong>
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-700">
              * Lưu ý: Hồ sơ này được trình diễn trong khuôn khổ sự kiện Techport. Vui lòng liên hệ trực tiếp qua thông tin trên để trao đổi chi tiết.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end shrink-0">
          <button
            id="btn-close-detail-footer"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
