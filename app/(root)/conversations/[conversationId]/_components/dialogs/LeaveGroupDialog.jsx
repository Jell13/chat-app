"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@components/ui/alert-dialog'
import { api } from '@convex/_generated/api'
import { useMutationState } from '@hooks/useMutationState'
import { ConvexError } from 'convex/values'
import React from 'react'
import { toast } from 'sonner'
import { handler } from 'tailwindcss-animate'

const LeaveGroupDialog = ({conversationId, open, setOpen}) => {
  
  const {mutate: leaveGroup, pending} = useMutationState(api.conversation.leaveGroup)

  const handleLeaveGroup = async () => {
    leaveGroup({id: conversationId}).then(() => {
      toast.success("Left the group")
    }).catch((error) => {
      toast.error(error instanceof ConvexError ? error.data : "Unexpected error occured")
    })
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will not be able to see any previous messages or send new messages to this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleLeaveGroup}>Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LeaveGroupDialog
