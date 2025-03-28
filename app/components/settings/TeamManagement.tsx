// app/components/settings/TeamManagement.tsx

"use client"

import { useEffect, useState } from "react"
import { TeamService } from "@/app/lib/api-services/team-service"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

export default function TeamManagement() {
  const [team, setTeam] = useState<any[]>([])
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("agent")

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const data = await TeamService.getMembers()
      setTeam(data)
    } catch {
      toast.error("Failed to load team")
    }
  }

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      await TeamService.updateMember(id, { role: newRole })
      toast.success("Role updated")
      loadMembers()
    } catch {
      toast.error("Failed to update role")
    }
  }

  const handleRemove = async (id: number) => {
    try {
      await TeamService.deleteMember(id)
      toast.success("Member removed")
      loadMembers()
    } catch {
      toast.error("Failed to remove member")
    }
  }

  const handleInvite = async () => {
    if (!email) return toast.error("Please enter an email")
    try {
      await TeamService.inviteMember(email, role)
      toast.success("Invite sent!")
      setEmail("")
      setRole("agent")
      loadMembers()
    } catch {
      toast.error("Failed to invite member")
    }
  }
  


  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Team Members</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
        <Button className="w-full" onClick={handleInvite}>
            Invite Member
        </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.username}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Select value={member.role} onValueChange={(val) => handleRoleChange(member.id, val)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleRemove(member.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
