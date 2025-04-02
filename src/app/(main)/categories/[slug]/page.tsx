import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { prisma } from '@/lib/db';
import Sidebar from '@/components/layout/Sidebar';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

// 動的メタデータの生成
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'カテゴリが見つかりません',
      description: '指定されたカテゴリは存在しないか、削除された可能性があります。',
    };
  }

  return {
    title: `${category.name} | カテゴリ`,
    description: category.description || `${category.name}に関する記事一覧。AI トランスフォーメーションの${category.name}について詳しく解説します。`,
  };
}

// カテゴリデータの取得
async function getCategoryBySlug(slug: string) {
  try {
    return await prisma.category.findUnique({
      where: {
        slug: slug,
      },
      include: {
        seo: true,
      },
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// カテゴリに関連する記事を取得
async function getArticlesByCategory(categorySlug: string, page: number, pageSize: number) {
  try {
    const skip = (page - 1) * pageSize;

    const articles = await prisma.article.findMany({
      where: {
        published: true,
        categories: {
          some: {
            slug: categorySlug,
          },
        },
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

    const totalArticles = await prisma.article.count({
      where: {
        published: true,
        categories: {
          some: {
            slug: categorySlug,
          },
        },
      },
    });

    return { articles, totalArticles };
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return { articles: [], totalArticles: 0 };
  }
}

// サイドバー用のデータを取得
async function getSidebarData() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      take: 15,
    });

    const popularArticles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { viewCount: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
      },
      take: 5,
    });

    return { categories, tags, popularArticles };
  } catch (error) {
    console.error('Error fetching sidebar data:', error);
    return { categories: [], tags: [], popularArticles: [] };
  }
}

// モックデータ（開発用）
const mockCategory = {
  id: 1,
  name: 'ビジネス戦略',
  slug: 'business-strategy',
  description: 'AIをビジネスに活用するための戦略や企画に関する情報。経営者や意思決定者向けのコンテンツを集めています。',
  seo: null,
};

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
    id: 7,
    title: 'AI投資のROI計算方法：経営者のための実践ガイド',
    excerpt: 'AI技術への投資対効果を正確に測定し、投資判断を最適化するための実践的な方法論を紹介します。',
    slug: 'ai-roi-calculation',
    publishedAt: new Date('2023-09-05'),
    author: { name: '佐藤花子' },
    categories: [{ name: 'ビジネス戦略', slug: 'business-strategy' }],
    featuredImage: '/images/featured-7.jpg',
  },
  {
    id: 9,
    title: 'AI戦略を成功させる組織づくり：経営者のための実践ガイド',
    excerpt: 'AI導入を成功に導くためには適切な組織構造と文化の構築が不可欠です。本記事では、効果的なAI組織を構築するための具体的な方法を解説します。',
    slug: 'ai-organization-building',
    publishedAt: new Date('2023-08-25'),
    author: { name: '田中誠' },
    categories: [{ name: 'ビジネス戦略', slug: 'business-strategy' }],
    featuredImage: '/images/featured-9.jpg',
  },
  {
    id: 12,
    title: 'AI時代の競争優位性：データが生み出す新たな経営資源',
    excerpt: 'データをどのように活用すれば競争優位性を確立できるのか。AI時代に求められるデータ戦略の立て方と実行方法を解説します。',
    slug: 'ai-competitive-advantage',
    publishedAt: new Date('2023-08-10'),
    author: { name: '鈴木一郎' },
    categories: [{ name: 'ビジネス戦略', slug: 'business-strategy' }],
    featuredImage: '/images/featured-12.jpg',
  },
];

