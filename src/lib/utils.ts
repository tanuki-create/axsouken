import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';

/**
 * ISO形式の日付文字列をフォーマットして表示用の日付文字列に変換します
 * @param dateString ISO形式の日付文字列
 * @returns フォーマットされた日付文字列 (例: "2023年4月1日")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return format(date, 'yyyy年MM月dd日', { locale: ja });
}

/**
 * テキストを指定した長さで切り詰め、必要に応じて省略記号を追加します
 * @param text 切り詰めるテキスト
 * @param maxLength 最大文字数
 * @returns 切り詰められたテキスト
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * スラッグをタイトルケースの読みやすいテキストに変換します
 * @param slug ハイフン区切りのスラッグ
 * @returns タイトルケースの文字列
 */
export function slugToTitle(slug: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * 文字列の最初の文字を大文字にします
 * @param str 変換する文字列
 * @returns 最初の文字が大文字の文字列
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
} 