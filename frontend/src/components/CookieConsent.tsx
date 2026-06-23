"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const openSettings = () => {
    alert("Datenschutz-Einstellungen kommen später 🙂");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white max-w-3xl w-full rounded-xl shadow-xl p-8 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">
          Wir verwenden Cookies. Damit Sie finden, was Sie brauchen.
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Um Ihnen die bestmögliche Benutzererfahrung auf unseren Angeboten zu bieten, verwenden wir und Drittanbieter Cookies und andere Technologien („Cookies"), um Geräteinformationen und personenbezogene Daten zu speichern und darauf zuzugreifen.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Dadurch ist es möglich, personalisierte Werbung entsprechend Ihren Interessen auszuspielen, unser Angebot zu optimieren und dessen Verwendung zu analysieren. Klicken Sie den Button unten rechts, um dem Einsatz von einwilligungspflichtigen Cookies zuzustimmen oder unten links, um eine detaillierte Auswahl zu treffen oder der Verarbeitung zu widersprechen.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Die Einwilligung umfasst auch die Übermittlung bestimmter personenbezogener Daten in Drittländer, u.a. die USA, nach Art. 49 (1) (a) DSGVO. Wollen Sie keine Einwilligung erteilen, klicken Sie bitte hier.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Cookies und ähnliche Kennungen können gespeichert oder ausgelesen werden, um Ihr Gerät wiederzuerkennen. Dies geschieht für verschiedene Verarbeitungszwecke.
        </p>

        <h3 className="font-semibold mt-4 mb-2">Zwecke</h3>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Genaue Standortdaten und Identifikation durch Scannen von Endgeräten</li>
          <li>Personalisierte Werbung und Inhalte, Messung von Werbeleistung</li>
          <li>Essentielle Seitenfunktionen</li>
          <li>Erweiterte Seitenfunktionen</li>
        </ul>

        <p className="text-gray-700 mb-4">
          Wir arbeiten mit 188 Anbietern zusammen.
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={openSettings}
            className="px-6 py-3 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Datenschutz‑Einstellungen
          </button>

          <button
            onClick={acceptAll}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
