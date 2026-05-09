import PageHeader from "@/components/ui/PageHeader";
import InfoCard from "@/components/ui/InfoCard";
import { MapPin, Phone, Mail, Printer } from "lucide-react";

export const metadata = { title: "Contact Us" };

export default function Page() {
  const contacts = [
    { label: "Address", val: "10-N, Model Town Extension, Lahore 54000, Pakistan", icon: "map" },
    { label: "Phone", val: "+92 42 35161424-5 | UAN: 111-GHANI-1 (442-641)", icon: "phone" },
    { label: "Fax", val: "+92 42 35160393", icon: "print" },
    { label: "Email", val: "corporate@ghaniglobal.com", icon: "mail" },
  ];

  return (
    <div style={{ background: "var(--bg2)", minHeight: "100vh" }}>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <div style={{ padding: "48px clamp(32px,6vw,96px)" }} className="grid lg:grid-cols-2 gap-6">
        <InfoCard title="Corporate Office">
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: "var(--bg2)", border: "1px solid var(--line)" }}>
                <MapPin size={15} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase mb-1" style={{ color: "var(--text2)", opacity: 0.6 }}>Address</p>
                <p className="text-sm font-light" style={{ color: "var(--navy)" }}>10-N, Model Town Extension</p>
                <p className="text-sm font-light" style={{ color: "var(--navy)" }}>Lahore 54000, Pakistan</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: "var(--bg2)", border: "1px solid var(--line)" }}>
                <Phone size={15} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase mb-1" style={{ color: "var(--text2)", opacity: 0.6 }}>Phone</p>
                <p className="text-sm font-light" style={{ color: "var(--navy)" }}>+92 42 35161424-5</p>
                <p className="text-sm font-light" style={{ color: "var(--navy)" }}>UAN: 111-GHANI-1 (442-641)</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: "var(--bg2)", border: "1px solid var(--line)" }}>
                <Printer size={15} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase mb-1" style={{ color: "var(--text2)", opacity: 0.6 }}>Fax</p>
                <p className="text-sm font-light" style={{ color: "var(--navy)" }}>+92 42 35160393</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: "var(--bg2)", border: "1px solid var(--line)" }}>
                <Mail size={15} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase mb-1" style={{ color: "var(--text2)", opacity: 0.6 }}>Email</p>
                <a href="mailto:corporate@ghaniglobal.com" className="text-sm font-light" style={{ color: "var(--blue3)" }}>
                  corporate@ghaniglobal.com
                </a>
              </div>
            </li>
          </ul>
        </InfoCard>

        <InfoCard title="Send a Message">
          <p className="text-sm mb-5 font-light" style={{ color: "var(--text2)" }}>We respond within one business day.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.18em] uppercase mb-2" style={{ color: "var(--gold)" }}>Name</label>
              <input type="text" placeholder="Your full name" className="form-input" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.18em] uppercase mb-2" style={{ color: "var(--gold)" }}>Email Address</label>
              <input type="email" placeholder="your@email.com" className="form-input" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.18em] uppercase mb-2" style={{ color: "var(--gold)" }}>How did you hear about us?</label>
              <input type="text" placeholder="Optional" className="form-input" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.18em] uppercase mb-2" style={{ color: "var(--gold)" }}>Message *</label>
              <textarea rows={4} placeholder="Your message..." className="form-input" style={{ resize: "none" }} />
            </div>
            <button className="btn-blue">Send Message</button>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
