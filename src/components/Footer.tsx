"use client";

import Image from "next/image";

const IgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FbIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-17.5 7.463c-1.418.6-1.394 1.854-.254 2.232l4.493 1.403 1.725 5.261c.221.664.66.888 1.146.888.485 0 .698-.22 1.017-.52l2.524-2.454 4.969 3.673c.928.511 1.587.246 1.818-.859l3.288-15.46c.332-1.337-.505-1.942-1.204-1.842z"/>
  </svg>
);
const TkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
  </svg>
);

const navLinks = [
  { label: "Як ми працюємо", href: "#how-it-works" },
  { label: "Приклади",        href: "#examples"    },
  { label: "Про нас",         href: "#trust"       },
  { label: "FAQ",             href: "#faq"         },
  { label: "Контакти",        href: "#contact"     },
];

const socials = [
  { icon: IgIcon, href: "#", label: "Instagram" },
  { icon: FbIcon, href: "#", label: "Facebook"  },
  { icon: TgIcon, href: "#", label: "Telegram"  },
  { icon: TkIcon, href: "#", label: "TikTok"    },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A]">
      <div className="border-gradient-ua" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <a href="#" className="flex items-center select-none mb-3">
              <Image src="/logo.svg" alt="Military Auto" width={140} height={48} />
            </a>
            <p className="text-[#555] text-xs max-w-xs leading-relaxed">
              Підбір та доставка автомобілів зі США в Україну. 6 років досвіду, 1000+ авто.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)}
                className="text-sm text-[#A0A0A0] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 font-[family-name:var(--font-body)]">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 text-[#A0A0A0] hover:text-white"
                style={{ background: "#161616", border: "1px solid #2A2A2A" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,181,24,0.3)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#2A2A2A"}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid #161616" }}>
          <p className="text-[#555] text-xs">© 2025 Military Auto. Всі права захищені.</p>
          <p className="text-[#333] text-xs">Пригон авто зі США в Україну</p>
        </div>
      </div>
    </footer>
  );
}
