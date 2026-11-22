import { redirect } from "next/navigation";

export const metadata = {
  title: "會員中心",
  description: "查看訂單、檢稿進度、上傳補件與轉帳回報",
  robots: { index: false, follow: false },
};

/** Demo 階段：登入後直接進入會員前台示範 */
export default function MemberPage() {
  redirect("/demo/member");
}
