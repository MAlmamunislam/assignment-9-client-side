'use client'
import React from 'react'
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import {Icon} from "@iconify/react";

const page = () => {
    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: result.name, // required
            email: result.email, // required
            password: result.password, // required
            image: result.image,
        });
        if (data) {
            redirect('/')
        }
        if (error) {
            alert(error.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const { data, error } = await authClient.signIn.social({ provider: "google" });
            if (error) {
                alert(error.message);
            }
            // data handling (redirect may be handled by auth flow)
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>


            <Form onSubmit={onsubmit} className="w-full max-w-md flex-col gap-5  rounded-3xl border bg-white p-6 shadow-lg">
                {/* name */}
                <TextField
                    isRequired
                    name="name"
                    type="text"

                >
                    <Label>Name</Label>
                    <Input placeholder="Input your Name" />
                    <FieldError />
                </TextField>
                {/* email  */}

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                {/* image  */}
                <TextField
                    isRequired
                    name="image"
                    type="text"

                >
                    <Label>Image</Label>
                    <Input placeholder="Input your image url" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2 mt-4">
                    <Button className='w-full ' type="submit">
                        <Check />
                        Submit
                    </Button>

                </div>
                {/* Login Section */}
                <div className='flex gap-2 items-center justify-center'>
                    {/* Login Section */}
                    <div className="text-center text-sm text-gray-600">
                        Already have an account?
                    </div>

                    <Link href="/login">
                        <p
                            className="w-full h-11"
                            variant="secondary"
                        >
                            Login to your account
                        </p>
                    </Link>
                </div>
                <h2 className='text-center'>OR </h2>
                <div>
                    <Button className="w-full" variant="tertiary" onClick={handleGoogleSignup}>
                        <Icon icon="devicon:google" />
                        Sign in with Google
                    </Button>
                </div>

            </Form>

        </div>
    )
}

export default page