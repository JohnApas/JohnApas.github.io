import { profile } from '../../data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-space-secondary py-8 sm:py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 md:flex-row md:text-left">
        <p className="text-xs text-text-muted">
          Copyright &copy; {year} {profile.name}. All rights reserved.
        </p>

        <div className="flex gap-6">
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted transition-colors hover:text-text"
            >
              GitHub
            </a>
          )}
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted transition-colors hover:text-text"
            >
              LinkedIn
            </a>
          )}
          {profile.socials.twitter && (
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted transition-colors hover:text-text"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
