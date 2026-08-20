import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Building2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
  DollarSign,
  ArrowRight,
  Info,
  Edit3,
  Loader2,
  FileCheck,
  ChevronRight,
  Eye,
  Sliders
} from 'lucide-react';
import { TechnologyNeed, Recommendation, TechnologyOffering } from '../types';
import { ComparisonTable } from './ComparisonTable';

interface BusinessViewProps {
  catalog: TechnologyOffering[];
  catalogMap: Map<string, TechnologyOffering>;
  onSelectOffering: (offering: TechnologyOffering) => void;
}

const SAMPLE_QUERIES = [
  {
    id: 'sample-1',
    label: 'Nhà máy điện tử Bình Dương (Demo)',
    query:
      'Nhà máy linh kiện điện tử tại Bình Dương muốn giảm lỗi kiểm tra chất lượng, ngân sách tối đa 500 triệu đồng và cần triển khai trong 12 tuần.',
  },
  {
    id: 'sample-2',
    label: 'Nông nghiệp thông minh Đắk Lắk',
    query:
      'Hợp tác xã nông nghiệp tại Đắk Lắk cần giám sát độ ẩm đất và tự động hóa tưới tiêu cho 50 hecta sầu riêng, ngân sách dưới 200 triệu.',
  },
  {
    id: 'sample-3',
    label: 'Tối ưu lộ trình vận tải TP.HCM',
    query:
      'Doanh nghiệp phân phối hàng tiêu dùng tại TP.HCM muốn tối ưu lộ trình giao hàng 30 xe tải để giảm chi phí nhiên liệu và thời gian giao.',
  },
];

