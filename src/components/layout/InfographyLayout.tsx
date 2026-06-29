import { Outlet, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function InfographyLayout() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-white">
      {/* Back button */}
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-8 left-8 z-50 p-3 text-gray-500 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
        aria-label={t('menu.back')}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </motion.button>

      {/* Infography content fills the screen */}
      <div className="w-full h-full">
        <Outlet />
      </div>
    </main>
  )
}
