'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewResolutionPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const sonner_1 = require("sonner");
const api_1 = __importDefault(require("@/lib/api"));
const categories = [
    { value: 'health', label: 'Health & Fitness', icon: '💪', color: '#4ade80' },
    { value: 'career', label: 'Career & Work', icon: '🚀', color: '#60a5fa' },
    { value: 'education', label: 'Education', icon: '📚', color: '#a78bfa' },
    { value: 'finance', label: 'Finance', icon: '💰', color: '#fbbf24' },
    { value: 'personal', label: 'Personal Growth', icon: '🌱', color: '#f472b6' },
    { value: 'other', label: 'Other', icon: '✨', color: '#94a3b8' },
];
const schema = zod_2.z.object({
    title: zod_2.z.string().min(3, 'At least 3 characters').max(200),
    description: zod_2.z.string().optional(),
    category: zod_2.z.string().min(1, 'Pick a category'),
    start_date: zod_2.z.string().min(1, 'Required'),
    end_date: zod_2.z.string().min(1, 'Required'),
});
function NewResolutionPage() {
    const router = (0, navigation_1.useRouter)();
    const [step, setStep] = (0, react_1.useState)(1);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schema),
        defaultValues: {
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
        }
    });
    const selectedCategory = watch('category');
    const title = watch('title');
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await api_1.default.post('/resolutions', data);
            sonner_1.toast.success('Quest created! Now add your milestones 🎯');
            router.push(`/dashboard/resolution/${res.data.data.id}`);
        }
        catch (err) {
            sonner_1.toast.error(err.response?.data?.message || 'Failed to create resolution');
        }
        finally {
            setLoading(false);
        }
    };
    const inputStyle = {
        width: '100%', padding: '12px 14px', borderRadius: 10,
        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
        color: 'var(--text-primary)', fontSize: 15, outline: 'none',
        fontFamily: 'var(--font-body)'
    };
    return (<div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 40 }}>
        <button onClick={() => router.back()} style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: 14, marginBottom: 24, padding: 0
        }}>← Back</button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Define your quest
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>One resolution that will define your year.</p>
      </div>

      
      <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
        {[1, 2, 3].map(s => (<div key={s} style={{
                flex: 1, height: 3, borderRadius: 2,
                background: s <= step ? 'var(--accent)' : 'var(--border)',
                transition: 'background 0.3s'
            }}/>))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        {step === 1 && (<div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              What area of life?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
              {categories.map(cat => (<button key={cat.value} type="button" onClick={() => setValue('category', cat.value)} style={{
                    padding: '16px', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
                    background: selectedCategory === cat.value ? `${cat.color}15` : 'var(--bg-card)',
                    border: `1px solid ${selectedCategory === cat.value ? cat.color : 'var(--border)'}`,
                    color: 'var(--text-primary)', transition: 'all 0.15s'
                }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{cat.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{cat.label}</div>
                </button>))}
            </div>
            {errors.category && <p style={{ color: 'var(--danger)', fontSize: 12, marginBottom: 16 }}>{errors.category.message}</p>}
            <button type="button" onClick={() => selectedCategory && setStep(2)} style={{
                width: '100%', padding: '13px', borderRadius: 10,
                background: selectedCategory ? 'var(--accent)' : 'var(--border)',
                color: '#fff', fontWeight: 700, fontSize: 15, border: 'none',
                cursor: selectedCategory ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-display)'
            }}>Continue →</button>
          </div>)}

        
        {step === 2 && (<div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Name your resolution
            </h2>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Resolution title *
              </label>
              <input {...register('title')} placeholder="e.g. Run my first marathon this year" style={inputStyle}/>
              {errors.title && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 4 }}>{errors.title.message}</p>}
            </div>
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Why does this matter? <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
              </label>
              <textarea {...register('description')} rows={4} placeholder="What will achieving this mean for you?" style={{ ...inputStyle, resize: 'vertical' }}/>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" onClick={() => setStep(1)} style={{
                flex: 1, padding: '13px', borderRadius: 10, border: '1px solid var(--border)',
                background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 15
            }}>← Back</button>
              <button type="button" onClick={() => title && title.length >= 3 && setStep(3)} style={{
                flex: 2, padding: '13px', borderRadius: 10,
                background: title && title.length >= 3 ? 'var(--accent)' : 'var(--border)',
                color: '#fff', fontWeight: 700, fontSize: 15, border: 'none',
                cursor: title && title.length >= 3 ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-display)'
            }}>Continue →</button>
            </div>
          </div>)}

        
        {step === 3 && (<div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Set your timeline
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
              When does your quest begin and end?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Start date</label>
                <input {...register('start_date')} type="date" style={inputStyle}/>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>End date</label>
                <input {...register('end_date')} type="date" style={inputStyle}/>
              </div>
            </div>

            
            <div style={{
                padding: 20, borderRadius: 12, background: 'var(--bg-card)',
                border: '1px solid var(--border)', marginBottom: 24
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your quest</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {categories.find(c => c.value === selectedCategory)?.icon} {selectedCategory}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" onClick={() => setStep(2)} style={{
                flex: 1, padding: '13px', borderRadius: 10, border: '1px solid var(--border)',
                background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 15
            }}>← Back</button>
              <button type="submit" disabled={loading} style={{
                flex: 2, padding: '13px', borderRadius: 10,
                background: loading ? 'var(--border)' : 'var(--accent)',
                color: '#fff', fontWeight: 700, fontSize: 15, border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-display)',
                boxShadow: loading ? 'none' : '0 0 24px var(--accent-glow)'
            }}>
                {loading ? 'Creating...' : 'Launch my quest 🚀'}
              </button>
            </div>
          </div>)}
      </form>
    </div>);
}
//# sourceMappingURL=page.js.map