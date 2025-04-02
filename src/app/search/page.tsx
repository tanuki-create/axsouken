import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiFilter, FiArrowRight } from 'react-icons/fi';

import { prisma } from '@/lib/db';
import Sidebar from '@/components/layout/Sidebar';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: '検索結果 | AI トランスフォーメーション情報ポータル',
  description: 'AI トランスフォーメーションに関する記事を検索。キーワードやカテゴリ、タグで絞り込み、必要な情報を素早く見つけることができます。',
};

// 検索関数
async function searchArticles({
  query,
  category,
  tag,
  page = 1,
  pageSize = 9,
}: {
  query?: string;
  category?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    const skip = (page - 1) * pageSize;
    
    // 検索条件を構築
    const where: any = {
      published: true,
    };
    
    // キーワード検索
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
      ];
    }
    
    // カテゴリ絞り込み
    if (category) {
      where.categories = {
        some: {
          slug: category,
        },
      };
    }
    
    // タグ絞り込み
    if (tag) {
      where.tags = {
        some: {
          slug: tag,
        },
      };
    }
    
    // 記事の検索
    const articles = await prisma.article.findMany({
      where,
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
        tags: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      skip,
      take: pageSize,
    });
    
    // 該当記事の総数を取得
    const totalArticles = await prisma.article.count({
      where,
    });
    
    return { articles, totalArticles };
  } catch (error) {
    console.error('Error searching articles:', error);
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
const mockArticles = [
  {
    id: 1,
    title: 'AIトランスフォーメーションが企業にもたらす5つの大きな変化',
    excerpt: '人工知能技術の進化により、企業のビジネスモデルや業務プロセスが根本から変わりつつあります。本記事では、AIが企業にもたらす5つの重要な変化について解説します。',
    slug: 'ai-transformation-changes',
    publishedAt: new Date('2023-10-15'),
    author: { name: '山田太郎' },
    categories: [{ name: 'ビジネス戦略', slug: 'business-strategy' }],
    tags: [{ name: 'AI戦略', slug: 'ai-strategy' }, { name: 'ビジネス活用', slug: 'business-use' }],
    featuredImage: '/images/featured-1.jpg',
  },
  {
    id: 2,
    title: '2024年に注目すべきAI技術トレンド最新情報',
    excerpt: '急速に進化するAI技術。2024年に企業が注目すべき最新トレンドと、ビジネスへの影響について詳しく解説します。',
    slug: 'ai-trends-2024',
    publishedAt: new Date('2023-10-10'),
    author: { name: '佐藤花子' },
    categories: [{ name: '技術動向', slug: 'technology-trends' }],
    tags: [{ name: 'ChatGPT', slug: 'chatgpt' }, { name: '機械学習', slug: 'machine-learning' }],
    featuredImage: '/images/featured-2.jpg',
  },
  {
    id: 3,
    title: 'ChatGPTを活用した業務効率化：5つの実践的アプローチ',
    excerpt: '多くの企業がChatGPTを導入し始めています。本記事では、実際のビジネスシーンでChatGPTを活用するための5つの実践的なアプローチについて解説します。',
    slug: 'chatgpt-business-efficiency',
    publishedAt: new Date('2023-10-05'),
    author: { name: '鈴木一郎' },
    categories: [{ name: '実装ガイド', slug: 'implementation-guides' }],
    tags: [{ name: 'ChatGPT', slug: 'chatgpt' }, { name: 'ビジネス活用', slug: 'business-use' }],
    featuredImage: '/images/featured-3.jpg',
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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; tag?: string; page?: string };
}) {
  const { q: query, category, tag, page: pageStr } = searchParams;
  const page = Number(pageStr) || 1;
  const pageSize = 9;

  const hasSearchParams = query || category || tag;

  // 検索実行
  let articles = [];
  let totalArticles = 0;

  if (hasSearchParams) {
    let searchResult;
    
    try {
      searchResult = await searchArticles({
        query,
        category,
        tag,
        page,
        pageSize,
      });
      
      articles = searchResult.articles;
      totalArticles = searchResult.totalArticles;
    } catch (error) {
      console.error('Search error:', error);
    }
    
    // 開発環境でデータがない場合はモックデータを使用
    if (articles.length === 0 && process.env.NODE_ENV === 'development') {
      articles = mockArticles;
      totalArticles = mockArticles.length;
    }
  }

  const totalPages = Math.ceil(totalArticles / pageSize);

  // サイドバーデータを取得
  let sidebarData = await getSidebarData();
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (sidebarData.categories.length === 0 && process.env.NODE_ENV === 'development') {
    sidebarData = mockSidebarData;
  }

  // 検索条件の表示用文字列
  let searchDescription = '';
  if (query) {
    searchDescription += `"${query}"`;
  }
  if (category) {
    const categoryName = sidebarData.categories.find(c => c.slug === category)?.name || category;
    searchDescription += searchDescription ? ` / カテゴリ: ${categoryName}` : `カテゴリ: ${categoryName}`;
  }
  if (tag) {
    const tagName = sidebarData.tags.find(t => t.slug === tag)?.name || tag;
    searchDescription += searchDescription ? ` / タグ: ${tagName}` : `タグ: ${tagName}`;
  }

  // パンくずリストのアイテム
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '検索', url: '/search' },
  ];
  
  if (searchDescription) {
    breadcrumbItems.push({ name: searchDescription, url: '' });
  }

  return (
    <div className="container py-8">
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">検索結果</h1>
            
            {searchDescription && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {searchDescription} の検索結果: {totalArticles}件
              </p>
            )}
            
            <div className="h-1 w-20 bg-primary mb-8"></div>
          </div>

          {/* 検索フォーム */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <form action="/search" method="get" className="space-y-4">
              <div className="flex items-center mb-4">
                <FiSearch className="text-gray-400 mr-2" />
                <h2 className="text-xl font-semibold">検索条件</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="search-query" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    キーワード
                  </label>
                  <input
                    type="text"
                    id="search-query"
                    name="q"
                    defaultValue={query}
                    placeholder="検索キーワードを入力"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                
                <div className="md:w-1/4">
                  <label htmlFor="search-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    カテゴリ
                  </label>
                  <select
                    id="search-category"
                    name="category"
                    defaultValue={category}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                  >
                    <option value="">すべてのカテゴリ</option>
                    {sidebarData.categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="md:w-1/4">
                  <label htmlFor="search-tag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    タグ
                  </label>
                  <select
                    id="search-tag"
                    name="tag"
                    defaultValue={tag}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                  >
                    <option value="">すべてのタグ</option>
                    {sidebarData.tags.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center"
                >
                  <FiSearch className="mr-2" />
                  検索する
                </button>
              </div>
            </form>
          </div>

          {/* 検索結果 */}
          {hasSearchParams ? (
            articles.length > 0 ? (
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
                <h2 className="text-xl font-semibold mb-2">検索結果が見つかりません</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  検索条件に一致する記事はありませんでした。別のキーワードやフィルターで試してみてください。
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <Link
                    href="/articles"
                    className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    全記事一覧へ
                  </Link>
                  <Link
                    href="/search"
                    className="inline-block bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    検索条件をクリア
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-8 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-2">検索条件を入力してください</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                キーワード、カテゴリ、またはタグを選択して検索してください。
              </p>
              <div className="flex justify-center mt-4">
                <Link
                  href="/articles"
                  className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  全記事一覧を見る
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          )}

          {/* ページネーション */}
          {hasSearchParams && totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav aria-label="ページナビゲーション">
                <ul className="flex space-x-2">
                  {page > 1 && (
                    <li>
                      <Link
                        href={{
                          pathname: '/search',
                          query: {
                            ...(query && { q: query }),
                            ...(category && { category }),
                            ...(tag && { tag }),
                            page: page - 1,
                          },
                        }}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        前へ
                      </Link>
                    </li>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <li key={pageNum}>
                      <Link
                        href={{
                          pathname: '/search',
                          query: {
                            ...(query && { q: query }),
                            ...(category && { category }),
                            ...(tag && { tag }),
                            page: pageNum,
                          },
                        }}
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
                        href={{
                          pathname: '/search',
                          query: {
                            ...(query && { q: query }),
                            ...(category && { category }),
                            ...(tag && { tag }),
                            page: page + 1,
                          },
                        }}
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