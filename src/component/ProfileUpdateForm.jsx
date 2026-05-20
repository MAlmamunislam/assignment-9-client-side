"use client";


import { authClient } from "@/lib/auth-client";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { UserRoundPen } from "lucide-react";
import toast from "react-hot-toast";

export function UpdateProfileModal() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const updateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = Object.fromEntries(formData.entries());

        await authClient.updateUser({
            image: result.image,
            name: result.name,
        })
       toast.success("Profile updated successfully!");
    }
    return (
        <Modal>
            <Modal.Trigger>
                <button className="mt-8 w-full py-3 px-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-opacity-90 transition-all duration-300">
                    Update Profile
                </button>
            </Modal.Trigger>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">


                                <UserRoundPen />
                            </Modal.Icon>

                            <Modal.Heading>
                                Update Profile
                            </Modal.Heading>

                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Change your profile information.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={updateProfile} className="flex flex-col gap-4">

                                    <TextField
                                        className="w-full"
                                        name="name"
                                        type="text"
                                         defaultValue={user?.name}
                                        variant="secondary"
                                    >
                                        <Label>Name</Label>

                                        <Input placeholder="Enter your name" />
                                    </TextField>

                                    <TextField
                                        className="w-full"
                                        name="image"
                                         defaultValue={user?.image}
                                        type="text"
                                        variant="secondary"
                                    >
                                        <Label>Image URL</Label>

                                        <Input placeholder="Enter image url" />
                                    </TextField>
                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>

                                        <Button type="submit" slot="close">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>

                                </form>
                            </Surface>
                        </Modal.Body>


                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}