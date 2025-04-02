import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { prisma } from '@/lib/db';
import Sidebar from '@/components/layout/Sidebar';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

// 動的メタデータの生成
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug);
  
  if (!tag) {
    return {
      title: 'タグが見つかりません',
      description: '指定されたタグは存在しないか、削除された可能性があります。',
    };
  }

  return {
    title: `${tag.name} | タグ`,
    description: tag.description || `${tag.name}に関連する記事一覧。AI トランスフォーメーションの${tag.name}についての記事を集めています。`,
  };
}

// タグデータの取得
async function getTagBySlug(slug: string) {
  try {
    return await prisma.tag.findUnique({
      where: {
        slug: slug,
      },
    });
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
}

// タグに関連する記事を取得
async function getArticlesByTag(tagSlug: string, page: number, pageSize: number) {
  try {
    const skip = (page - 1) * pageSize;

    const articles = await prisma.article.findMany({
      where: {
        published: true,
        tags: {
          some: {
            slug: tagSlug,
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
        tags: {
          some: {
            slug: tagSlug,
          },
        },
      },
    });

    return { articles, totalArticles };
  } catch (error) {
    console.error('Error fetching articles by tag:', error);
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
const mockTag = {
  id: 1,
  name: 'ChatGPT',
  slug: 'chatgpt',
  description: 'ChatGPTに関連する記事。ビジネスでの活用方法や最新技術情報を集めています。',
};

const mockArticles = [
  {
    id: 3,
    title: 'ChatGPTを活用した業務効率化：5つの実践的アプローチ',
    excerpt: '多くの企業がChatGPTを導入し始めています。本記事では、実際のビジネスシーンでChatGPTを活用するための5つの実践的なアプローチについて解説します。',
    slug: 'chatgpt-business-efficiency',
    publishedAt: new Date('2023-10-05'),
    author: { name: '鈴木一郎' },
    categories: [{ name: '実装ガイド', slug: 'implementation-guides' }],
    featuredImage: '/images/featured-3.jpg',
  },
  {
    id: 8,
    title: 'ChatGPTプラグイン開発入門：企業向けカスタムAIソリューション',
    excerpt: 'ChatGPTのプラグイン機能を活用した企業向けカスタムソリューションの開発方法をステップバイステップで解説します。',
    slug: 'chatgpt-plugin-development',
    publishedAt: new Date('2023-08-28'),
    author: { name: '山田太郎' },
    categories: [{ name: '実装ガイド', slug: 'implementation-guides' }],
    featuredImage: '/images/featured-8.jpg',
  },
  {
    id: 15,
    title: 'ChatGPTとの対話で業務マニュアルを自動生成する方法',
    excerpt: 'ChatGPTを活用して効率的に業務マニュアルを生成・更新・管理する方法について、具体的な事例とプロンプト例を交えて解説します。',
    slug: 'chatgpt-manual-generation',
    publishedAt: new Date('2023-07-22'),
    author: { name: '佐藤花子' },
    categories: [{ name: '実装ガイド', slug: 'implementation-guides' }],
    featuredImage: '/images/featured-15.jpg',
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

export default async function TagPage({ 
  params,
  searchParams,
}: { 
  params: { slug: string };
  searchParams: { page?: string };
}) {
  // ページネーションの設定
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;

  // タグデータを取得
  let tag = await getTagBySlug(params.slug);
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (!tag && process.env.NODE_ENV === 'development') {
    tag = mockTag;
  } else if (!tag) {
    notFound();
  }

  // タグに関連する記事を取得
  let articles;
  let totalArticles;
  
  const articlesData = await getArticlesByTag(params.slug, page, pageSize);
  
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
    { name: 'タグ', url: '/tags' },
    { name: tag.name, url: `/tags/${tag.slug}` },
  ];

  return (
    <div className="container py-8">
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <div className="mb-8">
            <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-md font-semibold px-3 py-1 rounded-full mb-4">
              #{tag.name}
            </div>
            <h1 className="text-4xl font-bold mb-4">{tag.name}に関する記事</h1>
            
            {tag.description && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {tag.description}
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
                      {article.categories.map((category) => (
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
                このタグには現在記事がありません。後ほどまたご確認ください。
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
                        href={`/tags/${params.slug}?page=${page - 1}`}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        前へ
                      </Link>
                    </li>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <li key={pageNum}>
                      <Link
                        href={`/tags/${params.slug}?page=${pageNum}`}
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
                        href={`/tags/${params.slug}?page=${page + 1}`}
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