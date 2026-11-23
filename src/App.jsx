import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import useHashRoute from './hooks/useHashRoute.js'
import { screenVariants } from './components/motion.js'
import Intro, { INTRO_REVELADO } from './screens/Intro.jsx'
import AnfitrionFlow from './screens/anfitrion/AnfitrionFlow.jsx'
import { ANFITRION_INICIAL } from './data/anfitrion.js'
import HostShell from './screens/host/HostShell.jsx'

/** App del estudiante (otro GitHub Pages). */
const URL_ESTUDIANTE = 'https://valssse.github.io/quad/'

/**
 * Quad Host: la parte del anfitrión.
 * Flujo: Onboarding de anfitrión (A01–A22) → Panel del anfitrión.
 * Se abre desde la app del estudiante al elegir "Anfitrión" en "¿Cómo usarás Quad?".
 */
const FLOW = ['anfitrion', 'host']

export default function App() {
  const { route, param, sub, direction, navigate } = useHashRoute(FLOW, 'anfitrion/tipo')

  // Splash animado al abrir la app: 'logo' → 'revelando' (la app ya está detrás) → 'listo'
  const [intro, setIntro] = useState('logo')
  const [anfitrion, setAnfitrion] = useState(ANFITRION_INICIAL)

  const irAEstudiante = (hash = '') => window.location.assign(`${URL_ESTUDIANTE}${hash}`)

  const screens = {
    anfitrion: (
      <AnfitrionFlow
        pasoId={param}
        datos={anfitrion}
        setDatos={setAnfitrion}
        navigate={navigate}
        onFinish={() => navigate('host/inicio')}
      />
    ),
    host: (
      <HostShell
        pantalla={param}
        sub={sub}
        navigate={navigate}
        onPublicar={() => navigate('anfitrion/fotos')}
        onEstudiante={() => irAEstudiante('#/app/explorar')}
        onCerrarSesion={() => irAEstudiante('#/inicio')}
      />
    ),
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="stage">
        <div className="device">
          {intro !== 'logo' && (
            <motion.div
              className="screen-layer"
              initial={{ scale: 1.08, filter: 'blur(10px)' }}
              animate={{ scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none', transform: 'none' } }}
              transition={{ duration: INTRO_REVELADO + 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence custom={direction}>
                <motion.div
                  key={route}
                  className="screen-layer"
                  custom={direction}
                  variants={screenVariants}
                  initial={intro === 'listo' ? 'enter' : 'center'}
                  animate="center"
                  exit="exit"
                >
                  {screens[route]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
          {intro !== 'listo' && <Intro onRevelar={() => setIntro('revelando')} onFin={() => setIntro('listo')} />}
        </div>
      </div>
    </MotionConfig>
  )
}
