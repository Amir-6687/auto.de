import { Contact2 } from "@/components/ui/contact-2";

export default function ContactPage() {
  return (
    <Contact2
      title="Contact Us"
      description="We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!"
      phone="(123) 34567890"
      email="email@example.com"
      web={{ label: "shadcnblocks.com", url: "https://shadcnblocks.com" }}
    />
  );
}
