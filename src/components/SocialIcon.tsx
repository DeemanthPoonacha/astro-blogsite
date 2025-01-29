import {
  FaEnvelope,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaLink,
  FaXTwitter,
} from "react-icons/fa6";

export const SOCIAL_LINKS = [
  {
    value: "mail",
    label: "E-mail",
    link: "mailto:",
    icon: <FaEnvelope />,
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    link: "https://www.linkedin.com/",
    icon: <FaLinkedin />,
  },
  {
    value: "x",
    label: "Twitter",
    link: "https://www.x.com/",
    icon: <FaXTwitter />,
  },
  {
    value: "instagram",
    label: "Instagram",
    link: "https://instagram.com/",
    icon: <FaInstagram />,
  },
  {
    value: "facebook",
    label: "Facebook",
    link: "https://www.facebook.com/",
    icon: <FaFacebook />,
  },
  {
    value: "other",
    label: "Other",
    icon: <FaLink />,
  },
];

const SocialIcon = ({
  platform,
  className,
}: {
  platform: string;
  className?: string;
}) => {
  return (
    <>
      {SOCIAL_LINKS.find((s) => s.value === platform)?.icon}
      <span className={className}>
        {SOCIAL_LINKS.find((s) => s.value === platform)?.label}
      </span>
    </>
  );
};

export default SocialIcon;
