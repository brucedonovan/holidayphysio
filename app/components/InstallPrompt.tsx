'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const INSTALL_PROMPT_DISMISSED_KEY = 'holidayphysio_install_dismissed';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the prompt
    const isDismissed = localStorage.getItem(INSTALL_PROMPT_DISMISSED_KEY);
    if (isDismissed) {
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Show prompt for iOS users on first visit
    if (isIOSDevice) {
      setShowPrompt(true);
    }

    // Handle Android PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
    } catch (error) {
      console.error('Error during install prompt:', error);
    } finally {
      setDeferredPrompt(null);
      setShowPrompt(false);
      localStorage.setItem(INSTALL_PROMPT_DISMISSED_KEY, 'true');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem(INSTALL_PROMPT_DISMISSED_KEY, 'true');
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50 flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="font-semibold">Add HolidayPhysio to your home screen</p>
        <p className="text-sm text-blue-100">
          {isIOS 
            ? 'Tap Share and select "Add to Home Screen"' 
            : 'Install this app for easy access'}
        </p>
      </div>
      <div className="flex gap-2">
        {!isIOS && (
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition-colors flex-shrink-0"
          >
            Install
          </button>
        )}
        <button
          onClick={handleDismiss}
          className="text-blue-100 px-4 py-2 hover:text-white transition-colors flex-shrink-0"
        >
          {isIOS ? 'Got it' : 'Later'}
        </button>
      </div>
    </div>
  );
}
