declare global {
  interface Window {
    workbox?: {
      register(): void;
      addEventListener(event: string, listener: (event: any) => void): void;
      removeEventListener(event: string, listener: (event: any) => void): void;
      messageSW(message: any): Promise<any>;
    };
  }

  interface Navigator {
    standalone?: boolean;
  }
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export {};
