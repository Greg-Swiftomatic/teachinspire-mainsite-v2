import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronRight, ChevronLeft } from 'lucide-react';

interface FormData {
  name: string;
  teachingSituation: string;
  instituteName: string;
  teachingFormats: string[];
  studentTypes: string[];
  studentTypesOther: string;
  aiExperience: string;
  aiUses: string[];
  aiUsesOther: string;
  materialSources: string[];
  materialSourcesOther: string;
  prepFrustration: string;
  prepFrustrationOther: string;
  courseExpectations: string;
}

interface SurveyFormProps {
  onSuccess: () => void;
}

const TEACHING_SITUATIONS = [
  { value: 'freelance', label: 'Freelance' },
  { value: 'institute', label: 'Institute/school' },
  { value: 'both', label: 'Both' },
];

const TEACHING_FORMATS = [
  { value: 'online-individual', label: 'Online (one-on-one)' },
  { value: 'online-groups', label: 'Online (groups)' },
  { value: 'in-person', label: 'In-person' },
];

const STUDENT_TYPES = [
  { value: 'business', label: 'Business professionals' },
  { value: 'general', label: 'General English learners' },
  { value: 'exam-prep', label: 'Exam preparation' },
  { value: 'young-learners', label: 'Young learners' },
];

const AI_EXPERIENCE_LEVELS = [
  { value: 'never', label: 'Never tried it' },
  { value: 'tried-few-times', label: 'Tried ChatGPT a few times' },
  { value: 'occasional', label: 'Use it occasionally for teaching' },
  { value: 'regular', label: 'Use it regularly' },
  { value: 'integrated', label: 'AI is already part of my workflow' },
];

const AI_USES = [
  { value: 'none', label: "I don't use it yet" },
  { value: 'ideas', label: 'Generating ideas' },
  { value: 'exercises', label: 'Creating exercises' },
  { value: 'admin', label: 'Writing emails/admin' },
  { value: 'planning', label: 'Lesson planning' },
  { value: 'research', label: 'Research' },
];

const MATERIAL_SOURCES = [
  { value: 'textbooks', label: 'Textbooks' },
  { value: 'websites', label: 'Websites (ISL Collective, BusyTeacher, etc.)' },
  { value: 'from-scratch', label: 'I create my own from scratch' },
  { value: 'adapt-online', label: 'I adapt things I find online' },
  { value: 'reuse-old', label: 'I reuse my old materials' },
];

const PREP_FRUSTRATIONS = [
  { value: 'too-long', label: 'Takes too long' },
  { value: 'hard-to-find', label: 'Hard to find good materials' },
  { value: 'doesnt-fit', label: "Materials don't fit my students' needs" },
  { value: 'feels-stale', label: 'I keep reusing the same stuff and it feels stale' },
];

const TOTAL_STEPS = 5;

