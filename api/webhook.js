export default function handler(req, res) {
  const verifyToken = "k8j2n9w1r3z4p5t6";

  // Xác minh yêu cầu từ Facebook
  if (req.method === "GET") {
    if (
      req.query["hub.mode"] === "subscribe" &&
      req.query["hub.verify_token"] === verifyToken
    ) {
      res.status(200).send(req.query["hub.challenge"]);
    } else {
      res.status(403).send("Forbidden");
    }
  } else {
    // Xử lý các yêu cầu POST từ Facebook (tin nhắn mới, v.v.)
    // Thêm mã xử lý ở đây
    res.status(200).send("EVENT_RECEIVED");
  }
}
