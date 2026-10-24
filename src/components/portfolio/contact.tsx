"use client";

import { useState } from "react";
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from "@/lib/portfolio-data";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Twitter,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { useToast } from "@/hooks/use-toast";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Name, email and message are required.",
        variant: "destructive",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setStatus("sending");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service is not configured");
      }

      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            name: form.name.trim(),
            email: form.email.trim(),
            subject: `Portfolio enquiry from ${form.name.trim()}`,
            from_name: form.name.trim(),
            from_email: form.email.trim(),
            reply_to: form.email.trim(),
            message: form.message.trim(),
          },
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      toast({
        title: "Message sent! 🎉",
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      toast({
        title: "Something went wrong",
        description: "Please try again or email adarshgupta02027@gmail.com directly.",
        variant: "destructive",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div
        aria-hidden
        className="absolute right-[-70px] bottom-24 -z-10 h-64 w-64 animate-blob rounded-full bg-brand-soft blur-2xl"
      />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* -------- form card -------- */}
          <Reveal direction="up">
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-9">
              <SectionHeading
                number="06"
                kicker="Contact"
                title="Let's Build Something Great"
                description="Have a project in mind, a question, or just want to say hi? Feel free to reach out — I'd love to hear from you."
              />

              <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="group block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Your Name *
                    </span>
                    <input
                      maxLength={100}
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-brand focus:bg-card focus:ring-4 focus:ring-brand/15"
                    />
                  </label>
                  <label className="group block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Your Email *
                    </span>
                    <input
                      type="email"
                      maxLength={200}
                      autoComplete="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-brand focus:bg-card focus:ring-4 focus:ring-brand/15"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Message *
                  </span>
                  <textarea
                    maxLength={5000}
                    value={form.message}
                    onChange={update("message")}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-brand focus:bg-card focus:ring-4 focus:ring-brand/15"
                  />
                </label>

                <motion.button
                  type="submit"
                  disabled={status !== "idle" && status !== "error"}
                  whileHover={status === "idle" ? { scale: 1.015 } : undefined}
                  whileTap={status === "idle" ? { scale: 0.975 } : undefined}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-opacity disabled:opacity-80"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "idle" || status === "error" ? (
                      <motion.span
                        key="idle"
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </motion.span>
                    ) : status === "sending" ? (
                      <motion.span
                        key="sending"
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="sent"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        Message Sent!
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span
                    aria-hidden
                    className="absolute inset-y-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.button>
              </form>
            </div>
          </Reveal>

          {/* -------- connect card -------- */}
          <Reveal direction="right" delay={0.12}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-8">
              {/* decorative blobs */}
              <div aria-hidden className="absolute -right-10 -top-10 h-36 w-36 animate-blob bg-brand-soft blur-xl" />
              <div aria-hidden className="absolute -bottom-12 -left-8 h-32 w-32 animate-blob bg-[#f2ddb9] blur-xl dark:bg-brand-softer" />

              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30"
              >
                <Send className="h-5 w-5 -rotate-12" />
              </motion.div>

              <h3 className="mt-5 text-2xl font-extrabold tracking-tight">Connect</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Let&apos;s create something amazing together.
              </p>

              <ul className="mt-7 space-y-4">
                <li className="group flex items-center gap-3.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                    <a href="mailto:adarshgupta02027@gmail.com" className="text-sm font-semibold transition-colors hover:text-brand">
                      adarshgupta02027@gmail.com
                    </a>
                  </div>
                </li>
                <li className="group flex items-center gap-3.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <MapPin className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Location</p>
                    <p className="text-sm font-semibold">India</p>
                  </div>
                </li>
              </ul>

              <div className="mt-auto pt-8">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Follow me
                </p>
                <div className="mt-3 flex gap-2.5">
                  {[
                    { Icon: Github, label: "GitHub", href: GITHUB_URL },
                    { Icon: Linkedin, label: "LinkedIn", href: LINKEDIN_URL },
                    { Icon: Twitter, label: "Twitter", href: TWITTER_URL },
                    { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
                  ].map(({ Icon, label, href }, i) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      whileHover={{ y: -5, scale: 1.1, rotate: i % 2 ? 5 : -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background/70 text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
