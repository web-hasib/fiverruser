import React, { useState } from "react";

interface Step1PreMadeProps {
  onNext: (templateData: any) => void;
  onCancel: () => void;
}

export function Step1PreMade({ onNext, onCancel }: Step1PreMadeProps) {
  // We use the first one as selected for the visual match of the screenshot 
  // (the green border), but usually we select it when clicked.
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const templates = [
    { id: 1, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧠" },
    { id: 2, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 3, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 4, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 5, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 6, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 7, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 8, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 9, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 10, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 11, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
    { id: 12, title: "Cardiology Discharge Template", desc: "Comprehensive discharge summary template for cardiac patients post-procedure.", category: "Cardiology", emoji: "🧬" },
  ];

  const handleReview = (template: any) => {
    // We pass the template logic here so the parent can pre-fill formData in the future
    onNext(template);
  };

  return (
    <div className="flex flex-col h-full min-h-[300px] w-full  mx-auto px-4 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
        {templates.map((tpl) => {
          const isSelected = selectedId === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => setSelectedId(tpl.id)}
              className={`bg-card rounded-2xl p-5 flex flex-col justify-between transition border cursor-pointer ${isSelected
                  ? "border-[#22c55e] shadow-md shadow-[#22c55e]/10"
                  : "border-border/50 hover:border-blue-500/50"
                }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <img src="/user.png" alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-xl">{tpl.emoji}</span>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">{tpl.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tpl.desc}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6">
                <span className="text-emerald-400 font-medium text-[11px]">
                  {tpl.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReview(tpl);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm text-xs font-semibold px-5 py-2 rounded-lg transition"
                >
                  Review
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Footer since screenshot cuts off, but we need a way to cancel */}
      <div className="mt-8 flex justify-end gap-3 opacity-70 hover:opacity-100 transition">
        <button
          onClick={onCancel}
          className="bg-transparent border border-border/50 hover:bg-accent text-foreground px-8 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
