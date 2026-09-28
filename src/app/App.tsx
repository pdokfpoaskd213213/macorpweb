import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, RequireAuth } from '@/features/auth';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ArtistsPage } from '@/pages/ArtistsPage';
import { ReleasesPage } from '@/pages/ReleasesPage';
import { LabelsPage } from '@/pages/LabelsPage';
import { StudiosPage } from '@/pages/StudiosPage';
import { StoresPage } from '@/pages/StoresPage';
import { ConnectionsPage } from '@/pages/ConnectionsPage';
import { TeamPage } from '@/pages/TeamPage';
import { LoginPage } from '@/pages/LoginPage';
import { AccountPage } from '@/pages/AccountPage';
import { BookingPage } from '@/pages/BookingPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// The shareable preview runs inside a sandboxed frame, so it routes in memory.
const Router = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter;

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Public */}
            <Route index element={<HomePage />} />
            <Route path="artists" element={<ArtistsPage />} />
            <Route path="releases" element={<ReleasesPage />} />
            <Route path="labels" element={<LabelsPage />} />
            <Route path="studios" element={<StudiosPage />} />
            <Route path="stores" element={<StoresPage />} />
            <Route path="connections" element={<ConnectionsPage />} />
            <Route path="team" element={<TeamPage />} />

            {/* Auth entry — Phase 2 adds: auth/callback, auth/character */}
            <Route path="login" element={<LoginPage />} />

            {/* Authenticated area */}
            <Route
              path="account"
              element={
                <RequireAuth>
                  <AccountPage />
                </RequireAuth>
              }
            />
            <Route
              path="studios/book"
              element={
                <RequireAuth>
                  <BookingPage />
                </RequireAuth>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
