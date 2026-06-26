import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react'
import { cn } from '../lib/utils'
import { conversations, thread } from '../data/messages'
import Avatar from '../components/Avatar'
import FadeIn, { PageHeader } from '../components/FadeIn'

export default function MessagesView({ onToast }) {
  const [activeId, setActiveId] = useState(conversations[0].id)
  const [draft, setDraft] = useState('')
  const active = conversations.find((c) => c.id === activeId)

  const send = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    onToast({ title: 'Message sent', description: `To ${active.name}`, tone: 'success' })
    setDraft('')
  }

  return (
    <div>
      <PageHeader title="Messages" description="Stay in sync with your customers and team." />
      <FadeIn>
        <div className="card grid h-[34rem] grid-cols-1 overflow-hidden md:grid-cols-[300px_1fr]">
          {/* Conversation list */}
          <div className="hidden flex-col border-r border-ink-200/70 dark:border-ink-800 md:flex">
            <div className="border-b border-ink-200/70 p-3 dark:border-ink-800">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input placeholder="Search messages…" className="input pl-9 py-2" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    'flex w-full items-center gap-3 border-b border-ink-100 px-3 py-3 text-left transition dark:border-ink-800/70',
                    activeId === c.id
                      ? 'bg-brand-50/60 dark:bg-brand-500/10'
                      : 'hover:bg-ink-50 dark:hover:bg-ink-800/40',
                  )}
                >
                  <div className="relative">
                    <Avatar name={c.name} size="md" />
                    {c.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-ink-900" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-ink-800 dark:text-ink-100">
                        {c.name}
                      </p>
                      <span className="shrink-0 text-[11px] text-ink-400">{c.time}</span>
                    </div>
                    <p className="truncate text-xs text-ink-500 dark:text-ink-400">{c.preview}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Thread */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-ink-200/70 px-4 py-3 dark:border-ink-800">
              <div className="flex items-center gap-3">
                <Avatar name={active.name} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">
                    {active.name}
                  </p>
                  <p className="text-[11px] text-emerald-500">
                    {active.online ? 'Online' : 'Offline'} · {active.company}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-ink-400">
                {[Phone, Video, MoreVertical].map((Icon, i) => (
                  <button
                    key={i}
                    className="grid h-9 w-9 place-items-center rounded-xl transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-ink-50/50 p-4 dark:bg-ink-950/30">
              {thread.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm',
                      m.from === 'me'
                        ? 'rounded-br-md bg-brand-600 text-white'
                        : 'rounded-bl-md bg-white text-ink-800 dark:bg-ink-800 dark:text-ink-100',
                    )}
                  >
                    {m.text}
                    <span
                      className={cn(
                        'mt-1 block text-[10px]',
                        m.from === 'me' ? 'text-brand-100' : 'text-ink-400',
                      )}
                    >
                      {m.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <form
              onSubmit={send}
              className="flex items-center gap-2 border-t border-ink-200/70 p-3 dark:border-ink-800"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                className="input"
              />
              <motion.button whileTap={{ scale: 0.92 }} type="submit" className="btn-primary px-3.5">
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
