"use client";

import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import Image from "next/image";

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="heading">
          A small selection of{" "}
          <span className="text-purple"> projects</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {projects.map((item) => (
          <PinContainer
            title="muhammed_ajmalcc"
            href="https:/muhammedajmalcc"
            key={item.id}
          >
              <div className="relative flex items-center justify-center w-full overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image src="/bg.png" alt="bgimg" fill className="object-cover" />
                </div>
                <Image
                  src={item.img}
                  alt="cover"
                  width={600}
                  height={360}
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="text-[14px] line-clamp-1">
                {item.title}
              </h1>

              <p
                className="  font-light text-[12px] line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center   justify-between mt-7 mb-3 w-full flex-nowrap">
                <div className="flex   items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <Image  width={50} height={50}  src={icon} alt="icon5"  className="w-full p-2 h-full" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center whitespace-nowrap">
                  <p className="flex text-[12px] text-purple">
                    Check Live Site
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
        ))}
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
