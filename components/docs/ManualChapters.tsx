import Link from 'next/link';
import { ArrowRight, Bot, CodeXml, LibraryBig, MessagesSquare, UserRound } from 'lucide-react';
import { source } from '@/lib/source';

const chapters = [
  { slug: 'chat', label: '聊天', Icon: MessagesSquare },
  { slug: 'agent', label: '智能体', Icon: Bot },
  { slug: 'code', label: '代码', Icon: CodeXml },
  { slug: 'dataset', label: '知识库', Icon: LibraryBig },
  { slug: 'account', label: '我的', Icon: UserRound }
];

export function ManualChapters({ lang }: { lang: string }) {
  return (
    <nav aria-label="手册章节">
      <ul className="manual-chapters">
        {chapters.map(({ slug, label, Icon }) => {
          const chapter = source.getPage(['guide', slug], lang);
          if (!chapter) return null;
          return (
            <li key={slug}>
              <Link href={chapter.url} className="manual-chapter">
                <Icon className="manual-chapter-icon" aria-hidden="true" />
                <ArrowRight className="manual-chapter-arrow" aria-hidden="true" />
                <strong>{label}</strong>
                <span>{chapter.data.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
