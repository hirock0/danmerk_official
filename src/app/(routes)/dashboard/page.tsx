// app/(routes)/dashboard/page.tsx

"use client";

import DashboardCard from "@/components/dashboardCard/dashboardCard";

const DashboardPage = () => {
  const cards = [
    {
      count: 26,
      title: "টোটাল পেন্ডিং অর্ডার",
      buttonText: "টোটাল পেন্ডিং অর্ডার",
    },
    { count: 26, title: "টোটাল অর্ডার", buttonText: "টোটাল অর্ডার" },
    { count: 26, title: "টোটাল ডেলিভারি", buttonText: "টোটাল ডেলিভারি" },
    {
      count: 26,
      title: "টোটাল বায়োমেট্রিক অর্ডার",
      buttonText: "টোটাল বায়োমেট্রিক অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল ডিলিট অর্ডার",
      buttonText: "টোটাল ডিলিট অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
    {
      count: 26,
      title: "টোটাল না পাওয়া অর্ডার",
      buttonText: "টোটাল না পাওয়া অর্ডার",
    },
  ];

  return (
    <div className="p-6 w-full grid gap-6  max-lg:grid-cols-2 grid-cols-3 max-sm:grid-cols-1">
      {cards.map((card, index) => (
        <DashboardCard
          key={index}
          count={card.count}
          title={card.title}
          buttonText={card.buttonText}
        />
      ))}
    </div>
  );
};

export default DashboardPage;
