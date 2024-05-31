"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@components/ui/alert-dialog'
import { api } from '@convex/_generated/api'
import { useMutationState } from '@hooks/useMutationState'
import { ConvexError } from 'convex/values'
import React from 'react'
import { toast } from 'sonner'
import { handler } from 'tailwindcss-animate'

const RemoveFriendDialog = ({conversationId, open, setOpen}) => {
  
  const {mutate: removeFriend, pending} = useMutationState(api.friend.remove)

  const handleRemoveFriend = async () => {
    removeFriend({id: conversationId}).then(() => {
      toast.success("Removed friend")
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
            This action cannot be undone. All message will be deleted and you will not be able to message this user. All group chats
            will still work as normal
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveFriendDialog
