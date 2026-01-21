'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
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
import { Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected'), // Honeypot field
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
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot
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

      // Track conversion in Google Analytics
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
      <div className="animate-fade-in-up rounded-2xl bg-white p-8 text-center shadow-xl">
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out both;
          }
        `}</style>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fef9e7]">
          <CheckCircle className="h-8 w-8 text-gold" />
        </div>
        <h3 className="font-heading mb-2 text-xl font-semibold text-navy">
          {t('successTitle')}
        </h3>
        <p className="mb-6 text-[#4b5563]">{t('successMessage')}</p>
        <Button
          onClick={() => setSubmitStatus('idle')}
          variant="outline"
          className="border-navy text-navy hover:bg-navy hover:text-white"
        >
          {t('sendAnother')}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="animate-fade-in-up rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(208, 156, 17, 0.3);
          }
          50% {
            box-shadow: 0 6px 25px rgba(208, 156, 17, 0.6);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
      `}</style>

      <h2 className="font-heading mb-6 text-2xl font-bold text-navy">
        {t('title')}
      </h2>

      {submitStatus === 'error' && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-200">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{t('errorMessage')}</p>
        </div>
      )}

      <div className="space-y-5">
        {/* Name Field */}
        <div>
          <Label htmlFor="name" className="text-navy font-medium">
            {t('nameLabel')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            {...register('name')}
            className={`mt-1.5 rounded-xl border-gray-200 focus:border-navy focus-visible:ring-gold transition-all ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder={t('namePlaceholder')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{t('nameError')}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="email" className="text-navy font-medium">
            {t('emailLabel')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1.5 rounded-xl border-gray-200 focus:border-navy focus-visible:ring-gold transition-all ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder={t('emailPlaceholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{t('emailError')}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <Label htmlFor="phone" className="text-navy font-medium">
            {t('phoneLabel')}
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            className="mt-1.5 rounded-xl border-gray-200 focus:border-navy focus-visible:ring-gold transition-all"
            placeholder={t('phonePlaceholder')}
          />
        </div>

        {/* Subject Field */}
        <div>
          <Label htmlFor="subject" className="text-navy font-medium">
            {t('subjectLabel')} <span className="text-red-500">*</span>
          </Label>
          <Select onValueChange={(value) => setValue('subject', value)}>
            <SelectTrigger
              className={`mt-1.5 rounded-xl border-gray-200 focus:border-navy focus:ring-gold transition-all ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <SelectValue placeholder={t('subjectPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((service) => (
                <SelectItem key={service} value={service}>
                  {service === 'other'
                    ? t('subjectOther')
                    : tServices(`${service}.title`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{t('subjectError')}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <Label htmlFor="message" className="text-navy font-medium">
            {t('messageLabel')} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            {...register('message')}
            className={`mt-1.5 min-h-[150px] resize-none rounded-xl border-gray-200 focus:border-navy focus-visible:ring-gold transition-all ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder={t('messagePlaceholder')}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{t('messageError')}</p>
          )}
        </div>

        {/* Honeypot Field - Hidden from users */}
        <input
          type="text"
          {...register('honeypot')}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={submitStatus === 'loading'}
          className="group animate-pulse-glow h-14 w-full rounded-full bg-gold text-base font-semibold text-navy hover:bg-gold/90 transition-all duration-300"
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
              <Send className="h-5 w-5" />
              {t('submitButton')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
