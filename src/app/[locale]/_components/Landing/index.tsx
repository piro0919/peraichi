"use client";
import { Cloud, Edit3, Sliders, Smartphone, Type } from "feather-icons-react";
import { useTranslations } from "next-intl";
import useSettings from "@/app/[locale]/useSettings";
import { Button } from "@/components/ui/button";

export default function Landing(): React.JSX.Element {
  const t = useTranslations("Landing");
  const setHasSeenLanding = useSettings((state) => state.setHasSeenLanding);
  const handleStart = (): void => {
    setHasSeenLanding(true);
  };
  const features = [
    {
      description: t("feature1Description"),
      icon: Edit3,
      title: t("feature1Title"),
    },
    {
      description: t("feature2Description"),
      icon: Cloud,
      title: t("feature2Title"),
    },
    {
      description: t("feature3Description"),
      icon: Smartphone,
      title: t("feature3Title"),
    },
    {
      description: t("feature4Description"),
      icon: Sliders,
      title: t("feature4Title"),
    },
    {
      description: t("feature5Description"),
      icon: Type,
      title: t("feature5Title"),
    },
  ];

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg space-y-10 text-center">
        <div className="animate-fade-in space-y-4">
          <h1 className="font-(family-name:--font-zen-kurenaido) text-5xl tracking-wide md:text-6xl">
            {t("title")}
          </h1>
          <p className="whitespace-pre-line text-lg text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {features.map((feature, index) => (
            <div
              className="animate-fade-in-up space-y-2"
              key={feature.title}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-transform hover:scale-110">
                <feature.icon className="text-foreground" size={20} />
              </div>
              <h3 className="text-sm font-medium">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <Button
            className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:min-w-48"
            onClick={handleStart}
            size="lg"
          >
            {t("cta")}
          </Button>
        </div>
      </div>
    </div>
  );
}
