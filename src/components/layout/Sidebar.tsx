import Link from 'next/link';
import { Category, Tag } from '@prisma/client';

type SidebarProps = {
  categories?: Category[];
  tags?: Tag[];
  popularArticles?: {
    id: number;
    title: string;
    slug: string;
  }[];
};

export default function Sidebar({ categories = [], tags = [], popularArticles = [] }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* 人気記事セクション */}
      {popularArticles.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            人気記事
          </h2>
          <ul className="space-y-3">
            {popularArticles.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground block text-sm"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* カテゴリセクション */}
      {categories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            カテゴリ
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* タグクラウド */}
      {tags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            タグ
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ニュースレター登録 */}
      <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">ニュースレター登録</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          最新のAIトランスフォーメーション情報を受け取る
        </p>
        <form className="space-y-2">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            登録する
          </button>
        </form>
      </div>
    </aside>
  );
} 