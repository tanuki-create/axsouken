import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'カテゴリ一覧',
  description: 'AI トランスフォーメーションに関するトピック別の記事カテゴリ一覧。ビジネス戦略、技術動向、導入事例など専門的な情報を分野別に整理しています。',
};

export default async function CategoriesPage() {
  // カテゴリを取得
  let categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: {
          articles: {
            where: {
              published: true,
            },
          },
        },
      },
    },
  });

  // カテゴリがない場合はモックデータを使用（開発時のみ）
  if (categories.length === 0 && process.env.NODE_ENV === 'development') {
    categories = [
      { id: 1, name: 'ビジネス戦略', slug: 'business-strategy', description: 'AIをビジネスに活用するための戦略や企画に関する情報', _count: { articles: 15 } },
      { id: 2, name: '技術動向', slug: 'technology-trends', description: '最新のAI技術トレンドや将来の展望に関する情報', _count: { articles: 22 } },
      { id: 3, name: '導入事例', slug: 'case-studies', description: '様々な業界におけるAI導入の成功事例と失敗から学ぶ教訓', _count: { articles: 18 } },
      { id: 4, name: '実装ガイド', slug: 'implementation-guides', description: 'AIシステムの導入手順や技術的な実装に関するガイド', _count: { articles: 12 } },
      { id: 5, name: '法律・規制', slug: 'legal-regulatory', description: 'AI技術に関連する法規制や倫理的問題の解説', _count: { articles: 7 } },
      { id: 6, name: '人材育成', slug: 'talent-development', description: 'AI時代に求められる人材スキルと育成方法', _count: { articles: 9 } },
      { id: 7, name: 'リサーチ', slug: 'research', description: 'AI分野の最新研究動向と論文解説', _count: { articles: 11 } },
      { id: 8, name: 'インフラストラクチャ', slug: 'infrastructure', description: 'AI導入に必要なITインフラと最適化手法', _count: { articles: 8 } },
    ];
  }

  // カテゴリーを4つのグループに分ける
  const categoryGroups = [];
  const numberOfGroups = 4;
  const itemsPerGroup = Math.ceil(categories.length / numberOfGroups);

  for (let i = 0; i < numberOfGroups; i++) {
    const start = i * itemsPerGroup;
    const end = start + itemsPerGroup;
    categoryGroups.push(categories.slice(start, end));
  }

  // 各カテゴリーのアイコン
  const getCategoryIcon = (slug: string) => {
    const icons: Record<string, { icon: string; color: string }> = {
      'business-strategy': { icon: '📊', color: 'bg-blue-100 dark:bg-blue-900' },
      'technology-trends': { icon: '🔧', color: 'bg-indigo-100 dark:bg-indigo-900' },
      'case-studies': { icon: '🏢', color: 'bg-green-100 dark:bg-green-900' },
      'implementation-guides': { icon: '📘', color: 'bg-yellow-100 dark:bg-yellow-900' },
      'legal-regulatory': { icon: '⚖️', color: 'bg-red-100 dark:bg-red-900' },
      'talent-development': { icon: '👨‍💼', color: 'bg-purple-100 dark:bg-purple-900' },
      'research': { icon: '🔬', color: 'bg-pink-100 dark:bg-pink-900' },
      'infrastructure': { icon: '🔌', color: 'bg-gray-100 dark:bg-gray-900' },
    };

    return icons[slug] || { icon: '📄', color: 'bg-gray-100 dark:bg-gray-900' };
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">カテゴリ一覧</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
        AIトランスフォーメーションに関する情報をトピック別に整理しています。
        関心のある分野からお探しください。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => {
          const { icon, color } = getCategoryIcon(category.slug);
          
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className={`${color} p-8 flex justify-center items-center`}>
                  <span className="text-4xl">{icon}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {category.description}
                    </p>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {category._count.articles}件の記事
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* カテゴリー検索CTA */}
      <div className="mt-16 bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">お探しのトピックが見つかりませんか？</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          記事検索から特定のキーワードでコンテンツを探すこともできます。
        </p>
        <Link
          href="/search"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          記事を検索する
        </Link>
      </div>
    </div>
  );
} 