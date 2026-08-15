import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// O matcher precisa excluir os arquivos de metadata gerados pelo Next
// (/icon, /opengraph-image, /apple-icon, /manifest.webmanifest). Sem isso o
// middleware de idioma os intercepta e responde 307 para /pt/icon — o favicon
// e a imagem de compartilhamento simplesmente não carregam.
export const config = {
  matcher: [
    "/((?!api|_next|_vercel|images|icon|apple-icon|opengraph-image|twitter-image|manifest|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
