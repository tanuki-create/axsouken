import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container">
        {/* メインフッターコンテンツ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* サイト情報 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold relative inline-block mb-6">
              AX総研
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
            </h2>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              AIトランスフォーメーションに関する最新情報と専門知識を提供するプラットフォーム
            </p>
            {/* ソーシャルアイコン - モバイルでは1列目に表示 */}
            <div className="flex items-center space-x-4 sm:hidden">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* コンテンツリンク */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-gray-800">コンテンツ</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/articles" 
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                >
                  <span className="text-primary mr-2">›</span>
                  記事一覧
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                >
                  <span className="text-primary mr-2">›</span>
                  カテゴリ
                </Link>
              </li>
              <li>
                <Link 
                  href="/tags/ai-trends" 
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                >
                  <span className="text-primary mr-2">›</span>
                  AIトレンド
                </Link>
              </li>
              <li>
                <Link 
                  href="/tags/case-studies" 
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                >
                  <span className="text-primary mr-2">›</span>
                  導入事例
                </Link>
              </li>
            </ul>
          </div>

          {/* サイト情報 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-gray-800">サイト情報</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                >
                  <span className="text-primary mr-2">›</span>
                  サイトについて
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                >
                  <span className="text-primary mr-2">›</span>
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                >
                  <span className="text-primary mr-2">›</span>
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                >
                  <span className="text-primary mr-2">›</span>
                  利用規約
                </Link>
              </li>
            </ul>
          </div>

          {/* ソーシャルメディア - PCのみ表示 */}
          <div className="hidden sm:block">
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-gray-800">ソーシャルメディア</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
            
            {/* ニュースレター購読 */}
            <div>
              <h4 className="text-base font-medium mb-3">最新情報を受け取る</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="bg-gray-800 border-0 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 text-sm">
                  購読
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">&copy; {currentYear} AX総研. All rights reserved.</p>
          
          {/* 下部リンク */}
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
              プライバシー
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              利用規約
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm">
              サイトマップ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 