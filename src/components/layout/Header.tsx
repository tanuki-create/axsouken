"use client";

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // スクロールに応じてヘッダーの見た目を変える
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' 
          : 'bg-white dark:bg-gray-900 shadow-sm'
      }`}
    >
      <div className="container flex items-center justify-between py-3 md:py-4">
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-bold text-primary transition-transform hover:scale-105"
        >
          AX総研
        </Link>

        {/* 右側のナビ部分 */}
        <div className="flex items-center gap-4">
          {/* 検索ボタン - PCとモバイル共通 */}
          <Link 
            href="/search" 
            className="p-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground"
            aria-label="検索"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* モバイルメニューボタン */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link
              href="/articles"
              className="px-1 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground border-b-2 border-transparent hover:border-primary transition-colors"
            >
              記事一覧
            </Link>
            <Link
              href="/categories"
              className="px-1 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground border-b-2 border-transparent hover:border-primary transition-colors"
            >
              カテゴリ
            </Link>
            <Link
              href="/about"
              className="px-1 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground border-b-2 border-transparent hover:border-primary transition-colors"
            >
              サイトについて
            </Link>
            <Link
              href="/contact"
              className="px-1 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground border-b-2 border-transparent hover:border-primary transition-colors"
            >
              お問い合わせ
            </Link>
            
            {session ? (
              <>
                {(session.user.role === 'ADMIN' || session.user.role === 'EDITOR') && (
                  <Link
                    href="/admin"
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90"
                  >
                    管理画面
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
              >
                ログイン
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* モバイルナビゲーション - スライドイン効果 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800/50 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white dark:bg-gray-800 shadow-xl transition-transform transform-gpu animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500"
                aria-label="メニューを閉じる"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col px-6 py-4 space-y-6">
              <Link
                href="/articles"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                記事一覧
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                カテゴリ
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                サイトについて
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                {session ? (
                  <>
                    {(session.user.role === 'ADMIN' || session.user.role === 'EDITOR') && (
                      <Link
                        href="/admin"
                        className="block w-full bg-secondary text-secondary-foreground px-4 py-3 rounded-md hover:bg-secondary/90 text-center mb-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        管理画面
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full bg-primary text-primary-foreground px-4 py-3 rounded-md hover:bg-primary/90 text-center"
                    >
                      ログアウト
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      signIn();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full bg-primary text-primary-foreground px-4 py-3 rounded-md hover:bg-primary/90 text-center"
                  >
                    ログイン
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 