'use client';

import React, { useState, useTransition } from 'react';
import { submitContactEnquiryAction, ContactActionResult } from '@/app/contact/actions';
import { Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const BUDGET_OPTIONS = ['< $5k', '$5k – $15k', '$15k – $30k', '$30k+', 'Undecided'] as const;
const TIMELINE_OPTIONS = ['Urgent (< 1 month)', '1 – 3 months', '3 – 6 months', 'Flexible'] as const;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    budgetRange: 'Undecided',
    timeline: 'Flexible',
    company_hp: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name (at least 2 characters).';
    } else if (formData.name.length > 100) {
      errors.name = 'Name must be under 100 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid business email address.';
    } else if (formData.email.length > 255) {
      errors.email = 'Email address must be under 255 characters.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = 'Please describe your project or requirements (at least 10 characters).';
    } else if (formData.description.length > 3000) {
      errors.description = 'Description must be under 3,000 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    startTransition(async () => {
      const data = new FormData();
      data.set('name', formData.name);
      data.set('email', formData.email);
      data.set('description', formData.description);
      data.set('budgetRange', formData.budgetRange);
      data.set('timeline', formData.timeline);
      data.set('company_hp', formData.company_hp);

      try {
        const result: ContactActionResult = await submitContactEnquiryAction(data);
        if (result.success) {
          setIsSubmitted(true);
          setSuccessMessage(
            result.message ||
              'Thank you for your enquiry. We review all messages personally and will respond within 1 to 2 business days.'
          );
        } else {
          setServerError(result.error || 'Failed to submit enquiry. Please try again.');
          if (result.fieldErrors) {
            setFieldErrors(result.fieldErrors);
          }
        }
      } catch (err) {
        console.error('Submission error:', err);
        setServerError('An unexpected error occurred. Please try again or reach out via direct email.');
      }
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      description: '',
      budgetRange: 'Undecided',
      timeline: 'Flexible',
      company_hp: '',
    });
    setFieldErrors({});
    setServerError(null);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div
        className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#111726] border border-emerald-500/20 dark:border-emerald-500/30 shadow-sm text-center space-y-6"
        role="region"
        aria-live="polite"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Enquiry Received
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {successMessage}
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Send another enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-12 rounded-3xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-8"
      aria-label="Project enquiry form"
    >
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Send a Project Enquiry
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Fill in your project context below. Every brief is reviewed directly by the founder and engineer, with responses provided within 1 to 2 business days.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 flex items-start gap-3 text-red-700 dark:text-red-300 text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold">Submission failed</p>
            <p>{serverError}</p>
          </div>
        </div>
      )}

      {/* Honeypot field (hidden from human visitors) */}
      <div
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          zIndex: -1,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <label htmlFor="company_hp">Company</label>
        <input
          id="company_hp"
          type="text"
          name="company_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData.company_hp}
          onChange={(e) => setFormData((prev) => ({ ...prev, company_hp: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ada Lovelace"
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
              if (fieldErrors.name) {
                setFieldErrors((prev) => ({ ...prev, name: '' }));
              }
            }}
            className={`w-full min-h-[44px] px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border ${
              fieldErrors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-black/[0.1] dark:border-white/[0.1] focus:ring-blue-500'
            } text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 transition`}
          />
          {fieldErrors.name && (
            <p id="name-error" className="text-xs text-red-600 dark:text-red-400 font-medium" role="alert">
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Business Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
            Business Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="ada@company.com"
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: '' }));
              }
            }}
            className={`w-full min-h-[44px] px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border ${
              fieldErrors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-black/[0.1] dark:border-white/[0.1] focus:ring-blue-500'
            } text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 transition`}
          />
          {fieldErrors.email && (
            <p id="email-error" className="text-xs text-red-600 dark:text-red-400 font-medium" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
          Project Description & Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby={fieldErrors.description ? 'description-error' : 'description-hint'}
          placeholder="Briefly describe what you're looking to build, the key workflows or problems to solve, and any existing technical requirements or stack preferences..."
          value={formData.description}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, description: e.target.value }));
            if (fieldErrors.description) {
              setFieldErrors((prev) => ({ ...prev, description: '' }));
            }
          }}
          className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border ${
            fieldErrors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-black/[0.1] dark:border-white/[0.1] focus:ring-blue-500'
          } text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 transition leading-relaxed`}
        />
        <div id="description-hint" className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
          <span>{fieldErrors.description ? <span id="description-error" className="text-red-600 dark:text-red-400 font-medium" role="alert">{fieldErrors.description}</span> : 'Provide minimum 10 characters'}</span>
          <span>{formData.description.length} / 3000</span>
        </div>
      </div>

      {/* Budget Range (Radiogroup with >= 44x44px touch targets) */}
      <div className="space-y-3">
        <span id="budget-label" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
          Anticipated Budget Range
        </span>
        <div
          role="radiogroup"
          aria-labelledby="budget-label"
          className="flex flex-wrap gap-2.5"
        >
          {BUDGET_OPTIONS.map((option) => {
            const isSelected = formData.budgetRange === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setFormData((prev) => ({ ...prev, budgetRange: option }))}
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111726] ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-600'
                    : 'bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/15'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desired Timeline (Radiogroup with >= 44x44px touch targets) */}
      <div className="space-y-3">
        <span id="timeline-label" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
          Target Timeline
        </span>
        <div
          role="radiogroup"
          aria-labelledby="timeline-label"
          className="flex flex-wrap gap-2.5"
        >
          {TIMELINE_OPTIONS.map((option) => {
            const isSelected = formData.timeline === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setFormData((prev) => ({ ...prev, timeline: option }))}
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111726] ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-600'
                    : 'bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/15'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button & Privacy Note */}
      <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
          By submitting this form, you agree to our standard enquiry review under our{' '}
          <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
            Privacy Notice
          </a>
          . We never share or sell contact details.
        </p>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-8 py-3 rounded-full bg-[#0B101D] text-white hover:bg-blue-600 dark:bg-white dark:text-[#0B101D] dark:hover:bg-blue-500 dark:hover:text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111726]"
        >
          {isPending ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Sending enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Submit Project Enquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
