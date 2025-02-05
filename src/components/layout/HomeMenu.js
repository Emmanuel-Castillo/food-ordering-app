import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import sallad1 from '/public/sallad1.png'
import sallad2 from '/public/sallad2.png'

export default function HomeMenu() {
  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image
            priority
            src={sallad1}
            width={109}
            height={189}
            alt="sallad"
          />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image
            priority
            src={sallad2}
            width={107}
            height={195}
            alt="sallad"
          />
        </div>
      </div>

      <div className="text-center mb-4">
        <SectionHeaders subHeader={"check out"} mainHeader={"Menu"} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
