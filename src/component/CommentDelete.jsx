"use client";

import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function CommentDelete({ commentId, onDeleteSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/comments/${commentId}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (data.deletedCount > 0) {
        setIsOpen(false); 
        toast.success(`Comment has been deleted successfully!`);
        
        router.refresh();
        if (onDeleteSuccess) {
          onDeleteSuccess(commentId); 
        }
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="hover:text-red-600 transition-colors"
      >
        Delete
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container size="sm"> 
            <Modal.Dialog>
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
              
              <Modal.Header>
                <Modal.Icon className="bg-red-50 text-red-600">
                  <Trash2 className="size-5" />
                </Modal.Icon>
                <Modal.Heading>
                  Delete Comment
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Are you sure you want to delete this comment? This action cannot be undone.
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Button 
                  onClick={() => setIsOpen(false)} 
                  variant="secondary"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDelete}
                  className="bg-red-600 text-white hover:bg-red-700 font-medium"
                  isLoading={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Confirm Delete"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}