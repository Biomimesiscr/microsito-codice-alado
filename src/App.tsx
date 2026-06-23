
function App() {
  return (
   <>
      <video
        src="/landingbg.mp4"
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      ></video>

      {/* Opaque overlay */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
        <div className="flex items-center gap-8 mb-10 animate-fade-slide-up">
          <img src="/cicima.svg" alt="CICIMA" className="h-18 w-auto" />
        </div>
        <h1 className="text-white text-6xl font-bold text-center tracking-wide mb-4 animate-fade-slide-up-delay">
          Códice Alado
        </h1>
        <p className="text-white/70 text-2xl font-semibold text-center px-6 animate-fade-slide-up-delay">
          Sitio en construcción... pronto estaremos contigo
        </p>
        <div className="mt-10 flex items-center gap-2 animate-fade-slide-up-delay">
          <span className="h-2.5 w-2.5 rounded-full bg-white/80 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-white/80 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-white/80 animate-bounce"></span>
        </div>
      </div>
    </>
  )
}

export default App
