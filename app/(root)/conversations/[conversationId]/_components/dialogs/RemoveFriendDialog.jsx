"use client"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@components/ui/alert-dialog'
import { api } from '@convex/_generated/api'
import { useMutationState } from '@hooks/useMutationState'
import { ConvexError } from 'convex/values'
import React from 'react'
import { toast } from 'sonner'

const RemoveFriendDialog = ({conversationId, open, setOpen}) => {
  
  const {mutate: removeFriend, pending} = useMutationState(api.friend.remove)

  const handleRemoveFriend = async () => {
    removeFriend({conversationId}).then(() => {
      toast.success("Removed friend")
    }).catch(error => {
      toast.error(error instanceof ConvexError ? error.data : "Unexpected error occured")
    })
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveFriendDialog
