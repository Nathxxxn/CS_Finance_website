"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label={t("name")} name="name" type="text" required />
        <Field label={t("email")} name="email" type="email" required />
      </div>
      <Field label={t("subject")} name="subject" type="text" required />
      <TextareaField label={t("message")} name="message" required rows={6} />

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={state === "sending" || state === "success"}
          className="self-start rounded-full bg-text px-7 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "sending" ? t("sending") : t("submit")}
        </button>

        {state === "success" && (
          <p className="text-sm text-text-muted">{t("success")}</p>
        )}
        {state === "error" && (
          <p className="text-sm text-red-400">{t("error")}</p>
        )}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  required?: boolean;
};

function Field({ label, name, type, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-xs font-medium text-text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-faint transition-colors duration-200 focus:border-text/30 focus:outline-none focus:ring-0"
      />
    </div>
  );
}

type TextareaFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
};

function TextareaField({ label, name, required, rows = 5 }: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-xs font-medium text-text-muted">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-faint transition-colors duration-200 focus:border-text/30 focus:outline-none focus:ring-0 resize-none"
      />
    </div>
  );
}
