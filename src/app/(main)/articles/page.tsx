import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '@/lib/db';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: '記事一覧',
  description: 'AI トランスフォーメーションに関する最新記事一覧。ビジネス戦略、技術動向、導入事例など幅広いトピックを網羅しています。',
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // ページネーションの設定
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;
  const skip = (page - 1) * pageSize;

  // 公開済み記事のみを取得
  const articles = await prisma.article.findMany({
    where: {
      published: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    skip,
    take: pageSize,
  });

  // 全記事数を取得（ページネーション用）
  const totalArticles = await prisma.article.count({
    where: {
      published: true,
    },
  });
  
  const totalPages = Math.ceil(totalArticles / pageSize);

  // カテゴリとタグを取得（サイドバー用）
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const tags = await prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
    take: 15, // タグは多すぎる場合があるので制限
  });

  // 人気記事（閲覧数の多い記事）
  const popularArticles = await prisma.article.findMany({
    where: {
      published: true,
    },
    orderBy: {
      viewCount: 'desc',
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
    take: 5,
  });

  // 仮のデータ
  const mockArticles = [
    {
      id: 1,
      title: 'AIトランスフォーメーションが企業にもたらす5つの大きな変化',
      excerpt: '人工知能技術の進化により、企業のビジネスモデルや業務プロセスが根本から変わりつつあります。本記事では、AIが企業にもたらす5つの重要な変化について解説します。',
      slug: 'ai-transformation-changes',
      publishedAt: new Date('2023-10-15'),
      author: { name: '山田太郎' },
      categories: [{ name: 'ビジネス戦略', slug: 'business-strategy' }],
      featuredImage: '/images/featured-1.jpg',
    },
    {
      id: 2,
      title: '2024年に注目すべきAI技術トレンド最新情報',
      excerpt: '急速に進化するAI技術。2024年に特に注目すべき最新トレンドと、それらがビジネスに与える影響について詳しく解説します。',
      slug: 'ai-trends-2024',
      publishedAt: new Date('2023-10-10'),
      author: { name: '佐藤花子' },
      categories: [{ name: '技術動向', slug: 'technology-trends' }],
      featuredImage: '/images/featured-2.jpg',
    },
    {
      id: 3,
      title: 'AIトランスフォーメーション成功事例：製造業の革新',
      excerpt: '製造業界におけるAIトランスフォーメーションの成功事例を紹介。生産性向上からコスト削減まで、実際のビジネスインパクトを検証します。',
      slug: 'ai-transformation-manufacturing',
      publishedAt: new Date('2023-10-05'),
      author: { name: '鈴木一郎' },
      categories: [{ name: '導入事例', slug: 'case-studies' }],
      featuredImage: '/images/featured-3.jpg',
    },
    {
      id: 4,
      title: 'ChatGPTを活用した業務効率化：5つの実践的アプローチ',
      excerpt: 'ChatGPTをビジネスに導入して業務を効率化する方法を紹介。実際の導入手順から効果測定まで、実践的なアプローチを解説します。',
      slug: 'chatgpt-business-efficiency',
      publishedAt: new Date('2023-09-28'),
      author: { name: '田中誠' },
      categories: [{ name: '実装ガイド', slug: 'implementation-guides' }],
      featuredImage: '/images/featured-4.jpg',
    },
    {
      id: 5,
      title: 'AIによる意思決定支援：データドリブン経営の新時代',
      excerpt: 'AIを活用した意思決定支援システムがもたらす経営の変革。データドリブンな組織作りと戦略立案について解説します。',
      slug: 'ai-decision-making',
      publishedAt: new Date('2023-09-20'),
      author: { name: '山田太郎' },
      categories: [{ name: 'ビジネス戦略', slug: 'business-strategy' }],
      featuredImage: '/images/featured-5.jpg',
    },
    {
      id: 6,
      title: '生成AIと著作権：企業が知っておくべき法的リスクと対策',
      excerpt: '生成AIコンテンツに関わる著作権の問題と法的リスク。企業がAIを活用する際に注意すべきポイントと対策を解説します。',
      slug: 'generative-ai-copyright',
      publishedAt: new Date('2023-09-15'),
      author: { name: '佐藤花子' },
      categories: [{ name: '法律・規制', slug: 'legal-regulatory' }],
      featuredImage: '/images/featured-6.jpg',
    },
  ];

  const mockCategories = [
    { id: 1, name: 'ビジネス戦略', slug: 'business-strategy' },
    { id: 2, name: '技術動向', slug: 'technology-trends' },
    { id: 3, name: '導入事例', slug: 'case-studies' },
    { id: 4, name: '実装ガイド', slug: 'implementation-guides' },
    { id: 5, name: '法律・規制', slug: 'legal-regulatory' },
  ];

  const mockTags = [
    { id: 1, name: 'ChatGPT', slug: 'chatgpt' },
    { id: 2, name: '機械学習', slug: 'machine-learning' },
    { id: 3, name: 'ディープラーニング', slug: 'deep-learning' },
    { id: 4, name: 'ビジネス活用', slug: 'business-use' },
    { id: 5, name: 'ROI', slug: 'roi' },
    { id: 6, name: '自然言語処理', slug: 'nlp' },
    { id: 7, name: 'データ分析', slug: 'data-analysis' },
    { id: 8, name: '予測モデル', slug: 'predictive-models' },
  ];

  const mockPopularArticles = [
    { id: 1, title: 'AIトランスフォーメーションが企業にもたらす5つの大きな変化', slug: 'ai-transformation-changes' },
    { id: 2, title: '2024年に注目すべきAI技術トレンド最新情報', slug: 'ai-trends-2024' },
    { id: 3, title: 'ChatGPTを活用した業務効率化：5つの実践的アプローチ', slug: 'chatgpt-business-efficiency' },
    { id: 4, title: 'AIによる意思決定支援：データドリブン経営の新時代', slug: 'ai-decision-making' },
    { id: 5, title: '生成AIと著作権：企業が知っておくべき法的リスクと対策', slug: 'generative-ai-copyright' },
  ];

  // データベースに記事がない場合はモックデータを使用
  const displayArticles = articles.length > 0 ? articles : mockArticles;
  const displayCategories = categories.length > 0 ? categories : mockCategories;
  const displayTags = tags.length > 0 ? tags : mockTags;
  const displayPopularArticles = popularArticles.length > 0 ? popularArticles : mockPopularArticles;

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <h1 className="text-4xl font-bold mb-6">記事一覧</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={`/articles/${article.slug}`}>
                  <div className="relative h-48">
                    <Image
                      src={article.featuredImage || '/images/placeholder.jpg'}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex space-x-2 mb-2">
                    {article.categories.map((category) => (
                      <span
                        key={category.slug}
                        className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2 py-1 rounded-full"
                      >
                        <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2 hover:text-primary">
                    <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('ja-JP') : '日付なし'}</span>
                    <span>{article.author.name}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav aria-label="ページナビゲーション">
                <ul className="flex space-x-2">
                  {page > 1 && (
                    <li>
                      <Link
                        href={`/articles?page=${page - 1}`}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        前へ
                      </Link>
                    </li>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <li key={pageNum}>
                      <Link
                        href={`/articles?page=${pageNum}`}
                        className={`px-4 py-2 border rounded-md ${
                          pageNum === page
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    </li>
                  ))}
                  
                  {page < totalPages && (
                    <li>
                      <Link
                        href={`/articles?page=${page + 1}`}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        次へ
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          )}
        </main>
        
        <aside className="md:w-72 lg:w-80">
          <Sidebar 
            categories={displayCategories}
            tags={displayTags}
            popularArticles={displayPopularArticles}
          />
        </aside>
      </div>
    </div>
  );
} 