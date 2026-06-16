"use client";

import React, { useState } from "react";
import { mockSubscriptionPlans, mockPaymentMethod, mockBillingHistory } from "@/src/types/settings";
import { Button } from "@/src/components/ui/button";
import { Check, CreditCard, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const SubscriptionTab = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("free");
  const [seats, setSeats] = useState(2);

  const calculateTeamPrice = (priceStr: string) => {
    const price = parseFloat(priceStr.replace("$", ""));
    return (price * seats).toFixed(2);
  };

  return (
    <div className="space-y-8">
      {/* Header & Toggle */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Subscription Plan</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Manage your plan, view billing history, and upgrade your practice&apos;s capacity.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-muted/50 p-1 rounded-xl border border-border flex items-center gap-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                billingCycle === "monthly" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                billingCycle === "annually" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annually
            </button>
          </div>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockSubscriptionPlans.map((plan) => {
          const isTeam = plan.id === "team";
          const currentPrice = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnually;
          
          return (
            <div
              key={plan.id}
              className={cn(
                "bg-card/30 backdrop-blur-sm border rounded-2xl p-6 flex flex-col gap-6 transition-all duration-300 relative",
                selectedPlanId === plan.id
                  ? "border-blue-500/50 ring-1 ring-blue-500/20 shadow-lg"
                  : "border-border/50 hover:border-border"
              )}
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-foreground">{plan.name}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed min-h-[32px]">{plan.target}</p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-blue-500 tracking-tight">
                    {isTeam ? `$${currentPrice.replace("$", "")}` : currentPrice}
                  </span>
                  {plan.id !== "free" && (
                    <span className="text-xs text-muted-foreground">
                      {isTeam ? "/seat/mo" : "/Monthly"}
                    </span>
                  )}
                </div>

                <div className="bg-muted/30 border border-border/30 rounded-lg px-3 py-2">
                  <p className="text-[11px] font-medium text-foreground/80 text-center">{plan.notesPerMonth}</p>
                </div>
              </div>

              <Button
                onClick={() => setSelectedPlanId(plan.id)}
                className={cn(
                  "w-full h-10 rounded-lg text-xs font-bold transition-all",
                  selectedPlanId === plan.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600/90 hover:bg-blue-600 text-white"
                )}
              >
                {selectedPlanId === plan.id ? "Current Plan" : plan.id === "free" ? "Select Free Plan" : `Upgrade To ${plan.name === "Starter" ? "Stater" : plan.name}`}
              </Button>

              {isTeam && (
                <div className="space-y-4 pt-2 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">Number of seats</span>
                    <div className="flex items-center gap-2 bg-muted/50 p-0.5 rounded-lg border border-border/50">
                      <button 
                        onClick={() => setSeats(Math.max(2, seats + 1))}
                        className="size-7 flex items-center justify-center rounded-md hover:bg-muted text-foreground"
                      >
                        <span className="text-lg font-bold">+</span>
                      </button>
                      <span className="w-4 text-center text-xs font-bold text-foreground">{seats}</span>
                      <button 
                        onClick={() => setSeats(Math.max(2, seats - 1))}
                        className="size-7 flex items-center justify-center rounded-md hover:bg-muted text-foreground"
                      >
                        <span className="text-lg font-bold">−</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-muted-foreground">{seats * 900} notes/month pooled</p>
                    </div>
                    <p className="text-xs font-bold text-foreground">€{calculateTeamPrice(currentPrice)}/mo</p>
                  </div>
                </div>
              )}

              <div className="space-y-6 flex-1">
                {plan.categories.map((cat, idx) => (
                  <div key={idx} className="space-y-3">
                    <h5 className="text-[10px] font-bold text-foreground uppercase tracking-wider">
                      {cat.title}
                    </h5>
                    <ul className="space-y-2.5">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Info/History + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-foreground">Payment method</h3>
              <Button variant="outline" size="sm" className="h-8 text-xs text-blue-500 border-border">Update</Button>
            </div>
            <div className="bg-muted/20 border border-border/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-slate-800 rounded-lg flex items-center justify-center">
                  <CreditCard className="size-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Visa ending •••• {mockPaymentMethod.last4}</p>
                  <p className="text-xs text-muted-foreground">Expires {mockPaymentMethod.expiry} • {mockPaymentMethod.country}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                Active
              </span>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground mb-6">Billing history</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left text-xs font-medium text-muted-foreground pb-4 px-2">Date</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-4 px-2">Description</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-4 px-2">Amount</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-4 px-2">Sessions</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-4 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBillingHistory.map((item) => (
                    <tr key={item.id} className="border-b border-border/10 last:border-0 group">
                      <td className="py-4 px-2 text-xs text-muted-foreground">{item.date}</td>
                      <td className="py-4 px-2 text-xs text-foreground font-medium">{item.description}</td>
                      <td className="py-4 px-2 text-xs text-foreground font-bold">{item.amount}</td>
                      <td className="py-4 px-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                          Paid
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold border-border text-blue-500">
                          View Invoice
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) - Sidebar */}
        <div className="space-y-6">
          {/* Why upgrade to Team? */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span>💡</span> Why upgrade to Team?
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              At $79/workspace for 5 clinicians, each seat costs ~$15.80 — less than Clinical Pro per person. Plus you get:
            </p>
            <ul className="space-y-2.5">
              {[
                "5M pooled tokens (vs 4M solo)",
                "Shared patient records",
                "Admin controls & task assignment",
                "24-month data retention"
              ].map((text, i) => (
                <li key={i} className="text-[11px] text-muted-foreground flex items-center gap-2">
                  <span className="size-1 rounded-full bg-foreground/40" />
                  {text}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full h-10 text-[11px] font-bold border-border/50 text-blue-500 hover:bg-muted">
              Upgrade to Team
            </Button>
          </div>

          {/* Switching plans */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span>🗓</span> Switching plans
            </h3>
            <ul className="space-y-3">
              {[
                "Upgrades take effect immediately",
                "Downgrades take effect at period end",
                "No penalties on monthly plans",
                "Annual plans: 14-day refund window"
              ].map((text, i) => (
                <li key={i} className="text-[11px] text-muted-foreground flex items-center gap-2">
                  <span className="size-1 rounded-full bg-foreground/40" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTab;
