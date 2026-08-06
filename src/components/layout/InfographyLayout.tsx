import { Outlet } from 'react-router'
import { Surface } from './Surface'
import { BackButton } from '../core/buttons/BackButton'

export function InfographyLayout() {
  return (
    <Surface tone="cream">
      <BackButton />

      {/* Infography content fills the screen */}
      <div className="w-full h-full">
        <Outlet />
      </div>
    </Surface>
  )
}
