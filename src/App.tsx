import Nav from './components/Nav'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import EsdFramework from './components/EsdFramework'
import TheCascade from './components/TheCascade'
import MythsVsTruth from './components/MythsVsTruth'
import HomaIrCalculator from './components/HomaIrCalculator'
import ResearchEvidence from './components/ResearchEvidence'
import LabMarkers from './components/LabMarkers'
import ForWhom from './components/ForWhom'
import WaitlistSection from './components/WaitlistSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <EsdFramework />
        <TheCascade />
        <MythsVsTruth />
        <HomaIrCalculator />
        <ResearchEvidence />
        <LabMarkers />
        <ForWhom />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  )
}
