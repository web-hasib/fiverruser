"use client";

import React, { useState } from "react";
import { UserProfile, mockProfile, mockProfileCompletion } from "@/src/types/settings";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { 
  User,
  Upload, 
  X, 
  Copy, 
  Check, 
  CircleCheck, 
  Circle, 
  Globe, 
  ShieldCheck, 
  Languages,
  Clock,
  Calendar,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

// ─── Shared field styles ─────────────────────────────────────────────────────
const INPUT_CLS = "h-11 bg-card border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors";
const SELECT_CLS = "h-11 bg-card border border-border rounded-xl text-foreground data-[placeholder]:text-foreground/40";

const ProfileTab = () => {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [copied, setCopied] = useState(false);
  const clinicianId = "MED-2024-SR-A73C";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(clinicianId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = mockProfileCompletion.items.filter(i => i.completed).length;
  const totalCount = mockProfileCompletion.items.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Profile Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Your personal and professional information. Appears on AI-generated documents and your team workspace.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Photo Section */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">Profile Photo</h3>
              <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-medium">Appears on documents</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-border/50 bg-muted">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-muted-foreground m-auto mt-6" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-border hover:bg-muted w-fit">
                  <Upload className="size-4 mr-2" />
                  Upload Image
                </Button>
                <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-border hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 w-fit">
                  <X className="size-4 mr-2" />
                  Remove
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WebP. Max 2MB, 300x300px recommended</p>
              </div>
            </div>
          </div>

          {/* Clinician ID */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground mb-1">Clinician ID</h3>
            <p className="text-sm text-muted-foreground mb-4">System-assigned unique identifier for audit trails and documents.</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-card border border-border/50 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-blue-500">{clinicianId}</span>
                <button 
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Title</Label>
                <Select value={profile.title} onValueChange={(val) => handleSelectChange("title", val)}>
                  <SelectTrigger className={INPUT_CLS}>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr.">Dr.</SelectItem>
                    <SelectItem value="Mr.">Mr.</SelectItem>
                    <SelectItem value="Ms.">Ms.</SelectItem>
                    <SelectItem value="Prof.">Prof.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Display name</Label>
                <Input
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleChange}
                  className={INPUT_CLS}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">First name</Label>
                <Input
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className={INPUT_CLS}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Last name</Label>
                <Input
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className={INPUT_CLS}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium text-foreground/80">Primary email</Label>
                <div className="relative">
                  <Input
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className={cn(INPUT_CLS, "pr-24")}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Verified
                  </span>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium text-foreground/80 flex items-center gap-1">
                  Secondary email <span className="text-muted-foreground font-normal">(Optional)</span>
                </Label>
                <Input
                  name="secondaryEmail"
                  value={profile.secondaryEmail}
                  onChange={handleChange}
                  placeholder="Recovery and notification backup email"
                  className={INPUT_CLS}
                />
                <p className="text-xs text-muted-foreground">Recovery and notification backup email. Verification email will be sent.</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Phone number</Label>
                <div className="flex gap-2">
                  <Select value={profile.phoneCountry} onValueChange={(val) => handleSelectChange("phoneCountry", val)}>
                    <SelectTrigger className={cn(INPUT_CLS, "w-32 shrink-0")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bangladesh, +880">+880</SelectItem>
                      <SelectItem value="USA, +1">+1</SelectItem>
                      <SelectItem value="UK, +44">+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className={cn(INPUT_CLS, "flex-1")}
                  />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-8 mb-4">Language & region</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Interface language</Label>
                <Select value={profile.interfaceLanguage} onValueChange={(val) => handleSelectChange("interfaceLanguage", val)}>
                  <SelectTrigger className={INPUT_CLS}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en/En (US)">English (US)</SelectItem>
                    <SelectItem value="es/ES">Spanish</SelectItem>
                    <SelectItem value="fr/FR">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Country / Region</Label>
                <Select value={profile.countryRegion} onValueChange={(val) => handleSelectChange("countryRegion", val)}>
                  <SelectTrigger className={INPUT_CLS}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="un/United States">United States</SelectItem>
                    <SelectItem value="uk/United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="bd/Bangladesh">Bangladesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Date of Birth</Label>
                <div className="relative">
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth || ""}
                    onChange={handleChange}
                    className={cn(INPUT_CLS, "pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer")}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Time Zone</Label>
                <Select value={profile.timeZone} onValueChange={(val) => handleSelectChange("timeZone", val)}>
                  <SelectTrigger className={INPUT_CLS}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC+0 (London)">UTC+0 (London)</SelectItem>
                    <SelectItem value="UTC-5 (EST)">UTC-5 (EST)</SelectItem>
                    <SelectItem value="UTC+1 (CET)">UTC+1 (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-8 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Medical specialty</Label>
                <Select value={profile.medicalSpecialty} onValueChange={(val) => handleSelectChange("medicalSpecialty", val)}>
                  <SelectTrigger className={INPUT_CLS}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Practice + Family Med">General Practice + Family Med</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Academic degree</Label>
                <Select value={profile.academicDegree} onValueChange={(val) => handleSelectChange("academicDegree", val)}>
                  <SelectTrigger className={INPUT_CLS}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MD — Doctor of Medicine">MD — Doctor of Medicine</SelectItem>
                    <SelectItem value="MBBS">MBBS</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Hospital / Institution</Label>
                <Input
                  name="hospital"
                  value={profile.hospital}
                  onChange={handleChange}
                  placeholder="Search hospitals & institutions..."
                  className={INPUT_CLS}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Department / Ward</Label>
                <Input
                  name="departmentWard"
                  value={profile.departmentWard}
                  onChange={handleChange}
                  className={INPUT_CLS}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">License or Registration No.</Label>
                <Input
                  name="licenseNumber"
                  value={profile.licenseNumber}
                  onChange={handleChange}
                  placeholder="e.g. GHCE 0334521"
                  className={INPUT_CLS}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Years in practice</Label>
                <Select value={profile.yearsInPractice} onValueChange={(val) => handleSelectChange("yearsInPractice", val)}>
                  <SelectTrigger className={INPUT_CLS}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0–5 years">0–5 years</SelectItem>
                    <SelectItem value="5–10 years">5–10 years</SelectItem>
                    <SelectItem value="10–20 years">10–20 years</SelectItem>
                    <SelectItem value="20+ years">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sessions & display */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Sessions & display</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column: Date & Time */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Date format</Label>
                  <Select value={profile.formatDate} onValueChange={(val) => handleSelectChange("formatDate", val)}>
                    <SelectTrigger className={INPUT_CLS}>
                      <SelectValue placeholder="choose date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Time Format</Label>
                  <Select value={profile.formatDisplay} onValueChange={(val) => handleSelectChange("formatDisplay", val)}>
                    <SelectTrigger className={INPUT_CLS}>
                      <SelectValue placeholder="choose time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {profile.formatDate && profile.formatDisplay && (
                  <p className="text-xs text-muted-foreground italic pl-1">
                    Preview: {
                      (() => {
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = String(now.getMonth() + 1).padStart(2, "0");
                        const day = String(now.getDate()).padStart(2, "0");
                        
                        let dateStr = "";
                        if (profile.formatDate === "MM/DD/YYYY") dateStr = `${month}/${day}/${year}`;
                        else if (profile.formatDate === "DD/MM/YYYY") dateStr = `${day}/${month}/${year}`;
                        else dateStr = `${year}-${month}-${day}`;
                        
                        let timeStr = "";
                        if (profile.formatDisplay === "12h") {
                          let h = now.getHours();
                          const ampm = h >= 12 ? "PM" : "AM";
                          h = h % 12 || 12;
                          timeStr = `${String(h).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${ampm}`;
                        } else {
                          timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
                        }
                        
                        return `${dateStr} ${timeStr}`;
                      })()
                    }
                  </p>
                )}
              </div>

              {/* Right column: Emails */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Primary email</Label>
                  <div className="relative">
                    <Input
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className={cn(INPUT_CLS, "pr-24")}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> Verified
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Secondary email</Label>
                  <div className="relative">
                    <Input
                      name="secondaryEmail"
                      value={profile.secondaryEmail}
                      onChange={handleChange}
                      className={cn(INPUT_CLS, "pr-24")}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Recovery and notification backup email will be sent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          {/* Profile Completion */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Profile completion</h3>
            <div className="space-y-2">
              {mockProfileCompletion.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {item.completed ? (
                    <CircleCheck className="size-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="size-4 text-muted-foreground shrink-0" />
                  )}
                  <span className={cn(
                    "text-sm",
                    item.completed ? "text-foreground" : "text-muted-foreground"
                  )}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Specialty Matters */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-blue-500/10">
                <Globe className="size-4 text-blue-500" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Why specialty matters</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Setting your specialty tells the AI which documentation style, terminology, and structure to use. A cardiologist&apos;s note differs significantly from a GP&apos;s SOAP note.
            </p>
          </div>

          {/* HIPAA Status */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-emerald-500/10">
                <ShieldCheck className="size-4 text-emerald-500" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">HIPAA Status</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your account is on a paid plan with an active HIPAA-ready environment and BAA. Patient data is encrypted at rest and in transit.
            </p>
          </div>

          {/* Language & Documents */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-blue-500/10">
                <Languages className="size-4 text-blue-500" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Language & documents</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The interface language controls the UI only. AI-generated document language is controlled separately per-session at the time of generation.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/50">
        <Button variant="outline" className="h-10 px-6 rounded-lg border-border hover:bg-muted text-sm">
          Cancel
        </Button>
        <Button className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
          <CheckCircle2 className="size-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfileTab;
