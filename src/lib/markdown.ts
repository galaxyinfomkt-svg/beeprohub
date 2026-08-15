// Renderizador de markdown para os artigos do blog.
//
// O parser anterior (uma cadeia de .replace inline em blog/[slug]/page.tsx)
// procurava a sequência literal "\\n## " — barra invertida seguida de "n" —
// enquanto o conteúdo é escrito em template literal com quebras de linha reais.
// As duas coisas nunca batiam: os 19 artigos saíam como um único parágrafo, com
// os "##" visíveis na tela e zero <h2> no HTML. Sem heading não há passagem
// extraível para featured snippet nem para resposta de IA.

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface RenderedArticle {
  html: string;
  headings: Heading[];
  wordCount: number;
  readingMinutes: number;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Slug estável para âncora de heading, tolerante a acentos. */
export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 72);
}

/** Marcação inline: **negrito**, *itálico*, `código` e [texto](url). */
function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" class="text-primary font-semibold underline underline-offset-2 hover:text-primary-hover" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\[([^\]]+)\]\((\/[^\s)]*)\)/g, '<a href="$2" class="text-primary font-semibold underline underline-offset-2 hover:text-primary-hover">$1</a>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-dark rounded px-1.5 py-0.5 text-[0.9em]">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-dark font-bold">$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');
}

export function renderMarkdown(source: string): RenderedArticle {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  const headings: Heading[] = [];
  const usedIds = new Set<string>();

  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p class="text-gray-600 leading-relaxed mb-5">${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length || !listType) return;
    const cls =
      listType === "ul"
        ? "list-disc marker:text-primary pl-6 space-y-2 mb-6 text-gray-600 leading-relaxed"
        : "list-decimal marker:text-primary marker:font-bold pl-6 space-y-2 mb-6 text-gray-600 leading-relaxed";
    out.push(`<${listType} class="${cls}">${listItems.join("")}</${listType}>`);
    listItems = [];
    listType = null;
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  const uniqueId = (text: string) => {
    const base = slugifyHeading(text) || "secao";
    let id = base;
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    return id;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushAll();
      continue;
    }

    const h3 = /^###\s+(.*)$/.exec(line);
    if (h3) {
      flushAll();
      const text = h3[1].replace(/\*\*/g, "").trim();
      const id = uniqueId(text);
      headings.push({ id, text, level: 3 });
      out.push(`<h3 id="${id}" class="scroll-mt-32 text-xl font-bold text-dark mt-9 mb-3">${inline(h3[1])}</h3>`);
      continue;
    }

    const h2 = /^##\s+(.*)$/.exec(line);
    if (h2) {
      flushAll();
      const text = h2[1].replace(/\*\*/g, "").trim();
      const id = uniqueId(text);
      headings.push({ id, text, level: 2 });
      out.push(`<h2 id="${id}" class="scroll-mt-32 text-2xl sm:text-3xl font-extrabold text-dark mt-12 mb-4 leading-tight">${inline(h2[1])}</h2>`);
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line)) {
      flushAll();
      out.push('<hr class="my-10 border-gray-200" />');
      continue;
    }

    if (/^>\s+/.test(line)) {
      flushAll();
      out.push(
        `<blockquote class="border-l-4 border-primary bg-gold-50 rounded-r-xl px-5 py-4 my-6 text-gray-700 italic">${inline(line.replace(/^>\s+/, ""))}</blockquote>`
      );
      continue;
    }

    const ordered = /^(\d+)[.)]\s+(.*)$/.exec(line);
    if (ordered) {
      flushParagraph();
      if (listType !== "ol") flushList();
      listType = "ol";
      listItems.push(`<li>${inline(ordered[2])}</li>`);
      continue;
    }

    const bullet = /^[-*+]\s+(.*)$/.exec(line);
    if (bullet) {
      flushParagraph();
      if (listType !== "ul") flushList();
      listType = "ul";
      listItems.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushAll();

  const plain = source.replace(/[#*`>_-]/g, " ");
  const wordCount = plain.split(/\s+/).filter((w) => w.length > 1).length;

  return {
    html: out.join("\n"),
    headings,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 220)),
  };
}
