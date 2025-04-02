import Image from "next/image";
import Link from 'next/link';
import { Metadata } from 'next';

import Layout from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: 'AIトランスフォーメーション情報ポータル',
  description: 'AIトランスフォーメーションに関する最新情報と専門知識を提供する情報ポータルサイト',
};

export default function Home() {
  // 仮のフィーチャー記事データ
  const featuredArticles = [
    {
      id: 1,
      title: 'AIトランスフォーメーションが企業にもたらす5つの大きな変化',
      excerpt: '人工知能技術の進化により、企業のビジネスモデルや業務プロセスが根本から変わりつつあります。本記事では、AIが企業にもたらす5つの重要な変化について解説します。',
      slug: 'ai-transformation-changes',
      category: 'ビジネス戦略',
      image: '/images/featured-1.jpg',
      date: '2023-10-15',
    },
    {
      id: 2,
      title: '2024年に注目すべきAI技術トレンド最新情報',
      excerpt: '急速に進化するAI技術。2024年に特に注目すべき最新トレンドと、それらがビジネスに与える影響について詳しく解説します。',
      slug: 'ai-trends-2024',
      category: '技術動向',
      image: '/images/featured-2.jpg',
      date: '2023-10-10',
    },
    {
      id: 3,
      title: 'AIトランスフォーメーション成功事例：製造業の革新',
      excerpt: '製造業界におけるAIトランスフォーメーションの成功事例を紹介。生産性向上からコスト削減まで、実際のビジネスインパクトを検証します。',
      slug: 'ai-transformation-manufacturing',
      category: '導入事例',
      image: '/images/featured-3.jpg',
      date: '2023-10-05',
    },
  ];

  return (
    <Layout>
      <section className="container">
        {/* ヒーローセクション */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden my-8">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/hero-bg.jpg"
              alt="AI Technology"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="relative z-10 px-8 py-16 md:py-24 md:px-16 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              AI トランスフォーメーションの
              <br />
              最前線
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mb-8">
              ビジネスを変革する最新のAI技術と戦略的活用法を探求する情報ポータル
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/articles"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                記事一覧を見る
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                サイトについて
              </Link>
            </div>
          </div>
        </div>

        {/* 特集記事セクション */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-8">注目の記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">
                    <Link href={`/articles/${article.slug}`} className="hover:text-primary">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      続きを読む
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/articles"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              すべての記事を見る
            </Link>
          </div>
        </section>

        {/* カテゴリセクション */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-8">トピックから探す</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'ビジネス戦略', slug: 'business-strategy', icon: '📊' },
              { name: '技術動向', slug: 'technology-trends', icon: '🔧' },
              { name: '導入事例', slug: 'case-studies', icon: '🏢' },
              { name: '実装ガイド', slug: 'implementation-guides', icon: '📘' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <span className="text-4xl mb-2">{category.icon}</span>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA セクション */}
        <section className="my-16 bg-gray-100 dark:bg-gray-800 rounded-xl p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">最新のAI情報をお届けします</h2>
            <p className="text-lg mb-8">
              AIトランスフォーメーションに関する最新情報、事例、実装ガイドなど、役立つコンテンツを定期的にお届けします。
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="メールアドレス"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                登録する
              </button>
            </form>
          </div>
        </section>
      </section>
    </Layout>
  );
}
