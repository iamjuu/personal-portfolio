import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, MessageCircle } from "lucide-react";
import { useToast } from "./ui/Toast";

const Footer = () => {
  const { showToast } = useToast();

  const handleContactClick = () => {
    showToast("Thank you for your interest! I'll get back to you soon.", "success");
  };

  return (
    <footer className="w-full pt-20 pb-1" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-32 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          fill
          className="w-full h-full opacity-50 object-cover"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <button onClick={handleContactClick}>
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </button>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between gap-5 items-center">
        <p className="text-[12px]">
          Copyright © 2024 Muhammed Ajmal CC
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => {
            const label = info.label as string;
            const href = (info as any).href as string;
            const Icon =
              label === "github"
                ? Github
                : label === "linkedin"
                ? Linkedin
                : label === "instagram"
                ? Instagram
                : label === "whatsapp"
                ? MessageCircle
                : Mail;
            return (
              <a
                key={info.id}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                aria-label={label}
                onClick={(e) => {
                  if (label === "mail") {
                    console.log("Email icon clicked, href:", href);
                    // Ensure the mailto link works
                    window.location.href = href;
                  }
                }}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
