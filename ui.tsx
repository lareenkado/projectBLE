import React, { createContext, useContext, useState, ReactNode } from "react";


type Toast = {
  id: number;
  message: string;
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (message: string) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast"
            onClick={() => removeToast(t.id)}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return ctx;
}


export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div className="app-root">
        <header className="app-header">
          <h1 className="app-title">Compressed UI Demo</h1>
        </header>

        <div className="app-body">
          <aside className="app-sidebar">
            <SidebarMenu />
          </aside>

          <main className="app-content">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}

function SidebarMenu() {
  return (
    <nav>
      <div className="sidebar-section-title">Navigation</div>
      <ul className="sidebar-list">
        <li className="sidebar-item sidebar-item-active">Dashboard</li>
        <li className="sidebar-item">Reports</li>
        <li className="sidebar-item">Settings</li>
      </ul>

      <div className="sidebar-section-title">Shortcuts</div>
      <ul className="sidebar-list">
        <li className="sidebar-item">New Entry</li>
        <li className="sidebar-item">Export Data</li>
      </ul>
    </nav>
  );
}


export function DemoPage() {
  const [value, setValue] = useState(50);
  const [selected, setSelected] = useState("option1");
  const { showToast } = useToast();

  return (
    <div className="card">
      <h2 className="card-title">Demo Controls</h2>

      <div className="field">
        <label className="field-label">
          Slider value: <span className="field-value">{value}</span>
        </label>
        <Slider value={value} onChange={setValue} />
      </div>

      <div className="field">
        <label className="field-label">Select an option:</label>
        <Select
          value={selected}
          onChange={setSelected}
          options={[
            { value: "option1", label: "First option" },
            { value: "option2", label: "Second option" },
            { value: "option3", label: "Third option" },
          ]}
        />
      </div>

      <button
        className="primary-button"
        onClick={() =>
          showToast(`Saved! slider=${value}, select=${selected}`)
        }
      >
        Show Toast with Values
      </button>
    </div>
  );
}


type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function Slider({ value, onChange, min = 0, max = 100 }: SliderProps) {
  return (
    <input
      className="slider"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}


type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

export function Select({ value, onChange, options }: SelectProps) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
