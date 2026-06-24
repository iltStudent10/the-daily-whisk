import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { AppProvider } from './contexts/AppContext'
import DetailPage from './pages/DetailPage'
import FormPage from './pages/FormPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="items/:id" element={<DetailPage />} />
          <Route path="add" element={<FormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default App
