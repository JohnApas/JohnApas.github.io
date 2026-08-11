import { Layout } from './components/layout/Layout'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Skills } from './components/sections/Skills'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </Layout>
  )
}

export default App
