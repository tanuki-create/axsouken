import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUserRole } from '@/lib/session';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ユーザーロールを取得
  const role = await getUserRole();

  // 管理者または編集者のみアクセス可能
  if (role !== 'ADMIN' && role !== 'EDITOR') {
    redirect('/signin?callbackUrl=/admin');
  }

  return (
    <div className="flex min-h-screen">
      {/* サイドバーナビゲーション */}
      <nav className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold">
            AI Transformation
          </Link>
          <p className="text-gray-400 text-sm mt-1">管理パネル</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2">コンテンツ</h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/admin" 
                  className="block py-2 px-3 rounded hover:bg-gray-800"
                >
                  ダッシュボード
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/articles" 
                  className="block py-2 px-3 rounded hover:bg-gray-800"
                >
                  記事管理
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/categories" 
                  className="block py-2 px-3 rounded hover:bg-gray-800"
                >
                  カテゴリ管理
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/tags" 
                  className="block py-2 px-3 rounded hover:bg-gray-800"
                >
                  タグ管理
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2">ユーザー</h3>
            <ul className="space-y-1">
              {role === 'ADMIN' && (
                <li>
                  <Link 
                    href="/admin/users" 
                    className="block py-2 px-3 rounded hover:bg-gray-800"
                  >
                    ユーザー管理
                  </Link>
                </li>
              )}
              <li>
                <Link 
                  href="/admin/settings" 
                  className="block py-2 px-3 rounded hover:bg-gray-800"
                >
                  設定
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2">問い合わせ</h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/admin/contacts" 
                  className="block py-2 px-3 rounded hover:bg-gray-800"
                >
                  問い合わせ管理
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-800">
        <header className="bg-white dark:bg-gray-900 shadow-sm h-16 flex items-center px-6">
          <h1 className="font-bold text-xl">管理パネル</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 