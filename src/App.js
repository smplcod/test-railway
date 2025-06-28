import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./supabaseClient"; // этот файл ты уже создал

export default function App() {
  const [session, setSession] = useState(null);

  // проверяем текущую сессию и слушаем изменение авторизации
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  // если пользователь НЕ вошёл — показываем готовую форму Supabase
  if (!session)
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]} // позже можно добавить ["google", "github"] и т.д.
      />
    );

  // если вошёл — любой ваш контент
  return (
    <div style={{ padding: 24 }}>
      <h1>🚂🚃🚃🚃🚃🚃</h1>
      <p>✅ Вы вошли, привет {session.user.email}!</p>
    </div>
  );
}
