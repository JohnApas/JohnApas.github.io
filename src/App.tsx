import { ThemeProvider } from './components/common/ThemeProvider'
import { Layout } from './components/layout/Layout'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <About />
        <Experience />
        <Services />
        <Contact />
      </Layout>
    </ThemeProvider>
  )
}

export default App