export function SurveyForm({ onSuccess }: SurveyFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    teachingSituation: '',
    instituteName: '',
    teachingFormats: [],
    studentTypes: [],
    studentTypesOther: '',
    aiExperience: '',
    aiUses: [],
    aiUsesOther: '',
    materialSources: [],
    materialSourcesOther: '',
    prepFrustration: '',
    prepFrustrationOther: '',
    courseExpectations: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const showInstituteName = formData.teachingSituation === 'institute' || formData.teachingSituation === 'both';

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMultiSelect = (field: 'teachingFormats' | 'studentTypes' | 'aiUses' | 'materialSources', value: string) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        if (!formData.name.trim() || !formData.teachingSituation) return false;
        if (showInstituteName && !formData.instituteName.trim()) return false;
        return true;
      case 2:
        return formData.teachingFormats.length > 0 && formData.studentTypes.length > 0;
      case 3:
        return !!formData.aiExperience && formData.aiUses.length > 0;
      case 4:
        if (formData.materialSources.length === 0) return false;
        if (!formData.prepFrustration) return false;
        if (formData.prepFrustration === 'other' && !formData.prepFrustrationOther.trim()) return false;
        return true;
      case 5:
        return !!formData.courseExpectations.trim();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setIsSubmitting(true);
    setError('');

    const studentTypes = formData.studentTypesOther 
      ? [...formData.studentTypes, `Other: ${formData.studentTypesOther}`]
      : formData.studentTypes;

    const aiUses = formData.aiUsesOther
      ? [...formData.aiUses, `Other: ${formData.aiUsesOther}`]
      : formData.aiUses;

    const materialSources = formData.materialSourcesOther
      ? [...formData.materialSources, `Other: ${formData.materialSourcesOther}`]
      : formData.materialSources;

    const prepFrustration = formData.prepFrustration === 'other'
      ? `Other: ${formData.prepFrustrationOther}`
      : formData.prepFrustration;

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          teaching_situation: formData.teachingSituation,
          institute_name: showInstituteName ? formData.instituteName : null,
          teaching_format: JSON.stringify(formData.teachingFormats),
          student_types: JSON.stringify(studentTypes),
          ai_experience: formData.aiExperience,
          ai_uses: JSON.stringify(aiUses),
          material_sources: JSON.stringify(materialSources),
          prep_frustration: prepFrustration,
          course_expectations: formData.courseExpectations,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error || 'Submission failed');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && step < TOTAL_STEPS && canProceed()) {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="min-h-[400px]" onKeyDown={handleKeyDown}>
      <ProgressBar current={step} total={TOTAL_STEPS} />
      
      <div className="mt-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepWrapper key="step1">
              <StepTitle>About You</StepTitle>
              
              <Question label="What's your name?">
                <input
                  type="text"
                  autoFocus
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  className="input-base text-lg"
                  placeholder="Your name"
                />
              </Question>

              <Question label="What's your teaching situation?">
                <RadioGroup
                  options={TEACHING_SITUATIONS}
                  value={formData.teachingSituation}
                  onChange={value => updateField('teachingSituation', value)}
                />
              </Question>

              <AnimatePresence>
                {showInstituteName && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Question label="What's the name of your institute or company?">
                      <input
                        type="text"
                        value={formData.instituteName}
                        onChange={e => updateField('instituteName', e.target.value)}
                        className="input-base text-lg"
                        placeholder="Institute or company name"
                      />
                    </Question>
                  </motion.div>
                )}
              </AnimatePresence>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper key="step2">
              <StepTitle>Your Teaching Context</StepTitle>
              
              <Question label="How do you teach?" hint="Select all that apply">
                <CheckboxGroup
                  options={TEACHING_FORMATS}
                  values={formData.teachingFormats}
                  onToggle={value => toggleMultiSelect('teachingFormats', value)}
                />
              </Question>

              <Question label="Who are your typical students?" hint="Select all that apply">
                <CheckboxGroup
                  options={STUDENT_TYPES}
                  values={formData.studentTypes}
                  onToggle={value => toggleMultiSelect('studentTypes', value)}
                />
                <OtherInput
                  value={formData.studentTypesOther}
                  onChange={value => updateField('studentTypesOther', value)}
                  placeholder="Other student types..."
                />
              </Question>
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper key="step3">
              <StepTitle>Your Current AI Usage</StepTitle>
              
              <Question label="How would you describe your current use of AI?">
                <RadioGroup
                  options={AI_EXPERIENCE_LEVELS}
                  value={formData.aiExperience}
                  onChange={value => updateField('aiExperience', value)}
                />
              </Question>

              <Question label="What do you mainly use AI for right now?" hint="Select all that apply">
                <CheckboxGroup
                  options={AI_USES}
                  values={formData.aiUses}
                  onToggle={value => toggleMultiSelect('aiUses', value)}
                />
                <OtherInput
                  value={formData.aiUsesOther}
                  onChange={value => updateField('aiUsesOther', value)}
                  placeholder="Other AI uses..."
                />
              </Question>
            </StepWrapper>
          )}

          {step === 4 && (
            <StepWrapper key="step4">
              <StepTitle>Your Lesson Prep</StepTitle>
              
              <Question label="Where do your lesson materials come from right now?" hint="Select all that apply">
                <CheckboxGroup
                  options={MATERIAL_SOURCES}
                  values={formData.materialSources}
                  onToggle={value => toggleMultiSelect('materialSources', value)}
                />
                <OtherInput
                  value={formData.materialSourcesOther}
                  onChange={value => updateField('materialSourcesOther', value)}
                  placeholder="Other sources..."
                />
              </Question>

              <Question label="What's your biggest frustration with lesson prep?">
                <RadioGroup
                  options={[...PREP_FRUSTRATIONS, { value: 'other', label: 'Other' }]}
                  value={formData.prepFrustration}
                  onChange={value => updateField('prepFrustration', value)}
                />
                <AnimatePresence>
                  {formData.prepFrustration === 'other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <input
                        type="text"
                        value={formData.prepFrustrationOther}
                        onChange={e => updateField('prepFrustrationOther', e.target.value)}
                        className="input-base"
                        placeholder="Please specify..."
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Question>
            </StepWrapper>
          )}

          {step === 5 && (
            <StepWrapper key="step5">
              <StepTitle>Your Expectations</StepTitle>
              
              <Question label="What would you most like to learn from this course?">
                <textarea
                  autoFocus
                  value={formData.courseExpectations}
                  onChange={e => updateField('courseExpectations', e.target.value)}
                  className="input-base min-h-[150px] resize-y text-lg"
                  placeholder="Tell us what you're hoping to get out of this training..."
                />
              </Question>
            </StepWrapper>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700"
        >
          {error}
        </motion.div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 1}
          className="flex items-center gap-2 px-4 py-2 text-navy/60 hover:text-navy 
                     disabled:opacity-0 disabled:pointer-events-none transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow text-navy font-semibold
                       shadow-lg hover:shadow-xl transition-all duration-200
                       hover:bg-yellow/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow text-navy font-semibold
                       shadow-lg hover:shadow-xl transition-all duration-200
                       hover:bg-yellow/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-navy/40">
        {step < TOTAL_STEPS && canProceed() && (
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-navy/10 text-navy/60 font-mono text-xs">Enter ↵</kbd> to continue</span>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            i < current ? 'bg-sage' : 'bg-navy/10'
          }`}
        />
      ))}
      <span className="text-sm text-navy/50 ml-2">{current}/{total}</span>
    </div>
  );
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {children}
    </motion.div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold text-navy font-display">{children}</h2>
  );
}

function Question({ 
  label, 
  hint, 
  children 
}: { 
  label: string; 
  hint?: string;
  children: React.ReactNode 
}) {
  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-navy font-medium text-lg">{label}</span>
        {hint && <span className="block text-sm text-navy/50 mt-1">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function RadioGroup({ 
  options, 
  value, 
  onChange 
}: { 
  options: { value: string; label: string }[]; 
  value: string; 
  onChange: (value: string) => void 
}) {
  return (
    <div className="space-y-2">
      {options.map(option => (
        <label
          key={option.value}
          className={`radio-option ${value === option.value ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
            ${value === option.value ? 'border-sage bg-sage' : 'border-navy/30'}`}
          >
            {value === option.value && (
              <span className="w-2 h-2 rounded-full bg-white" />
            )}
          </span>
          <span className="text-navy">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ 
  options, 
  values, 
  onToggle 
}: { 
  options: { value: string; label: string }[]; 
  values: string[]; 
  onToggle: (value: string) => void 
}) {
  return (
    <div className="space-y-2">
      {options.map(option => {
        const isSelected = values.includes(option.value);
        return (
          <label
            key={option.value}
            className={`checkbox-option ${isSelected ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(option.value)}
              className="sr-only"
            />
            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
              ${isSelected ? 'border-sage bg-sage' : 'border-navy/30'}`}
            >
              {isSelected && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="text-navy">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function OtherInput({ 
  value, 
  onChange, 
  placeholder 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  placeholder: string 
}) {
  return (
    <div className="mt-3">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-base"
        placeholder={placeholder}
      />
    </div>
  );
}
