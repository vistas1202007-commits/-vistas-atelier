import { Hero } from "@/components/home/Hero";
import { Work } from "@/components/home/Work";
import { Studio } from "@/components/home/StudioBoard";
import { Contact, Engagements, Faq, Industries, JournalPreview, Process, Services, Statement } from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Work />
      <Services />
      <Industries />
      <Process />
      <Engagements />
      <Studio />
      <JournalPreview />
      <Faq />
      <Contact />
    </>
  );
}
