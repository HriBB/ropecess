export const loader = () => {
  return new Response(txt, {
    status: 200,
    headers: {
      'content-type': 'text/plain',
      // Cache for 24 hours
      'cache-control': `max-age=${60 * 60 * 24}`,
    },
  })
}

const txt = `User-agent: 360Spider
User-agent: 360Spider-Image
User-agent: 360Spider-Video
User-agent: AdsBot-Google
User-agent: AdsBot-Google-Mobile
User-agent: AdsBot-Google-Mobile-Apps
User-agent: adidxbot
User-agent: Applebot
user-agent: AppleNewsBot
User-agent: Baiduspider
User-agent: Baiduspider-image
User-agent: Baiduspider-news
User-agent: Baiduspider-video
User-agent: bingbot
User-agent: BingPreview
User-agent: BublupBot
User-agent: CCBot
User-agent: Cliqzbot
User-agent: coccoc
User-agent: coccocbot-image
User-agent: coccocbot-web
User-agent: Daumoa
User-agent: Dazoobot
User-agent: DeuSu
User-agent: DuckDuckBot
User-agent: DuckDuckGo-Favicons-Bot
User-agent: EuripBot
User-agent: Exploratodo
User-agent: Facebot
User-agent: Feedly
User-agent: Findxbot
User-agent: gooblog
User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: Googlebot-Mobile
User-agent: Googlebot-News
User-agent: Googlebot-Video
User-agent: HaoSouSpider
User-agent: ichiro
User-agent: istellabot
User-agent: JikeSpider
User-agent: Lycos
User-agent: Mail.Ru
User-agent: Mediapartners-Google
User-agent: MojeekBot
User-agent: msnbot
User-agent: msnbot-media
User-agent: OrangeBot
User-agent: Pinterest
User-agent: Plukkie
User-agent: Qwantify
User-agent: Rambler
User-agent: SeznamBot
User-agent: Sosospider
User-agent: Slurp
User-agent: Sogou blog
User-agent: Sogou inst spider
User-agent: Sogou News Spider
User-agent: Sogou Orion spider
User-agent: Sogou spider2
User-agent: Sogou web spider
User-agent: SputnikBot
User-agent: Teoma
User-agent: Twitterbot
User-agent: wotbox
User-agent: yacybot
User-agent: Yandex
User-agent: YandexMobileBot
user-agent: Yeti
User-agent: YioopBot
User-agent: yoozBot
User-agent: YoudaoBot
Disallow:
User-agent: *
Disallow: /`.trim()
