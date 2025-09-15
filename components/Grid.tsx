import { gridItems } from "@/data";
import dynamic from "next/dynamic";

const BentoGrid = dynamic(() => import("./ui/BentoGrid").then((m) => ({ default: m.BentoGrid })), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-900 rounded-lg" />,
});

const BentoGridItem = dynamic(() => import("./ui/BentoGrid").then((m) => ({ default: m.BentoGridItem })), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-900 rounded-lg" />,
});

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            // remove icon prop
            // remove original classname condition
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
