import { TechnologyOffering } from '../types';

export const SEED_OFFERINGS: readonly TechnologyOffering[] = [
  {
    id: 'seed-01-visionai',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty CP Giải pháp Thị giác Nhân tạo AICheck (Dữ liệu Demo)',
    solutionName: 'AICheck Vision Pro - Hệ thống AI Camera kiểm tra lỗi bề mặt linh kiện',
    summary: 'Giải pháp ứng dụng Computer Vision và Deep Learning để phát hiện lỗi trầy xước, nứt vỡ, sai lệch kích thước trên dây chuyền lắp ráp điện tử tự động với độ chính xác trên 99.2%.',
    categories: ['Computer Vision', 'Trí tuệ nhân tạo', 'Sản xuất thông minh'],
    industries: ['Điện tử & Bán dẫn', 'Cơ khí chính xác', 'Sản xuất linh kiện'],
    problemsSolved: [
      'Giảm tỷ lệ bỏ sót sản phẩm lỗi ngoại quan khi kiểm tra thủ công bằng mắt',
      'Tăng tốc độ kiểm tra chất lượng lên tới 120 sản phẩm/phút',
      'Lưu trữ hồ sơ hình ảnh lỗi phục vụ phân tích nguyên nhân gốc'
    ],
    capabilities: [
      'Phát hiện lỗi bề mặt vi mô (vết xước từ 0.05mm)',
      'Tích hợp trực tiếp với PLC và băng tải loại bỏ sản phẩm NG tự động',
      'Mô hình Deep Learning huấn luyện sẵn cho bo mạch PCB, đầu nối và linh kiện nhựa',
      'Giao diện điều khiển công nghiệp trực quan hỗ trợ tiếng Việt'
    ],
    deploymentModel: 'on-premise',
    budgetMinMillionVND: 250,
    budgetMaxMillionVND: 480,
    implementationWeeksMin: 6,
    implementationWeeksMax: 10,
    locations: ['Bình Dương', 'TP. Hồ Chí Minh', 'Đồng Nai', 'Bắc Ninh', 'Hải Phòng'],
    readinessLevel: 'commercial',
    evidence: [
      'Đã triển khai tại 14 nhà máy linh kiện điện tử và lắp ráp phụ tùng tại KCN VSIP Bình Dương và KCN Amata Đồng Nai',
      'Đạt chứng nhận tiêu chuẩn đo lường và an toàn điện công nghiệp IEC 61010',
      'Tỷ lệ phát hiện lỗi thực tế đạt 99.4% sau 3 tháng vận hành liên tục'
    ],
    contactName: 'KS. Nguyễn Văn Dũng',
    contactEmail: 'dung.nguyen@aicheck-demo.vn',
    createdAt: '2026-01-10T08:00:00Z'
  },
  {
    id: 'seed-02-iot-scada',
    ownerId: null,
    source: 'seed',
    organizationName: 'Viện Công nghệ Tự động hóa SmartMech VN (Dữ liệu Demo)',
    solutionName: 'SmartMech SCADA 4.0 - Nền tảng IoT giám sát hiệu suất thiết bị OEE',
    summary: 'Hệ thống kết nối cảm biến IoT và PLC công nghiệp giúp theo dõi thời gian thực trạng thái máy, cảnh báo dừng máy và tính toán OEE tự động cho phân xưởng dập uốn và đúc ép.',
    categories: ['IoT', 'Sản xuất thông minh', 'Tự động hóa doanh nghiệp'],
    industries: ['Cơ khí chế tạo', 'Sản xuất linh kiện', 'Nhựa & Bao bì'],
    problemsSolved: [
      'Thiếu dữ liệu thời gian thực về thời gian dừng máy (Downtime)',
      'Ghi chép sản lượng thủ công gây sai lệch số liệu ca sản xuất',
      'Khó khăn trong việc xác định điểm nghẽn năng suất dây chuyền'
    ],
    capabilities: [
      'Thu thập dữ liệu từ hơn 30 giao thức công nghiệp (Modbus, OPC UA, Profinet)',
      'Bảng điều khiển trực quan hiển thị OEE, Availability, Performance, Quality',
      'Cảnh báo sự cố tức thì qua loa xưởng và ứng dụng di động'
    ],
    deploymentModel: 'hybrid',
    budgetMinMillionVND: 180,
    budgetMaxMillionVND: 350,
    implementationWeeksMin: 4,
    implementationWeeksMax: 8,
    locations: ['Toàn quốc', 'TP. Hồ Chí Minh', 'Hà Nội', 'Bình Dương'],
    readinessLevel: 'deployment-ready',
    evidence: [
      'Triển khai cho 8 dây chuyền dập kim loại tại KCN Sóng Thần',
      'Giảm 25% thời gian dừng máy không kế hoạch trong năm 2025'
    ],
    contactName: 'ThS. Trần Thị Mai',
    contactEmail: 'mai.tran@smartmech-demo.vn',
    createdAt: '2026-01-12T09:30:00Z'
  },
  {
    id: 'seed-03-predictive-maint',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty Công nghệ Cảm biến VibroGuard (Dữ liệu Demo)',
    solutionName: 'VibroGuard AI - Bảo trì dự đoán lỗi rung động & nhiệt độ động cơ',
    summary: 'Giải pháp gắn cảm biến rung động không dây băng thông cao trên động cơ, quạt hút, bơm công nghiệp để dự đoán hư hỏng vòng bi và lệch trục trước 3-4 tuần.',
    categories: ['IoT', 'Trí tuệ nhân tạo', 'Sản xuất thông minh'],
    industries: ['Sản xuất công nghiệp', 'Xi măng & Thép', 'Chế biến thực phẩm'],
    problemsSolved: [
      'Hư hỏng động cơ đột ngột làm gián đoạn toàn bộ dây chuyền sản xuất',
      'Chi phí thay thế phụ tùng định kỳ quá cao khi thiết bị còn tốt'
    ],
    capabilities: [
      'Cảm biến không dây chuẩn chống bụi nước IP68, pin 3 năm',
      'Thuật toán phân tích phổ FFT phát hiện bất thường rung động cấp độ micro-g',
      'Báo cáo tự động chỉ số suy thoái tình trạng thiết bị'
    ],
    deploymentModel: 'cloud',
    budgetMinMillionVND: 120,
    budgetMaxMillionVND: 260,
    implementationWeeksMin: 3,
    implementationWeeksMax: 6,
    locations: ['Bình Dương', 'Đồng Nai', 'Hà Nội', 'Đà Nẵng'],
    readinessLevel: 'commercial',
    evidence: [
      'Hơn 600 điểm đo đang vận hành tại các nhà máy chế biến gỗ và sản xuất giấy',
      'Ngăn ngừa 9 sự cố vỡ vòng bi máy nén khí quan trọng trong quý 4/2025'
    ],
    contactName: 'Kỹ sư Lê Hoàng Nam',
    contactEmail: 'nam.le@vibroguard-demo.vn',
    createdAt: '2026-01-15T11:00:00Z'
  },
  {
    id: 'seed-04-agrisense',
    ownerId: null,
    source: 'seed',
    organizationName: 'Hợp tác xã Công nghệ Nông nghiệp AgriSense VN (Dữ liệu Demo)',
    solutionName: 'AgriSense IoT - Nông nghiệp chính xác & Tưới tiêu thông minh',
    summary: 'Hệ thống trạm đo khí tượng nông nghiệp, độ ẩm đất đa tầng kết hợp van tưới tự động và thuật toán dự báo sâu bệnh dựa trên thời tiết vi mô.',
    categories: ['Công nghệ nông nghiệp', 'IoT', 'Phân tích dữ liệu'],
    industries: ['Nông nghiệp trồng trọt', 'Cây ăn trái', 'Nhà màng công nghệ cao'],
    problemsSolved: [
      'Lãng phí nước và phân bón do tưới theo kinh nghiệm',
      'Bùng phát dịch bệnh hại cây trồng do không phát hiện độ ẩm dư thừa kịp thời'
    ],
    capabilities: [
      'Cảm biến độ ẩm, pH, EC đất chuẩn nông nghiệp',
      'Tự động kích hoạt tưới nhỏ giọt theo nhu cầu sinh trưởng của cây',
      'Bản đồ nhiệt độ và độ ẩm vườn cây trực quan trên smartphone'
    ],
    deploymentModel: 'cloud',
    budgetMinMillionVND: 90,
    budgetMaxMillionVND: 220,
    implementationWeeksMin: 3,
    implementationWeeksMax: 6,
    locations: ['Lâm Đồng', 'Đắk Lắk', 'Đồng bằng Sông Cửu Long', 'Gia Lai'],
    readinessLevel: 'commercial',
    evidence: [
      'Áp dụng trên 120 hecta sầu riêng và bơ tại Đắk Lắk, tiết kiệm 35% lượng nước tưới',
      'Nhận giải thưởng Sáng tạo Công nghệ Nông nghiệp vùng Tây Nguyên 2025'
    ],
    contactName: 'ThS. Phạm Quang Huy',
    contactEmail: 'huy.pham@agrisense-demo.vn',
    createdAt: '2026-01-18T14:20:00Z'
  },
  {
    id: 'seed-05-coldchain',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty Cổ phần Chuỗi lạnh FreshTrace (Dữ liệu Demo)',
    solutionName: 'ColdTrace - Giám sát nhiệt độ chuỗi cung ứng lạnh và HACCP',
    summary: 'Thiết bị ghi nhận nhiệt độ và độ ẩm chuẩn y tế có định vị GPS, tự động đồng bộ đám mây phục vụ giám sát container và kho lạnh nông thủy sản xuất khẩu.',
    categories: ['Logistics', 'IoT', 'Công nghệ nông nghiệp'],
    industries: ['Thủy hải sản', 'Nông sản xuất khẩu', 'Dược phẩm'],
    problemsSolved: [
      'Mất kiểm soát nhiệt độ trong quá trình vận chuyển làm hỏng hàng xuất khẩu',
      'Thiếu bằng chứng dữ liệu nhiệt độ liên tục để đáp ứng tiêu chuẩn HACCP / GlobalGAP'
    ],
    capabilities: [
      'Ghi nhận nhiệt độ từ -40°C đến +60°C với sai số ±0.2°C',
      'Cảnh báo vi phạm ngưỡng nhiệt độ qua SMS/Zalo trong vòng 60 giây',
      'Xuất báo cáo tự động PDF chống chỉnh sửa đạt chuẩn hải quan quốc tế'
    ],
    deploymentModel: 'cloud',
    budgetMinMillionVND: 70,
    budgetMaxMillionVND: 160,
    implementationWeeksMin: 2,
    implementationWeeksMax: 4,
    locations: ['Cần Thơ', 'TP. Hồ Chí Minh', 'Kiên Giang', 'Bà Rịa - Vũng Tàu'],
    readinessLevel: 'commercial',
    evidence: [
      'Hơn 2,500 chuyến container tôm đông lạnh xuất sang EU và Nhật Bản sử dụng thiết bị giám sát',
      'Được chứng nhận bởi Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 3'
    ],
    contactName: 'Bà Đặng Bích Ngọc',
    contactEmail: 'ngoc.dang@freshtrace-demo.vn',
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'seed-06-greenpower',
    ownerId: null,
    source: 'seed',
    organizationName: 'Tập đoàn Công nghệ Năng lượng Xanh GreenPower VN (Dữ liệu Demo)',
    solutionName: 'EcoEnergy Hub - Quản lý điện năng & Tối ưu phụ tải nhà xưởng',
    summary: 'Hệ thống phân tích biểu đồ phụ tải điện thông minh, phát hiện tổn hao năng lượng trong hệ thống khí nén, lò hơi và máy lạnh chiller công nghiệp.',
    categories: ['Tối ưu năng lượng', 'Công nghệ môi trường', 'Phân tích dữ liệu'],
    industries: ['Dệt may & Da giày', 'Sản xuất linh kiện', 'Chế biến thực phẩm'],
    problemsSolved: [
      'Chi phí tiền điện giờ cao điểm chiếm tỷ trọng quá lớn trong giá thành',
      'Rò rỉ khí nén và hiệu suất lò hơi suy giảm nhưng không có công cụ phát hiện'
    ],
    capabilities: [
      'Đồng hồ đo đa năng công nghiệp đo lường sóng hài và hệ số công suất Cosφ',
      'Thuật toán đề xuất dịch chuyển phụ tải tránh khung giờ giá điện cao điểm',
      'Báo cáo tự động tính toán chỉ số phát thải carbon Scope 1 và Scope 2'
    ],
    deploymentModel: 'hybrid',
    budgetMinMillionVND: 220,
    budgetMaxMillionVND: 450,
    implementationWeeksMin: 5,
    implementationWeeksMax: 9,
    locations: ['Bình Dương', 'Đồng Nai', 'Long An', 'Hưng Yên'],
    readinessLevel: 'commercial',
    evidence: [
      'Tiết kiệm trung bình 12-18% chi phí tiền điện hàng tháng cho 15 nhà máy dệt nhuộm',
      'Đáp ứng yêu cầu kiểm toán năng lượng theo Luật Sử dụng năng lượng tiết kiệm và hiệu quả'
    ],
    contactName: 'Kỹ sư Vũ Thành Trung',
    contactEmail: 'trung.vu@greenpower-demo.vn',
    createdAt: '2026-01-22T08:45:00Z'
  },
  {
    id: 'seed-07-logiroute',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty Phần mềm Vận tải Thông minh LogiRoute (Dữ liệu Demo)',
    solutionName: 'LogiRoute AI - Tối ưu hóa lộ trình giao hàng đa điểm chặng cuối',
    summary: 'Thuật toán điều phối tuyến đường giao hàng thông minh kết hợp tính toán tải trọng xe, khung giờ cấm tải đô thị và tình trạng giao thông thực tế tại Việt Nam.',
    categories: ['Logistics', 'Trí tuệ nhân tạo', 'Phần mềm đám mây'],
    industries: ['Phân phối hàng tiêu dùng FMCG', 'Thương mại điện tử', 'Vận tải hàng hóa'],
    problemsSolved: [
      'Thời gian lập kế hoạch tuyến giao hàng thủ công mất từ 3-4 tiếng mỗi sáng',
      'Tỷ lệ xe chạy rỗng hoặc không đầy tải cao làm lãng phí nhiên liệu',
      'Khó xử lý đơn hàng phát sinh đột xuất trong ngày'
    ],
    capabilities: [
      'Tối ưu hóa hơn 1,000 điểm giao hàng trong vòng 3 phút',
      'Tích hợp bản đồ giao thông đường bộ Việt Nam với quy định cấm giờ cấm tải chi tiết',
      'Ứng dụng tài xế ký nhận điện tử e-POD và chụp ảnh bằng chứng giao hàng'
    ],
    deploymentModel: 'cloud',
    budgetMinMillionVND: 150,
    budgetMaxMillionVND: 320,
    implementationWeeksMin: 4,
    implementationWeeksMax: 7,
    locations: ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'],
    readinessLevel: 'commercial',
    evidence: [
      'Đang phục vụ mạng lưới 400 xe tải giao hàng cho chuỗi bán lẻ bách hóa tại TP.HCM',
      'Cắt giảm 19% tổng quãng đường di chuyển và 14% chi phí nhiên liệu'
    ],
    contactName: 'Ông Đỗ Quốc Bảo',
    contactEmail: 'bao.do@logiroute-demo.vn',
    createdAt: '2026-01-25T13:15:00Z'
  },
  {
    id: 'seed-08-cybershield',
    ownerId: null,
    source: 'seed',
    organizationName: 'Trung tâm An ninh Mạng Công nghiệp CyberShield VN (Dữ liệu Demo)',
    solutionName: 'OT-Defender - Giải pháp bảo mật mạng công nghiệp & Phát hiện xâm nhập',
    summary: 'Hệ thống giám sát an toàn thông tin chuyên biệt cho mạng điều khiển sản xuất (OT/SCADA), bảo vệ PLC và máy chủ SCADA trước các nguy cơ mã độc tống tiền Ransomware.',
    categories: ['An toàn thông tin', 'Sản xuất thông minh', 'Phần mềm đám mây'],
    industries: ['Sản xuất linh kiện', 'Năng lượng & Điện lực', 'Dầu khí & Hóa chất'],
    problemsSolved: [
      'Mạng OT kết nối mạng văn phòng IT không có phân vùng an toàn, dễ bị lây nhiễm virus',
      'Thiết bị máy công nghiệp cũ không hỗ trợ cài đặt phần mềm diệt virus thông thường'
    ],
    capabilities: [
      'Phân tích luồng gói tin mạng công nghiệp không làm gián đoạn dây chuyền (Passive Network Monitoring)',
      'Phát hiện thay đổi cấu hình firmware PLC trái phép',
      'Đáp ứng khung tiêu chuẩn bảo mật hệ thống điều khiển công nghiệp ISA/IEC 62443'
    ],
    deploymentModel: 'hybrid',
    budgetMinMillionVND: 300,
    budgetMaxMillionVND: 650,
    implementationWeeksMin: 6,
    implementationWeeksMax: 12,
    locations: ['TP. Hồ Chí Minh', 'Hà Nội', 'Bình Dương', 'Vũng Tàu'],
    readinessLevel: 'commercial',
    evidence: [
      'Bảo vệ thành công hạ tầng mạng SCADA cho 5 trạm phát điện và 4 nhà máy sản xuất linh kiện',
      'Đạt chứng nhận đánh giá năng lực an toàn thông tin từ hiệp hội an toàn thông tin'
    ],
    contactName: 'ThS. Nguyễn Tuấn Anh',
    contactEmail: 'tuananh@cybershield-demo.vn',
    createdAt: '2026-01-28T16:00:00Z'
  },
  {
    id: 'seed-09-erp-cloudbiz',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty Cổ phần Giải pháp Doanh nghiệp CloudBiz (Dữ liệu Demo)',
    solutionName: 'CloudBiz Manufacturing ERP - Quản trị sản xuất & Chuỗi cung ứng SME',
    summary: 'Hệ thống ERP tinh gọn thiết kế riêng cho các nhà xưởng sản xuất vừa và nhỏ tại Việt Nam, bao gồm định mức nguyên vật liệu (BOM), tiến độ đơn hàng và tính giá thành công đoạn.',
    categories: ['Phần mềm đám mây', 'Tự động hóa doanh nghiệp', 'Phân tích dữ liệu'],
    industries: ['Sản xuất linh kiện', 'Cơ khí chính xác', 'Bao bì & In ấn', 'Chế biến gỗ'],
    problemsSolved: [
      'Không kiểm soát được định mức hao hụt nguyên vật liệu trong quá trình sản xuất',
      'Tính giá thành sản phẩm chậm trễ sau kỳ kế toán tháng',
      'Lệch số liệu tồn kho giữa kế toán và thủ kho'
    ],
    capabilities: [
      'Quản lý BOM nhiều cấp và lệnh sản xuất (Work Order) chi tiết',
      'Quét mã vạch / QR Code ghi nhận tiến độ công đoạn tại xưởng',
      'Tích hợp hóa đơn điện tử và báo cáo tài chính quản trị theo chuẩn VAS'
    ],
    deploymentModel: 'cloud',
    budgetMinMillionVND: 140,
    budgetMaxMillionVND: 290,
    implementationWeeksMin: 4,
    implementationWeeksMax: 8,
    locations: ['Toàn quốc'],
    readinessLevel: 'commercial',
    evidence: [
      'Hơn 85 doanh nghiệp sản xuất cơ khí và nhựa đang sử dụng hàng ngày',
      'Giúp khách hàng giảm 40% thời gian chốt số liệu giá thành cuối tháng'
    ],
    contactName: 'Bà Hoàng Thu Trang',
    contactEmail: 'trang.hoang@cloudbiz-demo.vn',
    createdAt: '2026-02-01T09:00:00Z'
  },
  {
    id: 'seed-10-datapulse',
    ownerId: null,
    source: 'seed',
    organizationName: 'Viện Khoa học Dữ liệu Doanh nghiệp DataPulse (Dữ liệu Demo)',
    solutionName: 'DataPulse Retail BI - Dự báo nhu cầu tồn kho & Hành vi mua hàng',
    summary: 'Nền tảng phân tích dữ liệu bán lẻ và máy học dự báo nhu cầu hàng hóa theo mùa vụ, thời tiết và xu hướng thị trường, giúp tối ưu vòng quay vốn lưu động.',
    categories: ['Phân tích dữ liệu', 'Trí tuệ nhân tạo', 'Phần mềm đám mây'],
    industries: ['Bán lẻ & Chuỗi cửa hàng', 'Phân phối FMCG', 'Thời trang'],
    problemsSolved: [
      'Tồn kho dư thừa hàng bán chậm nhưng lại đứt gãy hàng bán chạy',
      'Dự báo số lượng đặt hàng phụ thuộc vào cảm tính của nhân viên mua hàng'
    ],
    capabilities: [
      'Mô hình dự báo nhu cầu SKU cấp độ từng điểm bán theo chuỗi thời gian',
      'Tự động sinh đề xuất đặt hàng PO gửi nhà cung cấp',
      'Phân khúc khách hàng tự động RFM để cá nhân hóa khuyến mãi'
    ],
    deploymentModel: 'cloud',
    budgetMinMillionVND: 160,
    budgetMaxMillionVND: 340,
    implementationWeeksMin: 4,
    implementationWeeksMax: 8,
    locations: ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'],
    readinessLevel: 'commercial',
    evidence: [
      'Triển khai cho chuỗi 60 cửa hàng tiện lợi tại miền Nam',
      'Giảm 22% giá trị hàng tồn kho đọng vốn trong khi tăng 8% doanh thu'
    ],
    contactName: 'TS. Bùi Minh Triết',
    contactEmail: 'triet.bui@datapulse-demo.vn',
    createdAt: '2026-02-03T10:30:00Z'
  },
  {
    id: 'seed-11-autobot-ocr',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty Tự động hóa Quy trình Thông minh AutoBot VN (Dữ liệu Demo)',
    solutionName: 'AutoBot DocAI - Trích xuất hóa đơn & Đối chiếu tự động 3 chiều',
    summary: 'Giải pháp ứng dụng mô hình ngôn ngữ lớn (LLM) và OCR tiếng Việt độ chính xác cao để tự động đọc, trích xuất dữ liệu bảng biểu từ hóa đơn VAT, phiếu giao hàng và hợp đồng.',
    categories: ['Trí tuệ nhân tạo', 'Tự động hóa doanh nghiệp', 'Phần mềm đám mây'],
    industries: ['Tài chính - Kế toán', 'Logistics', 'Thương mại & Bán buôn', 'Sản xuất công nghiệp'],
    problemsSolved: [
      'Nhân viên kế toán mất hàng trăm giờ nhập liệu hóa đơn giấy và PDF thủ công',
      'Sai sót trong đối chiếu số lượng giữa Đơn đặt hàng (PO) - Phiếu nhập kho (GRN) - Hóa đơn'
    ],
    capabilities: [
      'Đọc chính xác hóa đơn điện tử XML và file scan PDF nghiêng, mờ',
      'Tự động đối chiếu 3 chiều (3-Way Matching) số lượng và đơn giá',
      'Đẩy dữ liệu tự động vào các phần mềm MISA, FAST, SAP, Oracle'
    ],
    deploymentModel: 'hybrid',
    budgetMinMillionVND: 80,
    budgetMaxMillionVND: 190,
    implementationWeeksMin: 2,
    implementationWeeksMax: 5,
    locations: ['Toàn quốc'],
    readinessLevel: 'commercial',
    evidence: [
      'Xử lý hơn 300,000 hóa đơn mỗi tháng cho các tập đoàn bán lẻ và sản xuất',
      'Tỷ lệ trích xuất đúng trường thông tin kế toán đạt 98.6%'
    ],
    contactName: 'Kỹ sư Phan Anh Tuấn',
    contactEmail: 'tuan.phan@autobot-demo.vn',
    createdAt: '2026-02-05T14:00:00Z'
  },
  {
    id: 'seed-12-envirotech',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty Cổ phần Môi trường Số EnviroTech VN (Dữ liệu Demo)',
    solutionName: 'EnviroMonitor - Trạm quan trắc nước thải & khí thải liên tục',
    summary: 'Trạm quan trắc tự động các chỉ tiêu pH, COD, TSS, lưu lượng nước thải công nghiệp và nồng độ khí thải, tự động truyền dữ liệu về Sở Tài nguyên & Môi trường theo QCVN.',
    categories: ['Công nghệ môi trường', 'IoT', 'Tự động hóa doanh nghiệp'],
    industries: ['Khu công nghiệp', 'Dệt nhuộm & Xi mạ', 'Chế biến thủy sản', 'Hóa chất'],
    problemsSolved: [
      'Nguy cơ bị phạt nặng do xả thải vượt ngưỡng quy chuẩn môi trường mà không phát hiện kịp',
      'Mất kết nối truyền số liệu định kỳ về cổng thông tin giám sát của cơ quan quản lý'
    ],
    capabilities: [
      'Hệ thống lấy mẫu nước tự động khi có chỉ số vượt ngưỡng',
      'Datalogger công nghiệp chuẩn truyền số liệu qua mạng di động 4G theo Thông tư 10/2021/TT-BTNMT',
      'Tự động làm sạch đầu đo cảm biến bằng khí nén định kỳ'
    ],
    deploymentModel: 'on-premise',
    budgetMinMillionVND: 280,
    budgetMaxMillionVND: 520,
    implementationWeeksMin: 4,
    implementationWeeksMax: 8,
    locations: ['Bình Dương', 'Đồng Nai', 'Bà Rịa - Vũng Tàu', 'Long An', 'Hải Dương'],
    readinessLevel: 'commercial',
    evidence: [
      'Lắp đặt hơn 45 trạm quan trắc tại các KCN trọng điểm phía Nam',
      'Được Sở TN&MT Bình Dương và Đồng Nai nghiệm thu đạt chuẩn kết nối'
    ],
    contactName: 'ThS. Chu Đình Trọng',
    contactEmail: 'trong.chu@envirotech-demo.vn',
    createdAt: '2026-02-07T08:30:00Z'
  },
  {
    id: 'seed-13-robotech-pack',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty Robot Công nghiệp RoboTech VN (Dữ liệu Demo)',
    solutionName: 'RoboPack Delta - Robot phân loại & gắp đóng gói tốc độ cao',
    summary: 'Cánh tay robot Delta kết hợp Camera AI tốc độ cao để tự động phân loại, định vị và gắp sản phẩm vào khay hộp với tốc độ 100 lần gắp/phút.',
    categories: ['Sản xuất thông minh', 'Computer Vision', 'Tự động hóa doanh nghiệp'],
    industries: ['Bánh kẹo & Thực phẩm', 'Dược phẩm', 'Linh kiện điện tử'],
    problemsSolved: [
      'Khâu đóng gói thủ công cần quá nhiều nhân công và năng suất không đồng đều',
      'Yêu cầu nghiêm ngặt về vệ sinh phòng sạch và tránh tiếp xúc tay người trực tiếp'
    ],
    capabilities: [
      'Cánh tay robot cấu trúc song song Delta chịu tải 3kg, tốc độ cao',
      'Camera AI nhận diện góc xoay và phân loại sản phẩm trên băng tải chuyển động (Conveyor Tracking)',
      'Tay gắp hút chân không hoặc kẹp mềm chuẩn FDA cho thực phẩm'
    ],
    deploymentModel: 'on-premise',
    budgetMinMillionVND: 400,
    budgetMaxMillionVND: 850,
    implementationWeeksMin: 8,
    implementationWeeksMax: 14,
    locations: ['TP. Hồ Chí Minh', 'Bình Dương', 'Đồng Nai', 'Hà Nội'],
    readinessLevel: 'commercial',
    evidence: [
      'Vận hành 12 hệ thống robot tại các nhà máy bánh kẹo và dược phẩm hàng đầu',
      'Thay thế trung bình 4-6 công nhân trên mỗi ca đóng gói'
    ],
    contactName: 'KS. Trịnh Quốc Hùng',
    contactEmail: 'hung.trinh@robotech-demo.vn',
    createdAt: '2026-02-08T11:00:00Z'
  },
  {
    id: 'seed-14-secureeye',
    ownerId: null,
    source: 'seed',
    organizationName: 'Công ty Công nghệ An ninh Số SecureEye (Dữ liệu Demo)',
    solutionName: 'SecureEye Access - AI Camera nhận diện khuôn mặt & Kiểm soát ra vào xưởng',
    summary: 'Hệ thống camera AI nhận diện khuôn mặt công nhân ngay cả khi đeo khẩu trang, tích hợp cổng xoay Flap Barrier và tự động ghi nhận dữ liệu chấm công thời gian thực.',
    categories: ['Computer Vision', 'Trí tuệ nhân tạo', 'An toàn thông tin'],
    industries: ['Nhà máy sản xuất đông công nhân', 'Tòa nhà văn phòng', 'Khu công nghệ cao'],
    problemsSolved: [
      'Tình trạng chấm công hộ bằng thẻ từ hoặc vân tay giả mạo',
      'Ùn tắc tại cửa ra vào xưởng vào đầu giờ ca làm việc'
    ],
    capabilities: [
      'Nhận diện khuôn mặt dưới 0.2 giây với khoảng cách 0.5m - 2m',
      'Thuật toán chống giả mạo bằng hình ảnh hoặc video trên điện thoại (Liveness Detection)',
      'Đồng bộ tức thì với hệ thống tính lương và quản lý nhân sự'
    ],
    deploymentModel: 'hybrid',
    budgetMinMillionVND: 110,
    budgetMaxMillionVND: 240,
    implementationWeeksMin: 2,
    implementationWeeksMax: 5,
    locations: ['Toàn quốc'],
    readinessLevel: 'commercial',
    evidence: [
      'Phục vụ điểm danh cho hơn 15,000 công nhân may mặc tại 3 nhà máy ở Tiền Giang và Bến Tre',
      'Độ chính xác xác thực đạt 99.8%'
    ],
    contactName: 'Bà Lương Thị Kim Oanh',
    contactEmail: 'oanh.luong@secureeye-demo.vn',
    createdAt: '2026-02-10T15:20:00Z'
  },
  {
    id: 'seed-15-rpaflow',
    ownerId: null,
    source: 'seed',
    organizationName: 'Liên minh Công nghệ Số RPA Flow VN (Dữ liệu Demo)',
    solutionName: 'RPA Enterprise - Bot tự động hóa tác vụ văn phòng & Luồng phê duyệt',
    summary: 'Robot phần mềm (RPA) tự động thực hiện các thao tác tải file báo cáo, đối chiếu dữ liệu giữa các phần mềm kế toán, CRM và gửi email thông báo hàng ngày.',
    categories: ['Tự động hóa doanh nghiệp', 'Phần mềm đám mây', 'Trí tuệ nhân tạo'],
    industries: ['Logistics', 'Tài chính - Ngân hàng', 'Sản xuất công nghiệp', 'Thương mại dịch vụ'],
    problemsSolved: [
      'Nhân viên mất 2-3 tiếng mỗi ngày để copy-paste số liệu giữa các phần mềm nội bộ',
      'Chậm trễ trong luồng phê duyệt mua hàng và giải ngân thanh toán'
    ],
    capabilities: [
      'Ghi nhận và mô phỏng chính xác thao tác người dùng trên giao diện web và desktop',
      'Lập lịch chạy tác vụ tự động vào ban đêm (24/7 không cần giám sát)',
      'Ghi log chi tiết và tự động dừng gửi cảnh báo khi gặp ngoại lệ'
    ],
    deploymentModel: 'cloud',
    budgetMinMillionVND: 95,
    budgetMaxMillionVND: 210,
    implementationWeeksMin: 3,
    implementationWeeksMax: 6,
    locations: ['Toàn quốc'],
    readinessLevel: 'commercial',
    evidence: [
      'Triển khai hơn 50 quy trình bot cho các công ty logistics và phân phối hàng hóa',
      'Giảm 80% thời gian xử lý thủ tục giấy tờ văn phòng'
    ],
    contactName: 'Ông Cao Văn Thành',
    contactEmail: 'thanh.cao@rpaflow-demo.vn',
    createdAt: '2026-02-12T09:15:00Z'
  }
];
