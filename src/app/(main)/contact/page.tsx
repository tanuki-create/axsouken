import { Metadata } from 'next';
import { FiMail, FiMapPin, FiPhone, FiClock, FiMessageCircle, FiUsers, FiHelpCircle } from 'react-icons/fi';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'お問い合わせ | AI トランスフォーメーション情報ポータル',
  description: 'AI トランスフォーメーション情報ポータルへのお問い合わせフォーム。AI導入に関するご質問やご相談、記事掲載依頼などお気軽にお問い合わせください。',
};

export default function ContactPage() {
  // パンくずリストのデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: 'お問い合わせ', url: '/contact' },
  ];

  return (
    <div className="container py-8">
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ヘッダーセクション */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          AI トランスフォーメーションに関するご質問やご相談、記事掲載依頼など、お気軽にお問い合わせください。
        </p>
        <div className="h-1 w-20 bg-primary mb-8"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* お問い合わせフォーム */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FiMessageCircle className="mr-2 text-primary" />
            お問い合わせフォーム
          </h2>

          <form action="/api/contact" method="POST" className="space-y-6">
            {/* お問い合わせ種別 */}
            <div>
              <label htmlFor="inquiry-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                お問い合わせ種別 <span className="text-red-500">*</span>
              </label>
              <select
                id="inquiry-type"
                name="inquiryType"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
              >
                <option value="">選択してください</option>
                <option value="general">一般的なお問い合わせ</option>
                <option value="business">ビジネス活用の相談</option>
                <option value="technical">技術的な質問</option>
                <option value="article">記事掲載依頼</option>
                <option value="partnership">パートナーシップ提案</option>
                <option value="other">その他</option>
              </select>
            </div>

            {/* 会社名 */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                会社名
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                placeholder="株式会社AIトランスフォーメーション"
              />
            </div>

            {/* 名前と名前（フリガナ）の行 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                  placeholder="山田 太郎"
                />
              </div>
              <div>
                <label htmlFor="nameKana" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  お名前（フリガナ） <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nameKana"
                  name="nameKana"
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                  placeholder="ヤマダ タロウ"
                />
              </div>
            </div>

            {/* メールアドレスと電話番号の行 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                  placeholder="example@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  電話番号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                  placeholder="03-1234-5678"
                />
              </div>
            </div>

            {/* 件名 */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                件名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                placeholder="お問い合わせ件名"
              />
            </div>

            {/* お問い合わせ内容 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                placeholder="お問い合わせ内容を詳しくご記入ください。"
              ></textarea>
            </div>

            {/* プライバシーポリシー同意 */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="privacy-policy"
                  name="privacyPolicy"
                  required
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="privacy-policy" className="font-medium text-gray-700 dark:text-gray-300">
                  <a href="/privacy-policy" target="_blank" className="text-primary hover:underline">プライバシーポリシー</a>に同意します。 <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            {/* 送信ボタン */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                送信する
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="text-red-500">*</span> は必須項目です
            </p>
          </form>
        </div>

        {/* 連絡先情報 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FiUsers className="mr-2 text-primary" />
              連絡先情報
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <FiMapPin className="text-primary text-xl mr-4 mt-1 flex-shrink-0" />
                <span>〒100-0001 東京都千代田区丸の内1-1-1 AIビル9階</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="text-primary text-xl mr-4 flex-shrink-0" />
                <span>03-1234-5678</span>
              </div>
              <div className="flex items-center">
                <FiMail className="text-primary text-xl mr-4 flex-shrink-0" />
                <span>info@ai-transformation.co.jp</span>
              </div>
              <div className="flex items-center">
                <FiClock className="text-primary text-xl mr-4 flex-shrink-0" />
                <span>営業時間: 平日 9:00〜18:00</span>
              </div>
            </div>
          </div>

          {/* よくある質問 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FiHelpCircle className="mr-2 text-primary" />
              よくあるご質問
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">返信までどのくらいかかりますか？</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  通常、営業日内に3日以内にご返信いたします。混雑状況によっては多少お時間をいただく場合がございます。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI導入の相談はできますか？</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  はい、AIの導入に関するご相談も承っております。お問い合わせ種別で「ビジネス活用の相談」を選択し、詳細をご記入ください。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">記事の掲載依頼はできますか？</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI関連の記事掲載依頼も受け付けております。お問い合わせフォームの種別で「記事掲載依頼」を選択してください。
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a
                href="/faq"
                className="inline-flex items-center text-primary hover:underline"
              >
                FAQをもっと見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}