import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
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
  const t = translations[language];

  const businessTypes = [
    { id: 'smm', name: t.businessTypes.smm, icon: '📱' },
    { id: 'beauty', name: t.businessTypes.beauty, icon: '💄' },
    { id: 'education', name: t.businessTypes.education, icon: '🎓' },
    { id: 'auto', name: t.businessTypes.auto, icon: '🚗' },
    { id: 'restaurant', name: t.businessTypes.restaurant, icon: '🍽️' },
    { id: 'other', name: t.businessTypes.other, icon: '🏢' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && selectedBusiness) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate demo URL (in real implementation, this would come from backend)
    const demoUrl = `https://demo.cliento.uz/${selectedBusiness}?token=demo_${Date.now()}`;
    
    setIsLoading(false);
    
    // Redirect to demo
    window.open(demoUrl, '_blank');
    onClose();
    resetModal();
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
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
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
              1
            </div>
            <div className={`flex-1 h-1 rounded-full ${
              step >= 2 ? 'bg-primary' : 'bg-muted'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Biznes turingizni tanlang
              </h3>
              <div className="grid grid-cols-2 gap-4">
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
                    <div className="font-medium text-foreground">{business.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Ma'lumotlaringizni kiriting
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
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder="Ismingizni kiriting"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder="+998 90 123 45 67"
                  />
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
                    placeholder="Kompaniya nomi"
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
                    <option value="">Tanlang</option>
                    <option value="1-5">1-5 kishi</option>
                    <option value="6-15">6-15 kishi</option>
                    <option value="16-50">16-50 kishi</option>
                    <option value="50+">50+ kishi</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex space-x-3">
            {step === 2 && (
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
                disabled={!formData.name || !formData.phone || isLoading}
                className="flex items-center space-x-2 btn-primary"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Yuklanmoqda...</span>
                  </>
                ) : (
                  <span>{t.submit}</span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;

