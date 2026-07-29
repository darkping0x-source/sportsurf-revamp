import { createClient } from "@/lib/supabase/server";
import AccountSettingsForm from "@/components/AccountSettingsForm";

export const metadata = {
  title: "Account Settings | SportSurf India",
};

export default async function AccountSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user!.id)
    .single();

  return (
    <div className="rounded-lg border border-navy/10 bg-white">
      <div className="border-b border-navy/10 px-6 py-4">
        <p className="font-display text-lg font-bold text-navy">Account Settings</p>
      </div>
      <div className="p-6">
        <AccountSettingsForm
          fullName={profile?.full_name ?? ""}
          phone={profile?.phone ?? ""}
          email={user!.email ?? ""}
        />
      </div>
    </div>
  );
}
