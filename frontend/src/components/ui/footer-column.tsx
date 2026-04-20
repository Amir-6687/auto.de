import {
  Bird,
  Camera,
  Drill,
  GitBranch,
  Globe,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

const data = {
  facebookLink: 'https://facebook.com/mvpblocks',
  instaLink: 'https://instagram.com/mvpblocks',
  twitterLink: 'https://twitter.com/mvpblocks',
  githubLink: 'https://github.com/mvpblocks',
  dribbbleLink: 'https://dribbble.com/mvpblocks',
  services: {
    webdev: '/web-development',
    webdesign: '/web-design',
    marketing: '/marketing',
    googleads: '/google-ads',
  },
  about: {
    history: '/company-history',
    team: '/meet-the-team',
    handbook: '/employee-handbook',
    careers: '/careers',
  },
  help: {
    faqs: '/faqs',
    support: '/support',
    livechat: '/live-chat',
  },
  contact: {
    email: 'hello@mvpblocks.com',
    phone: '+91 8637373116',
    address: 'Kolkata, West Bengal, India',
  },
  company: {
    name: 'Mvpblocks',
    description:
      'Building beautiful and functional web experiences with modern technologies. We help startups and businesses create their digital presence.',
    logo: '/logo.webp',
  },
};

const socialLinks = [
  { icon: Globe, label: 'Facebook', href: data.facebookLink },
  { icon: Camera, label: 'Instagram', href: data.instaLink },
  { icon: Bird, label: 'Twitter', href: data.twitterLink },
  { icon: GitBranch, label: 'GitHub', href: data.githubLink },
  { icon: Drill, label: 'Dribbble', href: data.dribbbleLink },
];

const aboutLinks = [
  { text: 'Company History', href: data.about.history },
  { text: 'Meet the Team', href: data.about.team },
  { text: 'Employee Handbook', href: data.about.handbook },
  { text: 'Careers', href: data.about.careers },
];

const serviceLinks = [
  { text: 'Web Development', href: data.services.webdev },
  { text: 'Web Design', href: data.services.webdesign },
  { text: 'Marketing', href: data.services.marketing },
  { text: 'Google Ads', href: data.services.googleads },
];

const helpfulLinks = [
  { text: 'FAQs', href: data.help.faqs },
  { text: 'Support', href: data.help.support },
  { text: 'Live Chat', href: data.help.livechat, hasIndicator: true },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer4Col() {
  return (
    <footer className="relative mt-16 w-full overflow-hidden rounded-t-xl bg-black text-white">
      {/* red/black glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-red-600/25 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-red-700/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 via-red-950/20 to-white/10 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="px-6 py-10 sm:px-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              <div>
                <div className="flex justify-center gap-2 sm:justify-start">
              <img
                src={data.company.logo || '/placeholder.svg'}
                alt="logo"
                className="h-9 w-9 rounded-full ring-1 ring-white/15"
              />
              <span className="bg-gradient-to-br from-red-100 to-red-400 bg-clip-text text-2xl font-semibold text-transparent">
                {data.company.name}
              </span>
            </div>

            <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-white/70 sm:max-w-xs sm:text-left">
              {data.company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-red-300/90 hover:text-red-200 transition"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">About Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-white/65 hover:text-white transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Our Services</p>
              <ul className="mt-8 space-y-4 text-sm">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-white/65 hover:text-white transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Helpful Links</p>
              <ul className="mt-8 space-y-4 text-sm">
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className={`${
                        hasIndicator
                          ? 'group flex justify-center gap-1.5 sm:justify-start'
                          : 'text-white/65 hover:text-white transition'
                      }`}
                    >
                      <span className="text-white/65 group-hover:text-white transition">
                        {text}
                      </span>
                      {hasIndicator && (
                        <span className="relative flex size-2">
                          <span className="bg-red-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                          <span className="bg-red-400 relative inline-flex size-2 rounded-full" />
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Contact Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start"
                      href="#"
                    >
                      <Icon className="size-5 shrink-0 text-red-300 shadow-sm" />
                      {isAddress ? (
                        <address className="text-white/65 -mt-0.5 flex-1 not-italic transition">
                          {text}
                        </address>
                      ) : (
                        <span className="text-white/65 flex-1 transition">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <div className="text-center sm:flex sm:justify-between sm:text-left">
                <p className="text-xs text-white/60">
                  <span className="block sm:inline">All rights reserved.</span>
                </p>

                <p className="mt-4 text-xs text-white/60 transition sm:order-first sm:mt-0">
                  &copy; 2025 {data.company.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

