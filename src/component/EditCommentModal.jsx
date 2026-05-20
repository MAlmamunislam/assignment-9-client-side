
"use client";

import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CommentEditModal({ commentId, currentText, onEditSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editText, setEditText] = useState(currentText);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    setIsUpdating(true);
    try {
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editText }),
      });
      
      const data = await response.json();
      
      if (data.modifiedCount > 0) {
        setIsOpen(false); 
        toast.success("Comment updated successfully!");
        
        router.refresh();
        if (onEditSuccess) {
          onEditSuccess(commentId, editText); 
        }
      }
    } catch (error) {
      console.error("Failed to update comment:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
     
      <button 
        onClick={() => {
          setEditText(currentText); 
          setIsOpen(true);
        }} 
        className="hover:text-indigo-600 transition-colors"
      >
        Edit
      </button>

    
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container size="sm"> 
            <Modal.Dialog>
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
              
              <Modal.Header>
                <Modal.Heading>Edit Comment</Modal.Heading>
              </Modal.Header>

              <form onSubmit={handleEdit}>
                <Modal.Body>
                 
                  <textarea
                    rows="3"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-800 resize-none"
                    placeholder="Update your comment..."
                  />
                </Modal.Body>

                <Modal.Footer>
                  <Button 
                    onClick={() => setIsOpen(false)} 
                    variant="secondary"
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 font-medium"
                    isLoading={isUpdating}
                    disabled={!editText.trim() || editText === currentText}
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </Modal.Footer>
              </form>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}