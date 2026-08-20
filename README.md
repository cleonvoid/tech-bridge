# Cầu Nối Công Nghệ

> **“Từ bài toán đến giải pháp phù hợp trong vài phút.”**
> Nền tảng kết nối doanh nghiệp Việt Nam với giải pháp công nghệ, chuyên gia và đối tác triển khai được hỗ trợ bởi Google Gemini AI và Cloud Firestore.

---

## 1. Giới thiệu dự án

**Cầu Nối Công Nghệ** là ứng dụng web full-stack thử nghiệm sự kiện (event prototype) minh họa năng lực của Google AI trong việc giải quyết bài toán chuyển đổi số cho doanh nghiệp Việt Nam:
1. **Dành cho Nhà cung cấp giải pháp / Chuyên gia**: Nhập mô tả năng lực công nghệ bằng tiếng Việt tự nhiên, AI tự động bóc tách thành hồ sơ có cấu trúc, cho phép hiệu chỉnh và lưu trữ an toàn vào Cloud Firestore.
2. **Dành cho Doanh nghiệp**: Nhập bài toán hoặc nhu cầu chuyển đổi số bằng một câu tiếng Việt thông thường, AI phân tích nhu cầu, đối chiếu với toàn bộ kho giải pháp (15 hồ sơ hạt giống mẫu + các hồ sơ mới do người dùng tạo) và thẩm định tối đa 3 giải pháp phù hợp nhất kèm điểm số và bảng so sánh đa chiều.

---

## 2. Luồng kịch bản trình diễn (Demo Story)

Ứng dụng hỗ trợ trọn vẹn kịch bản kết nối 2 chiều:

1. **Bước 1: Nhà cung cấp nhập giải pháp**
   - Chuyển sang tab **"Tôi cung cấp giải pháp"**.
   - Nhập đoạn văn tiếng Việt mô tả giải pháp (hoặc chọn văn bản mẫu có sẵn).
   - Nhấn **"Chuẩn hoá hồ sơ"** để Gemini bóc tách thành các trường dữ liệu (mô hình triển khai, mức độ sẵn sàng, ngân sách, tiến độ, năng lực, bằng chứng kiểm chứng, thông tin liên hệ).
   - Hiệu chỉnh các thông tin và nhấn **"Lưu hồ sơ vào Cloud Firestore"**.

2. **Bước 2: Chuyển sang vai trò Doanh nghiệp**
   - Nhấn nút **"Thử tìm từ phía doanh nghiệp"** hoặc chuyển tab ở thanh điều hướng.
   - Nhập một câu bài toán (ví dụ: *"Nhà máy linh kiện điện tử tại Bình Dương muốn giảm lỗi kiểm tra chất lượng, ngân sách tối đa 500 triệu đồng và cần triển khai trong 12 tuần."*).
   - Nhấn **"Tìm giải pháp phù hợp"**.

3. **Bước 3: Xem kết quả thẩm định & So sánh**
   - Xem khối bóc tách bài toán chuẩn hóa từ AI.
   - Xem tối đa 3 phương án được xếp hạng theo tổng điểm thẩm định (tính bằng công thức trọng số xác định: Bài toán 40%, Ràng buộc 25%, Khả thi 20%, Bằng chứng 15%).
   - Xem bảng so sánh đa chiều các giải pháp và bấm **"Xem chi tiết & Liên hệ"** để mở hồ sơ đầy đủ.

4. **Bước 4: Khôi phục dữ liệu demo**
   - Nhấn nút **"Khôi phục dữ liệu demo"** trên thanh tiêu đề để xóa các hồ sơ người dùng đã tạo trên Firestore và làm mới trạng thái giao diện, bảo toàn 15 hồ sơ hạt giống gốc.

---

## 3. Kiến trúc kỹ thuật

- **Frontend**: React 19 + Tailwind CSS 4 + Lucide Icons + Motion
- **Backend**: Node.js + Express + Google GenAI SDK (`@google/genai` với model `gemini-2.5-flash`)
- **Database & Auth**: Google Cloud Firestore + Firebase Anonymous Authentication
- **Kiểm soát & Đảm bảo chất lượng**:
  - Tính điểm tổng hợp theo công thức toán học nội bộ: `round((relevance*40 + constraintFit*25 + feasibility*20 + evidence*15) / 5)`.
  - Khử trùng và từ chối các ID giải pháp lạ không nằm trong danh mục sự kiện.
  - Ngôn ngữ giao diện tiếng Việt tự nhiên, chuẩn mực thuật ngữ hỗ trợ ra quyết định.

