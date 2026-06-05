import { Outlet } from 'react-router'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'

export default function ProductionLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
