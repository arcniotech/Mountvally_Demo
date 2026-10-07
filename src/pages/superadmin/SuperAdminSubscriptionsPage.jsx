import React from 'react';
import { CreditCard, Check, Sparkles, Building2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';

export function SuperAdminSubscriptionsPage() {
  const plans = [
    {
      name: 'Standard',
      tier: 'Entry Level',
      desc: 'Ideal for smaller schools up to 800 students',
      features: ['Up to 800 Students', 'Student & Staff Management', 'Attendance & Timetable', 'Basic Exam Reports', 'Standard Email Support'],
      activeSchools: 1,
    },
    {
      name: 'Premium',
      tier: 'Institution Standard',
      desc: 'Complete ERP suite for institutions up to 1500 students',
      features: ['Up to 1500 Students', 'Full Academic & Examination Suite', 'Finance & Payment Verification', 'Parent Portal & Circulars', 'Staff Leaves & Payroll', 'Priority 24/7 Support'],
      activeSchools: 1,
      popular: true,
    },
    {
      name: 'Enterprise PRO',
      tier: 'Multi-Campus',
      desc: 'Multi-campus institutions with AI tooling & unlimited capacity',
      features: ['Unlimited Students & Teachers', 'AI Question Paper Generator', 'Custom Subdomain & White-labeling', 'Automated SMS & WhatsApp Alerts', 'Full Audit Logging & Compliance', 'Dedicated Account Manager'],
      activeSchools: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="SaaS Subscription Tiers & Feature Matrix"
        subtitle="Manage platform packaging, license allocations, and tenant tier capabilities"
        showAccent={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-3xl bg-white dark:bg-slate-850 border shadow-soft flex flex-col justify-between ${
              plan.popular
                ? 'border-teal-500 ring-2 ring-teal-500/20'
                : 'border-slate-100 dark:border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">{plan.name}</h3>
                {plan.popular ? (
                  <Badge variant="teal">Most Popular</Badge>
                ) : (
                  <Badge variant="secondary" size="sm">{plan.tier}</Badge>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-5">{plan.desc}</p>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Check className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Assigned Tenants:</span>
              <Badge variant="pro" size="sm">{plan.activeSchools} Active {plan.activeSchools === 1 ? 'School' : 'Schools'}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
