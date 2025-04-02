import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { prisma } from '@/lib/db';
import Sidebar from '@/components/layout/Sidebar';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

// 動的メタデータの生成
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: '記事が見つかりません',
      description: '指定された記事は存在しないか、削除された可能性があります。',
    };
  }

  return {
    title: article.title,
    description: article.excerpt || `${article.title}についての詳細記事`,
    openGraph: {
      title: article.title,
      description: article.excerpt || `${article.title}についての詳細記事`,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt?.toISOString(),
      authors: [article.author.name],
      images: [
        {
          url: article.featuredImage || '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

// 記事データの取得
async function getArticleBySlug(slug: string) {
  // 本番環境では実際のデータベースから取得
  try {
    return await prisma.article.findUnique({
      where: {
        slug: slug,
        published: true,
      },
      include: {
        author: true,
        categories: true,
        tags: true,
        seo: true,
      },
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
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

// 閲覧数を更新
async function incrementViewCount(id: number) {
  try {
    await prisma.article.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}

// 関連記事を取得
async function getRelatedArticles(articleId: number, categories: { id: number }[]) {
  try {
    // カテゴリIDの配列を抽出
    const categoryIds = categories.map(category => category.id);

    return await prisma.article.findMany({
      where: {
        id: { not: articleId },
        published: true,
        categories: {
          some: {
            id: { in: categoryIds },
          },
        },
      },
      include: {
        categories: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 3,
    });
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

// モックデータ
const mockArticle = {
  id: 1,
  title: 'AIトランスフォーメーションが企業にもたらす5つの大きな変化',
  slug: 'ai-transformation-changes',
  content: `
# AIトランスフォーメーションが企業にもたらす5つの大きな変化

人工知能（AI）技術の急速な発展により、企業のビジネスモデルやオペレーションが根本から変わりつつあります。この「AIトランスフォーメーション」と呼ばれる変革は、単なるテクノロジーの導入にとどまらず、組織全体の思考方法や働き方にまで影響を与えています。

本記事では、AIトランスフォーメーションが企業にもたらす5つの重要な変化について詳しく解説します。

## 1. データ駆動型の意思決定プロセス

AIの最も顕著な影響の一つは、企業の意思決定プロセスの変革です。従来の経験や直感に基づく意思決定から、データ分析とAIによる予測に基づく意思決定へとシフトしています。

### 主なメリット

- **精度の向上**: 人間の直感よりも、大量のデータに基づいた予測の方が精度が高いケースが増えています
- **バイアスの軽減**: 適切に設計されたAIモデルは、人間の判断に潜むバイアスを軽減できます
- **意思決定の迅速化**: 複雑なデータ分析を短時間で行えるため、意思決定のスピードが向上します

### 実装例

金融業界では、ローン審査においてAIモデルを活用することで、審査の精度向上と処理時間の短縮を実現している企業が増えています。

## 2. カスタマーエクスペリエンスの再定義

AIは顧客体験を根本から変えることができます。パーソナライゼーションの精度向上から、24時間対応のカスタマーサポートまで、顧客との接点が劇的に変化しています。

### 革新的な事例

- **超パーソナライゼーション**: 顧客の過去の行動データに基づき、一人ひとりに最適化されたレコメンデーションを提供
- **会話型AI**: チャットボットや音声アシスタントによる自然な対話型サポート
- **予測型カスタマーサービス**: 問題が発生する前に予測して先回りしたサポートを提供

Eコマース大手のAmazonは、AIを活用した商品レコメンデーションによって売上の35%を生み出していると言われています。

## 3. 業務プロセスの自動化による効率化

反復的なタスクの自動化はAIの最も明確な恩恵の一つです。単純作業から複雑な判断を要するタスクまで、様々なレベルの自動化が進んでいます。

### 自動化の進化段階

1. **基本的な自動化**: 定型的なデータ入力やフォーマット変換などの単純作業
2. **インテリジェント自動化**: 一定のルールに基づいた判断を含む処理の自動化
3. **認知的自動化**: 非構造化データを理解し、複雑な判断を行う高度な自動化

製造業では、予測メンテナンスにAIを活用することで、機器の故障を事前に予測し、ダウンタイムを最大50%削減した例も報告されています。

## 4. 新しいビジネスモデルの創出

AIは既存のビジネスプロセスを効率化するだけでなく、全く新しいビジネスモデルを生み出すきっかけにもなっています。

### AIがもたらす新ビジネス

- **データ・アズ・ア・サービス**: 企業が保有するデータを分析・加工して提供するビジネス
- **AIファースト製品**: 最初からAIを中核として設計された製品やサービス
- **パーソナライズド・マス・プロダクション**: 大量生産と個別カスタマイズを両立させる新しい製造アプローチ

ヘルスケア分野では、AIを活用した医療画像診断支援サービスが新たな収益源となっている企業が増えています。

## 5. 組織文化と必要なスキルセットの変化

AIの導入は技術的な変革にとどまらず、組織文化や必要とされるスキルセットにも大きな変化をもたらします。

### 新たに重要となるスキル

- **データリテラシー**: すべての従業員に求められる基本的なデータ理解能力
- **AI倫理**: AIの責任ある利用に関する理解
- **人間固有のスキル**: 創造性、批判的思考、感情的知性などAIが苦手とする領域でのスキル

### 組織文化の変化

- **実験と学習を奨励する文化**: 失敗を恐れずに新しいアプローチを試す姿勢
- **部門間の壁を取り払うコラボレーション**: データとインサイトの共有
- **継続的学習への投資**: 従業員の再教育とスキルアップの重視

## まとめ

AIトランスフォーメーションは企業に多大な変化をもたらしますが、これは一朝一夕に実現できるものではありません。明確な戦略、適切な技術投資、そして何より組織全体の変革への覚悟が必要です。

しかし、この変革を成功させた企業は、効率性、顧客満足度、イノベーション能力において大きな優位性を得ることができるでしょう。AIトランスフォーメーションは、もはや選択肢ではなく、将来にわたって競争力を維持するための必須の経営課題となっています。
  `,
  excerpt: '人工知能技術の進化により、企業のビジネスモデルや業務プロセスが根本から変わりつつあります。本記事では、AIが企業にもたらす5つの重要な変化について解説します。',
  publishedAt: new Date('2023-10-15'),
  updatedAt: new Date('2023-10-16'),
  viewCount: 1250,
  author: {
    id: 1,
    name: '山田太郎',
    email: 'yamada@example.com',
  },
  categories: [
    { id: 1, name: 'ビジネス戦略', slug: 'business-strategy' },
    { id: 2, name: 'AI活用', slug: 'ai-utilization' },
  ],
  tags: [
    { id: 1, name: 'AI', slug: 'ai' },
    { id: 2, name: 'デジタルトランスフォーメーション', slug: 'dx' },
    { id: 3, name: 'ビジネスモデル', slug: 'business-model' },
  ],
  featuredImage: '/images/featured-1.jpg',
  seo: null,
};

const mockRelatedArticles = [
  {
    id: 2,
    title: '2024年に注目すべきAI技術トレンド最新情報',
    slug: 'ai-trends-2024',
    excerpt: '急速に進化するAI技術。2024年に特に注目すべき最新トレンドと、それらがビジネスに与える影響について詳しく解説します。',
    publishedAt: new Date('2023-10-10'),
    featuredImage: '/images/featured-2.jpg',
    categories: [{ name: '技術動向', slug: 'technology-trends' }],
  },
  {
    id: 3,
    title: 'AIトランスフォーメーション成功事例：製造業の革新',
    slug: 'ai-transformation-manufacturing',
    excerpt: '製造業界におけるAIトランスフォーメーションの成功事例を紹介。生産性向上からコスト削減まで、実際のビジネスインパクトを検証します。',
    publishedAt: new Date('2023-10-05'),
    featuredImage: '/images/featured-3.jpg',
    categories: [{ name: '導入事例', slug: 'case-studies' }],
  },
  {
    id: 5,
    title: 'AIによる意思決定支援：データドリブン経営の新時代',
    slug: 'ai-decision-making',
    excerpt: 'AIを活用した意思決定支援システムがもたらす経営の変革。データドリブンな組織作りと戦略立案について解説します。',
    publishedAt: new Date('2023-09-20'),
    featuredImage: '/images/featured-5.jpg',
    categories: [{ name: 'ビジネス戦略', slug: 'business-strategy' }],
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

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // 記事データを取得
  let article = await getArticleBySlug(params.slug);
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (!article && process.env.NODE_ENV === 'development') {
    article = mockArticle;
  } else if (!article) {
    notFound();
  }

  // 閲覧数を更新
  if (article.id) {
    await incrementViewCount(article.id);
  }

  // 関連記事を取得
  let relatedArticles = await getRelatedArticles(article.id, article.categories);
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (relatedArticles.length === 0 && process.env.NODE_ENV === 'development') {
    relatedArticles = mockRelatedArticles;
  }

  // サイドバーデータを取得
  let sidebarData = await getSidebarData();
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (sidebarData.categories.length === 0 && process.env.NODE_ENV === 'development') {
    sidebarData = mockSidebarData;
  }

  // パンくずリスト用のデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '記事一覧', url: '/articles' },
    ...article.categories.map(category => ({
      name: category.name,
      url: `/categories/${category.slug}`,
    })),
    { name: article.title, url: `/articles/${article.slug}` },
  ];

  // Schema.orgマークアップ用のデータ
  const articleSchemaData = {
    url: `https://example.com/articles/${article.slug}`,
    title: article.title,
    description: article.excerpt || '',
    image: article.featuredImage || '/images/og-default.jpg',
    datePublished: article.publishedAt?.toISOString() || new Date().toISOString(),
    dateModified: article.updatedAt?.toISOString() || new Date().toISOString(),
    authorName: article.author.name,
  };

  return (
    <div className="container py-8">
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema {...articleSchemaData} />

      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          {/* 記事ヘッダー */}
          <div className="mb-8">
            {/* カテゴリ */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* タイトル */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{article.title}</h1>

            {/* メタ情報 */}
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <span className="mr-4">
                {article.publishedAt
                  ? format(new Date(article.publishedAt), 'yyyy年MM月dd日', { locale: ja })
                  : '日付なし'}
              </span>
              <span className="mr-4">著者: {article.author.name}</span>
              <span>{article.viewCount || 0} 閲覧</span>
            </div>

            {/* アイキャッチ画像 */}
            {article.featuredImage && (
              <div className="relative h-[60vh] max-h-[500px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          {/* 記事本文 */}
          <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none mb-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>

          {/* タグ */}
          {article.tags.length > 0 && (
            <div className="border-t border-b py-6 mb-8">
              <h3 className="text-lg font-semibold mb-3">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 関連記事 */}
          {relatedArticles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">関連記事</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <article
                    key={relatedArticle.id}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/articles/${relatedArticle.slug}`}>
                      <div className="relative h-48">
                        <Image
                          src={relatedArticle.featuredImage || '/images/placeholder.jpg'}
                          alt={relatedArticle.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold hover:text-primary">{relatedArticle.title}</h3>
                        <div className="flex space-x-2 mt-2">
                          {relatedArticle.categories.map((category) => (
                            <span
                              key={category.slug}
                              className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* サイドバー */}
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