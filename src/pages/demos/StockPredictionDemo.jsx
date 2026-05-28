import { useState, useCallback } from 'react'
import {
    ResponsiveContainer, ComposedChart, Line, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine
} from 'recharts'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const TICKERS = ['SPY', 'QQQ', 'AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'META']

const SIGNAL_CONFIG = {
    BUY:  { color: '#22c55e', glow: 'rgba(34,197,94,0.4)',  label: 'BUY',  emoji: '▲' },
    SELL: { color: '#ef4444', glow: 'rgba(239,68,68,0.4)',  label: 'SELL', emoji: '▼' },
    HOLD: { color: '#f59e0b', glow: 'rgba(245,158,11,0.4)', label: 'HOLD', emoji: '◆' },
}

const STEPS = [
    'Connecting to Yahoo Finance…',
    'Fetching historical OHLCV data…',
    'Loading Kronos AI model…',
    'Running Monte Carlo price paths…',
    'Aggregating 5 prediction trajectories…',
    'Calculating buy/sell signal…',
]

function fmt(n) { return n?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div style={{
            background: '#1e1e2e', border: '1px solid #333', borderRadius: 8,
            padding: '10px 14px', fontSize: 12, color: '#ccc'
        }}>
            <div style={{ color: '#888', marginBottom: 4 }}>{label}</div>
            {payload.map(p => (
                <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
                    {p.name}: <strong>${fmt(p.value)}</strong>
                </div>
            ))}
        </div>
    )
}

