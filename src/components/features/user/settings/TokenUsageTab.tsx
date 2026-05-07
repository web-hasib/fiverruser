"use client";

import React, { useState } from "react";
import {
  mockTokenUsage,
  mockUsageBreakdown,
  mockCreditPacks
} from "@/src/types/settings";
import {
  TrendingUp,
  Clock,
  Target,
  Calendar,
  RefreshCw,
  Info,
  Check,
  FileText,
  ArrowRight,
  Copy,
  Clock3
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import { cn } from "@/src/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

const StatCard = ({ icon, label, value, subValue }: StatCardProps) => (
  <div className="flex flex-col">
    <div className="text-muted-foreground mb-2">{icon}</div>
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
        {label}
      </p>
      <h4 className="text-2xl font-bold text-foreground">{value}</h4>
      {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
    </div>
  </div>
);

const TokenUsageTab = () => {
  const [autoRefill, setAutoRefill] = useState(true);

  const tokenTypes = [
    { name: "SOAP Note", tokens: "~2,500–4,000", range: "[2.0M–5.2M]" },
    { name: "Referral Letter", tokens: "~1,200–2,500", range: "[1.5M–2.2M]" },
    { name: "Clinical Summary", tokens: "~1,200–2,500", range: "[2.0M–5.2M]" },
    { name: "Discharge Note", tokens: "~3,000–6,000", range: "[1.5M–2.2M]" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground">AI Credits</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor your token usage and top up instantly when you need more capacity — no plan change required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Usage Header Card */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">
                Token Usage & Limits
              </h3>
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Usage
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-foreground tracking-tight">
                    {mockTokenUsage.used}
                  </span>
                  <span className="text-lg font-medium text-muted-foreground">
                    / {mockTokenUsage.total}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="h-2.5 w-full bg-border/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    style={{ width: `${mockTokenUsage.percentUsed}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-muted-foreground tracking-wide">
                  <span>{mockTokenUsage.percentUsed}% used</span>
                  <span>{mockTokenUsage.remaining} remaining</span>
                </div>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                At current usage, tokens will last{" "}
                <span className="text-blue-500 font-bold underline decoration-blue-500/30 underline-offset-4">
                  68 days
                </span>
                .
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border/30">
              <StatCard
                icon={<Calendar className="w-5 h-5" />}
                label="Resets In"
                value={`${mockTokenUsage.resetsInDays} Days`}
                subValue="Projected to reset"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="Daily Average"
                value={mockTokenUsage.dailyAverage}
                subValue="Tokens / day avg."
              />
              <StatCard
                icon={<Target className="w-5 h-5" />}
                label="Plan Limit"
                value={mockTokenUsage.planLimit}
                subValue="Top-up reserve"
              />
            </div>
          </div>

          {/* Usage Breakdown */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground mb-6">Usage breakdown this month</h3>
            <div className="space-y-4">
              {mockUsageBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.tokens} <span className="text-xs">{item.percent}%</span></span>
                  </div>
                  <div className="h-2 w-full bg-border/30 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-refill */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="size-5 text-blue-500" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Auto-refill credits</h4>
                  <p className="text-xs text-muted-foreground">Automatically add a Boost Pack when balance drops below 15% — never blocked mid-documentation.</p>
                </div>
              </div>
              <Switch
                checked={autoRefill}
                onCheckedChange={setAutoRefill}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>

          {/* Credit Packs */}
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-foreground">Note top-up packs</h3>
              <p className="text-xs text-muted-foreground">
                Need more notes this month? Packs are valid for 90 days and consumed after your base plan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockCreditPacks.map((pack) => (
                <div key={pack.id} className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 flex flex-col gap-6 transition-all duration-300 relative hover:border-blue-500/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-foreground">{pack.name}</h4>
                      {pack.savings && (
                        <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                          {pack.savings}
                        </div>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-blue-500 tracking-tight">{pack.price}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">One-time</span>
                    </div>

                    <div className="bg-muted/30 border border-border/30 rounded-lg px-3 py-2">
                      <p className="text-[11px] font-medium text-foreground/80 text-center">{pack.tokens} tokens + {pack.notes} notes</p>
                    </div>
                  </div>

                  <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all active:scale-[0.98]">
                    Buy credits {pack.price}
                  </Button>

                  <div className="space-y-6 flex-1">
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-bold text-foreground uppercase tracking-wider border-b border-border/20 pb-2">
                        Pack Features
                      </h5>
                      <ul className="space-y-2.5">
                        {pack.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-muted-foreground leading-relaxed">{feature}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-2.5">
                          <Check className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] text-muted-foreground leading-relaxed">Valid for 90 days</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works info box */}
          <div className="bg-blue-500/5 dark:bg-blue-500/10 border-l-4 border-blue-500 rounded-xl p-6 shadow-sm">
            <p className="text-lg text-foreground/90 leading-relaxed font-medium">
              <span className="text-blue-600 dark:text-blue-500 font-bold">How it works:</span> Top-up tokens are consumed after your monthly plan allocation — they never replace it. Both pools show separately in your dashboard. Unused top-up tokens are valid <span className="text-blue-600 dark:text-blue-500 font-bold">90 days from purchase.</span>
            </p>
          </div>

          {/* Referral Section */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="text-amber-500">❤</span> Earn free credits by referring colleagues
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              When a colleague activates a paid plan using your link, you both receive 1M free tokens — automatically credited, no expiry.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-card border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground">
                https://medipro.com/invite/SE-A73C
              </div>
              <Button variant="outline" size="sm" className="h-10 px-4 border-border hover:bg-muted">
                <Copy className="size-4 mr-2" />
                Copy link
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xs text-muted-foreground">You get: 1M tokens</span>
              <span className="text-xs text-muted-foreground">They get: 1M tokens</span>
              <span className="text-xs text-muted-foreground">No limit on referrals</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* What are tokens */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Info className="size-4 text-blue-500" />
              What are tokens?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Every AI action consumes tokens. Bear-sized equivalents:
            </p>
            <ul className="space-y-3">
              {tokenTypes.map((type, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground flex items-center gap-2">
                      <FileText className="size-4 text-blue-500" />
                      {type.name}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">{type.tokens} tokens</p>
                  <p className="text-xs text-muted-foreground">{type.range}</p>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/30">
              Clinical Pro 5•Afformo / 1,000–1,600 full notes per month
            </p>
          </div>

          {/* Upgrade Instead */}
          <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <span>💡</span> Upgrade Instead?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Team Practice gives 15M pooled tokens across up to 5 clinicians — just $79/workspace. Less than $16/seat.
            </p>
            <Button variant="link" className="h-auto p-0 text-blue-500 hover:text-blue-400 font-medium text-sm">
              See Team Plan <ArrowRight className="size-4 ml-1" />
            </Button>
          </div>

          {/* Auto-logout & HIPAA */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Clock3 className="size-4 text-blue-500" />
              Auto-logout & HIPAA
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Mar 18 - Extended Session</span>
                <span className="text-sm text-foreground">$18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Feb 27 - Boost Pack</span>
                <span className="text-sm text-foreground">$8</span>
              </div>
            </div>
          </div>

          {/* Switching Plans */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Switching plans</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-foreground mt-1">•</span>
                Upgrades take effect immediately
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-foreground mt-1">•</span>
                Downgrades take effect at period end
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-foreground mt-1">•</span>
                No penalties on monthly plans
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-foreground mt-1">•</span>
                Annual plans: 14-day refund window
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenUsageTab;
