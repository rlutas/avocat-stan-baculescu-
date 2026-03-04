'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, AlertCircle, ArrowRight, Phone, Mail, MessageCircle, Clock, Zap, Check } from 'lucide-react';
import { GlowWrapper } from '@/components/ui/glow-button';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  preferredContact: z.enum(['phone', 'email', 'whatsapp']),
  subject: z.string().min(1, 'Please select a subject'),
  urgency: z.enum(['normal', 'urgent']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  gdprConsent: z.literal(true, {
    error: 'You must agree to the processing of personal data',
  }),
  honeypot: z.string().max(0, 'Bot detected'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  'malpraxis-medical',
  'drept-civil',
  'drept-penal',
  'drept-familiei',
  'dreptul-muncii',
  'drept-comercial',
  'accidente-rutiere',
  'drept-administrativ-fiscal',
  'other',
];

export function ContactForm() {
  const t = useTranslations('ContactPage.form');
  const tServices = useTranslations('ServicesPage.services');
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: '',
      preferredContact: 'phone',
      urgency: 'normal',
    },
  });

  const selectedContact = watch('preferredContact');
  const selectedUrgency = watch('urgency');

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) {
      return;
    }

    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      reset();

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: data.subject,
          value: 1,
        });
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <ScrollAnimate variant="scaleUp">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 ring-4 ring-green-100">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <div className="mx-auto mb-2 h-[2px] w-12 bg-gold" />
          <h3 className="font-heading mb-2 text-2xl font-bold text-navy">
            {t('successTitle')}
          </h3>
          <p className="mb-8 text-base leading-relaxed text-text-secondary">
            {t('successMessage')}
          </p>
          <Button
            onClick={() => setSubmitStatus('idle')}
            variant="outline"
            className="rounded-full border-navy/20 px-8 text-navy transition-all duration-300 hover:border-gold hover:bg-gold/5 hover:text-navy"
          >
            {t('sendAnother')}
          </Button>
        </div>
      </ScrollAnimate>
    );
  }

  const contactMethods = [
    { value: 'phone' as const, label: t('preferredContactPhone'), icon: <Phone className="h-4 w-4" /> },
    { value: 'email' as const, label: t('preferredContactEmail'), icon: <Mail className="h-4 w-4" /> },
    { value: 'whatsapp' as const, label: t('preferredContactWhatsapp'), icon: <MessageCircle className="h-4 w-4" /> },
  ];

  const urgencyOptions = [
    { value: 'normal' as const, label: t('urgencyNormal'), desc: t('urgencyNormalDesc'), icon: <Clock className="h-4 w-4" /> },
    { value: 'urgent' as const, label: t('urgencyUrgent'), desc: t('urgencyUrgentDesc'), icon: <Zap className="h-4 w-4" /> },
  ];

  return (
    <ScrollAnimate variant="fadeLeft">
      <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-heading mb-1 text-2xl font-bold text-navy sm:text-3xl">
            {t('title')}
          </h2>
          <div className="mb-8 mt-3 h-[2px] w-16 bg-gold" />

          {submitStatus === 'error' && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{t('errorMessage')}</p>
            </div>
          )}

          <StaggerContainer className="space-y-5" staggerDelay={0.07}>
            {/* First Name + Last Name - 2 column grid */}
            <StaggerItem>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-navy/80"
                  >
                    {t('firstNameLabel')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    className={`h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all duration-300 placeholder:text-gray-400 focus:border-gold focus:bg-white focus-visible:ring-gold/20 ${errors.firstName ? 'border-red-400 bg-red-50/30 focus:border-red-400 focus-visible:ring-red-200' : ''}`}
                    placeholder={t('firstNamePlaceholder')}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{t('firstNameError')}</p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-navy/80"
                  >
                    {t('lastNameLabel')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    className={`h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all duration-300 placeholder:text-gray-400 focus:border-gold focus:bg-white focus-visible:ring-gold/20 ${errors.lastName ? 'border-red-400 bg-red-50/30 focus:border-red-400 focus-visible:ring-red-200' : ''}`}
                    placeholder={t('lastNamePlaceholder')}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{t('lastNameError')}</p>
                  )}
                </div>
              </div>
            </StaggerItem>

            {/* Email + Phone - 2 column grid */}
            <StaggerItem>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-navy/80"
                  >
                    {t('emailLabel')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all duration-300 placeholder:text-gray-400 focus:border-gold focus:bg-white focus-visible:ring-gold/20 ${errors.email ? 'border-red-400 bg-red-50/30 focus:border-red-400 focus-visible:ring-red-200' : ''}`}
                    placeholder={t('emailPlaceholder')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{t('emailError')}</p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-navy/80"
                  >
                    {t('phoneLabel')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={`h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all duration-300 placeholder:text-gray-400 focus:border-gold focus:bg-white focus-visible:ring-gold/20 ${errors.phone ? 'border-red-400 bg-red-50/30 focus:border-red-400 focus-visible:ring-red-200' : ''}`}
                    placeholder={t('phonePlaceholder')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{t('phoneError')}</p>
                  )}
                </div>
              </div>
            </StaggerItem>

            {/* Preferred Contact Method */}
            <StaggerItem>
              <div>
                <Label className="mb-2.5 block text-sm font-semibold uppercase tracking-wide text-navy/80">
                  {t('preferredContactLabel')}
                </Label>
                <div className="flex flex-wrap gap-3">
                  {contactMethods.map((method) => (
                    <label key={method.value} className="group cursor-pointer">
                      <input
                        type="radio"
                        value={method.value}
                        {...register('preferredContact')}
                        className="peer sr-only"
                      />
                      <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 group-hover:border-gold/50 ${
                        selectedContact === method.value
                          ? 'border-gold bg-gold/10 text-navy'
                          : 'border-gray-200 bg-gray-50/50 text-navy/70'
                      }`}>
                        {method.icon} {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Subject Field */}
            <StaggerItem>
              <div>
                <Label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-navy/80"
                >
                  {t('subjectLabel')} <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('subject', value)}>
                  <SelectTrigger
                    className={`h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all duration-300 focus:border-gold focus:bg-white focus:ring-gold/20 ${errors.subject ? 'border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-200' : ''}`}
                  >
                    <SelectValue placeholder={t('subjectPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-200">
                    {serviceOptions.map((service) => (
                      <SelectItem
                        key={service}
                        value={service}
                        className="rounded-lg focus:bg-gold/10 focus:text-navy"
                      >
                        {service === 'other'
                          ? t('subjectOther')
                          : tServices(`${service}.title`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {t('subjectError')}
                  </p>
                )}
              </div>
            </StaggerItem>

            {/* Urgency Level */}
            <StaggerItem>
              <div>
                <Label className="mb-2.5 block text-sm font-semibold uppercase tracking-wide text-navy/80">
                  {t('urgencyLabel')}
                </Label>
                <div className="flex flex-wrap gap-3">
                  {urgencyOptions.map((option) => (
                    <label key={option.value} className="group cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        {...register('urgency')}
                        className="peer sr-only"
                      />
                      <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 group-hover:border-gold/50 ${
                        selectedUrgency === option.value
                          ? 'border-gold bg-gold/10 text-navy'
                          : 'border-gray-200 bg-gray-50/50 text-navy/70'
                      }`}>
                        {option.icon}
                        <span>{option.label}</span>
                        <span className={`text-xs ${selectedUrgency === option.value ? 'text-navy/60' : 'text-navy/40'}`}>
                          ({option.desc})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Message Field */}
            <StaggerItem>
              <div>
                <Label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-navy/80"
                >
                  {t('messageLabel')} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  className={`min-h-[160px] resize-none rounded-xl border-gray-200 bg-gray-50/50 transition-all duration-300 placeholder:text-gray-400 focus:border-gold focus:bg-white focus-visible:ring-gold/20 ${errors.message ? 'border-red-400 bg-red-50/30 focus:border-red-400 focus-visible:ring-red-200' : ''}`}
                  placeholder={t('messagePlaceholder')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {t('messageError')}
                  </p>
                )}
              </div>
            </StaggerItem>

            {/* GDPR Consent Checkbox */}
            <StaggerItem>
              <div>
                <label className="group flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    {...register('gdprConsent')}
                    className="peer sr-only"
                  />
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-gray-300 transition-all duration-300 peer-checked:border-gold peer-checked:bg-gold group-hover:border-gold/50">
                    <Check className="h-3 w-3 text-white opacity-0 transition-opacity duration-200 group-has-[:checked]:opacity-100" />
                  </div>
                  <span className="text-sm leading-relaxed text-text-secondary">
                    {t('gdprConsent')}{' '}
                    <Link
                      href="/politica-confidentialitate"
                      className="font-medium text-gold underline decoration-gold/30 underline-offset-2 transition-colors duration-300 hover:text-gold/80 hover:decoration-gold"
                    >
                      {t('gdprConsentLink')}
                    </Link>
                  </span>
                </label>
                {errors.gdprConsent && (
                  <p className="mt-1.5 text-sm text-red-500">{t('gdprError')}</p>
                )}
              </div>
            </StaggerItem>

            {/* Honeypot Field - Hidden from users */}
            <input
              type="text"
              {...register('honeypot')}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Submit Button */}
            <StaggerItem>
              <GlowWrapper className="mt-2 h-14 w-full rounded-full bg-gold">
                <Button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="group h-14 w-full rounded-full bg-transparent text-base font-semibold text-navy shadow-none hover:bg-transparent"
                >
                  {submitStatus === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t('submitting')}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {t('submitButton')}
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </GlowWrapper>
            </StaggerItem>
          </StaggerContainer>
        </form>
      </div>
    </ScrollAnimate>
  );
}
