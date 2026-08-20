import React, { useState } from 'react';
import {
  Wand2,
  Save,
  CheckCircle,
  AlertCircle,
  Building2,
  Layers,
  Clock,
  DollarSign,
  MapPin,
  Tag,
  Shield,
  User,
  Mail,
  ArrowRight,
  Loader2,
  Info,
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { TechnologyOffering, DeploymentModel, ReadinessLevel } from '../types';
import { saveOfferingToFirestore, isFirebaseAvailable, auth } from '../lib/firebase';

interface ProviderViewProps {
  onOfferingSaved: (newOffering: TechnologyOffering) => void;
  onSwitchToBusiness: () => void;
}

const SAMPLE_PROVIDER_TEXT =
  'Chúng tôi cung cấp hệ thống camera AI kiểm tra lỗi bề mặt linh kiện trên dây chuyền sản xuất. Giải pháp có thể triển khai tại nhà máy, đã thử nghiệm với dữ liệu hình ảnh thực tế và thường cần khoảng 8 đến 10 tuần.';

export const ProviderView: React.FC<ProviderViewProps> = ({
  onOfferingSaved,
  onSwitchToBusiness,
}) => {
  const [rawText, setRawText] = useState(SAMPLE_PROVIDER_TEXT);
  const [isNormalizing, setIsNormalizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [normalizeError, setNormalizeError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Normalized editable form data
  const [formData, setFormData] = useState<Omit<
    TechnologyOffering,
    'id' | 'ownerId' | 'source' | 'createdAt'
  > | null>(null);
  const [missingInfo, setMissingInfo] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<'low' | 'medium' | 'high'>('medium');
  const [savedOffering, setSavedOffering] = useState<TechnologyOffering | null>(null);

  // Normalization action
  const handleNormalize = async () => {
    if (!rawText.trim()) {
      setNormalizeError('Vui lòng nhập nội dung mô tả giải pháp của bạn.');
      return;
    }

    setIsNormalizing(true);
    setNormalizeError(null);
    setSavedOffering(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch('/api/normalize-offering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawDescription: rawText.trim() }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Lỗi chuẩn hóa (${response.status})`);
      }

      const data = await response.json();
      setFormData(data.normalizedOffering);
      setMissingInfo(data.missingInformation || []);
      setConfidence(data.confidence || 'medium');
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Lỗi chuẩn hóa giải pháp:', err);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setNormalizeError('Quá trình chuẩn hóa mất nhiều thời gian hơn dự kiến (quá thời gian chờ). Vui lòng thử lại.');
      } else {
        setNormalizeError(
          err instanceof Error ? err.message : 'Không thể chuẩn hóa giải pháp. Vui lòng thử lại.'
        );
      }
    } finally {
      setIsNormalizing(false);
    }
  };

  // Form input change helpers
  const handleFieldChange = (
    field: keyof Omit<TechnologyOffering, 'id' | 'ownerId' | 'source' | 'createdAt'>,
    value: any
  ) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleArrayFieldChange = (
    field: 'categories' | 'industries' | 'problemsSolved' | 'capabilities' | 'locations' | 'evidence',
    index: number,
    value: string
  ) => {
    if (!formData) return;
    const list = [...formData[field]];
    list[index] = value;
    setFormData({ ...formData, [field]: list });
  };

  const handleAddArrayItem = (
    field: 'categories' | 'industries' | 'problemsSolved' | 'capabilities' | 'locations' | 'evidence'
  ) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const handleRemoveArrayItem = (
    field: 'categories' | 'industries' | 'problemsSolved' | 'capabilities' | 'locations' | 'evidence',
    index: number
  ) => {
    if (!formData) return;
    const list = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: list });
  };

  // Save to Firestore action
  const handleSaveOffering = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || savedOffering) return;

    // Validation of required fields
    if (!formData.organizationName.trim()) {
      setSaveError('Vui lòng nhập Tên tổ chức/doanh nghiệp cung cấp giải pháp.');
      return;
    }
    if (!formData.solutionName.trim()) {
      setSaveError('Vui lòng nhập Tên giải pháp công nghệ.');
      return;
    }
    if (!formData.summary.trim()) {
      setSaveError('Vui lòng nhập Tóm tắt giải pháp.');
      return;
    }
    if (!formData.contactName.trim()) {
      setSaveError('Vui lòng nhập Tên người liên hệ đại diện.');
      return;
    }
    if (!formData.contactEmail.trim() || !formData.contactEmail.includes('@')) {
      setSaveError('Vui lòng nhập Email liên hệ hợp lệ.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    const offeringId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const currentUserId = auth?.currentUser?.uid || 'anonymous-user';

    const newOffering: TechnologyOffering = {
      ...formData,
      id: offeringId,
      ownerId: currentUserId,
      source: 'user',
      createdAt: new Date().toISOString(),
      // Filter empty strings in arrays
      categories: formData.categories.filter((s) => s.trim() !== ''),
      industries: formData.industries.filter((s) => s.trim() !== ''),
      problemsSolved: formData.problemsSolved.filter((s) => s.trim() !== ''),
      capabilities: formData.capabilities.filter((s) => s.trim() !== ''),
      locations: formData.locations.filter((s) => s.trim() !== ''),
      evidence: formData.evidence.filter((s) => s.trim() !== ''),
    };

    try {
      let finalOffering = newOffering;
      if (isFirebaseAvailable()) {
        finalOffering = await saveOfferingToFirestore(newOffering);
      } else {
        console.warn('Firebase chưa cấu hình, lưu vào trạng thái phiên làm việc cục bộ.');
      }

      setSavedOffering(finalOffering);
      onOfferingSaved(finalOffering);
    } catch (err) {
      console.error('Lỗi khi lưu Firestore:', err);
      // If Firestore fails, still notify user clearly
      setSaveError(
        err instanceof Error
          ? `Lỗi lưu trữ: ${err.message}`
          : 'Không thể lưu hồ sơ vào Cloud Firestore. Vui lòng kiểm tra quyền hoặc kết nối.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3-Step Flow Breadcrumb/Progress */}
      <div
        id="provider-flow-steps"
        className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex items-center justify-between gap-2 overflow-x-auto text-xs"
        role="navigation"
        aria-label="Tiến trình đăng ký giải pháp của nhà cung cấp"
      >
        <div className="flex items-center gap-2 font-medium shrink-0">
          <span className="w-5 h-5 rounded-full bg-[#2F6BFF] text-white flex items-center justify-center text-[11px] font-bold">
            1
          </span>
          <span className="text-slate-900 font-semibold">1. Mô tả năng lực</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <div
          className={`flex items-center gap-2 font-medium shrink-0 ${
            formData ? 'text-slate-900 font-semibold' : 'text-slate-400'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              formData ? 'bg-[#2F6BFF] text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            2
          </span>
          <span>2. Rà soát & Hiệu chỉnh</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <div
          className={`flex items-center gap-2 font-medium shrink-0 ${
            savedOffering ? 'text-slate-900 font-semibold' : 'text-slate-400'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              savedOffering ? 'bg-[#2F6BFF] text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            3
          </span>
          <span>3. Lưu vào kho giải pháp</span>
        </div>
      </div>

      {/* Intro Header & Text Area */}
      <section
        id="provider-input-card"
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-7"
      >
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2F6BFF] mb-1 block">
            Bước 1 • Dành cho nhà cung cấp giải pháp & chuyên gia
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Mô tả năng lực công nghệ bằng ngôn ngữ tự nhiên
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Nhập đoạn giới thiệu giải pháp bằng tiếng Việt thông thường. Google AI sẽ trích xuất thành hồ sơ có cấu trúc, chỉ ra những thông tin còn thiếu và cho phép bạn hiệu chỉnh trước khi lưu vào kho giải pháp.
          </p>
        </div>

        {/* Text area */}
        <div className="mt-4">
          <label htmlFor="raw-offering-description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Mô tả giải pháp tự do (Tối đa 4.000 ký tự)
          </label>
          <div className="relative">
            <textarea
              id="raw-offering-description"
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Nhập mô tả giải pháp của bạn..."
              className="w-full p-3.5 sm:p-4 text-sm sm:text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2F6BFF] focus:border-[#2F6BFF] outline-hidden text-slate-900 placeholder:text-slate-400 bg-slate-50/40 focus:bg-white resize-y"
              maxLength={4000}
            />
            <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-400 pointer-events-none">
              {rawText.length}/4.000 ký tự
            </div>
          </div>
        </div>

        {/* Sample button */}
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRawText(SAMPLE_PROVIDER_TEXT)}
            className="text-xs text-[#2F6BFF] hover:underline font-medium flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Điền văn bản mẫu kịch bản thử nghiệm</span>
          </button>

          <button
            id="btn-normalize-offering"
            type="button"
            onClick={handleNormalize}
            disabled={isNormalizing}
            className="px-5 py-2.5 bg-[#2F6BFF] hover:bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isNormalizing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang trích xuất dữ liệu...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Chuẩn hoá hồ sơ</span>
              </>
            )}
          </button>
        </div>

        {normalizeError && (
          <div
            role="alert"
            className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{normalizeError}</span>
          </div>
        )}
      </section>

      {/* Editable Form Rendered from Gemini */}
      {formData && (
        <form
          id="provider-edit-form"
          onSubmit={handleSaveOffering}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6"
        >
          {/* Header of Form */}
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Hồ sơ giải pháp đã chuẩn hóa
                </h3>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    confidence === 'high'
                      ? 'bg-emerald-100 text-emerald-800'
                      : confidence === 'medium'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Độ đầy đủ: {confidence === 'high' ? 'Cao' : confidence === 'medium' ? 'Trung bình' : 'Sơ sài'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Vui lòng kiểm tra và bổ sung các trường thông tin còn thiếu trước khi lưu vào kho giải pháp.
              </p>
            </div>

            <button
              type="button"
              onClick={handleNormalize}
              disabled={isNormalizing}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 self-start sm:self-center cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Chuẩn hóa lại</span>
            </button>
          </div>

          {/* Missing info highlight banner */}
          {missingInfo.length > 0 && (
            <div id="missing-info-banner" className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900">
              <div className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                <Info className="w-4 h-4 text-amber-600" />
                <span>Thông tin còn thiếu từ mô tả ban đầu (Cần bổ sung):</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 text-amber-800">
                {missingInfo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="space-y-4 text-sm text-slate-800">
            {/* Org Name & Solution Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tên tổ chức / Doanh nghiệp <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={(e) => handleFieldChange('organizationName', e.target.value)}
                  placeholder="Ví dụ: Công ty CP Công nghệ ABC"
                  className={`w-full p-2.5 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#2F6BFF] outline-hidden ${
                    !formData.organizationName ? 'border-amber-400 bg-amber-50/30' : 'border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tên giải pháp công nghệ <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.solutionName}
                  onChange={(e) => handleFieldChange('solutionName', e.target.value)}
                  placeholder="Ví dụ: Hệ thống AI Camera kiểm tra lỗi bề mặt"
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tóm tắt giải pháp <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={formData.summary}
                onChange={(e) => handleFieldChange('summary', e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
              />
            </div>

            {/* Deployment Model & Readiness Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mô hình triển khai <span className="text-rose-600">*</span>
                </label>
                <select
                  value={formData.deploymentModel}
                  onChange={(e) => handleFieldChange('deploymentModel', e.target.value as DeploymentModel)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                >
                  <option value="on-premise">Cài đặt tại chỗ (On-Premise)</option>
                  <option value="cloud">Đám mây (Cloud SaaS)</option>
                  <option value="hybrid">Mô hình lai (Hybrid)</option>
                  <option value="consulting">Tư vấn & Chuyển giao</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mức độ sẵn sàng <span className="text-rose-600">*</span>
                </label>
                <select
                  value={formData.readinessLevel}
                  onChange={(e) => handleFieldChange('readinessLevel', e.target.value as ReadinessLevel)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                >
                  <option value="commercial">Thương mại hóa diện rộng</option>
                  <option value="deployment-ready">Sẵn sàng triển khai</option>
                  <option value="pilot-ready">Sẵn sàng thử nghiệm (Pilot)</option>
                  <option value="prototype">Nguyên mẫu thử nghiệm</option>
                </select>
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Ngân sách Min (triệu VNĐ)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.budgetMinMillionVND ?? ''}
                  onChange={(e) =>
                    handleFieldChange(
                      'budgetMinMillionVND',
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ví dụ: 200"
                  className="w-full p-2 text-xs border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Ngân sách Max (triệu VNĐ)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.budgetMaxMillionVND ?? ''}
                  onChange={(e) =>
                    handleFieldChange(
                      'budgetMaxMillionVND',
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ví dụ: 450"
                  className="w-full p-2 text-xs border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Tiến độ Min (tuần)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.implementationWeeksMin ?? ''}
                  onChange={(e) =>
                    handleFieldChange(
                      'implementationWeeksMin',
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ví dụ: 8"
                  className="w-full p-2 text-xs border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Tiến độ Max (tuần)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.implementationWeeksMax ?? ''}
                  onChange={(e) =>
                    handleFieldChange(
                      'implementationWeeksMax',
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ví dụ: 10"
                  className="w-full p-2 text-xs border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50/40 p-4 rounded-lg border border-blue-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Họ tên người liên hệ <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => handleFieldChange('contactName', e.target.value)}
                  placeholder="Ví dụ: Kỹ sư Nguyễn Văn A"
                  className={`w-full p-2.5 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#2F6BFF] bg-white outline-hidden ${
                    !formData.contactName ? 'border-amber-400 bg-amber-50/30' : 'border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email liên hệ <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                  placeholder="Ví dụ: contact@congty.vn"
                  className={`w-full p-2.5 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-[#2F6BFF] bg-white outline-hidden ${
                    !formData.contactEmail ? 'border-amber-400 bg-amber-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
            </div>

            {/* Dynamic Array: Capabilities */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Năng lực kỹ thuật cốt lõi
                </label>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('capabilities')}
                  className="text-xs text-[#2F6BFF] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Thêm tính năng
                </button>
              </div>
              <div className="space-y-1.5">
                {formData.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cap}
                      onChange={(e) => handleArrayFieldChange('capabilities', idx, e.target.value)}
                      placeholder="Mô tả năng lực cốt lõi..."
                      className="flex-1 p-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('capabilities', idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Array: Evidence */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Bằng chứng kiểm chứng & Thử nghiệm thực tế
                </label>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('evidence')}
                  className="text-xs text-[#2F6BFF] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Thêm bằng chứng
                </button>
              </div>
              <div className="space-y-1.5">
                {formData.evidence.map((evi, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={evi}
                      onChange={(e) => handleArrayFieldChange('evidence', idx, e.target.value)}
                      placeholder="Ví dụ: Đã thử nghiệm hình ảnh với tỷ lệ chính xác 99.2%..."
                      className="flex-1 p-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#2F6BFF] outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('evidence', idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {saveError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{saveError}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              id="btn-save-offering-firestore"
              type="submit"
              disabled={isSaving || Boolean(savedOffering)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang lưu vào kho giải pháp...</span>
                </>
              ) : savedOffering ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Đã lưu vào kho giải pháp</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu hồ sơ vào Cloud Firestore</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Success Notification & Next Action Card */}
      {savedOffering && (
        <section
          id="provider-saved-success-card"
          className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4 animate-in fade-in"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-950">
                Đã lưu hồ sơ giải pháp thành công!
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                Giải pháp “<strong>{savedOffering.solutionName}</strong>” của <strong>{savedOffering.organizationName}</strong> đã được đồng bộ vào kho dữ liệu thẩm định.
              </p>
            </div>
          </div>

          <div className="bg-white/80 p-3.5 rounded-lg border border-emerald-100 text-xs text-slate-700 space-y-1">
            <p>
              ✓ Giải pháp của bạn hiện đã đủ điều kiện xuất hiện trong kết quả gợi ý khi doanh nghiệp đưa ra bài toán phù hợp.
            </p>
            <p>
              ✓ Phiên làm việc của bạn được lưu trữ an toàn với định danh ẩn danh tự động.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-600">
              Bước tiếp theo: Thử nghiệm tìm kiếm từ vai trò doanh nghiệp để kiểm chứng kết quả đề xuất.
            </span>

            <button
              id="btn-switch-to-business-demo"
              type="button"
              onClick={onSwitchToBusiness}
              className="px-5 py-2 bg-[#2F6BFF] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Thử tìm từ phía doanh nghiệp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
