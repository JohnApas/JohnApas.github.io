import { useState } from 'react'
import { profile } from '../../data/profile'
import { Button } from '../common/Button'
import { Card } from '../common/Card'
import { SectionTitle } from '../common/SectionTitle'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const mailtoLink = `mailto:${profile.email ?? ''}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Contact"
          subtitle="Let's connect across the galaxy"
        />

        <div className="grid gap-12 md:grid-cols-2">
          <Card>
            <h3 className="mb-6 text-xl font-semibold text-highlight">
              Get in Touch
            </h3>

            <div className="space-y-4 text-text-muted">
              {profile.email && (
                <p>
                  <span className="text-text">Email:</span>{' '}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-highlight hover:underline"
                  >
                    {profile.email}
                  </a>
                </p>
              )}

              {profile.phone && (
                <p>
                  <span className="text-text">Phone:</span> {profile.phone}
                </p>
              )}

              {profile.address && (
                <p>
                  <span className="text-text">Location:</span> {profile.address}
                </p>
              )}

              <div className="flex gap-4 pt-4">
                {profile.socials.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:text-highlight"
                  >
                    GitHub
                  </a>
                )}
                {profile.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:text-highlight"
                  >
                    LinkedIn
                  </a>
                )}
                {profile.socials.twitter && (
                  <a
                    href={profile.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:text-highlight"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-text-muted">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-text outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-text outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm text-text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-text outline-none transition-colors focus:border-accent"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
