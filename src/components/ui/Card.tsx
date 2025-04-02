import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  date?: string;
  link?: string;
  category?: string;
  tags?: string[];
  className?: string;
  children?: ReactNode;
}

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt = '',
  date,
  link,
  category,
  tags,
  className = '',
  children,
}: CardProps) {
  const CardContent = () => (
    <div className="h-full flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {/* カード画像 */}
      {imageSrc && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {category && (
            <span className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-2.5 py-1 rounded">
              {category}
            </span>
          )}
        </div>
      )}

      {/* カードコンテンツ */}
      <div className="flex flex-col flex-grow p-5">
        {/* 日付表示 */}
        {date && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
        )}

        {/* タイトル */}
        <h3 className="text-xl md:text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* 説明文 */}
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
            {description}
          </p>
        )}

        {/* タグ */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 追加コンテンツ */}
        {children}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link
        href={link}
        className={`block group h-full ${className}`}
        aria-label={title}
      >
        <CardContent />
      </Link>
    );
  }

  return <div className={className}><CardContent /></div>;
} 