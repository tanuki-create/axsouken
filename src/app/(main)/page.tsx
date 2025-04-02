import { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'AX総研 - AIトランスフォーメーションの専門メディア',
  description: 'AIを活用したビジネス変革（AIトランスフォーメーション）に関する最新情報、事例、技術解説を提供するメディアプラットフォーム',
};

export default function HomePage() {
  // 特集記事のサンプルデータ
  const featuredArticles = [
    {
      id: 1,
      title: 'ChatGPTを活用した業務効率化の最新事例',
      description: '大手企業におけるChatGPT導入の成功事例と、実装時の課題解決方法について解説します。50%以上の業務時間削減に成功した手法とは？',
      imageSrc: 'https://images.unsplash.com/photo-1677442135968-6db878f21fd0',
      imageAlt: 'AIチャットボットの画像',
      date: '2023-10-15',
      category: 'AI活用事例',
      tags: ['ChatGPT', '業務効率化', 'プロンプトエンジニアリング'],
      slug: 'chatgpt-business-efficiency'
    },
    {
      id: 2,
      title: '生成AIが変える製造業の未来',
      description: '製造業における生成AIの活用事例と、今後5年間の技術進化予測。設計プロセスから品質管理まで、AIがもたらす変革とは。',
      imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      imageAlt: '工場のロボットとAI',
      date: '2023-10-10',
      category: '業界動向',
      tags: ['製造業', '生成AI', 'デジタルツイン'],
      slug: 'generative-ai-manufacturing'
    },
    {
      id: 3,
      title: 'AIガバナンスの構築ガイド',
      description: '組織におけるAIガバナンスの重要性と実装方法。倫理的な配慮からセキュリティ対策まで、包括的なフレームワークを解説。',
      imageSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      imageAlt: 'AIガバナンスの概念図',
      date: '2023-10-05',
      category: 'AIガバナンス',
      tags: ['ガバナンス', 'AI倫理', 'コンプライアンス'],
      slug: 'ai-governance-guide'
    },
  ];

  return (
    <div className="space-y-12 py-8">
      {/* ヒーローセクション */}
      <section className="relative py-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              AIトランスフォーメーションで<br />ビジネスの未来を創造する
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              最新のAI技術とビジネス事例を通じて、組織のデジタル変革を実現するための専門情報を提供しています
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/articles" size="lg">
                記事を読む
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                お問い合わせ
              </Button>
            </div>
          </div>
        </div>
        {/* 装飾的な背景要素 */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-10">
          <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M488.5,142.5Q417,285,285,373.5Q153,462,105.5,231Q58,0,261,41.5Q464,83,488.5,142.5Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* 特集記事セクション */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">特集記事</h2>
            <p className="text-gray-600 dark:text-gray-400">AIトランスフォーメーションに関する厳選された記事</p>
          </div>
          <Button href="/articles" variant="ghost">
            すべての記事を見る →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Card
              key={article.id}
              title={article.title}
              description={article.description}
              imageSrc={article.imageSrc}
              imageAlt={article.imageAlt}
              date={article.date}
              category={article.category}
              tags={article.tags}
              link={`/articles/${article.slug}`}
            />
          ))}
        </div>
      </section>

      {/* サービス紹介セクション */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">サービス</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">企業のAIトランスフォーメーションを支援するサービス</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI戦略コンサルティング</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">貴社のビジネスに最適なAI導入戦略を策定し、実装までサポートします</p>
            <Button href="/services/consulting" variant="outline" size="sm">
              詳細を見る
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI導入トレーニング</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">社内のAI人材育成と、効果的なAIツール活用のための教育プログラムを提供</p>
            <Button href="/services/training" variant="outline" size="sm">
              詳細を見る
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AIガバナンス構築</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">倫理的で安全なAI活用のためのガバナンスフレームワークを構築します</p>
            <Button href="/services/governance" variant="outline" size="sm">
              詳細を見る
            </Button>
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section className="bg-gray-900 text-white rounded-xl p-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">AIトランスフォーメーションについて相談する</h2>
          <p className="text-gray-300 mb-6">
            貴社のAI導入やデジタル変革について、専門家がお答えします。お気軽にご相談ください。
          </p>
          <Button href="/contact" size="lg">
            お問い合わせする
          </Button>
        </div>
      </section>
    </div>
  );
} 