import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  isLoading = false,
  href,
  className = '',
  ...props
}: ButtonProps) {
  // サイズに応じたクラス
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-md',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-lg',
  };

  // バリアントに応じたクラス
  const variantClasses = {
    primary:
      'bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 shadow-sm',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 shadow-sm',
    outline:
      'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-200 shadow-sm',
  };

  // ボタンの基本クラス
  const buttonClasses = `
    font-medium transition-colors duration-200
    inline-flex items-center justify-center
    focus:outline-none focus:ring-offset-2
    disabled:opacity-70 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // ローディング状態のスピナー
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // ボタンの内容
  const buttonContent = (
    <>
      {isLoading && <LoadingSpinner />}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  // リンクとして表示する場合
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  // 通常のボタンとして表示する場合
  return (
    <button className={buttonClasses} disabled={isLoading} {...props}>
      {buttonContent}
    </button>
  );
} 