---

## 4. Hướng dẫn cài đặt & Chạy ứng dụng

### 4.1. Cài đặt thư viện
```bash
npm install
```

### 4.2. Cấu hình biến môi trường
Tạo file `.env` từ `.env.example`:
```env
GEMINI_API_KEY="your_gemini_api_key"
```

*Lưu ý:* Khi chạy trên Google AI Studio, `GEMINI_API_KEY` và cấu hình Firestore được tự động tiêm vào ứng dụng thông qua hệ thống quản lý bí mật và `firebase-applet-config.json`.

### 4.3. Cấu hình Firebase & Bảo mật Firestore
- **Cơ chế xác thực**: Sử dụng Firebase Anonymous Authentication tự động khởi tạo ngầm trước khi thực hiện các tác vụ đọc/ghi vào Firestore.
- **Quy tắc Firestore (`firestore.rules`)**:
  - Yêu cầu người dùng đã xác thực (kể cả anonymous) mới có quyền đọc danh sách giải pháp.
  - Khi tạo giải pháp mới, `ownerId` bắt buộc phải khớp với `request.auth.uid` và `source` phải là `'user'`.
  - Không cho phép thay đổi quyền sở hữu (`ownerId`) trong các thao tác cập nhật.
  - Người dùng chỉ được phép xóa các giải pháp do chính mình tạo ra (`ownerId == request.auth.uid`).
  - Mọi bộ sưu tập ngoài quy định đều bị từ chối truy cập mặc định.
- **Chế độ hoạt động không có Firebase**: Nếu chưa có cấu hình Firebase, ứng dụng hiển thị thông báo trạng thái trung thực, vô hiệu hóa tính năng lưu trữ đám mây nhưng vẫn duy trì toàn bộ kịch bản trình diễn thẩm định giải pháp dựa trên 15 hồ sơ hạt giống gốc.

### 4.4. Chạy ở chế độ phát triển
```bash
npm run dev
```
Ứng dụng sẽ khởi động tại `http://localhost:3000`.

### 4.5. Kiểm tra tự động
```bash
# Kiểm tra TypeScript và cú pháp
npm run lint

# Chạy kiểm thử tự động về công thức tính điểm và xác thực ID
npm test

# Kiểm tra build sản xuất
npm run build
```

---

## 5. Cấu trúc thư mục chính

```
├── server.ts                    # Express backend, Gemini API proxy routes (/api/normalize-offering, /api/recommend)
├── firestore.rules              # Quy tắc bảo mật Firestore
├── firebase-blueprint.json      # Bản thiết kế lược đồ dữ liệu Firestore
├── metadata.json                # Thông tin định danh và quyền ứng dụng
├── src/
│   ├── main.tsx                 # Điểm vào React
│   ├── App.tsx                  # Điều phối trạng thái chính, danh mục và modal
│   ├── types.ts                 # Định nghĩa TypeScript và hàm calculateTotalScore
│   ├── lib/
│   │   └── firebase.ts          # Kết nối Firestore & Anonymous Auth
│   ├── data/
│   │   └── seedOfferings.ts     # 15 hồ sơ giải pháp hạt giống bất biến
│   ├── components/
│   │   ├── Navbar.tsx           # Thanh điều hướng, chuyển đổi vai trò, đếm giải pháp, nút reset
│   │   ├── BusinessView.tsx     # Giao diện doanh nghiệp: tìm kiếm, thẩm định, thẻ gợi ý
│   │   ├── ProviderView.tsx     # Giao diện nhà cung cấp: nhập văn bản, chuẩn hóa, lưu Firestore
│   │   ├── ComparisonTable.tsx  # Bảng so sánh đa chiều các giải pháp
│   │   ├── OfferingDetailModal.tsx # Modal xem chi tiết hồ sơ giải pháp & liên hệ
│   │   ├── ResetDemoModal.tsx   # Modal xác nhận khôi phục dữ liệu demo
│   │   └── FirebaseNotice.tsx   # Thanh thông báo trạng thái kết nối Firestore
│   └── test/
│       └── minimalChecks.ts     # Bộ kiểm thử đơn vị logic điểm số & danh mục
└── dist/                        # Thư mục build sản xuất
```
