import { Link } from "react-router";
import { SegmentedToggle } from "../core/toggles/SegmentedToggle";
import { Button } from "../core/buttons/Button";
import { AnimatedHeader } from "../core/motion/AnimatedHeader";
import { useTranslation } from "react-i18next";

export function Header() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AnimatedHeader delay={0} className="absolute top-0 right-0 p-8 flex items-center gap-6 z-50">
      <SegmentedToggle
        options={[
          { value: "en", label: "English" },
          { value: "es", label: "Español" },
        ]}
        value={i18n.language.split("-")[0] || "es"}
        onChange={changeLanguage}
      />
      <Button variant="ghost" size="md" className="font-semibold text-lg">
        <Link to="/login" className="block w-full h-full">
          Log In
        </Link>
      </Button>
    </AnimatedHeader>
  );
}