import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiMail, FiMapPin, FiPhone, FiClock, FiExternalLink } from 'react-icons/fi';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: '会社概要 | AI トランスフォーメーション情報ポータル',
  description: 'AI トランスフォーメーション情報ポータルを運営する会社の概要、ミッション、ビジョン、および連絡先情報をご紹介します。',
};

export default function AboutPage() {
  // パンくずリストのデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '会社概要', url: '/about' },
  ];

  return (
    <div className="container py-8">
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ヘッダーセクション */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">会社概要</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          AI トランスフォーメーション情報ポータルを運営する私たちについてご紹介します。
        </p>
        <div className="h-1 w-20 bg-primary mb-8"></div>
      </div>

      {/* 会社紹介セクション */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">私たちのビジョン</h2>
          <p className="text-lg mb-4">
            私たちは、最先端のAI技術と企業のビジネス課題をつなぎ、日本のAIトランスフォーメーションを加速させることを目指しています。
          </p>
          <p className="text-lg mb-4">
            「AI技術の民主化」を掲げ、あらゆる規模の企業がAIの可能性を最大限に活用できるよう、わかりやすい情報発信と実践的なガイダンスを提供します。
          </p>
          <p className="text-lg">
            経営者から技術者まで、すべてのステークホルダーが一緒に学び、成長できるAIコミュニティの構築を通じて、日本企業の競争力強化と社会課題の解決に貢献します。
          </p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/about-vision.jpg"
            alt="AIトランスフォーメーションのビジョン"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* 会社概要テーブル */}
      <section className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">会社概要</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <th className="py-4 px-6 text-left bg-gray-50 dark:bg-gray-700 w-1/4">会社名</th>
                <td className="py-4 px-6">株式会社AIトランスフォーメーション</td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-left bg-gray-50 dark:bg-gray-700">設立</th>
                <td className="py-4 px-6">2020年4月1日</td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-left bg-gray-50 dark:bg-gray-700">代表取締役</th>
                <td className="py-4 px-6">山田 太郎</td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-left bg-gray-50 dark:bg-gray-700">資本金</th>
                <td className="py-4 px-6">5,000万円</td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-left bg-gray-50 dark:bg-gray-700">事業内容</th>
                <td className="py-4 px-6">
                  <ul className="list-disc pl-5">
                    <li>AIトランスフォーメーション情報ポータルの運営</li>
                    <li>AIに関するコンサルティングサービス</li>
                    <li>AI技術の教育・トレーニングプログラムの提供</li>
                    <li>企業向けAIソリューションの開発・導入支援</li>
                    <li>AI関連セミナー・イベントの企画・運営</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-left bg-gray-50 dark:bg-gray-700">従業員数</th>
                <td className="py-4 px-6">45名（2024年4月現在）</td>
              </tr>
              <tr>
                <th className="py-4 px-6 text-left bg-gray-50 dark:bg-gray-700">所在地</th>
                <td className="py-4 px-6">〒100-0001 東京都千代田区丸の内1-1-1 AIビル9階</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 企業理念・ミッション */}
      <section className="mb-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">企業理念</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl mb-6 text-center">
            「テクノロジーの力で、すべての企業に平等な成長機会を」
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">知識の共有</h3>
              <p>
                専門知識を分かりやすく伝え、AIの可能性を広く社会に届けます。
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">実践的支援</h3>
              <p>
                理論だけでなく、実際のビジネス課題を解決するための具体的な方法を提供します。
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">継続的革新</h3>
              <p>
                常に最新技術を探求し、革新的なソリューションの開発に取り組みます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* チームメンバー */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">リーダーシップチーム</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* メンバー1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <div className="relative h-64">
              <Image
                src="/images/team-1.jpg"
                alt="山田太郎"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">山田 太郎</h3>
              <p className="text-primary mb-4">代表取締役CEO</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                AI業界で15年以上のキャリアを持ち、複数のテック企業でリーダーシップ職を経験。
                AIの民主化と日本企業の競争力強化をミッションとしています。
              </p>
            </div>
          </div>

          {/* メンバー2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <div className="relative h-64">
              <Image
                src="/images/team-2.jpg"
                alt="佐藤花子"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">佐藤 花子</h3>
              <p className="text-primary mb-4">最高技術責任者（CTO）</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                自然言語処理と機械学習の専門家。大手IT企業での研究開発経験を経て参画。
                複雑な技術を分かりやすく伝えることを得意としています。
              </p>
            </div>
          </div>

          {/* メンバー3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <div className="relative h-64">
              <Image
                src="/images/team-3.jpg"
                alt="鈴木一郎"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">鈴木 一郎</h3>
              <p className="text-primary mb-4">最高戦略責任者（CSO）</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                経営コンサルティング会社出身のビジネスストラテジスト。
                企業のAI導入戦略の策定から実行まで、幅広い知見を提供しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 連絡先情報 */}
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6">お問い合わせ</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <FiMapPin className="text-primary text-xl mr-4" />
              <span>〒100-0001 東京都千代田区丸の内1-1-1 AIビル9階</span>
            </div>
            <div className="flex items-center">
              <FiPhone className="text-primary text-xl mr-4" />
              <span>03-1234-5678</span>
            </div>
            <div className="flex items-center">
              <FiMail className="text-primary text-xl mr-4" />
              <span>info@ai-transformation.co.jp</span>
            </div>
            <div className="flex items-center">
              <FiClock className="text-primary text-xl mr-4" />
              <span>営業時間: 平日 9:00〜18:00</span>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              お問い合わせフォーム
            </Link>
          </div>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/office-map.jpg"
            alt="オフィスの場所"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* パートナー企業 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">パートナー企業</h2>
        <p className="text-lg mb-8">
          私たちは様々な企業・団体と連携し、AI技術の普及と活用を推進しています。
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center">
            <Image
              src="/images/partner-1.png"
              alt="テクノロジーパートナー"
              width={150}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center">
            <Image
              src="/images/partner-2.png"
              alt="ビジネスパートナー"
              width={150}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center">
            <Image
              src="/images/partner-3.png"
              alt="研究機関パートナー"
              width={150}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center">
            <Image
              src="/images/partner-4.png"
              alt="教育機関パートナー"
              width={150}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="#"
            className="inline-flex items-center text-primary hover:underline"
          >
            パートナーシッププログラムについて詳しく見る
            <FiExternalLink className="ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
} 