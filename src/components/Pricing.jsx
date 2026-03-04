import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Check,
  X,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { CLoader } from "./ui/c-loader";
import { translations } from "../lib/translations";
import { fetchActivePlans } from "../lib/api";

// Feature limit → human-readable label per language
const featureLabels = {
  uz: {
    max_users: (v) =>
      v === -1 ? "Cheksiz foydalanuvchilar" : `${v} tagacha foydalanuvchi`,
    max_clients: (v) => (v === -1 ? "Cheksiz mijozlar" : `${v} tagacha mijoz`),
    export_data: () => "Ma'lumotlarni eksport",
    custom_fields: () => "Maxsus maydonlar",
    advanced_analytics: () => "Kengaytirilgan analitika",
    priority_support: () => "Shaxsiy qo'llab-quvvatlash",
  },
  ru: {
    max_users: (v) =>
      v === -1 ? "Неограниченные пользователи" : `До ${v} пользователей`,
    max_clients: (v) =>
      v === -1 ? "Неограниченные клиенты" : `До ${v} клиентов`,
    export_data: () => "Экспорт данных",
    custom_fields: () => "Настраиваемые поля",
    advanced_analytics: () => "Расширенная аналитика",
    priority_support: () => "Персональная поддержка",
  },
  en: {
    max_users: (v) => (v === -1 ? "Unlimited users" : `Up to ${v} users`),
    max_clients: (v) => (v === -1 ? "Unlimited clients" : `Up to ${v} clients`),
    export_data: () => "Data export",
    custom_fields: () => "Custom fields",
    advanced_analytics: () => "Advanced analytics",
    priority_support: () => "Priority support",
  },
};

const featureOrder = [
  "max_users",
  "max_clients",
  "export_data",
  "custom_fields",
  "advanced_analytics",
  "priority_support",
];

function formatPrice(price, currency) {
  const formatted = Math.round(price).toLocaleString("uz-UZ");
  if (currency === "UZS") return `${formatted} so'm`;
  if (currency === "USD") return `$${formatted}`;
  return `${formatted} ${currency}`;
}

// Returns { enabled: [...], disabled: [...] } for a plan based on all available feature keys
function buildFeatureList(planLimits, allFeatureKeys, language) {
  const labels = featureLabels[language] || featureLabels.en;
  const enabledKeys = new Set(planLimits.map((l) => l.featureKey));

  const enabled = [];
  const disabled = [];

  for (const key of allFeatureKeys) {
    const labelFn = labels[key];
    if (!labelFn) continue;

    if (enabledKeys.has(key)) {
      const limit = planLimits.find((l) => l.featureKey === key);
      enabled.push(labelFn(limit.limitValue));
    } else {
      // Show max version label for disabled features
      disabled.push(labelFn(-1));
    }
  }

  return { enabled, disabled };
}

const YEARLY_DISCOUNT = 0.8;

