import { PermissionAction } from '@supabase/shared-types/out/constants'
import { ChevronDown, Mail, UserPlus } from 'lucide-react'
import { useState } from 'react'

import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TooltipContent_Shadcn_,
  TooltipTrigger_Shadcn_,
  Tooltip_Shadcn_,
} from 'ui'
import CreateUserModal from './CreateUserModal'
import InviteUserModal from './InviteUserModal'

const AddUserDropdown = () => {
  const canInviteUsers = useCheckPermissions(PermissionAction.AUTH_EXECUTE, 'invite_user')
  const canCreateUsers = useCheckPermissions(PermissionAction.AUTH_EXECUTE, 'create_user')

  const [inviteVisible, setInviteVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="primary" iconRight={<ChevronDown size={14} strokeWidth={1.5} />}>
            Add user
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="w-40">
          <Tooltip_Shadcn_>
            <TooltipTrigger_Shadcn_ asChild>
              <DropdownMenuItem
                className="space-x-2 !pointer-events-auto"
                disabled={!canInviteUsers}
                onClick={() => {
                  if (canInviteUsers) setInviteVisible(true)
                }}
              >
                <Mail size={14} />
                <p>Send invitation</p>
              </DropdownMenuItem>
            </TooltipTrigger_Shadcn_>
            {!canInviteUsers && (
              <TooltipContent_Shadcn_ side="left">
                You need additional permissions to invite users
              </TooltipContent_Shadcn_>
            )}
          </Tooltip_Shadcn_>

          <Tooltip_Shadcn_>
            <TooltipTrigger_Shadcn_ asChild>
              <DropdownMenuItem
                className="space-x-2 !pointer-events-auto"
                disabled={!canCreateUsers}
                onClick={() => {
                  if (canCreateUsers) setCreateVisible(true)
                }}
              >
                <UserPlus size={14} />
                <p>Create new user</p>
              </DropdownMenuItem>
            </TooltipTrigger_Shadcn_>
            {!canCreateUsers && (
              <TooltipContent_Shadcn_ side="left">
                You need additional permissions to create users
              </TooltipContent_Shadcn_>
            )}
          </Tooltip_Shadcn_>
        </DropdownMenuContent>
      </DropdownMenu>

      <InviteUserModal visible={inviteVisible} setVisible={setInviteVisible} />
      <CreateUserModal visible={createVisible} setVisible={setCreateVisible} />
    </>
  )
}

export default AddUserDropdown
