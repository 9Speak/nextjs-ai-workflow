import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-4xl font-bold text-primary">Quiz đố vui</h1>

      <p className="text-lg text-foreground/70">
        Trả lời câu hỏi trắc nghiệm, ghi điểm theo thời gian thực.
        Đúng +10, sai −5, thưởng thêm khi đúng 3 câu liên tiếp.
      </p>

      <Link
        href="/quiz"
        className="rounded-md bg-primary px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        Bắt đầu quiz →
      </Link>
    </main>
  );
}
