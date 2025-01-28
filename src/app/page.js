import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Out story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem animi sint consectetur ex rem quos ipsam officiis nihil dolor fugit asperiores, sequi perferendis quisquam tenetur minus libero sit. Ipsam, exercitationem.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, perspiciatis laborum ab, ullam itaque reiciendis commodi dicta, ad quas beatae obcaecati nisi voluptatem accusantium animi assumenda ex. Reiciendis, sequi iure.</p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
        <div className="mt-8"><a className="text-4xl underline text-gray-500" href="tel:+11234567890">+1 123 456 7890</a></div>
      </section>
    </>
  );
}
