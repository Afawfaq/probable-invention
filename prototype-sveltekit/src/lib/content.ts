import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.resolve(process.cwd(), '..', 'content');
const APT_GROUPS_DIR = path.join(CONTENT_DIR, 'apt-groups');

export interface GroupMeta {
  title: string;
  slug: string;
  attribution?: string;
  nation_state?: string;
  active_since?: string;
  discovered?: number;
  discovered_by?: string;
  mitre_group_id?: string;
  tags?: string[];
  source_code_available?: boolean;
  [key: string]: unknown;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export function getGroupSlugs(): string[] {
  if (!fs.existsSync(APT_GROUPS_DIR)) return [];
  return fs.readdirSync(APT_GROUPS_DIR).filter((f) =>
    fs.statSync(path.join(APT_GROUPS_DIR, f)).isDirectory()
  );
}

export function getGroupMeta(slug: string): GroupMeta {
  const filePath = path.join(APT_GROUPS_DIR, slug, 'overview.md');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  return data as GroupMeta;
}

export function getGroupContent(
  slug: string,
  section?: string,
  item?: string
): { frontmatter: Record<string, unknown>; content: string } {
  // Strip any accidental .md suffix from item (e.g. when followed from markdown links)
  const cleanItem = item ? item.replace(/\.md$/, '') : item;
  let filePath: string;
  if (section && cleanItem) {
    filePath = path.join(APT_GROUPS_DIR, slug, section, `${cleanItem}.md`);
  } else if (!section && cleanItem) {
    filePath = path.join(APT_GROUPS_DIR, slug, `${cleanItem}.md`);
  } else {
    filePath = path.join(APT_GROUPS_DIR, slug, 'overview.md');
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data as Record<string, unknown>, content };
}

function readTitle(filePath: string, fallback: string): string {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return (data.title as string) || fallback;
  } catch {
    return fallback;
  }
}

function toLabel(s: string): string {
  return s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function getGroupNav(slug: string): NavSection[] {
  const groupDir = path.join(APT_GROUPS_DIR, slug);
  const nav: NavSection[] = [];

  const overviewItems: NavItem[] = [{ label: 'Overview', href: `/groups/${slug}` }];
  for (const item of ['timeline', 'references']) {
    if (fs.existsSync(path.join(groupDir, `${item}.md`))) {
      overviewItems.push({ label: toLabel(item), href: `/groups/${slug}/${item}` });
    }
  }
  nav.push({ title: 'Overview', items: overviewItems });

  for (const section of ['malware', 'shadowbrokers-dump', 'ttps'] as const) {
    const sectionTitles: Record<string, string> = {
      malware: 'Malware Arsenal',
      'shadowbrokers-dump': 'ShadowBrokers Dump',
      ttps: 'TTPs',
    };
    const dir = path.join(groupDir, section);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
    nav.push({
      title: sectionTitles[section],
      items: files.map((f) => {
        const itemSlug = f.replace('.md', '');
        return {
          label: readTitle(path.join(dir, f), itemSlug.toUpperCase()),
          href: `/groups/${slug}/${section}/${itemSlug}`,
        };
      }),
    });
  }
  return nav;
}

export function getAllGroupDetailParams(): { slug: string; section: string; item: string }[] {
  const params: { slug: string; section: string; item: string }[] = [];
  for (const slug of getGroupSlugs()) {
    const groupDir = path.join(APT_GROUPS_DIR, slug);
    for (const section of ['malware', 'shadowbrokers-dump', 'ttps']) {
      const dir = path.join(groupDir, section);
      if (!fs.existsSync(dir)) continue;
      fs.readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .forEach((f) => params.push({ slug, section, item: f.replace('.md', '') }));
    }
  }
  return params;
}
