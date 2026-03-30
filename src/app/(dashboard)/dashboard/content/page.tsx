'use client'

import { useState, useEffect } from 'react'
import { FiRefreshCw, FiImage, FiEdit3, FiTrash2, FiSend, FiFilter, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface Post {
  id: string
  platform: string
  content: string
  imageUrl: string | null
  hashtags: string[]
  lineOfBusiness: string | null
  status: string
  scheduledAt: string | null
  createdAt: string
}

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  PENDING_APPROVAL: 'bg-amber-100 text-amber-700',
  APPROVED: 'bg-blue-100 text-blue-700',
  SCHEDULED: 'bg-purple-100 text-purple-700',
  PUBLISHED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
}

const PLATFORM_LABELS: Record<string, string> = {
  FACEBOOK: 'Facebook',
  INSTAGRAM: 'Instagram',
  LINKEDIN: 'LinkedIn',
  TWITTER: 'Twitter/X',
}

export default function ContentPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [filter, setFilter] = useState('ALL')
  const [editingPost, setEditingPost] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
    } catch {
      toast.error('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const generateContent = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/posts/generate', { method: 'POST' })
      const data = await res.json()

      if (res.ok) {
        toast.success(`Generated ${data.posts?.length || 0} new posts!`)
        fetchPosts()
      } else {
        toast.error(data.error || 'Failed to generate content')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setGenerating(false)
    }
  }

  const updatePost = async (id: string, updates: Partial<Post>) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        toast.success('Post updated')
        fetchPosts()
        setEditingPost(null)
      }
    } catch {
      toast.error('Failed to update post')
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      toast.success('Post deleted')
      fetchPosts()
    } catch {
      toast.error('Failed to delete post')
    }
  }

  const filteredPosts = filter === 'ALL' ? posts : posts.filter((p) => p.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Library</h2>
          <p className="text-gray-600 mt-1">Generate, edit, and manage your social media content.</p>
        </div>
        <button onClick={generateContent} disabled={generating} className="btn-primary flex items-center gap-2">
          {generating ? <FiRefreshCw className="h-4 w-4 animate-spin" /> : <FiPlus className="h-4 w-4" />}
          {generating ? 'Generating...' : 'Generate New Content'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <FiFilter className="h-4 w-4 text-gray-500" />
        {['ALL', 'DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'SCHEDULED', 'PUBLISHED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === status ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading content...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <FiImage className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
          <p className="text-gray-500 mb-4">Generate your first batch of AI-powered content.</p>
          <button onClick={generateContent} disabled={generating} className="btn-primary">
            Generate Content
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[post.status] || ''}`}>
                  {post.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">{PLATFORM_LABELS[post.platform]}</span>
              </div>

              {/* Image placeholder */}
              {post.imageUrl && (
                <div className="w-full h-40 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg mb-3 flex items-center justify-center">
                  <FiImage className="h-8 w-8 text-primary-400" />
                </div>
              )}

              {/* Content */}
              {editingPost === post.id ? (
                <div className="flex-1">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="input-field h-32 resize-none text-sm"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => updatePost(post.id, { content: editContent })} className="btn-primary text-xs">
                      Save
                    </button>
                    <button onClick={() => setEditingPost(null)} className="btn-secondary text-xs">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700 flex-1 mb-3 line-clamp-4">{post.content}</p>
              )}

              {/* Hashtags */}
              {post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.hashtags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Line of business */}
              {post.lineOfBusiness && (
                <p className="text-xs text-gray-500 mb-3">
                  Line: {post.lineOfBusiness.replace('_', ' ')}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => { setEditingPost(post.id); setEditContent(post.content) }}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-primary-600"
                >
                  <FiEdit3 className="h-3.5 w-3.5" /> Edit
                </button>
                {post.status === 'DRAFT' && (
                  <button
                    onClick={() => updatePost(post.id, { status: 'APPROVED' } as Partial<Post>)}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-green-600"
                  >
                    <FiSend className="h-3.5 w-3.5" /> Approve
                  </button>
                )}
                <button
                  onClick={() => deletePost(post.id)}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600 ml-auto"
                >
                  <FiTrash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
