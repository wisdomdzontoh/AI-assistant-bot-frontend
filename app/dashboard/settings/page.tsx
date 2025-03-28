"use client";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"
import { getProfile, updateProfile } from "@/app/lib/api-services/user-service"
import { NotificationService } from "@/app/lib/api-services/notification-service"
import { OrganizationService } from "@/app/lib/api-services/organization-service"
import { toast } from "sonner"
import TeamManagement from "@/app/components/settings/TeamManagement";
import { APIKeyService } from "@/app/lib/api-services/api-key-service"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  })

  const [organization, setOrganization] = useState<any>({
    name: "",
    website: "",
    industry: "",
    primary_color: "#3B82F6",
    logo: null,
  })
  const [orgSaving, setOrgSaving] = useState(false)

  const [preferences, setPreferences] = useState<any>(null)
  const [savingPrefs, setSavingPrefs] = useState(false)
  const [apiKeyName, setApiKeyName] = useState("")
  const [keys, setKeys] = useState<any[]>([])

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          email: data.email ?? "",
          username: data.username ?? "",
        })
      })
      .catch(() => toast.error("Failed to load profile"))

    NotificationService.getPreferences()
      .then(setPreferences)
      .catch(() => toast.error("Failed to load notification preferences"))

    OrganizationService.getMyOrganization()
      .then(setOrganization)
      .catch(() => toast.error("Failed to load organization"))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setProfile((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = async () => {
    try {
      await updateProfile(profile)
      toast.success("Profile updated!")
    } catch (err) {
      toast.error("Failed to update profile")
    }
  }

  const handlePrefChange = (key: string, value: boolean) => {
    setPreferences((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSavePrefs = async () => {
    try {
      setSavingPrefs(true)
      await NotificationService.updatePreferences(preferences)
      toast.success("Preferences saved")
    } catch {
      toast.error("Failed to save preferences")
    } finally {
      setSavingPrefs(false)
    }
  }

  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setOrganization((prev: any) => ({ ...prev, [id]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOrganization((prev: any) => ({ ...prev, logo: file }))
    }
  }

  const handleSaveOrganization = async () => {
    const formData = new FormData()
    for (const key in organization) {
      if (organization[key] !== null) {
        formData.append(key, organization[key])
      }
    }
    try {
      setOrgSaving(true)
      await OrganizationService.updateMyOrganization(formData)
      toast.success("Organization updated")
    } catch {
      toast.error("Failed to update organization")
    } finally {
      setOrgSaving(false)
    }
  }

  useEffect(() => {
    APIKeyService.getKeys().then(setKeys).catch(() => toast.error("Failed to fetch API keys"))
  }, [])


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and organization preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" value={profile.first_name} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" value={profile.last_name} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={profile.username} onChange={handleChange} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Manage your organization details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input id="name" value={organization.name} onChange={handleOrgChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" value={organization.website} onChange={handleOrgChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" value={organization.industry} onChange={handleOrgChange} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Branding</h3>

                <div className="grid gap-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                      {organization.logo && typeof organization.logo !== "string" ? (
                        <img src={URL.createObjectURL(organization.logo)} alt="Logo preview" className="h-full w-full object-cover" />
                      ) : organization.logo ? (
                        <img src={organization.logo} alt="Logo preview" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-muted-foreground text-xs">No logo</span>
                      )}
                    </div>
                    <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} className="w-fit" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="primary_color">Primary Color</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                        id="primary_color"
                        type="color"
                        value={organization.primary_color || "#000000"}
                        onChange={handleOrgChange}
                        className="w-12 h-10 p-0 border-none bg-transparent"
                      />
                    <span className="text-sm text-muted-foreground">{organization.primary_color}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveOrganization} disabled={orgSaving}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-conversations">New Conversations</Label>
                    <p className="text-sm text-muted-foreground">Receive emails when new conversations start</p>
                  </div>
                  <Switch id="email-conversations" checked={preferences?.email_conversations} onCheckedChange={(v) => handlePrefChange("email_conversations", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <Switch id="email-reports" checked={preferences?.email_reports} onCheckedChange={(v) => handlePrefChange("email_reports", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-marketing">Marketing Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive product updates and offers</p>
                  </div>
                  <Switch id="email-marketing" checked={preferences?.email_marketing} onCheckedChange={(v) => handlePrefChange("email_marketing", v)} />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-conversations">New Conversations</Label>
                    <p className="text-sm text-muted-foreground">Show notifications for new conversations</p>
                  </div>
                  <Switch id="app-conversations" checked={preferences?.app_conversations} onCheckedChange={(v) => handlePrefChange("app_conversations", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-mentions">Mentions</Label>
                    <p className="text-sm text-muted-foreground">Show notifications when you're mentioned</p>
                  </div>
                  <Switch id="app-mentions" checked={preferences?.app_mentions} onCheckedChange={(v) => handlePrefChange("app_mentions", v)} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePrefs} disabled={savingPrefs}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage API keys for integrating with your systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (!apiKeyName) return toast.error("Please enter a name")
                try {
                  const key = await APIKeyService.createKey(apiKeyName)
                  toast.success("Key generated!")
                  setKeys((prev) => [key, ...prev])
                  setApiKeyName("")
                } catch {
                  toast.error("Failed to create key")
                }
              }}
              className="flex items-center gap-4"
            >
              <Input
                placeholder="Key name (e.g. Production)"
                value={apiKeyName}
                onChange={(e) => setApiKeyName(e.target.value)}
              />
              <Button type="submit">Generate Key</Button>
            </form>

            {keys.length > 0 ? (
              <div className="space-y-3">
                {keys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between border p-3 rounded-md bg-muted"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{key.name}</p>
                      <code className="text-xs break-all text-muted-foreground">{key.key}</code>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(key.key)
                        toast.success("Copied to clipboard")
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No API keys yet</p>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Webhook URL</h3>
            <p className="text-sm text-muted-foreground">
              Configure a webhook URL to receive events from ChatWise
            </p>
            <Input placeholder="https://your-domain.com/webhook" />
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="team">
      <TeamManagement />
    </TabsContent>



      </Tabs>
    </div>
  )
}