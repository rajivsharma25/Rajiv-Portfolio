import AdminClient from "./AdminClient";

export const metadata = {
  title: "Admin Console | Rajiv Sharma",
  description: "Secure administrative console for managing blogs and content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
