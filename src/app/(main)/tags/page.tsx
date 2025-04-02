import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { FiHash } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'タグ一覧 | AI トランスフォーメーション情報ポータル',
  description: 'AI トランスフォーメーションに関する記事のタグ一覧。ChatGPT、機械学習、自然言語処理など、AIに関する様々なトピックについての記事を探せます。',
};

// タグとその記事数を取得
async function getTagsWithArticleCount() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: [
        {
          _count: {
            articles: 'desc',
          },
        },
        { name: 'asc' },
      ],
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

    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// モックデータ（開発用）
const mockTags = [
  { id: 1, name: 'ChatGPT', slug: 'chatgpt', _count: { articles: 15 } },
  { id: 2, name: '機械学習', slug: 'machine-learning', _count: { articles: 12 } },
  { id: 3, name: 'ディープラーニング', slug: 'deep-learning', _count: { articles: 10 } },
  { id: 4, name: 'ビジネス活用', slug: 'business-use', _count: { articles: 9 } },
  { id: 5, name: 'ROI', slug: 'roi', _count: { articles: 8 } },
  { id: 6, name: '自然言語処理', slug: 'nlp', _count: { articles: 7 } },
  { id: 7, name: 'データ分析', slug: 'data-analysis', _count: { articles: 7 } },
  { id: 8, name: '予測モデル', slug: 'predictive-models', _count: { articles: 6 } },
  { id: 9, name: 'コンピュータビジョン', slug: 'computer-vision', _count: { articles: 5 } },
  { id: 10, name: 'API活用', slug: 'api-integration', _count: { articles: 5 } },
  { id: 11, name: 'プロンプトエンジニアリング', slug: 'prompt-engineering', _count: { articles: 4 } },
  { id: 12, name: 'AI戦略', slug: 'ai-strategy', _count: { articles: 4 } },
  { id: 13, name: 'データプライバシー', slug: 'data-privacy', _count: { articles: 3 } },
  { id: 14, name: 'Cloud AI', slug: 'cloud-ai', _count: { articles: 3 } },
  { id: 15, name: 'AI倫理', slug: 'ai-ethics', _count: { articles: 3 } },
  { id: 16, name: 'レコメンデーション', slug: 'recommendation-systems', _count: { articles: 2 } },
  { id: 17, name: 'チャットボット', slug: 'chatbots', _count: { articles: 2 } },
  { id: 18, name: 'AIガバナンス', slug: 'ai-governance', _count: { articles: 2 } },
  { id: 19, name: 'AIパイプライン', slug: 'ai-pipelines', _count: { articles: 1 } },
  { id: 20, name: '強化学習', slug: 'reinforcement-learning', _count: { articles: 1 } },
];

// 色のバリエーションの配列
const bgColors = [
  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
];

// IDを基に色を取得する関数
function getColorForTag(id: number) {
  return bgColors[id % bgColors.length];
}

export default async function TagsPage() {
  // タグ一覧を取得
  let tags = await getTagsWithArticleCount();
  
  // データがない場合はモックデータを使用（開発時のみ）
  if (tags.length === 0 && process.env.NODE_ENV === 'development') {
    tags = mockTags;
  }

  // サイズ変数（記事数に基づいて調整）
  const getTagSize = (count: number) => {
    if (count >= 10) return 'text-2xl font-bold';
    if (count >= 7) return 'text-xl font-semibold';
    if (count >= 4) return 'text-lg font-medium';
    return 'text-base';
  };

  // タグを人気順と名前順の両方でソート
  const popularTags = [...tags].sort((a, b) => b._count.articles - a._count.articles);
  const alphabeticalTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));

  // タグをランダムに配置するための順序付け関数
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 表示用にランダム配置したタグ
  const randomizedTags = shuffleArray([...tags]);

  // パンくずリストのアイテム
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: 'タグ一覧', url: '/tags' },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">タグ一覧</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          AI トランスフォーメーションに関するタグから、関心のあるトピックの記事を見つけることができます。
        </p>
        <div className="h-1 w-20 bg-primary mb-8"></div>
      </div>

      {/* タグクラウド（ビジュアル表示） */}
      <section className="mb-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FiHash className="mr-2" />
          タグクラウド
        </h2>
        <div className="flex flex-wrap gap-3">
          {randomizedTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className={`${getColorForTag(tag.id)} ${getTagSize(tag._count.articles)} px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity inline-flex items-center`}
            >
              #{tag.name}
              <span className="ml-1.5 text-sm opacity-70">({tag._count.articles})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 人気タグ（記事数順） */}
      <section className="mb-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6">人気のタグ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTags.slice(0, 12).map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="flex items-center">
                <FiHash className="mr-1 text-primary" />
                {tag.name}
              </span>
              <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                {tag._count.articles} 記事
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 全てのタグ（アルファベット順） */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6">全てのタグ（50音順）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alphabeticalTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="flex items-center">
                <FiHash className="mr-1 text-primary" />
                {tag.name}
              </span>
              <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                {tag._count.articles} 記事
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 