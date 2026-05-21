"use client";
import React from "react";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";

import { useRouter, useSearchParams } from "next/navigation"; 
import toast from "react-hot-toast";

const LogInPage = () => {
    const router = useRouter();
    
   
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = Object.fromEntries(formData.entries());
        console.log(result);
        
        const { data, error } = await authClient.signIn.email({
            email: result.email, 
            password: result.password, 
            callbackURL: callbackUrl, 
        });
        
        if (data) {
            toast.success("Login successful!");
            router.push(callbackUrl); 
            router.refresh();
        }
        if (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            
            const { data, error } = await authClient.signIn.social({ 
                provider: "google",
                callbackURL: callbackUrl 
            });
            
            if (error) {
                toast.error(error.message); 
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 dark:bg-gray-950 transition-colors'>
            {/* jsdkfkj */}
            <Form
                className="w-full max-w-md flex-col gap-5 rounded-3xl border bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-800"
                onSubmit={onsubmit}
            >
                <h2 className="text-lg font-bold text-center dark:text-white">Log In</h2>
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
                    <Label className="dark:text-gray-300">Email</Label>
                    <Input placeholder="john@example.com" className="dark:bg-gray-800 dark:text-white" />
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
                    <Label className="dark:text-gray-300">Password</Label>
                    <Input placeholder="Enter your password" className="dark:bg-gray-800 dark:text-white" />
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button className="w-full rounded-md bg-indigo-600 hover:bg-indigo-700 text-white" type="submit">
                        LogIn
                    </Button>
                </div>
                
                <h2 className="text-center font-bold text-gray-400">OR</h2>
                
                <div>
                    <Button onClick={handleGoogleSignup} className="w-full dark:border-gray-700 dark:text-gray-300" variant="tertiary">
                        <Icon icon="devicon:google" />
                        Sign in with Google
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LogInPage;