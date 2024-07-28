export function grantPermission() {
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  // Lấy danh sách permissions từ localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // Kiểm tra quyền hạn của người dùng và lưu vào localStorage
  const userPermission = permissions.find(
    (permission) => permission.email === userEmail,
  );

  if (userPermission && userPermission.permission === "admin") {
    localStorage.setItem("isAllowEditing", true);
  } else {
    localStorage.setItem("isAllowEditing", false);
  }
}
