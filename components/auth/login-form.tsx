"use client";
import React, { useState } from 'react'
import { CardWrapper } from './card-wrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { LoginSchema } from "@/schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import FormError from '@/components/auth/form-error';
import FormSuccess from '@/components/auth/form-success';
import { login } from '@/actions/login';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError=searchParams.get('error')==="OAuthAccountNotLinked"
    ? "Email is already in use with a different Provider":""
    const[error, setError] = useState<string | undefined>()
    const[success, setSuccess] = useState<string | undefined>()

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            login(values)
            .then((response) => {
                setError(response?.error)
                setSuccess(response?.success)
            })
        })
    }

  return (
    <div>
        <CardWrapper headerLabel="Welcome Back 🔐" backButtonLabel='Don’t have an account?' backButtonHref='/register' showSocial>
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Bhavesh.oct2k4@gmail.com" {...field} type="email" disabled={isPending}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="******" {...field} type="password" disabled={isPending} />
                            </FormControl>
                            <Button size="sm" className='px-0 font-normal' variant="link" asChild>
                                <Link href="/reset-password" className='text-sm hover:underline'>Forgot Password?</Link>
                            </Button>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" size="lg" className='w-full hover:cursor-pointer' disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    </div>
  )
}

export default LoginForm