export default {
  welcome: "Chào mừng",
  landing: {
    berrors_top_yellow:
      "Có những trang web gian lận sao chép thiết kế của chúng tôi. Hãy kiểm tra tên miền của trang web khi bạn truy cập trang web. Tên miền của chúng tôi là Verifysms.com. Hãy cẩn thận và không tin tưởng các trang web gian lận. Chúng tôi không chịu trách nhiệm cho các hành động của các trang web gian lận này.",
    hello: "Chào",
    footerDesc:
      "Nhận tin nhắn SMS trực tuyến đến các số tạm thời từ khắp nơi trên thế giới",
    footerCopyRight: "Bản quyền © 2024 ❤ Japan Sim. Bảo lưu mọi quyền.",
    headerRentNumber: "Thuê Sim",
    headerRentOTP: "Thuê OTP",
    headerProxy: "Proxy",
    login: "Đăng nhập",
    signup: "Đăng ký",
    logout: "Đăng xuất",

  },
  notify: {
    no_rights: "Bạn không có quyền!",
  },
  rent_number: {
    notify: "Proxy không được phép sử dụng cho các hoạt động bất hợp pháp. Trách nhiệm khi sử dụng proxy thuộc về người mua. Proxy của chúng tôi chỉ phù hợp cho mục đích trắng.",
    always_active: "Luôn có số hoạt động",
    activation_by_order: "Kích hoạt số theo thứ tự, từ 10 phút",
    priority_numbers: "Cả hai loại số, ưu tiên cho số luôn hoạt động",
    api: {
      general: "Tổng quan"
    }
  },
  proxy: {
    api: {
      general: "Tổng quan"
    }
  },
  faq: {
    items: [
      {
        question: 'Thông tin chung',
        answer:
          'Chỉ chấp nhận các yêu cầu GET.\nMáy chủ luôn trả về định dạng JSON. Nếu yêu cầu thành công, trường trạng thái sẽ là 1; nếu không, là 0. Nếu trạng thái = 0, nguyên nhân lỗi sẽ được chỉ định trong trường msg.\nHầu hết các yêu cầu yêu cầu phải có API key của người dùng.',
      },
      {
        question: 'Danh sách quốc gia',
        answer:
          '<h4>Yêu cầu</h4><pre>https://smspva.com/api/rent.php?method=getcountries</pre><h4>Kết quả</h4><pre>{\n  "status": 1,\n  "data": [\n    {\n      "name": "Россия", // Tên quốc gia\n      "code": "RU"      // Mã quốc gia\n    }\n  ]\n}</pre>',
      },
    ],
  },
};
