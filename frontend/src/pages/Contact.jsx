import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import { RevealText } from "@/components/site/RevealText";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EASE = [0.76, 0, 0.24, 1];

const FIELDS = [
  { name: "name", label: "Full name", type: "text", placeholder: "Ada Lovelace" },
  { name: "email", label: "Email", type: "email", placeholder: "ada@company.com" },
  { name: "company", label: "Company", type: "text", placeholder: "Optional" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setDone(true);
      toast.success("Message sent. We'll be in touch shortly.");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string" ? detail : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="pt-32 md:pt-40 min-h-screen">
      <Toaster theme="dark" position="bottom-right" richColors />
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-border pt-12 pb-28">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-brand" />
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-steel">
                04 — Contact
              </span>
            </div>
            <RevealText
              as="h1"
              lines={["Initiate."]}
              className="font-heading font-black uppercase tracking-tighter leading-[0.85] text-7xl md:text-[10vw] text-bone"
              delay={0.1}
            />
            <p className="mt-8 max-w-md text-base lg:text-lg font-light leading-relaxed text-steel">
              Tell us what you&apos;re building. We read every message and
              usually reply within two working days.
            </p>

            <div className="mt-14 space-y-6 border-t border-border pt-8">
              {[
                ["Email", "hello@vantera.io"],
                ["Studio", "Kreuzberg, Berlin"],
                ["Phone", "+49 30 5555 0192"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
                    {k}
                  </span>
                  <span className="text-sm text-bone">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-6 lg:col-start-7">
            {done ? (
              <div
                data-testid="contact-success"
                className="reveal in border border-border p-10 md:p-14 min-h-[400px] flex flex-col justify-center"
              >
                <div className="flex h-14 w-14 items-center justify-center border border-brand text-brand mb-8">
                  <Check size={28} />
                </div>
                <h2 className="font-heading text-4xl font-black uppercase tracking-tight text-bone">
                  Received.
                </h2>
                <p className="mt-4 text-base font-light text-steel max-w-sm">
                  Thanks for reaching out. A human from Vantera will get back to
                  you shortly.
                </p>
                <button
                  data-testid="contact-reset"
                  onClick={() => setDone(false)}
                  className="mt-8 self-start font-mono text-xs uppercase tracking-[0.18em] text-bone border-b border-brand pb-1 hover:text-brand transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} data-testid="contact-form" className="space-y-10">
                {FIELDS.map((f) => (
                  <div key={f.name} className="group">
                    <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-steel mb-3">
                      {f.label}
                      {f.name !== "company" && (
                        <span className="text-brand"> *</span>
                      )}
                    </label>
                    <input
                      type={f.type}
                      value={form[f.name]}
                      onChange={update(f.name)}
                      placeholder={f.placeholder}
                      data-testid={`contact-${f.name}`}
                      className="w-full bg-transparent border-b border-border py-3 text-lg text-bone placeholder:text-steel/50 outline-none transition-colors duration-300 focus:border-brand"
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-steel mb-3">
                    Message <span className="text-brand">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us about the project…"
                    data-testid="contact-message"
                    className="w-full resize-none bg-transparent border-b border-border py-3 text-lg text-bone placeholder:text-steel/50 outline-none transition-colors duration-300 focus:border-brand"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit"
                  className="group relative inline-flex items-center gap-3 overflow-hidden border border-bone bg-bone px-10 py-4 font-mono text-xs uppercase tracking-[0.18em] text-obsidian transition-colors duration-500 hover:bg-transparent hover:text-bone disabled:opacity-50"
                >
                  <span>{loading ? "Sending…" : "Send message"}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
