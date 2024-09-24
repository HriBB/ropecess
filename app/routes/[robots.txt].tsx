export const loader = () => {
  const txt = `
User-agent: *
Disallow: 

# Google adsbot ignores robots.txt unless specifically named!
User-agent: adsbot-google
Disallow: /

User-agent: Pinterest
Crawl-delay: 1`.trim()

  return new Response(txt, {
    status: 200,
    headers: {
      'content-type': 'text/plain',
      // Cache for 24 hours
      'cache-control': `max-age=${60 * 60 * 24}`,
    },
  })
}
