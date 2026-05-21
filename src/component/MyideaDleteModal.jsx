"use client";

import React, { useState } from "react";

import { Button, Modal } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteIdeaModal({ ideaId, ideaTitle, onDeleteSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();


  const handleDelete = async () => {

    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/myidea/${ideaId}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (data.deletedCount > 0) {
        setIsOpen(false); 
        toast.success(`"${ideaTitle}" has been deleted successfully!`);
        
      
        window.location.reload();
        if (onDeleteSuccess) {
          onDeleteSuccess(ideaId); 
          
        }
      }
    } catch (error) {
      console.error("Failed to delete idea:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
     
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="secondary"
        className="text-red-600 hover:bg-red-50 font-medium rounded-xl"
      >
        Delete
      </Button>

   
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container size="sm"> 
            <Modal.Dialog>
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
              
              <Modal.Header>
                <Modal.Icon className="bg-red-50 text-red-600">
                  < Trash2  className="size-5" />
                </Modal.Icon>
                <Modal.Heading>
                {ideaTitle}
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Are you sure you want to delete <span className="font-semibold text-slate-900">"{ideaTitle}"</span>? 
                  This action cannot be undone.
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