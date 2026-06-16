'use client'

import { Copy, Download, Pencil, Share2, Trash2, Upload } from "lucide-react";
import {
  previewCoding,
  previewDescription,
  previewDetailCards,
  previewHeaderData,
  previewMeta,
  previewSoapSections,
  previewTags,
} from "../_data/step4PreviewData";

interface Step4Props {
  onEdit: () => void;
  onExport: () => void;
}

export function Step4Preview({ onEdit, onExport }: Step4Props) {
  return (
    <div className="w-full mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-border pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-to-b from-[#6B8BC3] to-[#003796] text-sm font-bold text-white flex items-center justify-center">
                {previewHeaderData.initials}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{previewHeaderData.title}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {previewHeaderData.status}
                  </span>
                  <span>{previewHeaderData.createdAt}</span>
                  <span>{previewHeaderData.version}</span>
                  <span>{previewHeaderData.author}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <button onClick={onEdit} className="rounded-lg border border-border bg-background p-2.5 text-muted-foreground transition hover:text-foreground">
                <Pencil className="h-4 w-4" />
              </button>
              <button className="rounded-lg border border-border bg-background p-2.5 text-muted-foreground transition hover:text-foreground">
                <Copy className="h-4 w-4" />
              </button>
              <button className="rounded-lg border border-border bg-background p-2.5 text-muted-foreground transition hover:text-foreground">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="rounded-lg border border-border bg-background p-2.5 text-muted-foreground transition hover:text-foreground">
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={onExport}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1d4ed8]"
              >
                <Upload className="h-4 w-4" />
                IMPORT
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {previewHeaderData.pills.map((pill) => (
              <span key={pill} className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {previewDetailCards.map((detail, index) => (
            <div key={`${detail.label}-${index}`} className="rounded-xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{detail.label}</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{detail.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <h3 className="text-base font-semibold text-foreground">Description</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{previewDescription}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="mr-1 text-xs text-muted-foreground">Tags</span>
          {previewTags.map((tag) => (
            <span key={tag} className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">{previewHeaderData.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span><strong className="text-foreground">Patient:</strong> {previewMeta.patient}</span>
              <span><strong className="text-foreground">MRN:</strong> {previewMeta.mrn}</span>
              <span><strong className="text-foreground">Date:</strong> {previewMeta.date}</span>
              <span>{previewMeta.time}</span>
              <span><strong className="text-foreground">Clinician:</strong> {previewMeta.clinician}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground transition hover:bg-accent">
              <Copy className="h-3.5 w-3.5" />
              Copy
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground transition hover:bg-accent">
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-6">
          {previewSoapSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-lg font-bold uppercase tracking-wide text-[#2563eb]">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li
                    key={`${section.title}-${item.text}`}
                    className={`rounded-lg px-3 py-2 text-sm leading-relaxed text-foreground ${
                      item.highlight ? "border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300" : ""
                    }`}
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-[#2563eb]" />
                    {item.label ? <strong>{item.label}: </strong> : null}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-3 text-lg font-bold uppercase tracking-wide text-[#2563eb]">Coding</h4>
            <ul className="space-y-2.5">
              {previewCoding.map((code) => (
                <li key={code} className="text-sm text-foreground">
                  <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-[#2563eb]" />
                  {code}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
