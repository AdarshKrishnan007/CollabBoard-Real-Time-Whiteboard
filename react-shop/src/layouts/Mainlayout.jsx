// layouts/MainLayout.jsx

export default function MainLayout({ children }) {
  return (
    <div
      className="layout"
      style={{
        backgroundImage: "linear-gradient(to bottom, #f1f8fd, #e8f3f9)",
      }}
    >
      <main>{children}</main>
    </div>
  );
}
