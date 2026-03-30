'use client'

import { useState, useEffect } from 'react'
import { FiCheck, FiX, FiMail, FiCalendar, FiEdit3, FiCheckCircle, FiClock } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

interface Post {
  id: string
  platform: string
  content: string
  imageUrl: string | null
  hashtags: string[]
  lineOfBusiness: string | null
  status: string
  scheduledAt: string | null
}

interface ApprovalBatch {
  id: string
  weekStart: string
  weekEnd: string
  status: string
  emailSentAt: string | null
  posts: Post[]
  createdAt: string
}

const BATCH_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Awaiting Review', color: 'bg-amber-100 text-amber-700' },
  EMAIL_SENT: { label: 'Email Sent', color: 'bg-blue-100 text-blue-700' },
  REVIEWED: { label: 'Reviewed', color: 'bg-purple-100 text-purple-700' },
  PARTIALLY_APPROVED: { label: 'Partially Approved', color: 'bg-orange-100 text-orange-700' },
  FULLY_APPROVED: { label: 'All Approved', color: 'bg-green-100 text-green-700' },
  EXPIRED: { label: 'Expired', color: 'bg-gray-100 text-gray-700' },
}

export default function ApprovalsPage() {
  const [batches, setBatches] = useState<ApprovalBatch[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null)

  useEffect(() => {
    fetchBatches()
  }, [])

  const fetchBatches = async () => {
    try {
      const res = await fetch('/api/approvals')
      const data = await res.json()
      setBatches(data)
    } catch {
      toast.error('Failed to load approvals')
    } finally {
      setLoading(false)
    }
  }

  const approvePost = async (postId: string) => {
    try {
      await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'APPROVED' }),
      })
      toast.success('Post approved!')
      fetchBatches()
    } catch {
      toast.error('Failed to approve post')
    }
  }

  const rejectPost = async (postId: string) => {
    try {
      await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED' }),
      })
      toast.success('Post rejected')
      fetchBatches()
    } catch {
      toast.error('Failed to reject post')
    }
  }

  const approveAll = async (batchId: string) => {
    try {
      await fetch(`/api/approvals/${batchId}/approve-all`, { method: 'POST' })
      toast.success('All posts approved!')
      fetchBatches()
    } catch {
      toast.error('Failed to approve all')
    }
  }

  const sendTestEmail = async () => {
    try {
      const res = await fetch('/api/approvals/send-email', { method: 'POST' })
      if (res.ok) {
        toast.success('Approval email would be sent (check email configuration)')
      } else {
        toast.error('Email not configured yet')
      }
    } catch {
      toast.error('Failed to send email')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading...</div></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weekly Approvals</h2>
          <p className="text-gray-600 mt-1">Review and approve your upcoming content before it goes live.</p>
        </div>
        <button onClick={sendTestEmail} className="btn-secondary flex items-center gap-2">
          <FiMail className="h-4 w-4" />
          Send Approval Email
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FiMail className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Weekly Email Workflow</p>
            <p className="text-sm text-blue-700 mt-1">
              Every week, InsurePost generates content based on your preferences and sends you an email
              digest for approval. You can also review and approve content directly here.
            </p>
          </div>
        </div>
      </div>

      {batches.length === 0 ? (
        <div className="text-center py-12 card">
          <FiCalendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No approval batches yet</h3>
          <p className="text-gray-500">
            Generate content first, then batches will appear here for your weekly review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {batches.map((batch) => {
            const isExpanded = expandedBatch === batch.id
            const statusConfig = BATCH_STATUS_LABELS[batch.status] || BATCH_STATUS_LABELS.PENDING
            const pendingPosts = batch.posts.filter((p) => p.status === 'PENDING_APPROVAL' || p.status === 'DRAFT')

            return (
              <div key={batch.id} className="card">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedBatch(isExpanded ? null : batch.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <FiCalendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Week of {format(new Date(batch.weekStart), 'MMM d')} - {format(new Date(batch.weekEnd), 'MMM d, yyyy')}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {batch.posts.length} posts &middot; {pendingPosts.length} pending review
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-6 space-y-4">
                    {pendingPosts.length > 0 && (
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => { e.stopPropagation(); approveAll(batch.id) }}
                          className="btn-success text-sm flex items-center gap-1.5"
                        >
                          <FiCheckCircle className="h-4 w-4" />
                          Approve All ({pendingPosts.length})
                        </button>
                      </div>
                    )}

                    {batch.posts.map((post) => (
                      <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {post.platform}
                              </span>
                              {post.lineOfBusiness && (
                                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                                  {post.lineOfBusiness.replace('_', ' ')}
                                </span>
                              )}
                              {post.scheduledAt && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <FiClock className="h-3 w-3" />
                                  {format(new Date(post.scheduledAt), 'EEE, MMM d \'at\' h:mm a')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{post.content}</p>
                            {post.hashtags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {post.hashtags.map((tag) => (
                                  <span key={tag} className="text-xs text-primary-600">#{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          {(post.status === 'PENDING_APPROVAL' || post.status === 'DRAFT') && (
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={(e) => { e.stopPropagation(); approvePost(post.id) }}
                                className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                                title="Approve"
                              >
                                <FiCheck className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); rejectPost(post.id) }}
                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                title="Reject"
                              >
                                <FiX className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                          {post.status === 'APPROVED' && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Approved</span>
                          )}
                          {post.status === 'REJECTED' && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Rejected</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