// Reusable plan card component
const PlanCard = ({ plan, billingCycle, t, openDemoModal, isActive }) => {
  const isPopular = plan.popular;

  return (
    <div
      className={`relative bg-card border-2 rounded-2xl p-6 md:p-8 transition-all duration-300 h-full flex flex-col ${
        isPopular
          ? "border-primary shadow-lg shadow-primary/20 md:scale-105 md:z-10"
          : "border-border"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{t.popular}</span>
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
          {plan.name}
        </h3>
        <div className="mb-2">
          <span className="text-3xl md:text-4xl font-bold text-foreground">
            {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {plan.trialDays
            ? `${plan.trialDays} ${t.freeTrialDaysLabel || t.freeTrialMonth}`
            : t.freeTrialMonth}
        </p>
      </div>

      {/* Enabled Features */}
      <div className="space-y-2.5 mb-4 flex-1">
        {plan.enabled.map((feature, i) => (
          <div key={`e-${i}`} className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm md:text-base text-foreground">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Disabled Features (strikethrough) */}
      {plan.disabled.length > 0 && (
        <div className="space-y-2.5 mb-6 pt-2 border-t border-border/50">
          {plan.disabled.map((feature, i) => (
            <div
              key={`d-${i}`}
              className="flex items-start space-x-3 opacity-40"
            >
              <div className="w-5 h-5 bg-muted-foreground/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-sm md:text-base text-muted-foreground line-through">
                {feature}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Spacer if no disabled */}
      {plan.disabled.length === 0 && <div className="mb-6" />}

      {/* CTA Button */}
      <Button
        onClick={openDemoModal}
        className={`cursor-pointer w-full py-3 mt-auto ${
          isPopular
            ? "btn-primary"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        {isPopular && <Zap className="w-4 h-4 mr-2" />}
        {t.choosePlan}
      </Button>

      {/* Background Decoration */}
      {isPopular && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl pointer-events-none"></div>
      )}
    </div>
  );
};

const Pricing = ({ language, openDemoModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [apiPlans, setApiPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1); // Start on popular/middle
  const [cardCount, setCardCount] = useState(3); // Cards visible: 1 mobile, 2 tablet, 3 desktop
  const sectionRef = useRef(null);
  const t = translations[language];

  // Responsive card count
  useEffect(() => {
    const updateCardCount = () => {
      if (window.innerWidth < 768) setCardCount(1);
      else if (window.innerWidth < 1024) setCardCount(2);
      else setCardCount(3);
    };
    updateCardCount();
    window.addEventListener("resize", updateCardCount);
    return () => window.removeEventListener("resize", updateCardCount);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchActivePlans()
      .then((data) => {
        setApiPlans(data);
        // Set active to popular plan index
        const popIdx = data.findIndex((p) => p.isPopular);
        if (popIdx !== -1) setActiveIndex(popIdx);
      })
      .catch(() => setApiPlans(null))
      .finally(() => setLoading(false));
  }, []);

  // Collect all feature keys across all plans
  const allFeatureKeys = useMemo(() => {
    if (!apiPlans) return featureOrder;
    const keys = new Set();
    apiPlans.forEach((p) => p.limits.forEach((l) => keys.add(l.featureKey)));
    return featureOrder.filter((k) => keys.has(k));
  }, [apiPlans]);

  // Fallback static plans
  const staticPlans = [
    {
      name: t.basic,
      monthlyPrice: t.basicPrice,
      yearlyPrice: t.basicYearlyPrice,
      enabled: t.basicFeatures,
      disabled: [],
      popular: false,
    },
    {
      name: t.standard,
      monthlyPrice: t.standardPrice,
      yearlyPrice: t.standardYearlyPrice,
      enabled: t.standardFeatures,
      disabled: [],
      popular: true,
    },
    {
      name: t.pro,
      monthlyPrice: t.proPrice,
      yearlyPrice: t.proYearlyPrice,
      enabled: t.proFeatures,
      disabled: [],
      popular: false,
    },
  ];

  const plans = apiPlans
    ? apiPlans.map((plan) => {
        const { enabled, disabled } = buildFeatureList(
          plan.limits,
          allFeatureKeys,
          language,
        );
        return {
          name: plan.name,
          monthlyPrice: formatPrice(plan.price, plan.currency) + "/oy",
          yearlyPrice:
            formatPrice(plan.price * 12 * YEARLY_DISCOUNT, plan.currency) +
            "/yil",
          enabled,
          disabled,
          popular: plan.isPopular,
          trialDays: plan.trialDays,
        };
      })
    : staticPlans;

  const goTo = (idx) => {
    if (idx >= 0 && idx < plans.length) setActiveIndex(idx);
  };

  // Touch/swipe handling
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goTo(activeIndex + 1);
    else if (diff < -50) goTo(activeIndex - 1);
  };

  return (
    <section id="pricing" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 ${isVisible ? "opacity-0 animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.pricingTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t.pricingSubtitle}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span
              className={`text-sm ${billingCycle === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {t.monthly}
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly",
                )
              }
              aria-label="Toggle billing cycle"
              className={`cursor-pointer relative w-14 h-7 rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-card rounded-full transition-transform ${
                  billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
                }`}
              ></div>
            </button>
            <span
              className={`text-sm ${billingCycle === "yearly" ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {t.yearly}
            </span>
            {billingCycle === "yearly" && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {t.savePercent}
              </span>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <CLoader size={64} />
          </div>
        )}

        {/* Plans — Slider with peek on all screens */}
        {!loading && (
          <div
            className={`${isVisible ? "opacity-0 animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative max-w-6xl mx-auto">
              {/* Left Arrow */}
              <button
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                className={`cursor-pointer absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center transition-opacity ${
                  activeIndex === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-muted"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === plans.length - 1}
                className={`cursor-pointer absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center transition-opacity ${
                  activeIndex === plans.length - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-muted"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Cards Container */}
              <div
                className="overflow-x-clip overflow-y-visible"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out items-stretch pt-8 pb-4"
                  style={{
                    transform: `translateX(calc(-${activeIndex} * (100% / ${cardCount}) + ${cardCount > 1 ? `(100% / ${cardCount})` : "0%"}))`,
                  }}
                >
                  {plans.map((plan, index) => {
                    const isCenter = index === activeIndex;
                    return (
                      <div
                        key={index}
                        className="flex-shrink-0 px-2 md:px-3 transition-all duration-500 ease-in-out"
                        style={{ width: `${100 / cardCount}%` }}
                      >
                        <div
                          className="transition-all duration-500 ease-in-out h-full"
                          style={{
                            transform: isCenter ? "scale(1.03)" : "scale(0.97)",
                          }}
                        >
                          <PlanCard
                            plan={plan}
                            billingCycle={billingCycle}
                            t={t}
                            openDemoModal={openDemoModal}
                            isActive={isCenter}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-3 mt-6">
              {plans.map((plan, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  aria-label={plan.name}
                  className={`cursor-pointer transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "w-8 h-3 bg-primary"
                      : "w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
