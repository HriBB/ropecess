export function getPreviewMeta(title: string): Record<string, string>[] {
  return [
    { title },
    { name: 'robots', content: 'noindex, nofollow' },
  ]
}