const mockSidebarData = {
  categories: [
    { id: 1, name: 'ビジネス戦略', slug: 'business-strategy' },
    { id: 2, name: '技術動向', slug: 'technology-trends' },
    { id: 3, name: '導入事例', slug: 'case-studies' },
    { id: 4, name: '実装ガイド', slug: 'implementation-guides' },
    { id: 5, name: '法律・規制', slug: 'legal-regulatory' },
  ],
  tags: [
    { id: 1, name: 'ChatGPT', slug: 'chatgpt' },
    { id: 2, name: '機械学習', slug: 'machine-learning' },
    { id: 3, name: 'ディープラーニング', slug: 'deep-learning' },
    { id: 4, name: 'ビジネス活用', slug: 'business-use' },
    { id: 5, name: 'ROI', slug: 'roi' },
    { id: 6, name: '自然言語処理', slug: 'nlp' },
    { id: 7, name: 'データ分析', slug: 'data-analysis' },
    { id: 8, name: '予測モデル', slug: 'predictive-models' },
  ],
  popularArticles: [
    { id: 1, title: 'AIトランスフォーメーションが企業にもたらす5つの大きな変化', slug: 'ai-transformation-changes' },
    { id: 2, title: '2024年に注目すべきAI技術トレンド最新情報', slug: 'ai-trends-2024' },
    { id: 3, title: 'ChatGPTを活用した業務効率化：5つの実践的アプローチ', slug: 'chatgpt-business-efficiency' },
    { id: 4, title: 'AIによる意思決定支援：データドリブン経営の新時代', slug: 'ai-decision-making' },
    { id: 5, title: '生成AIと著作権：企業が知っておくべき法的リスクと対策', slug: 'generative-ai-copyright' },
  ],
};

export default async function CategoryPage({ 
  params,
  searchParams,
}: { 
  params: { slug: string };
  searchParams: { page?: string };
}) {
  // ページネーションの設定
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;

  // カテゴリデータを取得
  let category = await getCategoryBySlug(params.slug);
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (!category && process.env.NODE_ENV === 'development') {
    category = mockCategory;
  } else if (!category) {
    notFound();
  }

  // カテゴリに関連する記事を取得
  let articles;
  let totalArticles;
  
  const articlesData = await getArticlesByCategory(params.slug, page, pageSize);
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (articlesData.articles.length === 0 && process.env.NODE_ENV === 'development') {
    articles = mockArticles;
    totalArticles = mockArticles.length;
  } else {
    articles = articlesData.articles;
    totalArticles = articlesData.totalArticles;
  }

  const totalPages = Math.ceil(totalArticles / pageSize);

  // サイドバーデータを取得
  let sidebarData = await getSidebarData();
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (sidebarData.categories.length === 0 && process.env.NODE_ENV === 'development') {
    sidebarData = mockSidebarData;
  }

  // パンくずリスト用のデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: 'カテゴリ一覧', url: '/categories' },
    { name: category.name, url: `/categories/${category.slug}` },
  ];

  return (
    <div className="container py-8">
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            
            {category.description && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {category.description}
              </p>
            )}
            
            <div className="h-1 w-20 bg-primary mb-8"></div>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
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
                      {article.categories
                        .filter(c => c.slug !== params.slug) // 現在のカテゴリは除外
                        .map((category) => (
                          <span
                            key={category.slug}
                            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2 py-1 rounded-full"
                          >
                            <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                          </span>
                        ))}
                    </div>
                    <h2 className="text-xl font-bold mb-2">
                      <Link href={`/articles/${article.slug}`} className="hover:text-primary">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString('ja-JP')
                          : '日付なし'}
                      </span>
                      <span>{article.author.name}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-2">記事が見つかりません</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                このカテゴリには現在記事がありません。後ほどまたご確認ください。
              </p>
              <Link
                href="/articles"
                className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                全記事一覧へ
              </Link>
            </div>
          )}

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav aria-label="ページナビゲーション">
                <ul className="flex space-x-2">
                  {page > 1 && (
                    <li>
                      <Link
                        href={`/categories/${params.slug}?page=${page - 1}`}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        前へ
                      </Link>
                    </li>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <li key={pageNum}>
                      <Link
                        href={`/categories/${params.slug}?page=${pageNum}`}
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
                        href={`/categories/${params.slug}?page=${page + 1}`}
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
            categories={sidebarData.categories}
            tags={sidebarData.tags}
            popularArticles={sidebarData.popularArticles}
          />
        </aside>
      </div>
    </div>
  );
} 