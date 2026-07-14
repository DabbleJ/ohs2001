import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Baby,
  Beer,
  Camera,
  ChevronRight,
  Clock,
  Gamepad2,
  Gift,
  GlassWater,
  HeartHandshake,
  MapPin,
  Menu,
  Music2,
  PartyPopper,
  Shirt,
  Sparkles,
  Trophy,
  Utensils,
  Volleyball,
  Waves,
  X,
} from "lucide-react";

const reunionDate = new Date("2026-07-25T17:00:00-07:00").getTime();
const ticketFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEmDaUaIoKLYH77QzMGUI_ErfDlNf4MirAOsuXwsi9UtWlsw/viewform";

const navItems = [
  { label: "Schedule", href: "#schedule" },
  { label: "Tickets", href: "#tickets" },
  { label: "Included", href: "#included" },
  { label: "FAQ", href: "#faq" },
];

const schedule = [
  {
    date: "Friday, July 24",
    title: "Friday Night Meet-Up",
    location: "Brotherhood Lounge",
    address: "119 Capitol Way N, Olympia, WA 98501",
    time: "8:00 PM",
    copy: "Already in town? Kick off reunion weekend with drinks, pool, and casual conversation before Saturday’s festivities.",
    icon: Beer,
  },
  {
    date: "Saturday Morning",
    title: "Family Picnic at Lions Park",
    location: "Lions Park & Splash Pad",
    address: "800 Wilson St SE, Olympia, WA 98501",
    time: "10:00 AM – 12:00 PM",
    copy: "Bring your family, friends, or classmates from other graduating years for a relaxed morning together.",
    icon: Baby,
  },
];

const activities = [
  { label: "Splash Pad", icon: Waves },
  { label: "Playground", icon: Baby },
  { label: "Volleyball", icon: Volleyball },
  { label: "Lawn Games", icon: Gamepad2 },
  { label: "Snacks", icon: Utensils },
  { label: "Merchandise", icon: Gift },
];

const nostalgicPhotos = [
  { src: "/assets/class-photo-9529.jpeg", alt: "Class of 2001 yearbook candid" },
  { src: "/assets/class-photo-9527.jpeg", alt: "Class of 2001 yearbook memory" },
  { src: "/assets/class-photo-9530.jpeg", alt: "Olympia High School Class of 2001 yearbook group photo" },
  { src: "/assets/class-photo-9524.jpeg", alt: "Class of 2001 school-days snapshot" },
  { src: "/assets/class-photo-9523.jpeg", alt: "OHS Class of 2001 nostalgic photo" },
];

const included = [
  { label: "Catered dinner by Octapas", icon: Utensils },
  { label: "Class of 2001 trivia", icon: Sparkles },
  { label: "Prizes & giveaways", icon: Trophy },
  { label: "Favorite 90s music", icon: Music2 },
  { label: "Cash bar", icon: GlassWater },
  { label: "Great food", icon: HeartHandshake },
  { label: "Great company", icon: PartyPopper },
  { label: "Plenty of memories", icon: Camera },
];

const faqs = [
  ["Can I bring my family?", "Families are welcome at Saturday morning’s picnic."],
  ["Is the dinner adults only?", "Yes."],
  ["Will there be a cash bar?", "Yes."],
  ["Can I buy tickets at the door?", "Advance purchase is highly encouraged."],
  ["What should I wear?", "Dressy, casual, or your best 90s outfit—whatever feels like you."],
];

function useCountdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const distance = Math.max(reunionDate - now, 0);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    return { days, hours, minutes, seconds };
  }, [now]);
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function BearMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 120" aria-hidden="true" fill="none">
      <path
        d="M20 75c5-24 26-42 51-42h28c20 0 37 14 41 34l4 20c1 7-4 13-11 13H35c-10 0-18-10-15-25Z"
        fill="currentColor"
      />
      <circle cx="44" cy="34" r="14" fill="currentColor" />
      <circle cx="112" cy="34" r="13" fill="currentColor" />
      <path d="M63 66h34M73 82h14" stroke="white" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