export default function StockPredictionDemo() {
    const [ticker, setTicker] = useState('SPY')
    const [hours, setHours] = useState(24)
    const [loading, setLoading] = useState(false)
    const [stepIdx, setStepIdx] = useState(0)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const runPrediction = useCallback(async () => {
        setLoading(true)
        setError(null)
        setResult(null)
        setStepIdx(0)

        // Animate through loading steps
        for (let i = 0; i < STEPS.length; i++) {
            setStepIdx(i)
            await new Promise(r => setTimeout(r, 700))
        }

        try {
            const res = await fetch(`${API}/predict/${ticker}?hours=${hours}`)
            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.detail || 'Prediction failed')
            }
            const data = await res.json()
            setResult(data)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [ticker, hours])

    // Merge historical + predicted into one chart series
    const chartData = result ? [
        ...result.historical.map(h => ({
            time: new Date(h.time).toLocaleTimeString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            historical: h.close,
            predicted: null,
            upper: null,
            lower: null,
        })),
        ...result.predicted.map(p => ({
            time: new Date(p.time).toLocaleTimeString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            historical: null,
            predicted: p.close,
            upper: p.upper,
            lower: p.lower,
        })),
    ] : []

    // Mark where prediction starts
    const splitIdx = result ? result.historical.length - 1 : null
    const splitTime = chartData[splitIdx]?.time

    const sig = result ? SIGNAL_CONFIG[result.signal] : null

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 100%)',
            color: '#e2e8f0',
            fontFamily: "'Inter', 'Segoe UI', monospace",
        }}>
            {/* Header */}
            <div style={{
                borderBottom: '1px solid #1e1e3a',
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(10px)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: 36, height: 36,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18,
                    }}>K</div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                            Kronos AI Predictor
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            Foundation model for financial markets
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#4b5563', textAlign: 'right' }}>
                    <div>Powered by <span style={{ color: '#6366f1' }}>Kronos-mini</span></div>
                    <div>Monte Carlo · 5 paths · 1-hour bars</div>
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* Controls */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Ticker
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {TICKERS.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTicker(t)}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: 6,
                                        border: ticker === t ? '1px solid #6366f1' : '1px solid #2d2d4a',
                                        background: ticker === t ? 'rgba(99,102,241,0.2)' : 'transparent',
                                        color: ticker === t ? '#a5b4fc' : '#6b7280',
                                        fontSize: '0.85rem',
                                        fontWeight: ticker === t ? 700 : 400,
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Forecast Horizon
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {[12, 24, 48, 72].map(h => (
                                <button
                                    key={h}
                                    onClick={() => setHours(h)}
                                    style={{
                                        padding: '0.4rem 0.75rem',
                                        borderRadius: 6,
                                        border: hours === h ? '1px solid #6366f1' : '1px solid #2d2d4a',
                                        background: hours === h ? 'rgba(99,102,241,0.2)' : 'transparent',
                                        color: hours === h ? '#a5b4fc' : '#6b7280',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {h}h
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={runPrediction}
                        disabled={loading}
                        style={{
                            padding: '0.65rem 2rem',
                            borderRadius: 8,
                            border: 'none',
                            background: loading
                                ? '#2d2d4a'
                                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            color: loading ? '#6b7280' : '#fff',
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: loading ? 'none' : '0 4px 15px rgba(99,102,241,0.4)',
                            alignSelf: 'flex-end',
                            marginBottom: 0,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {loading ? '⚙ Analysing…' : '▶ Run Prediction'}
                    </button>
                </div>

                {/* Loading Steps */}
                {loading && (
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid #1e1e3a',
                        borderRadius: 12,
                        padding: '2rem',
                        marginBottom: '2rem',
                    }}>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>
                            Running Kronos prediction pipeline…
                        </div>
                        {STEPS.map((step, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.5rem 0',
                                    opacity: i > stepIdx ? 0.3 : 1,
                                    transition: 'opacity 0.3s',
                                }}
                            >
                                <div style={{
                                    width: 18, height: 18,
                                    borderRadius: '50%',
                                    border: i < stepIdx
                                        ? '2px solid #22c55e'
                                        : i === stepIdx
                                            ? '2px solid #6366f1'
                                            : '2px solid #2d2d4a',
                                    background: i < stepIdx ? '#22c55e' : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 10, color: '#fff',
                                    flexShrink: 0,
                                }}>
                                    {i < stepIdx ? '✓' : ''}
                                </div>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: i === stepIdx ? '#e2e8f0' : i < stepIdx ? '#6b7280' : '#4b5563',
                                }}>
                                    {step}
                                </span>
                                {i === stepIdx && (
                                    <span style={{
                                        display: 'inline-block',
                                        width: 6, height: 6,
                                        borderRadius: '50%',
                                        background: '#6366f1',
                                        animation: 'pulse 1s infinite',
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: 12,
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        color: '#fca5a5',
                    }}>
                        <strong>Error:</strong> {error}
                        <div style={{ fontSize: '0.8rem', marginTop: 8, color: '#9ca3af' }}>
                            Make sure the backend is running: <code style={{ color: '#a5b4fc' }}>cd backend && python main.py</code>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !result && !error && (
                    <div style={{
                        textAlign: 'center',
                        padding: '5rem 2rem',
                        color: '#4b5563',
                        border: '1px dashed #2d2d4a',
                        borderRadius: 16,
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
                        <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#6b7280' }}>
                            Select a ticker and click <strong style={{ color: '#a5b4fc' }}>Run Prediction</strong>
                        </div>
                        <div style={{ fontSize: '0.85rem' }}>
                            Kronos-mini will predict the next {hours} hours using the last 15 days of market data
                        </div>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div>
                        {/* Signal + Metrics Row */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '260px 1fr',
                            gap: '1.5rem',
                            marginBottom: '1.5rem',
                        }}>
                            {/* Signal Card */}
                            <div style={{
                                background: `linear-gradient(135deg, rgba(${sig.glow.slice(5,-1)}, 0.15), rgba(${sig.glow.slice(5,-1)}, 0.05))`,
                                border: `1px solid ${sig.color}40`,
                                borderRadius: 16,
                                padding: '2rem',
                                textAlign: 'center',
                                boxShadow: `0 0 40px ${sig.glow}`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    AI Signal
                                </div>
                                <div style={{
                                    fontSize: '3.5rem',
                                    fontWeight: 900,
                                    color: sig.color,
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1,
                                    textShadow: `0 0 20px ${sig.glow}`,
                                    marginBottom: 8,
                                }}>
                                    {sig.emoji} {sig.label}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                                    {result.confidence}% model confidence
                                </div>
                                <div style={{
                                    marginTop: 16,
                                    padding: '0.5rem 1rem',
                                    background: `${sig.color}20`,
                                    borderRadius: 6,
                                    fontSize: '0.8rem',
                                    color: sig.color,
                                }}>
                                    {result.pct_change > 0 ? '+' : ''}{result.pct_change}% in {result.pred_hours}h
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1rem',
                            }}>
                                {[
                                    { label: 'Current Price', value: `$${fmt(result.current_price)}`, sub: `${result.day_change_pct > 0 ? '+' : ''}${result.day_change_pct}% today`, subColor: result.day_change_pct >= 0 ? '#22c55e' : '#ef4444' },
                                    { label: `Predicted Price (${result.pred_hours}h)`, value: `$${fmt(result.predicted_price)}`, sub: `${result.pct_change > 0 ? '+' : ''}${result.pct_change}% change`, subColor: result.pct_change >= 0 ? '#22c55e' : '#ef4444' },
                                    { label: 'Forecast Model', value: 'Kronos-mini', sub: '4.1M parameters · CPU inference', subColor: '#6b7280' },
                                    { label: 'Data Source', value: 'Yahoo Finance', sub: `${result.historical.length} hourly bars · free API`, subColor: '#6b7280' },
                                ].map(m => (
                                    <div key={m.label} style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid #1e1e3a',
                                        borderRadius: 12,
                                        padding: '1.25rem 1.5rem',
                                    }}>
                                        <div style={{ fontSize: '0.72rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                                            {m.label}
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                                            {m.value}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: m.subColor, marginTop: 4 }}>
                                            {m.sub}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chart */}
                        <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid #1e1e3a',
                            borderRadius: 16,
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{result.ticker} · Close Price</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                        Historical (blue) + Kronos forecast (
                                        <span style={{ color: sig.color }}>{sig.label === 'BUY' ? 'green' : sig.label === 'SELL' ? 'red' : 'amber'}</span>)
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                                    Generated {new Date(result.generated_at).toLocaleTimeString()}
                                </div>
                            </div>

                            <ResponsiveContainer width="100%" height={320}>
                                <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="predGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={sig.color} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={sig.color} stopOpacity={0.0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e3a" />
                                    <XAxis
                                        dataKey="time"
                                        tick={{ fill: '#4b5563', fontSize: 11 }}
                                        interval={Math.floor(chartData.length / 8)}
                                        tickLine={false}
                                        axisLine={{ stroke: '#1e1e3a' }}
                                    />
                                    <YAxis
                                        tick={{ fill: '#4b5563', fontSize: 11 }}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={v => `$${v.toFixed(0)}`}
                                        domain={['auto', 'auto']}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                                        formatter={(value) => (
                                            <span style={{ color: '#9ca3af' }}>{value}</span>
                                        )}
                                    />
                                    {splitTime && (
                                        <ReferenceLine
                                            x={splitTime}
                                            stroke="#6366f1"
                                            strokeDasharray="4 4"
                                            label={{ value: 'Now', fill: '#6366f1', fontSize: 11 }}
                                        />
                                    )}
                                    {/* Confidence band */}
                                    <Area
                                        dataKey="upper"
                                        fill="transparent"
                                        stroke="none"
                                        name="_upper"
                                        legendType="none"
                                    />
                                    <Area
                                        dataKey="lower"
                                        fill={`url(#predGradient)`}
                                        stroke="none"
                                        name="Confidence Band"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="historical"
                                        stroke="#60a5fa"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Historical"
                                        connectNulls={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="predicted"
                                        stroke={sig.color}
                                        strokeWidth={2}
                                        strokeDasharray="6 3"
                                        dot={false}
                                        name="Predicted"
                                        connectNulls={false}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Disclaimer */}
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#4b5563',
                            textAlign: 'center',
                            borderTop: '1px solid #1e1e3a',
                            paddingTop: '1rem',
                        }}>
                            This is an AI prediction for demonstration purposes only. Not financial advice.
                            Predictions are probabilistic — past performance does not guarantee future results.
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </div>
    )
}
