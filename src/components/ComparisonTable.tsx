import React from 'react';
import { Recommendation, TechnologyOffering } from '../types';
import { Award, AlertCircle, HelpCircle, CheckCircle, Shield } from 'lucide-react';

interface ComparisonTableProps {
  recommendations: Recommendation[];
  catalogMap: Map<string, TechnologyOffering>;
  onSelectOffering: (offering: TechnologyOffering) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  recommendations,
  catalogMap,
  onSelectOffering,
}) => {
  if (recommendations.length === 0) return null;

  return (
    <div id="comparison-section" className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-[#2F6BFF]" />
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          So sánh các lựa chọn phù hợp
        </h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Bảng so sánh đa chiều giữa các phương án được Google AI thẩm định dựa trên hồ sơ sự thật trong kho giải pháp.
      </p>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-3.5 font-bold text-slate-700 w-44 min-w-40 border-r border-slate-200 sticky left-0 bg-slate-50 z-10">
                Tiêu chí đánh giá
              </th>
              {recommendations.map((rec, index) => {
                const offering = catalogMap.get(rec.offeringId);
                return (
                  <th key={rec.offeringId} className="p-3.5 font-semibold text-slate-900 min-w-64 border-r border-slate-200 last:border-r-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-bold text-[#2F6BFF] bg-blue-50 px-2 py-0.5 rounded">
                        Lựa chọn #{index + 1}
                      </span>
                      <span className="font-bold text-slate-900 bg-[#FFB800]/20 text-slate-900 px-2 py-0.5 rounded text-xs">
                        {rec.totalScore}/100 điểm
                      </span>
                    </div>
                    <div className="font-bold text-sm text-slate-900 line-clamp-1">
                      {offering?.solutionName || rec.offeringId}
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                      {offering?.organizationName || 'Nhà cung cấp'}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {/* Row: Điểm thành phần */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Điểm thành phần (Thang 5)
              </td>
              {recommendations.map((rec) => (
                <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0">
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-500 block">Bài toán (40%):</span>
                      <strong className="text-[#2F6BFF]">{rec.relevanceScore}/5</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-500 block">Ràng buộc (25%):</span>
                      <strong className="text-slate-800">{rec.constraintFitScore}/5</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-500 block">Khả thi (20%):</span>
                      <strong className="text-slate-800">{rec.feasibilityScore}/5</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-500 block">Bằng chứng (15%):</span>
                      <strong className="text-slate-800">{rec.evidenceScore}/5</strong>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            {/* Row: Mô hình triển khai */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Mô hình triển khai
              </td>
              {recommendations.map((rec) => {
                const offering = catalogMap.get(rec.offeringId);
                return (
                  <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0 font-medium">
                    <span className="capitalize">{offering?.deploymentModel || 'Chưa rõ'}</span>
                  </td>
                );
              })}
            </tr>

            {/* Row: Ngân sách ước tính */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Ngân sách ước tính
              </td>
              {recommendations.map((rec) => {
                const offering = catalogMap.get(rec.offeringId);
                return (
                  <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0">
                    {offering?.budgetMinMillionVND || offering?.budgetMaxMillionVND
                      ? `${offering.budgetMinMillionVND ?? '...'} - ${offering.budgetMaxMillionVND ?? '...'} triệu VNĐ`
                      : 'Chưa công bố giá'}
                  </td>
                );
              })}
            </tr>

            {/* Row: Thời gian triển khai */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Tiến độ triển khai
              </td>
              {recommendations.map((rec) => {
                const offering = catalogMap.get(rec.offeringId);
                return (
                  <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0">
                    {offering?.implementationWeeksMin || offering?.implementationWeeksMax
                      ? `${offering.implementationWeeksMin ?? '...'} - ${offering.implementationWeeksMax ?? '...'} tuần`
                      : 'Chưa công bố tiến độ'}
                  </td>
                );
              })}
            </tr>

            {/* Row: Mức độ sẵn sàng */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Mức độ sẵn sàng
              </td>
              {recommendations.map((rec) => {
                const offering = catalogMap.get(rec.offeringId);
                return (
                  <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {offering?.readinessLevel === 'commercial'
                        ? 'Thương mại hóa'
                        : offering?.readinessLevel === 'deployment-ready'
                        ? 'Sẵn sàng triển khai'
                        : offering?.readinessLevel === 'pilot-ready'
                        ? 'Thử nghiệm (Pilot)'
                        : 'Nguyên mẫu'}
                    </span>
                  </td>
                );
              })}
            </tr>

            {/* Row: Bằng chứng thực tế */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Bằng chứng kiểm chứng
              </td>
              {recommendations.map((rec) => (
                <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0">
                  <ul className="space-y-1">
                    {rec.catalogEvidence.map((evi, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{evi}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Row: Điểm lưu ý & Giới hạn */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Điểm cần lưu ý
              </td>
              {recommendations.map((rec) => (
                <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0">
                  <ul className="space-y-1">
                    {rec.cautions.map((cau, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-amber-800 bg-amber-50/60 p-1.5 rounded">
                        <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                        <span>{cau}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Row: Câu hỏi nên trao đổi */}
            <tr className="hover:bg-slate-50/50">
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Câu hỏi nên hỏi nhà cung cấp
              </td>
              {recommendations.map((rec) => (
                <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0">
                  <ul className="space-y-1">
                    {rec.suggestedQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <HelpCircle className="w-3 h-3 text-[#2F6BFF] shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Row: Hành động */}
            <tr>
              <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                Hành động
              </td>
              {recommendations.map((rec) => {
                const offering = catalogMap.get(rec.offeringId);
                return (
                  <td key={rec.offeringId} className="p-3 border-r border-slate-200 last:border-r-0">
                    <button
                      onClick={() => offering && onSelectOffering(offering)}
                      disabled={!offering}
                      className="w-full py-1.5 px-3 bg-slate-900 hover:bg-[#2F6BFF] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      Xem hồ sơ đầy đủ
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