export const BusinessView: React.FC<BusinessViewProps> = ({
  catalog,
  catalogMap,
  onSelectOffering,
}) => {
  const [needInput, setNeedInput] = useState(
    'Nhà máy linh kiện điện tử tại Bình Dương muốn giảm lỗi kiểm tra chất lượng, ngân sách tối đa 500 triệu đồng và cần triển khai trong 12 tuần.'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [normalizedNeed, setNormalizedNeed] = useState<TechnologyNeed | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);

  const handleSearch = async (queryText?: string) => {
    const textToSearch = (queryText !== undefined ? queryText : needInput).trim();
    if (!textToSearch) {
      setError('Vui lòng nhập mô tả bài toán hoặc nhu cầu của doanh nghiệp.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingStep('Đang phân tích bài toán và bóc tách các tiêu chí...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      // Step update for user visibility
      setTimeout(() => {
        setLoadingStep('Đang đối chiếu danh mục giải pháp và thẩm định độ phù hợp...');
      }, 700);

      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          needText: textToSearch,
          catalog: catalog,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Yêu cầu thất bại (${response.status})`);
      }

      const data = await response.json();
      setNormalizedNeed(data.normalizedNeed);
      setRecommendations(data.recommendations || []);
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Lỗi khi thẩm định:', err);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Quá trình thẩm định mất nhiều thời gian hơn dự kiến (quá thời gian chờ). Vui lòng thử lại.');
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Không thể kết nối đến máy chủ phân tích. Vui lòng kiểm tra lại.'
        );
      }
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleUseSample = (sampleText: string) => {
    setNeedInput(sampleText);
    handleSearch(sampleText);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 65) return 'text-[#2F6BFF] bg-blue-50 border-blue-200';
    return 'text-amber-700 bg-amber-50 border-amber-200';
  };

  return (
    <div className="space-y-6">
      {/* 3-Step Flow Breadcrumb/Progress */}
      <div
        id="business-flow-steps"
        className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex items-center justify-between gap-2 overflow-x-auto text-xs"
        role="navigation"
        aria-label="Tiến trình thẩm định bài toán doanh nghiệp"
      >
        <div className="flex items-center gap-2 font-medium shrink-0">
          <span className="w-5 h-5 rounded-full bg-[#2F6BFF] text-white flex items-center justify-center text-[11px] font-bold">
            1
          </span>
          <span className="text-slate-900 font-semibold">1. Nhập bài toán</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <div
          className={`flex items-center gap-2 font-medium shrink-0 ${
            normalizedNeed ? 'text-slate-900 font-semibold' : 'text-slate-400'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              normalizedNeed ? 'bg-[#2F6BFF] text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            2
          </span>
          <span>2. AI bóc tách nhu cầu</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <div
          className={`flex items-center gap-2 font-medium shrink-0 ${
            recommendations ? 'text-slate-900 font-semibold' : 'text-slate-400'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              recommendations ? 'bg-[#2F6BFF] text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            3
          </span>
          <span>3. Đối chiếu & So sánh</span>
        </div>
      </div>

      {/* Search Input Section */}
      <section
        id="business-search-card"
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-7"
      >
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2F6BFF] mb-1 block">
            Bước 1 • Dành cho doanh nghiệp
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Doanh nghiệp của bạn đang cần giải quyết vấn đề gì?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Mô tả bằng một câu tiếng Việt thông thường. Google AI sẽ bóc tách yêu cầu, đối soát kho giải pháp và đề xuất tối đa 3 phương án khả thi nhất kèm bảng so sánh.
          </p>
        </div>

        {/* Text Area */}
        <div className="mt-4">
          <label htmlFor="need-text-input" className="sr-only">
            Nội dung bài toán doanh nghiệp
          </label>
          <div className="relative">
            <textarea
              id="need-text-input"
              rows={3}
              value={needInput}
              onChange={(e) => setNeedInput(e.target.value)}
              placeholder="Ví dụ: Nhà máy linh kiện điện tử tại Bình Dương muốn giảm lỗi kiểm tra chất lượng, ngân sách tối đa 500 triệu đồng và cần triển khai trong 12 tuần."
              className="w-full p-3.5 sm:p-4 text-sm sm:text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2F6BFF] focus:border-[#2F6BFF] outline-hidden text-slate-900 placeholder:text-slate-400 bg-slate-50/40 focus:bg-white resize-y"
              maxLength={2000}
            />
            <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-400 pointer-events-none">
              {needInput.length}/2.000 ký tự
            </div>
          </div>
        </div>

        {/* Sample queries */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            Gợi ý câu hỏi mẫu:
          </span>
          {SAMPLE_QUERIES.map((sample) => (
            <button
              key={sample.id}
              id={`btn-${sample.id}`}
              type="button"
              onClick={() => handleUseSample(sample.query)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer text-left border border-slate-200/80"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            * Thẩm định đối soát trên toàn bộ <strong>{catalog.length}</strong> giải pháp khả dụng trong kho dữ liệu.
          </div>

          <button
            id="btn-find-solutions"
            type="button"
            onClick={() => handleSearch()}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#2F6BFF] hover:bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang thẩm định giải pháp...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Tìm giải pháp phù hợp</span>
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mt-4 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 flex items-start gap-2.5"
          >
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold">Đã có lỗi xảy ra:</span> {error}
            </div>
            <button
              onClick={() => handleSearch()}
              className="text-xs font-semibold text-rose-700 underline hover:text-rose-900 cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        )}
      </section>

      {/* Loading state indicator */}
      {isLoading && (
        <div
          id="evaluation-loading-box"
          aria-live="polite"
          aria-busy="true"
          className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2F6BFF] flex items-center justify-center mx-auto mb-3">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Google AI đang xử lý bài toán
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            {loadingStep || 'Đang phân tích cấu trúc bài toán và so khớp các giải pháp khả thi...'}
          </p>
        </div>
      )}

      {/* Results View */}
      {!isLoading && normalizedNeed && recommendations && (
        <div id="discovery-results-container" className="space-y-8">
          {/* Normalized Understanding of Need */}
          <section
            id="normalized-need-card"
            className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-800"
          >
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#FFB800]" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Bóc tách bài toán từ AI (Chuẩn hóa nhu cầu)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                Đã chuẩn hóa từ mô tả của bạn
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Problem & Goals */}
              <div className="space-y-2">
                <div>
                  <span className="text-slate-400 block font-medium">Vấn đề cốt lõi:</span>
                  <p className="text-slate-100 font-semibold text-sm mt-0.5 leading-snug">
                    {normalizedNeed.problem}
                  </p>
                </div>

                {normalizedNeed.goals.length > 0 && (
                  <div>
                    <span className="text-slate-400 block font-medium">Mục tiêu mong muốn:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-200 mt-0.5">
                      {normalizedNeed.goals.map((g, idx) => (
                        <li key={idx}>{g}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <span className="text-slate-400 block font-medium">Ràng buộc & Yêu cầu:</span>
                <div className="grid grid-cols-2 gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Ngân sách trần:</span>
                    <strong className="text-[#FFB800] text-xs">
                      {normalizedNeed.budgetMaxMillionVND
                        ? `${normalizedNeed.budgetMaxMillionVND} triệu VNĐ`
                        : 'Không giới hạn'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Tiến độ tối đa:</span>
                    <strong className="text-[#FFB800] text-xs">
                      {normalizedNeed.desiredTimelineWeeks
                        ? `${normalizedNeed.desiredTimelineWeeks} tuần`
                        : 'Linh hoạt'}
                    </strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[11px] text-slate-400 block">Địa bàn:</span>
                    <span className="text-slate-200 text-xs">
                      {normalizedNeed.location || 'Toàn quốc'}
                    </span>
                  </div>
                </div>

                {normalizedNeed.mustHaves.length > 0 && (
                  <div className="mt-1">
                    <span className="text-slate-400 text-[11px] block">Tiêu chí tiên quyết:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {normalizedNeed.mustHaves.map((m, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[11px] border border-slate-700"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Assumptions & Missing Info */}
              <div className="space-y-2">
                {normalizedNeed.assumptions.length > 0 && (
                  <div>
                    <span className="text-slate-400 block font-medium">Giả định phân tích:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-[11px]">
                      {normalizedNeed.assumptions.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {normalizedNeed.missingInformation.length > 0 && (
                  <div className="bg-amber-950/40 border border-amber-700/40 p-2.5 rounded-lg text-amber-200 text-[11px]">
                    <span className="font-semibold block text-amber-300 flex items-center gap-1 mb-0.5">
                      <Info className="w-3 h-3" /> Thông tin còn thiếu từ bài toán:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {normalizedNeed.missingInformation.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Recommendations Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Các giải pháp phù hợp nhất ({recommendations.length}/3 phương án)
              </h3>
              <p className="text-xs text-slate-600">
                Thứ hạng được sắp xếp theo tổng điểm thẩm định đa chiều từ cao xuống thấp.
              </p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('comparison-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-[#2F6BFF] hover:underline flex items-center gap-1 self-start sm:self-center"
            >
              <span>Xem bảng so sánh chi tiết</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recommendations Cards Grid */}
          {recommendations.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <h4 className="font-bold text-base text-slate-800">
                Không tìm thấy giải pháp thỏa mãn toàn bộ tiêu chí
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Không có giải pháp nào trong danh mục hiện tại đáp ứng đủ độ tin cậy để đề xuất cho bài toán này. Hãy thử nới lỏng ngân sách hoặc điều chỉnh tiến độ.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {recommendations.map((rec, index) => {
                const offering = catalogMap.get(rec.offeringId);
                const isTop1 = index === 0;

                return (
                  <div
                    key={rec.offeringId}
                    id={`recommendation-card-${index + 1}`}
                    className={`bg-white rounded-xl border transition-all flex flex-col justify-between shadow-xs ${
                      isTop1
                        ? 'border-[#2F6BFF] ring-2 ring-[#2F6BFF]/20 relative'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isTop1 && (
                      <div className="absolute -top-3 left-4 bg-[#2F6BFF] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#FFB800]" />
                        Phương án tối ưu nhất
                      </div>
                    )}

                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Rank & Score Header */}
                      <div className="flex items-start justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                            #{index + 1}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              offering?.source === 'seed'
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {offering?.source === 'seed' ? 'Hạt giống' : 'Mới tạo'}
                          </span>
                        </div>

                        {/* Total Score Badge */}
                        <div
                          className={`px-3 py-1.5 rounded-lg border text-center ${getScoreColor(
                            rec.totalScore
                          )}`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                            Điểm phù hợp
                          </span>
                          <span className="text-xl font-extrabold leading-none">
                            {rec.totalScore}
                            <span className="text-xs font-normal">/100</span>
                          </span>
                        </div>
                      </div>

                      {/* Solution Title & Org */}
                      <div>
                        <h4 className="font-bold text-base text-slate-900 leading-snug">
                          {offering?.solutionName || rec.offeringId}
                        </h4>
                        <p className="text-xs font-medium text-slate-600 flex items-center gap-1.5 mt-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{offering?.organizationName || 'Tổ chức công nghệ'}</span>
                        </p>
                      </div>

                      {/* 4 Component Scores Bar */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1.5 text-xs">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Điểm thành phần (Thang 5):
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Bài toán (40%):</span>
                            <span className="font-bold text-[#2F6BFF]">
                              {rec.relevanceScore}/5
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Ràng buộc (25%):</span>
                            <span className="font-bold text-slate-800">
                              {rec.constraintFitScore}/5
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Khả thi (20%):</span>
                            <span className="font-bold text-slate-800">
                              {rec.feasibilityScore}/5
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Bằng chứng (15%):</span>
                            <span className="font-bold text-slate-800">
                              {rec.evidenceScore}/5
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Reasons */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                          Lý do phù hợp:
                        </span>
                        <ul className="space-y-1.5">
                          {rec.reasons.map((r, idx) => (
                            <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Catalog Evidence */}
                      {rec.catalogEvidence.length > 0 && (
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Bằng chứng từ hồ sơ:
                          </span>
                          <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
                            {rec.catalogEvidence.map((evi, idx) => (
                              <div key={idx} className="flex items-start gap-1.5">
                                <span className="text-[#2F6BFF] font-bold">✓</span>
                                <span>{evi}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cautions */}
                      {rec.cautions.length > 0 && (
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                            Điểm cần lưu ý:
                          </span>
                          <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/80 text-xs text-amber-900 space-y-1">
                            {rec.cautions.map((c, idx) => (
                              <div key={idx} className="flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <span>{c}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Meta: Budget & Timeline */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Ngân sách:</span>
                          <span className="font-semibold text-slate-800">
                            {offering?.budgetMinMillionVND || offering?.budgetMaxMillionVND
                              ? `${offering.budgetMinMillionVND ?? '...'} - ${offering.budgetMaxMillionVND ?? '...'} tr`
                              : 'Thỏa thuận'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Thời gian:</span>
                          <span className="font-semibold text-slate-800">
                            {offering?.implementationWeeksMin || offering?.implementationWeeksMax
                              ? `${offering.implementationWeeksMin ?? '...'} - ${offering.implementationWeeksMax ?? '...'} tuần`
                              : 'Linh hoạt'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200/80 rounded-b-xl flex items-center justify-between gap-2">
                      <button
                        onClick={() => offering && onSelectOffering(offering)}
                        disabled={!offering}
                        className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#2F6BFF]" />
                        <span>Xem chi tiết & Liên hệ</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Comparison Table Section */}
          <ComparisonTable
            recommendations={recommendations}
            catalogMap={catalogMap}
            onSelectOffering={onSelectOffering}
          />
        </div>
      )}
    </div>
  );
};
