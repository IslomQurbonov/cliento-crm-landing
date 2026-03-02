import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Loader2, CheckCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { translations } from '../lib/translations';

const DemoModal = ({ isOpen, onClose, language }) => {
  const [step, setStep] = useState(1);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    employeeCount: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [demoData, setDemoData] = useState(null); // { adminEmail, password, redirectUrl }
  const [copiedField, setCopiedField] = useState('');
  const t = translations[language];

  const businessTypes = [
    { id: 'smm', name: t.businessTypes.smm, icon: '📱' },
    { id: 'beauty', name: t.businessTypes.beauty, icon: '💄' },
    { id: 'education', name: t.businessTypes.education, icon: '🎓' },
    { id: 'auto', name: t.businessTypes.auto, icon: '🚗' },
    { id: 'restaurant', name: t.businessTypes.restaurant, icon: '🍽️' },
    { id: 'spa_fitness', name: t.businessTypes.spa_fitness, icon: '🧘' },
    { id: 'travel', name: t.businessTypes.travel, icon: '✈️' },
    { id: 'language', name: t.businessTypes.language, icon: '📚' },
    { id: 'advertising', name: t.businessTypes.advertising, icon: '📢' },
    { id: 'photo_event', name: t.businessTypes.photo_event, icon: '📸' },
    { id: 'other', name: t.businessTypes.other, icon: '🏢' }
  ];

  const validatePhone = (phone) => {
    // O'zbekiston telefon formati: +998XXXXXXXXX yoki 998XXXXXXXXX yoki raqamlar
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(\+?998)?\d{9}$/.test(cleaned) || /^\d{9,12}$/.test(cleaned);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = t.nameMinLength;
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      errors.phone = t.phoneInvalid;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    // Yozayotganda shu maydon xatosini tozalash
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedBusiness) {
      setStep(2);
      setError('');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://api.cliento.uz';

      const response = await fetch(`${API_URL}/api/v1/demo/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: selectedBusiness,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          companyName: formData.companyName.trim(),
          employeeCount: formData.employeeCount,
        }),
      });

      const data = await response.json();

      if (response.ok && data.redirectUrl) {
        window.open(data.redirectUrl, '_blank');
        setSuccessMessage(t.demoSuccess);
        setDemoData({
          adminEmail: data.adminEmail,
          password: data.password || 'demo123',
          redirectUrl: data.redirectUrl,
        });
        setStep(3); // Credentials ko'rsatish sahifasiga o'tish
      } else {
        setError(data.message || t.demoError);
      }
    } catch (err) {
      console.error('Demo creation error:', err);
      setError(t.serverError);
    }

    setIsLoading(false);
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch {
      // Fallback uchun
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    }
  };

  const resetModal = () => {
    setStep(1);
    setSelectedBusiness('');
    setFormData({
      name: '',
      phone: '',
      companyName: '',
      employeeCount: ''
    });
    setIsLoading(false);
    setError('');
    setFieldErrors({});
    setSuccessMessage('');
    setDemoData(null);
    setCopiedField('');
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {t.demoModalTitle}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t.demoModalSubtitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label={t.close}
            className="w-10 h-10 rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className={`flex-1 h-1 rounded-full ${
              step >= 2 ? 'bg-primary' : 'bg-muted'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {step > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <div className={`flex-1 h-1 rounded-full ${
              step >= 3 ? 'bg-primary' : 'bg-muted'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 3 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
            }`}>
              {step >= 3 ? <CheckCircle className="w-4 h-4" /> : '3'}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {t.selectBusinessType}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {businessTypes.map((business) => (
                  <button
                    key={business.id}
                    onClick={() => setSelectedBusiness(business.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${
                      selectedBusiness === business.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{business.icon}</div>
                    <div className="font-medium text-foreground text-sm sm:text-base">{business.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {t.enterYourInfo}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.name} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background ${
                      fieldErrors.name ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder={t.namePlaceholder}
                  />
                  {fieldErrors.name && (
                    <p className="text-destructive text-xs mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background ${
                      fieldErrors.phone ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="+998 90 123 45 67"
                  />
                  {fieldErrors.phone && (
                    <p className="text-destructive text-xs mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.companyName}
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder={t.companyPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.employeeCount}
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  >
                    <option value="">{t.selectOption}</option>
                    <option value="1-5">1-5 {t.people}</option>
                    <option value="6-15">6-15 {t.people}</option>
                    <option value="16-50">16-50 {t.people}</option>
                    <option value="50+">50+ {t.people}</option>
                  </select>
                </div>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  {successMessage}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {step === 3 && demoData && (
            <div className="space-y-6">
              {/* Success Icon */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {t.demoSuccess}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.demoExpiresNote}
                </p>
              </div>

              {/* Credentials Card */}
              <div className="bg-muted/50 border border-border rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-semibold text-foreground">
                  {t.demoCredentials}
                </h4>

                {/* Email */}
                <div className="flex items-center justify-between bg-background rounded-lg px-4 py-3 border border-border">
                  <div>
                    <span className="text-xs text-muted-foreground block">{t.demoEmailLabel}</span>
                    <span className="text-sm font-mono text-foreground">{demoData.adminEmail}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(demoData.adminEmail, 'email')}
                    className="ml-3 p-2 rounded-md hover:bg-muted transition-colors"
                    title={t.demoCopied}
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Password */}
                <div className="flex items-center justify-between bg-background rounded-lg px-4 py-3 border border-border">
                  <div>
                    <span className="text-xs text-muted-foreground block">{t.demoPasswordLabel}</span>
                    <span className="text-sm font-mono text-foreground">{demoData.password}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(demoData.password, 'password')}
                    className="ml-3 p-2 rounded-md hover:bg-muted transition-colors"
                    title={t.demoCopied}
                  >
                    {copiedField === 'password' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex space-x-3">
            {step === 2 && !successMessage && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </Button>
            )}
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose}>
              {t.close}
            </Button>

            {step === 1 && (
              <Button
                onClick={handleNext}
                disabled={!selectedBusiness}
                className="flex items-center space-x-2"
              >
                <span>{t.next}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}

            {step === 2 && (
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.phone || isLoading || successMessage}
                className="flex items-center space-x-2 btn-primary"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.demoPreparingData}</span>
                  </>
                ) : (
                  <span>{t.submit}</span>
                )}
              </Button>
            )}

            {step === 3 && demoData && (
              <Button
                onClick={() => window.open(demoData.redirectUrl, '_blank')}
                className="flex items-center space-x-2 btn-primary"
              >
                <span>{t.demoGoToCRM}</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
