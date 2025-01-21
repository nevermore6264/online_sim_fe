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
    noAccount: "Bạn chưa có tài khoản?",
    username: "Tài khoản",
    password: "Mật khẩu",
    forgot_password: "Quên mật khẩu?",
    or_login: "Hoặc đăng nhập với:",
    firstName: "Tên",
    lastName: "Họ",
    confirmPassword: "Xác nhận mật khẩu",
    alreadyAccount: "Đã có tài khoản?",
    signUpHere: "Đăng ký tại đây",
    signup_info_heading:
      "Hoàn tất đăng ký đơn giản và nhận số điện thoại để gửi tin nhắn SMS",
    signup_info_paragraph:
      "Có cơ hội sử dụng số điện thoại của chúng tôi để đăng ký!",
    tips_heading: "Mẹo VerifySMS.com",
    tips_paragraph:
      "Chúng tôi viết về việc đăng ký tài khoản, sự phức tạp khi làm việc với proxy và các chủ đề quan trọng khác.",
    blog_button: "Blog",
    news_heading: "Tin tức",
    telegram_channel: "@verifysms_news_official",
    terms_agreement: "Bằng cách đăng nhập vào dịch vụ, bạn đồng ý với",
    terms: "Điều khoản",
    privacy_policy: "Chính sách bảo mật",
    number_storage:
      "Chúng tôi không lưu trữ số điện thoại quá 24 giờ. Nếu bạn cần nhận SMS trong thời gian dài, hãy sử dụng",
    rent_numbers: "Thuê số điện thoại",
    telegram_info:
      "Kênh điện tín chính thức của chúng tôi, nơi bạn sẽ là người đầu tiên biết về thay đổi giá và tin tức.",
    header_title: "Nhận SMS trực tuyến - Verifysms",
    footerDesc:
      "Nhận SMS trực tuyến đến các số tạm thời từ khắp nơi trên thế giới",
    try_now: "Dùng thử ngay",
    trusted_users:
      "Chúng tôi được hơn 550.000 khách hàng trả phí tin tưởng và con số đó vẫn tiếp tục tăng...",
    temporary_service:
      "Với dịch vụ Số tạm thời của chúng tôi, bạn sẽ chỉ nhận được các số có thể thanh toán chất lượng cao với tỷ lệ thành công cao nhất trên thị trường hiện nay.",
    users_count: "Hơn 550.000 người dùng",
  },
  notify: {
    no_rights: "Bạn không có quyền!",
  },
  rent_number: {
    notify:
      "Proxy không được phép sử dụng cho các hoạt động bất hợp pháp. Trách nhiệm khi sử dụng proxy thuộc về người mua. Proxy của chúng tôi chỉ phù hợp cho mục đích trắng.",
    always_active: "Luôn có số hoạt động",
    activation_by_order: "Kích hoạt số theo thứ tự, từ 10 phút",
    priority_numbers: "Cả hai loại số, ưu tiên cho số luôn hoạt động",
    api: {
      general: "Tổng quan",
    },
  },
  proxy: {
    api: {
      general: "Tổng quan",
    },
  },
  faq: {
    items: [
      {
        question: "Thông tin chung",
        answer:
          "Chỉ chấp nhận các yêu cầu GET.\nMáy chủ luôn trả về định dạng JSON. Nếu yêu cầu thành công, trường trạng thái sẽ là 1; nếu không, là 0. Nếu trạng thái = 0, nguyên nhân lỗi sẽ được chỉ định trong trường msg.\nHầu hết các yêu cầu yêu cầu phải có API key của người dùng.",
      },
      {
        question: "Danh sách quốc gia",
        answer:
          '<h4>Yêu cầu</h4><pre>https://smspva.com/api/rent.php?method=getcountries</pre><h4>Kết quả</h4><pre>{\n  "status": 1,\n  "data": [\n    {\n      "name": "Россия", // Tên quốc gia\n      "code": "RU"      // Mã quốc gia\n    }\n  ]\n}</pre>',
      },
    ],
  },
};