const Index = () => {
  const countdown = useCountdown();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 text-left" aria-label="Go to top">
            <img src="/assets/reunion-badge.png" alt="OHS Class of 2001 reunion badge" className="h-11 w-11 rounded-2xl object-cover shadow-sm" />
            <span className="leading-tight">
              <span className="block text-sm font-black uppercase tracking-[0.18em] text-[#003B7A]">OHS 2001</span>
              <span className="block text-xs font-semibold text-slate-500">25th Reunion Weekend</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-[#EAF2FB] hover:text-[#003B7A]"
              >
                {item.label}
              </button>
            ))}
            <Button asChild className="ml-2 rounded-full bg-[#003B7A] px-5 font-black text-white shadow-lg shadow-blue-950/15 hover:bg-[#07549E]">
              <a href={ticketFormUrl} target="_blank" rel="noreferrer">Buy Tickets</a>
            </Button>
          </div>

          <button
            className="rounded-full border border-slate-200 p-2 text-[#003B7A] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-2">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => scrollTo(item.href)} className="rounded-2xl px-4 py-3 text-left font-bold text-slate-700 hover:bg-[#EAF2FB]">
                  {item.label}
                </button>
              ))}
              <Button asChild className="rounded-2xl bg-[#003B7A] py-6 font-black text-white hover:bg-[#07549E]">
                <a href={ticketFormUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Buy Tickets</a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#F7FAFD]" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url('/assets/bear-pattern.png')", backgroundSize: "520px" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <Reveal className="flex flex-col justify-center">
            <Badge className="mb-5 w-fit rounded-full border border-[#B8C6D8] bg-white px-4 py-2 text-[#003B7A] shadow-sm hover:bg-white">
              July 24–25, 2026 • Olympia, Washington
            </Badge>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-tight text-[#062B55] sm:text-6xl lg:text-7xl">
              Olympia High School Class of 2001
              <span className="mt-2 block text-[#003B7A]">25th Reunion Weekend</span>
            </h1>
            <p className="mt-6 max-w-2xl text-2xl font-extrabold text-slate-700">Reconnect. Reminisce. Celebrate 25 Years.</p>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              It’s been 25 years since graduation. Join classmates for a weekend of catching up, sharing memories, and making new ones.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-[#003B7A] px-7 py-6 text-base font-black text-white shadow-xl shadow-blue-950/20 hover:bg-[#07549E]">
                <a href={ticketFormUrl} target="_blank" rel="noreferrer">
                  Purchase Reunion Dinner Tickets <ChevronRight className="ml-1 h-5 w-5" />
                </a>
              </Button>
              <Button onClick={() => scrollTo("#schedule")} variant="outline" className="rounded-full border-[#B8C6D8] bg-white px-7 py-6 text-base font-black text-[#003B7A] hover:bg-[#EAF2FB]">
                View Weekend Schedule
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:pt-3">
            <div className="relative">
              <BearMark className="absolute -right-4 -top-5 h-24 w-32 rotate-6 text-[#003B7A]/10" />
              <div className="overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl shadow-blue-950/15">
                <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                  <img src="/assets/class-photo-9525.jpeg" alt="Olympia High School Class of 2001 group photo" className="h-full w-full object-cover" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-[#003B7A]/90 p-4 text-white backdrop-blur-sm sm:left-auto sm:w-72">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">Live countdown</p>
                    <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                      {Object.entries(countdown).map(([label, value]) => (
                        <div key={label} className="rounded-2xl bg-white/12 p-2 ring-1 ring-white/20">
                          <span className="block text-2xl font-black">{String(value).padStart(2, "0")}</span>
                          <span className="text-[0.65rem] font-bold uppercase text-blue-100">{label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-blue-50">Until Saturday, July 25, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="schedule" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2E7ACB]">Weekend Schedule</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#062B55] sm:text-5xl">A full weekend to reconnect</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Start casual, bring the family Saturday morning, then gather for the signature dinner celebration downtown.</p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {schedule.map((event) => {
              const Icon = event.icon;
              return (
                <Reveal key={event.title}>
                  <Card className="group h-full overflow-hidden rounded-[2rem] border-slate-200 bg-white shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10">
                    <CardContent className="p-7">
                      <div className="flex items-start gap-5">
                        <div className="rounded-3xl bg-[#EAF2FB] p-4 text-[#003B7A] transition group-hover:bg-[#003B7A] group-hover:text-white">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2E7ACB]">{event.date}</p>
                          <h3 className="mt-2 text-2xl font-black text-[#062B55]">{event.title}</h3>
                          <div className="mt-5 space-y-3 text-slate-600">
                            <p className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#003B7A]" /><span><strong className="text-slate-800">{event.location}</strong><br />{event.address}</span></p>
                            <p className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#003B7A]" /><span>{event.time}</span></p>
                          </div>
                          <p className="mt-5 leading-7 text-slate-600">{event.copy}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-7 rounded-[2rem] border border-[#D8E2EE] bg-[#F7FAFD] p-6 shadow-sm">
            <h3 className="text-xl font-black text-[#062B55]">Picnic Activities</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.label} className="rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
                    <Icon className="mx-auto h-7 w-7 text-[#003B7A]" />
                    <p className="mt-2 text-sm font-extrabold text-slate-700">{activity.label}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#003B7A] py-20 text-white">
        <BearMark className="absolute -right-10 top-10 h-56 w-72 text-white/5" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:px-8">
          <Reveal>
            <Badge className="rounded-full bg-white px-4 py-2 text-[#003B7A] hover:bg-white">Adults Only • Ticketed Event</Badge>
            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">25th Reunion Dinner</h2>
            <div className="mt-7 grid gap-4 text-blue-50 sm:grid-cols-2">
              <p className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white" /><span><strong className="text-white">The Heritage Room</strong><br />604 Water St SW<br />Olympia, WA 98501</span></p>
              <p className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-white" /><span><strong className="text-white">5:00 PM – 10:00 PM</strong><br />Dinner served at 6:00 PM<br />Catered by Octapas</span></p>
            </div>
          </Reveal>

          <Reveal>
            <Card id="tickets" className="scroll-mt-28 rounded-[2rem] border-white/20 bg-white text-slate-900 shadow-2xl shadow-blue-950/30">
              <CardContent className="p-7 sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2E7ACB]">Ticket Pricing</p>
                <h3 className="mt-2 text-3xl font-black text-[#062B55]">Early Pricing</h3>
                <p className="mt-1 font-bold text-slate-500">Through Wednesday, July 22</p>
                <div className="my-7 rounded-[1.5rem] bg-[#F7FAFD] p-6 text-center ring-1 ring-[#D8E2EE]">
                  <p className="text-5xl font-black text-[#003B7A]">$60</p>
                  <p className="mt-1 font-bold text-slate-600">per person</p>
                  <div className="my-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>
                  <p className="text-3xl font-black text-[#062B55]">2 Tickets for $110</p>
                </div>
                <Button asChild className="w-full rounded-full bg-[#003B7A] py-7 text-lg font-black text-white shadow-xl shadow-blue-950/20 hover:bg-[#07549E]">
                  <a href={ticketFormUrl} target="_blank" rel="noreferrer">
                    Buy Tickets <PartyPopper className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <section id="included" className="bg-[#F7FAFD] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2E7ACB]">What’s Included</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#062B55] sm:text-5xl">Your evening includes</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label}>
                  <div className="h-full rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FB] text-[#003B7A]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="font-black leading-6 text-[#062B55]">{item.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-[#D8E2EE] bg-white p-8 shadow-xl shadow-slate-200/70">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2FB] text-[#003B7A]"><Shirt className="h-7 w-7" /></div>
              <h2 className="mt-6 text-4xl font-black text-[#062B55]">Dress Code</h2>
              <p className="mt-5 text-2xl font-black text-slate-700">Dress to impress…</p>
              <p className="mt-3 text-xl font-bold text-slate-500">—or—</p>
              <p className="mt-3 text-2xl font-black text-slate-700">Wear your favorite 90s look.</p>
              <p className="mt-6 rounded-3xl bg-[#003B7A] p-5 text-lg font-black text-white">And because this is Olympia… Grunge is always welcome.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F7FAFD] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2E7ACB]">Nostalgia Lane</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#062B55] sm:text-5xl">Class of 2001 Memories</h2>
            <p className="mt-4 text-lg text-slate-600">A look back at our senior year and school days together.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {nostalgicPhotos.map((photo, index) => (
              <Reveal key={index}>
                <div className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="overflow-hidden rounded-[1.5rem] aspect-[4/3]">
                    <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#F7FAFD] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2E7ACB]">FAQ</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#062B55] sm:text-5xl">Good to know</h2>
          </Reveal>
          <Reveal className="mt-10 rounded-[2rem] bg-white p-3 shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`item-${index}`} className="border-slate-100 px-4 last:border-b-0">
                  <AccordionTrigger className="text-left text-lg font-black text-[#062B55] hover:text-[#003B7A] hover:no-underline">{question}</AccordionTrigger>
                  <AccordionContent className="text-base leading-7 text-slate-600">{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#062B55] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/15">
              <BearMark className="h-11 w-14 text-white" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-100">Questions?</p>
              <a href="mailto:heatherdanehoffman@gmail.com" className="mt-2 block text-2xl font-black hover:text-blue-100">heatherdanehoffman@gmail.com</a>
            </div>
          </div>
          <p className="max-w-md text-lg font-bold leading-8 text-blue-50">We can’t wait to celebrate 25 years together. See you in Olympia!</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
